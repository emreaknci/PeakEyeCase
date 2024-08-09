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
		
		router.GET("/auth/test", middleware.Auth([]model.Role{}), func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"message": "Test route",
			})
		})
		router.GET("/auth/test1", middleware.Auth([]model.Role{model.Author}), func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"message": "Test1 route",
			})
		})
		router.GET("/auth/test2", middleware.Auth([]model.Role{model.Admin}), func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"message": "Test2 route",
			})
		})
		router.GET("/auth/test3", middleware.Auth([]model.Role{model.Author,model.Admin}), func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"message": "Test3 route",
			})
		})
	})

	if err != nil {
		panic(err)
	}
}
