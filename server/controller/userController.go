package controller

import (
	"net/http"
	"strconv"

	"github.com/emreaknci/peakeyecase/server/service"
	"github.com/gin-gonic/gin"
)

type UserController interface {
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
