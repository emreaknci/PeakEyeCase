package user_dto

type AuthorDetailDto struct {
	Id        uint   `json:"id"`
	FullName  string `json:"fullName"`
	Email     string `json:"email"`
	CreatedAt string `json:"createdAt"`
	About     string `json:"about"`
	JobTitle  string `json:"jobTitle"`
}
