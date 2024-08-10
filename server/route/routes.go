package route

import (
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func RegisterRoutes(container *dig.Container, router *gin.Engine) {
	AuthRoutes(container, router)
	UserRoutes(container, router)
	BlogRoutes(container, router)
	CategoryRoutes(container, router)
	CommentRoutes(container, router)
}
