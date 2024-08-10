package model

type Comment struct {
	BaseModel
	Content string `json:"content"`
	BlogId  uint   `json:"blogId"`
	Blog    Blog   `json:"-"`
	UserId  uint   `json:"authorId"`
	User    User   `json:"-"`
}
