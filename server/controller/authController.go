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

	if !response.Status {
		c.JSON(response.StatusCode, response)
		return
	}

	c.JSON(response.StatusCode, response)
}

func (a *authController) SignUp(c *gin.Context) {
	var dto user_dto.SignUpDto
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := a.service.SignUp(dto)

	if !response.Status {
		c.JSON(response.StatusCode, response)
		return
	}

	c.JSON(response.StatusCode, response)
}
