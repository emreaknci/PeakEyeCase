package repository

import (
	"github.com/emreaknci/peakeyecase/server/model"
	"gorm.io/gorm"
)

type BlogRepository interface {
	BaseRepository[model.Blog]
	GetByTitle(title string) (model.Blog, error)
	GetDetailById(id uint) (model.Blog, error)
}

type blogRepository struct {
	baseRepository[model.Blog]
}

func NewBlogRepository(db *gorm.DB) BlogRepository {
	return &blogRepository{
		baseRepository: baseRepository[model.Blog]{db: db},
	}
}

func (r *blogRepository) GetByTitle(title string) (model.Blog, error) {
	var blog model.Blog

	if err := r.db.Where("title = ?", title).First(&blog).Error; err != nil {
		return model.Blog{}, err
	}

	return blog, nil
}

func (r *blogRepository) GetDetailById(id uint) (model.Blog, error) {
	var blog model.Blog

	if err := r.db.Preload("Category").Preload("User").First(&blog, id).Error; err != nil {
		return model.Blog{}, err
	}

	return blog, nil
}
