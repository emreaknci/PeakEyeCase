package repository

import (
	"github.com/emreaknci/peakeyecase/server/model"
	"gorm.io/gorm"
)

type CategoryRepository interface {
	BaseRepository[model.Category]
}

type categoryRepository struct {
	baseRepository[model.Category]
}

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryRepository{
		baseRepository: baseRepository[model.Category]{db: db},
	}
}
