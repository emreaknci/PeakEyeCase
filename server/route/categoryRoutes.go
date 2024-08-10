package route

import (
	"github.com/emreaknci/peakeyecase/server/controller"
	"github.com/emreaknci/peakeyecase/server/middleware"
	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func CategoryRoutes(container *dig.Container, router *gin.Engine) {
	err := container.Invoke(func(categoryController controller.CategoryController) {
		router.POST("/category", middleware.Auth([]model.Role{model.Admin,model.Author}), categoryController.CreateCategory)
		router.GET("/category", categoryController.GetAllCategories)
		router.GET("/category/:id", categoryController.GetById)
	})

	if err != nil {
		panic(err)
	}

}
