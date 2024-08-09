package repository

import (
	"github.com/emreaknci/peakeyecase/server/model"
	"gorm.io/gorm"
)

type UserRepository interface {
	BaseRepository[model.User]
	GetByEmail(email string) (*model.User, error)
}

type userRepository struct {
	baseRepository[model.User]
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{
		baseRepository: baseRepository[model.User]{db: db},
	}
}

func (r *userRepository) GetByEmail(email string) (*model.User, error) {
	var user model.User

	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}
