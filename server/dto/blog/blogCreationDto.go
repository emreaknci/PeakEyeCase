package blog_dto

import "mime/multipart"

type BlogCreationDto struct {
	Title      string                `binding:"required" form:"title" validate:"required"`
	Content    string                `binding:"required" form:"content" validate:"required"`
	CategoryId uint                   `binding:"required" form:"categoryId" validate:"required"`
	AuthorId   uint                   `binding:"required" form:"authorId" validate:"required"`
	Image      *multipart.FileHeader `binding:"required" form:"image" validate:"required"`
}
