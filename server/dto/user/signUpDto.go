package user_dto

type SignUpDto struct {
	FullName       string `json:"fullName"`
	Email          string `json:"email"`
	Password       string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
	JobTitle       string `json:"jobTitle"`
	About          string `json:"about"`
}