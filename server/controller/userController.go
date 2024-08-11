package controller

import (
	"net/http"
	"strconv"

	user_dto "github.com/emreaknci/peakeyecase/server/dto/user"
	"github.com/emreaknci/peakeyecase/server/service"
	"github.com/gin-gonic/gin"
)

type UserController interface {
	EditUser(c *gin.Context)
	GetUserById(c *gin.Context)
	GetUserByEmail(c *gin.Context)
	GetAllUsers(c *gin.Context)
	GetAllByRole(c *gin.Context)
}

type userController struct {
	service service.UserService
}

func NewUserController(service service.UserService) UserController {
	return &userController{service}
}

func (u *userController) EditUser(c *gin.Context) {
	var userDto user_dto.UserEditDto
	if err := c.ShouldBindJSON(&userDto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}


	userId := GetCurrentUserId(c)
	if userId == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	userDto.Id = userId
	
	response := u.service.Edit(userDto)
	if !response.Status {
		c.JSON(response.StatusCode, response)
		return
	}

	c.JSON(response.StatusCode, response)
}

func (u *userController) GetAllByRole(c *gin.Context) {
	roleStr := c.Param("role")

	if err := c.ShouldBindQuery(&roleStr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	role, err := strconv.Atoi(roleStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := u.service.GetAllByRole(role)
	if !response.Status {
		c.JSON(response.StatusCode, response)
		return
	}

	c.JSON(response.StatusCode, response)
}

func (u *userController) GetAllUsers(c *gin.Context) {
	response := u.service.GetAllUsers()
	if !response.Status {
		c.JSON(response.StatusCode, response)
		return
	}

	c.JSON(response.StatusCode, response)
}

func (u *userController) GetUserByEmail(c *gin.Context) {
	email:= c.Param("email")

	if err := c.ShouldBindQuery(&email); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := u.service.GetUserByEmail(email)
	if !response.Status {
		c.JSON(response.StatusCode, response)
		return
	}

	c.JSON(response.StatusCode, response)
}

func (u *userController) GetUserById(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.ParseInt(idStr,10,64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}


	response := u.service.GetUserById(uint(id))
	if !response.Status {
		c.JSON(response.StatusCode, response)
		return
	}

	c.JSON(response.StatusCode, response)
}
