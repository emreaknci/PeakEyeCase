package blog_dto

type BlogListDto struct {
	Id             uint   `json:"id"`
	Title          string `json:"title"`
	CategoryId     uint   `json:"categoryId"`
	CategoryName   string `json:"categoryName"`
	CreatedAt      string `json:"createdAt"`
	ImageUri       string `json:"imageUri"`
	AuthorFullName string `json:"authorFullName"`
	AuthorId       uint   `json:"authorId"`
	IsDeleted      bool   `json:"isDeleted"`
	IsHidden       bool   `json:"isHidden"`
}
