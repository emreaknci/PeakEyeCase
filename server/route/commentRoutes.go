package route

import (
	"github.com/emreaknci/peakeyecase/server/controller"
	"github.com/emreaknci/peakeyecase/server/middleware"
	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func CommentRoutes(container *dig.Container, router *gin.Engine) {
	err := container.Invoke(func(commentController controller.CommentController) {
		router.GET("/comment", commentController.GetAll)
		router.GET("/comment/get-all-by-blog-id/:id", commentController.GetAllByBlogId)
		router.GET("/comment/get-all-by-author-id/:id", commentController.GetAllByAuthorId)
		router.POST("/comment", middleware.Auth([]model.Role{}),commentController.Add)
		router.DELETE("/comment/:id", middleware.Auth([]model.Role{}), commentController.Delete)
	})
	if err != nil {
		panic(err)
	}

}
