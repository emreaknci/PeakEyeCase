package user_dto

type SignInDto struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}