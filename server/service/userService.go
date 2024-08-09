package service

import (
	user_dto "github.com/emreaknci/peakeyecase/server/dto/user"
	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/emreaknci/peakeyecase/server/repository"
	"github.com/emreaknci/peakeyecase/server/utils/mapping"
	"github.com/emreaknci/peakeyecase/server/utils/response"
	"github.com/go-playground/validator/v10"
)

type UserService interface {
	GetUserById(id uint) response.CustomResponse
	GetUserByEmail(email string) response.CustomResponse
	GetAllUsers() response.CustomResponse
	GetAllByRole(role int) response.CustomResponse
}

type userService struct {
	repo     repository.UserRepository
	validate *validator.Validate
}

func NewUserService(repo repository.UserRepository, validate *validator.Validate) UserService {
	return &userService{repo, validate}
}

func (u *userService) GetAllUsers() response.CustomResponse {
	users, err := u.repo.GetAll()
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while getting users", Error: err.Error(), StatusCode: 500}
	}

	var userDTOs []user_dto.UserDto

	for _, user := range users {
		userDTOs = append(userDTOs, mapping.UserToUserDto(user))
	}

	return response.CustomResponse{Status: true, Message: "Users listed successfully", Data: userDTOs, StatusCode: 200}
}

func (u *userService) GetUserByEmail(email string) response.CustomResponse {
	user, err := u.repo.GetByEmail(email)
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while getting user", Error: err.Error(), StatusCode: 500}
	}

	userDTO := mapping.UserToUserDto(user)

	return response.CustomResponse{Status: true, Message: "User listed successfully", Data: userDTO, StatusCode: 200}
}

func (u *userService) GetUserById(id uint) response.CustomResponse {
	user, err := u.repo.GetByID(id)
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while getting user", Error: err.Error(), StatusCode: 500}
	}

	userDTO := mapping.UserToUserDto(user)

	return response.CustomResponse{Status: true, Message: "User listed successfully", Data: userDTO, StatusCode: 200}
}

func (u *userService) GetAllByRole(role int) response.CustomResponse {
	if role < 0 || role > 2 {
		return response.CustomResponse{Status: false, Message: "Invalid role", StatusCode: 400}
	}

	users, err := u.repo.GetAllByFilter(func(u model.User) bool {
		return u.Role.Value() == role
	})
	if err != nil {
		return response.CustomResponse{Status: false, Message: "An error occurred while getting users", Error: err.Error(), StatusCode: 500}
	}

	var userDTOs []user_dto.UserDto

	for _, user := range users {
		userDTOs = append(userDTOs, mapping.UserToUserDto(user))
	}

	return response.CustomResponse{Status: true, Message: "Users listed successfully", Data: userDTOs, StatusCode: 200}
}
