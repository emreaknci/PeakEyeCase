package comment_dto

type CommentDto struct {
	Id             uint   `json:"id"`
	Content        string `json:"content"`
	CreatedAt      string `json:"createdAt"`
	AuthorId       uint   `json:"authorId"`
	AuthorFullName string `json:"authorFullName"`
	BlogId         uint   `json:"blogId"`
	BlogTitle      string `json:"blogTitle"`
}
