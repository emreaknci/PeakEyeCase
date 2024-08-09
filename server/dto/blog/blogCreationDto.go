package blog_dto

import "mime/multipart"

type BlogCreationDto struct {
	Title      string                `json:"title"`
	Content    string                `json:"content"`
	CategoryId int                   `json:"categoryId"`
	AuthorId   int                   `json:"authorId"`
	Image      *multipart.FileHeader `json:"image"`
}
