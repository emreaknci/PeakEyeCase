package blog_dto

type BlogDetailDto struct {
	Id                uint   `json:"id"`
	Title             string `json:"title"`
	Content           string `json:"content"`
	CategoryId        uint   `json:"categoryId"`
	CategoryName      string `json:"categoryName"`
	CategoryIsDeleted bool   `json:"categoryIsDeleted"`
	CreatedAt         string `json:"createdAt"`
	ImageUri          string `json:"imageUri"`
	AuthorFullName    string `json:"authorFullName"`
	AuthorId          uint   `json:"authorId"`
	IsDeleted         bool   `json:"isDeleted"`
	IsHidden          bool   `json:"isHidden"`
}
