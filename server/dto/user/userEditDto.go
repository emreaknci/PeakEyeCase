package user_dto

type UserEditDto struct {
	Id       uint   `json:"id" validate:"required"`
	FullName string `json:"fullName" validate:"required"`
	JobTitle string `json:"jobTitle" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	About    string `json:"about"`
}
