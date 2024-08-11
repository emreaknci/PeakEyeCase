package service

import (
	"strconv"
	"time"

	user_dto "github.com/emreaknci/peakeyecase/server/dto/user"
	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/emreaknci/peakeyecase/server/repository"
	"github.com/emreaknci/peakeyecase/server/utils/mapping"
	"github.com/emreaknci/peakeyecase/server/utils/response"
	"github.com/emreaknci/peakeyecase/server/utils/security/hashing"
	"github.com/emreaknci/peakeyecase/server/utils/security/jwt"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type AuthService interface {
	SignIn(dto user_dto.SignInDto) response.CustomResponse
	SignUp(dto user_dto.SignUpDto) response.CustomResponse
	AssignRole(dto user_dto.AssignRoleDto) response.CustomResponse
	ChangePassword(dto user_dto.ChangePasswordDto) response.CustomResponse
}

type authService struct {
	repo     repository.UserRepository
	validate *validator.Validate
}

func NewAuthService(repo repository.UserRepository, validate *validator.Validate) AuthService {
	return &authService{repo, validate}
}

func (a *authService) SignIn(dto user_dto.SignInDto) response.CustomResponse {
	err := a.validate.Struct(dto)

	if err != nil {
		return response.CustomResponse{Status: false, Message: "Validation error occurred", Error: err.Error(), StatusCode: 400}
	}

	user, err := a.repo.GetByEmail(dto.Email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return response.CustomResponse{Status: true, Message: "User not found.", StatusCode: 404}
		}
		return response.CustomResponse{Status: false, Message: "An error occurred while checking user", Error: err.Error(), StatusCode: 500}
	}

	if !hashing.CheckPasswordHash(dto.Password, user.Password) {
		return response.CustomResponse{Status: false, Message: "Password is incorrect.", StatusCode: 401}
	}

	token, err := jwt.GenerateToken(strconv.FormatUint(uint64(user.Id), 10), user.Role.Value())
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while generating token", Error: err.Error(), StatusCode: 500}
	}

	return response.CustomResponse{Status: true, Message: "Sign in successful.", Data: token, StatusCode: 200}
}

func (a *authService) SignUp(dto user_dto.SignUpDto) response.CustomResponse {

	err := a.validate.Struct(dto)

	if err != nil {
		return response.CustomResponse{Status: false, Message: "Validation error occurred", Error: err.Error(), StatusCode: 400}
	}

	user, err := a.repo.GetByEmail(dto.Email)

	if err != nil && err != gorm.ErrRecordNotFound {
		return response.CustomResponse{Status: false, Message: "An error occurred while checking user", Error: err.Error(), StatusCode: 500}
	}

	if user.Id != 0 {
		return response.CustomResponse{Status: false, Message: "This email is already in use.", StatusCode: 409}
	}

	hashedPassword, err := hashing.HashPassword(dto.Password)
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while hashing password", Error: err.Error(), StatusCode: 500}
	}

	newUser := mapping.SignUpDtoToUser(dto, hashedPassword)

	createdUser, err := a.repo.Create(newUser)
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while creating user", Error: err.Error(), StatusCode: 500}
	}

	return response.CustomResponse{Status: true, Message: "User created successfully.", Data: createdUser, StatusCode: 201}
}

func (a *authService) AssignRole(dto user_dto.AssignRoleDto) response.CustomResponse {
	user, err := a.repo.GetByID(dto.UserId)

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return response.CustomResponse{Status: false, Message: "User not found.", StatusCode: 404}
		}
		return response.CustomResponse{Status: false, Message: "An error occurred while checking user", Error: err.Error(), StatusCode: 500}
	}

	user.Role = model.Role(dto.Role)

	updatedUser, err := a.repo.Update(user)

	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while updating user", Error: err.Error(), StatusCode: 500}
	}

	return response.CustomResponse{Status: true, Message: "Role assigned successfully.", Data: updatedUser, StatusCode: 200}
}

func (u *authService) ChangePassword(dto user_dto.ChangePasswordDto) response.CustomResponse {
	err := u.validate.Struct(dto)
	if err != nil {
		return response.CustomResponse{Status: false, Message: "Validation error", Error: err.Error(), StatusCode: 400}
	}

	user, err := u.repo.GetByID(dto.UserId)
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while getting user", Error: err.Error(), StatusCode: 500}
	}

	if !hashing.CheckPasswordHash(dto.OldPassword, user.Password) {
		return response.CustomResponse{Status: false, Message: "Old Password is incorrect.", StatusCode: 401}
	}

	if dto.OldPassword == dto.NewPassword {
		return response.CustomResponse{Status: false, Message: "New password cannot be the same as the old password.", StatusCode: 400}
	}

	hashedPassword, err := hashing.HashPassword(dto.NewPassword)
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while hashing password", Error: err.Error(), StatusCode: 500}
	}

	user.Password = hashedPassword
	user.BaseModel.UpdatedAt = time.Now().Format(time.RFC3339)

	user, err = u.repo.Update(user)
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while updating user", Error: err.Error(), StatusCode: 500}
	}

	return response.CustomResponse{Status: true, Message: "Password updated successfully. Please login again.", StatusCode: 200}

}
