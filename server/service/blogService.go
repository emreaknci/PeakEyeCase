package service

import (
	"log"
	"mime/multipart"
	"net/http"

	blog_dto "github.com/emreaknci/peakeyecase/server/dto/blog"
	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/emreaknci/peakeyecase/server/repository"
	"github.com/emreaknci/peakeyecase/server/utils/helpers"
	"github.com/emreaknci/peakeyecase/server/utils/mapping"
	"github.com/emreaknci/peakeyecase/server/utils/response"
	"github.com/go-playground/validator/v10"
)

type BlogService interface {
	Add(dto blog_dto.BlogCreationDto) response.CustomResponse
	Edit(dto blog_dto.BlogEditDto) response.CustomResponse
	Delete(id uint) response.CustomResponse
	GetById(id uint) response.CustomResponse
	GetAllByAuthorId(authorId uint) response.CustomResponse
	GetAll() response.CustomResponse
	IsOwnedByUser(blogId uint, userId uint) response.CustomResponse
}

type blogService struct {
	repo     repository.BlogRepository
	validate *validator.Validate
}

func NewBlogService(repo repository.BlogRepository, validate *validator.Validate) BlogService {
	return &blogService{repo, validate}
}

func (b *blogService) Add(dto blog_dto.BlogCreationDto) response.CustomResponse {
	err := b.validate.Struct(dto)
	if err != nil {
		return response.CustomResponse{Message: "Validation error occurred", Status: false, Error: err.Error(), StatusCode: 400}
	}

	imageResponse := uploadBlogImage(dto.Image)
	if !imageResponse.Status {
		return imageResponse
	}

	newBlog := mapping.BlogCreateDtoToBlog(dto)
	newBlog.ImageUri = imageResponse.Data.(string)

	blog, err := b.repo.Create(newBlog)
	if err != nil {
		fileDeleteResponse := helpers.DeleteFile(newBlog.ImageUri)
		if !fileDeleteResponse.Status {
			log.Fatal("An error occurred while deleting file: ", fileDeleteResponse.Error)
			return fileDeleteResponse
		}

		return response.CustomResponse{Message: "An error occurred while creating blog", Status: false, Error: err.Error(), StatusCode: 500}
	}

	return response.CustomResponse{Message: "Blog created successfully", Status: true, Data: blog, StatusCode: 201}
}

func (b *blogService) Delete(id uint) response.CustomResponse {
	err := b.repo.Delete(id)
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while deleting blog", Status: false, Error: err.Error(), StatusCode: 500}
	}

	return response.CustomResponse{Message: "Blog deleted successfully", Status: true, StatusCode: 200}
}

func (b *blogService) Edit(dto blog_dto.BlogEditDto) response.CustomResponse {
	err := b.validate.Struct(dto)
	if err != nil {
		return response.CustomResponse{Message: "Validation error occurred", Status: false, Error: err.Error(), StatusCode: 400}
	}

	blog, err := b.repo.GetByID(dto.Id)
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while getting blog", Status: false, Error: err.Error(), StatusCode: 500}
	}

	blog, err = b.repo.Update(mapping.BlogEditDtoToBlog(dto,blog))
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while updating blog", Status: false, Error: err.Error(), StatusCode: 500}
	}

	return response.CustomResponse{Message: "Blog updated successfully", Status: true, Data: blog, StatusCode: 200}
}

func (b *blogService) GetAll() response.CustomResponse {
	blogs, err := b.repo.GetAllWithDetail()
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while getting blogs", Status: false, Error: err.Error(), StatusCode: 500}
	}

	if len(blogs) == 0 {
		return response.CustomResponse{Message: "No blogs found", Status: false, Data: []blog_dto.BlogListDto{}, StatusCode: 404}
	}

	var blogList []blog_dto.BlogListDto

	for _, blog := range blogs {
		blogList = append(blogList, mapping.BlogToBlogListDto(blog))
	}

	return response.CustomResponse{Message: "Blogs listed successfully", Status: true, Data: blogList, StatusCode: 200}
}

func (b *blogService) GetById(id uint) response.CustomResponse {
	blog, err := b.repo.GetDetailById(id)
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while getting blog", Status: false, Error: err.Error(), StatusCode: 500}
	}

	blogDetail := mapping.BlogToBlogDetailDto(blog)

	return response.CustomResponse{Message: "Blog listed successfully", Status: true, Data: blogDetail, StatusCode: 200}
}

func (b *blogService) GetAllByAuthorId(authorId uint) response.CustomResponse {
	blogs, err := b.repo.GetAllByFilter(func(b model.Blog) bool {
		return b.UserId == authorId
	}, "Category", "User")
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while getting blog", Status: false, Error: err.Error(), StatusCode: 500}
	}

	if len(blogs) == 0 {
		return response.CustomResponse{Message: "No blogs found", Status: false, Data: []blog_dto.BlogListDto{}, StatusCode: 404}
	}

	var blogList []blog_dto.BlogListDto
	for _, blog := range blogs {
		blogList = append(blogList, mapping.BlogToBlogListDto(blog))
	}

	return response.CustomResponse{Message: "Blog listed successfully", Status: true, Data: blogList, StatusCode: 200}
}

func (b *blogService) IsOwnedByUser(blogId uint, userId uint) response.CustomResponse {
	blog, err := b.repo.GetByID(blogId)
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while getting blog", Status: false, Error: err.Error(), StatusCode: 500}
	}

	if blog.UserId != userId {
		return response.CustomResponse{Message: "Blog is not owned by user", Status: false, StatusCode: 400}
	}

	return response.CustomResponse{Message: "Blog is owned by user", Status: true, StatusCode: 200}
}

func uploadBlogImage(image *multipart.FileHeader) response.CustomResponse {
	file, err := image.Open()
	if err != nil {
		return response.CustomResponse{Message: "File could not be opened", Status: false, Error: err.Error(), StatusCode: http.StatusInternalServerError}
	}

	defer file.Close()
	return helpers.UploadFile(file, image)
}
