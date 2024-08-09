package user_dto

type UserDto struct {
	Id       uint   `json:"id"`
	FullName string `json:"fullName"`
	JobTitle string `json:"jobTitle"`
	Email    string `json:"email"`
	About    string `json:"about"`
	Role     int    `json:"role"`
}