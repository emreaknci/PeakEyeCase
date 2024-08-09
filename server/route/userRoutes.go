package route

import (
	"github.com/emreaknci/peakeyecase/server/controller"
	"github.com/emreaknci/peakeyecase/server/middleware"
	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func UserRoutes(container *dig.Container, router *gin.Engine) {
	err := container.Invoke(func(userController controller.UserController) {
		router.GET("/users", middleware.Auth([]model.Role{model.Admin}), userController.GetAllUsers)
		router.GET("/users/get-by-role/:role", middleware.Auth([]model.Role{model.Admin}), userController.GetAllByRole)
		router.GET("/users/get-by-email/:email", userController.GetUserByEmail)
		router.GET("/users/get-by-id/:id", userController.GetUserById)
	})
	if err != nil {
		panic(err)
	}
}
