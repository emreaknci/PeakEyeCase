package mapping

import (
	"time"

	blog_dto "github.com/emreaknci/peakeyecase/server/dto/blog"
	"github.com/emreaknci/peakeyecase/server/model"
)

func BlogCreateDtoToBlog(dto blog_dto.BlogCreationDto) model.Blog {
	return model.Blog{
		Title:      dto.Title,
		Content:    dto.Content,
		CategoryID: uint(dto.CategoryId),
		BaseModel: model.BaseModel{
			CreatedAt: time.Now().Format(time.RFC3339),
			UpdatedAt: time.Now().Format(time.RFC3339),
			IsDeleted: false,
		},
		IsHidden: false,
		UserId:   uint(dto.AuthorId),
		ImageUri: "",
	}
}

func BlogEditDtoToBlog(dto blog_dto.BlogEditDto, blog model.Blog) model.Blog {
	blog.Title = dto.Title
	blog.Content = dto.Content
	blog.CategoryID = uint(dto.CategoryId)
	blog.UpdatedAt = time.Now().Format(time.RFC3339)

	return blog
}

func BlogToBlogListDto(blog model.Blog) blog_dto.BlogListDto {
	return blog_dto.BlogListDto{
		Id:             blog.Id,
		Title:          blog.Title,
		CategoryId:     blog.CategoryID,
		AuthorId:       blog.UserId,
		ImageUri:       blog.ImageUri,
		CreatedAt:      blog.CreatedAt,
		CategoryName:   blog.Category.Name,
		CategoryIsDeleted: blog.Category.IsDeleted,
		AuthorFullName: blog.User.FullName,
		IsDeleted:      blog.IsDeleted,
		IsHidden:       blog.IsHidden,
	}
}

func BlogToBlogDetailDto(blog model.Blog) blog_dto.BlogDetailDto {
	return blog_dto.BlogDetailDto{
		Id:             blog.Id,
		Title:          blog.Title,
		Content:        blog.Content,
		CategoryId:     blog.CategoryID,
		CategoryIsDeleted: blog.Category.IsDeleted,
		AuthorId:       blog.UserId,
		ImageUri:       blog.ImageUri,
		CreatedAt:      blog.CreatedAt,
		CategoryName:   blog.Category.Name,
		AuthorFullName: blog.User.FullName,
		IsDeleted:      blog.IsDeleted,
		IsHidden:       blog.IsHidden,
	}
}
