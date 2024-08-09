package config

import (
	"github.com/emreaknci/peakeyecase/server/controller"
	"github.com/emreaknci/peakeyecase/server/repository"
	"github.com/emreaknci/peakeyecase/server/service"
	"go.uber.org/dig"
	"gorm.io/gorm"
)

func AddService(db *gorm.DB) *dig.Container {
	container := dig.New()
	err := container.Provide(func() *gorm.DB {
        return db
    })
    if err != nil {
        panic(err)
    }

    addUserAndAuthServices(container)

	return container
}

func addUserAndAuthServices(container *dig.Container) {

    err := container.Provide(func(db *gorm.DB) repository.UserRepository {
        return repository.NewUserRepository(db)
    })
    if err != nil {
        panic(err)
    }

    err = container.Provide(func(repo repository.UserRepository) service.AuthService {
        return service.NewAuthService(repo)
    })
    if err != nil {
        panic(err)
    }

    err = container.Provide(func(authService service.AuthService) controller.AuthController {
        return controller.NewAuthController(authService)
    })
    if err != nil {
        panic(err)
    }
}
