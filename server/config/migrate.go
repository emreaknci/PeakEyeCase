package config

import (
	"github.com/emreaknci/peakeyecase/server/model"
	"gorm.io/gorm"
)

func MigrateModels(db *gorm.DB) error {
	err := db.AutoMigrate(&model.Blog{}, &model.Category{}, &model.User{}, &model.Comment{})
	if err != nil {
		panic("Failed to auto-migrate database: " + err.Error())
	}

	return err
}
