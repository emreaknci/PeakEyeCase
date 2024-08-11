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
		router.PUT("/user", middleware.Auth([]model.Role{}), userController.EditUser)
		router.GET("/user", middleware.Auth([]model.Role{model.Admin}), userController.GetAllUsers)
		router.GET("/user/get-by-role/:role", middleware.Auth([]model.Role{model.Admin}), userController.GetAllByRole)
		router.GET("/user/get-by-email/:email", userController.GetUserByEmail)
		router.GET("/user/get-by-id/:id", userController.GetUserById)
	})
	if err != nil {
		panic(err)
	}
}
