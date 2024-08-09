package user_dto

type SignUpDto struct {
	FullName        string `json:"fullName" validate:"required"`
	Email           string `json:"email" validate:"required,email"`
	Password        string `json:"password" validate:"required,min=6"`
	ConfirmPassword string `json:"confirmPassword" validate:"required,eqfield=Password"`
	JobTitle        string `json:"jobTitle" validate:"required"`
	About           string `json:"about"`
}
