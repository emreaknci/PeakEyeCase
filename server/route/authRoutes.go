package route

import (
	"github.com/emreaknci/peakeyecase/server/controller"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func AuthRoutes(container *dig.Container, router *gin.Engine) {
	err := container.Invoke(func(authController controller.AuthController) {
		router.POST("/auth/sign-up", authController.SignUp)
		router.POST("/auth/sign-in", authController.SignIn)
	})

	if err != nil {
		panic(err)
	}
}
