package blog_dto

type BlogEditDto struct {
	Id         uint   `json:"id"`
	Title      string `json:"title"`
	Content    string `json:"content"`
	CategoryId uint   `json:"categoryId"`
}
