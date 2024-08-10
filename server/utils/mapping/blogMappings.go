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

func BlogEditDtoToBlog(dto blog_dto.BlogEditDto) model.Blog {
	return model.Blog{
		Title:      dto.Title,
		Content:    dto.Content,
		CategoryID: uint(dto.CategoryId),
		BaseModel: model.BaseModel{
			Id:        dto.Id,
			UpdatedAt: time.Now().Format(time.RFC3339),
		},
	}
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
		AuthorId:       blog.UserId,
		ImageUri:       blog.ImageUri,
		CreatedAt:      blog.CreatedAt,
		CategoryName:   blog.Category.Name,
		AuthorFullName: blog.User.FullName,
		IsDeleted:      blog.IsDeleted,
		IsHidden:       blog.IsHidden,
	}
}
