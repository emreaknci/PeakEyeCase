package config

import (
	"github.com/emreaknci/peakeyecase/server/controller"
	"github.com/emreaknci/peakeyecase/server/repository"
	"github.com/emreaknci/peakeyecase/server/service"
	"github.com/go-playground/validator/v10"

	"go.uber.org/dig"
	"gorm.io/gorm"
)

func RegisterServices(db *gorm.DB) *dig.Container {
	container := dig.New()

	err := container.Provide(func() *gorm.DB {
		return db
	})
	if err != nil {
		panic(err)
	}

	err = container.Provide(func() *validator.Validate {
		return validator.New()
	})
	if err != nil {
		panic(err)
	}

	registerUserAndAuthServices(container)
	registerBlogServices(container)

	return container
}

func registerUserAndAuthServices(container *dig.Container) {

	err := container.Provide(func(db *gorm.DB) repository.UserRepository {
		return repository.NewUserRepository(db)
	})
	if err != nil {
		panic(err)
	}

	err = container.Provide(func(repo repository.UserRepository, validate *validator.Validate) service.AuthService {
		return service.NewAuthService(repo, validate)
	})
	if err != nil {
		panic(err)
	}

	err = container.Provide(func(repo repository.UserRepository, validate *validator.Validate) service.UserService {
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

func registerBlogServices(container *dig.Container) {

	err := container.Provide(func(db *gorm.DB) repository.BlogRepository {
		return repository.NewBlogRepository(db)
	})
	if err != nil {
		panic(err)
	}

	err = container.Provide(func(repo repository.BlogRepository, validate *validator.Validate) service.BlogService {
		return service.NewBlogService(repo, validate)
	})
	if err != nil {
		panic(err)
	}

	err = container.Provide(func(blogService service.BlogService) controller.BlogController {
		return controller.NewBlogController(blogService)
	})
	if err != nil {
		panic(err)
	}

}
