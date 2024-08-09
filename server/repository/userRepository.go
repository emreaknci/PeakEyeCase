package repository

import (
	"github.com/emreaknci/peakeyecase/server/model"
	"gorm.io/gorm"
)

type UserRepository interface {
	BaseRepository[model.User]
}

type userRepository struct {
	baseRepository[model.User]
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{
		baseRepository: baseRepository[model.User]{db: db},
	}
}
