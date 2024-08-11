package user_dto

type ChangePasswordDto struct {
	UserId      uint `json:"userId" validate:"required"`
	OldPassword string `json:"oldPassword" validate:"required"`
	NewPassword string `json:"newPassword" validate:"required"`
}
