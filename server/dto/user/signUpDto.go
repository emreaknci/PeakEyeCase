package user_dto

import (
	"time"

	"github.com/emreaknci/peakeyecase/server/model"
)

type SignUpDto struct {
	FullName        string `json:"fullName" validate:"required"`
	Email           string `json:"email" validate:"required,email"`
	Password        string `json:"password" validate:"required,min=6"`
	ConfirmPassword string `json:"confirmPassword" validate:"required,eqfield=Password"`
	JobTitle        string `json:"jobTitle" validate:"required"`
	About           string `json:"about"`
}

func (dto *SignUpDto) MapToModel(hashedPassword string) model.User{
	newUser := model.User{
		FullName: dto.FullName,
		JobTitle: dto.JobTitle,
		Email:    dto.Email,
		About:    dto.About,
		Role:     model.Role(2),
		Password: hashedPassword,
		BaseModel: model.BaseModel{
			CreatedAt: time.Now().Format(time.RFC3339),
			UpdatedAt: time.Now().Format(time.RFC3339),
			IsDeleted: false,
		},
	}

	return newUser
}