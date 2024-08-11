package controller

import (
	"net/http"

	user_dto "github.com/emreaknci/peakeyecase/server/dto/user"
	"github.com/emreaknci/peakeyecase/server/service"
	"github.com/gin-gonic/gin"
)

type AuthController interface {
	SignIn(c *gin.Context)
	SignUp(c *gin.Context)
	AssignRole(c *gin.Context)
	ChangePassword(c *gin.Context)
}

type authController struct {
	service service.AuthService
}

func NewAuthController(service service.AuthService) AuthController {
	return &authController{service}
}

func (a *authController) SignIn(c *gin.Context) {
	var dto user_dto.SignInDto
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := a.service.SignIn(dto)
	c.JSON(response.StatusCode, response)
}

func (a *authController) SignUp(c *gin.Context) {
	var dto user_dto.SignUpDto
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := a.service.SignUp(dto)
	c.JSON(response.StatusCode, response)
}

func (a *authController) AssignRole(c *gin.Context) {
	var dto user_dto.AssignRoleDto
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := a.service.AssignRole(dto)
	c.JSON(response.StatusCode, response)
}

func (a *authController) ChangePassword(c *gin.Context) {
	var dto user_dto.ChangePasswordDto
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId := GetCurrentUserId(c)
	if userId == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	dto.UserId = userId

	response := a.service.ChangePassword(dto)
	c.JSON(response.StatusCode, response)
}
