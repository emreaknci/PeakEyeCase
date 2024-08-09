package service

import (
	"strconv"

	user_dto "github.com/emreaknci/peakeyecase/server/dto/user"
	"github.com/emreaknci/peakeyecase/server/repository"
	"github.com/emreaknci/peakeyecase/server/utils/response"
	"github.com/emreaknci/peakeyecase/server/utils/security/hashing"
	"github.com/emreaknci/peakeyecase/server/utils/security/jwt"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

var validate *validator.Validate

type AuthService interface {
	SignIn(dto user_dto.SignInDto) response.CustomResponse
	SignUp(dto user_dto.SignUpDto) response.CustomResponse
}

type authService struct {
	repo repository.UserRepository
}

func NewAuthService(repo repository.UserRepository) AuthService {
	validate = validator.New()
	return &authService{repo}
}

func (a *authService) SignIn(dto user_dto.SignInDto) response.CustomResponse {
	err := validate.Struct(dto)

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

	token, err := jwt.GenerateToken(strconv.FormatUint(uint64(user.Id), 10))
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while generating token", Error: err.Error(), StatusCode: 500}
	}

	return response.CustomResponse{Status: true, Message: "Sign in successful.", Data: token, StatusCode: 200}
}

func (a *authService) SignUp(dto user_dto.SignUpDto) response.CustomResponse {

	err := validate.Struct(dto)

	if err != nil {
		return response.CustomResponse{Status: false, Message: "Validation error occurred", Error: err.Error(), StatusCode: 400}
	}

	user, err := a.repo.GetByEmail(dto.Email)

	if err != nil && err != gorm.ErrRecordNotFound {
		return response.CustomResponse{Status: false, Message: "An error occurred while checking user", Error: err.Error(), StatusCode: 500}
	}

	if user != nil {
		return response.CustomResponse{Status: false, Message: "This email is already in use.", StatusCode: 409}
	}

	hashedPassword, err := hashing.HashPassword(dto.Password)
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while hashing password", Error: err.Error(), StatusCode: 500}
	}

	newUser := dto.MapToModel(hashedPassword)

	createdUser, err := a.repo.Create(newUser)
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while creating user", Error: err.Error(), StatusCode: 500}
	}

	return response.CustomResponse{Status: true, Message: "User created successfully.", Data: createdUser, StatusCode: 201}
}
