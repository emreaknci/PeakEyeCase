package route

import (
	"github.com/emreaknci/peakeyecase/server/controller"
	"github.com/emreaknci/peakeyecase/server/repository"
	"github.com/emreaknci/peakeyecase/server/service"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AuthRoutes(db *gorm.DB, router *gin.Engine) {
	repo := repository.NewUserRepository(db)
	service := service.NewAuthService(repo)
	controller := controller.NewAuthController(service)

	router.POST("/auth/sign-up", controller.SignUp)
	router.POST("/auth/sign-in", controller.SignIn)
}
