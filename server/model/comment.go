package model

type Comment struct {
	BaseModel
	Content  string `json:"content"`
	BlogId   uint   `json:"blogId"`
	Blog     Blog   `json:"-"`
	AuthorId uint   `json:"authorId"`
	Author   User   `json:"-"`
}
