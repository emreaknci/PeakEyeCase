package route

import (
	"github.com/emreaknci/peakeyecase/server/controller"
	"github.com/emreaknci/peakeyecase/server/middleware"
	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func AuthRoutes(container *dig.Container, router *gin.Engine) {
	err := container.Invoke(func(authController controller.AuthController) {
		router.POST("/auth/sign-up", authController.SignUp)
		router.POST("/auth/sign-in", authController.SignIn)
		router.POST("/auth/assign-role", middleware.Auth([]model.Role{model.Admin}), authController.AssignRole)

	})

	if err != nil {
		panic(err)
	}
}
