package route

import (
	"github.com/emreaknci/peakeyecase/server/controller"
	"github.com/emreaknci/peakeyecase/server/middleware"
	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func BlogRoutes(container *dig.Container, router *gin.Engine) {
	err := container.Invoke(func(blogController controller.BlogController) {
		router.POST("/blog", middleware.Auth([]model.Role{}), blogController.Add)
		router.PUT("/blog", middleware.Auth([]model.Role{}), blogController.Edit)
		router.DELETE("/blog/:id", middleware.Auth([]model.Role{model.Admin}), blogController.Delete)
		router.GET("/blog/get-by-id/:id", blogController.GetById)
		router.GET("/blog/get-by-category/:id", blogController.GetByCategoryId)
		router.GET("/blog", blogController.GetAllBySearchTerm)
		router.GET("/blog/:searchTerm", blogController.GetAllBySearchTerm)
		router.GET("/blog/my-blogs", middleware.Auth([]model.Role{}), blogController.GetMyBlogs)
		router.GET("/blog/get-all-by-author-id/:authorId", blogController.GetAllByAuthorId)
	})

	if err != nil {
		panic(err)
	}
}
