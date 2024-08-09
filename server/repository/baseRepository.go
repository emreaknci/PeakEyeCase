package repository

import "gorm.io/gorm"

type BaseRepository[T any] interface {
	GetAll() ([]T, error)
	GetByID(id uint) (T, error)
	GetByFilter(filter func(T) bool) (T, error)
	GetAllByFilter(filter func(T) bool) ([]T, error)

	Create(entity T) (T, error)
	Update(entity T) (T, error)
	Delete(id uint) error
}

type baseRepository[T any] struct {
	db *gorm.DB
}

func NewBaseRepository[T any](db *gorm.DB) BaseRepository[T] {
	return &baseRepository[T]{db}
}

func (b *baseRepository[T]) Create(entity T) (T, error) {
	result := b.db.Create(&entity)
	return entity, result.Error
}

func (b *baseRepository[T]) Delete(id uint) error {
	var entity T
	result := b.db.Delete(&entity, id)
	return result.Error
}

func (b *baseRepository[T]) GetAll() ([]T, error) {
	var entities []T
	result := b.db.Find(&entities)
	return entities, result.Error
}

func (b *baseRepository[T]) GetByID(id uint) (T, error) {
	var entity T
	result := b.db.First(&entity, id)
	return entity, result.Error
}

func (b *baseRepository[T]) Update(entity T) (T, error) {
	result := b.db.Save(&entity)
	return entity, result.Error
}

func (b *baseRepository[T]) GetAllByFilter(filter func(T) bool) ([]T, error) {
	var entities []T
	result := b.db.Find(&entities)
	if result.Error != nil {
		return nil, result.Error
	}

	var filteredEntities []T
	for _, entity := range entities {
		if filter(entity) {
			filteredEntities = append(filteredEntities, entity)
		}
	}

	return filteredEntities, nil
}

func (b *baseRepository[T]) GetByFilter(filter func(T) bool) (T, error) {
	var entities []T
	result := b.db.Find(&entities)
	if result.Error != nil {
		var zero T
		return zero, result.Error
	}

	for _, entity := range entities {
		if filter(entity) {
			return entity, nil
		}
	}

	var zero T
	return zero, gorm.ErrRecordNotFound
}

