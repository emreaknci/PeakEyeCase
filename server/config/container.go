package config

import (
	"github.com/emreaknci/peakeyecase/server/controller"
	"github.com/emreaknci/peakeyecase/server/repository"
	"github.com/emreaknci/peakeyecase/server/service"
	"github.com/go-playground/validator/v10"

	"go.uber.org/dig"
	"gorm.io/gorm"
)

var validate = validator.New()

func AddService(db *gorm.DB) *dig.Container {
	container := dig.New()

	err := container.Provide(func() *gorm.DB {
		return db
	})
	if err != nil {
		panic(err)
	}
	validate = validator.New()

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
		return service.NewAuthService(repo, validate)
	})
	if err != nil {
		panic(err)
	}

	err = container.Provide(func(repo repository.UserRepository) service.UserService {
		return service.NewUserService(repo, validate)
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

	err = container.Provide(func(userService service.UserService) controller.UserController {
		return controller.NewUserController(userService)
	})
	if err != nil {
		panic(err)
	}

}
