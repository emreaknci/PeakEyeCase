package comment_dto

type CommentCreationDto struct {
	AuthorId uint   `json:"authorId"`
	Content  string `json:"content"`
	BlogId   uint   `json:"blogId"`
}
