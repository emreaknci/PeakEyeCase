package repository

import (
	"github.com/emreaknci/peakeyecase/server/model"
	"gorm.io/gorm"
)
type CommentRepository interface {
	BaseRepository[model.Comment]
	GetAllByBlogId(blogId uint) ([]model.Comment, error)
}

type commentRepository struct {
	baseRepository[model.Comment]
}

func NewCommentRepository(db *gorm.DB) CommentRepository {
	return &commentRepository{
		baseRepository: baseRepository[model.Comment]{db: db},
	}
}

func (r *commentRepository) GetAllByBlogId(blogId uint) ([]model.Comment, error) {
	var comments []model.Comment

	if err := r.db.Where("blog_id = ?", blogId).Find(&comments).Error; err != nil {
		return nil, err
	}

	return comments, nil
}