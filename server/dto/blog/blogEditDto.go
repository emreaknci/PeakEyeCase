package blog_dto

type BlogEditDto struct {
	Id         uint   `json:"id" validate:"required"`
	Title      string `json:"title" validate:"required"`
	Content    string `json:"content" validate:"required"`
	CategoryId uint   `json:"categoryId" validate:"required"`
}
