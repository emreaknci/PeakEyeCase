package config

import (
	"errors"
	"fmt"
	"time"

	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/emreaknci/peakeyecase/server/utils/helpers"
	"github.com/emreaknci/peakeyecase/server/utils/security/hashing"
	"gorm.io/gorm"
)

func MigrateModels(db *gorm.DB) error {
	err := db.AutoMigrate(&model.Blog{}, &model.Category{}, &model.User{}, &model.Comment{})
	if err != nil {
		panic("Failed to auto-migrate database: " + err.Error())
	}

	err = userSeeds(db)
	if err != nil {
		panic("Failed to seed users: " + err.Error())
	}

	err = categorySeeds(db)
	if err != nil {
		panic("Failed to seed categories: " + err.Error())
	}

	err = blogSeeds(db)
	if err != nil {
		panic("Failed to seed blogs: " + err.Error())
	}

	return err
}

func userSeeds(db *gorm.DB) error {
	var count int64
	db.Model(&model.User{}).Count(&count)
	if count > 0 {
		return nil
	}

	hashedPassword, err := hashing.HashPassword("123456")
	if err != nil {
		return err
	}

	admin1 := model.User{
		BaseModel: model.BaseModel{CreatedAt: time.Now().Format(time.RFC3339), UpdatedAt: time.Now().Format(time.RFC3339), IsDeleted: false},
		FullName:  "Admin",
		JobTitle:  "Software Developer",
		Email:     "admin@admin.com",
		About:     "I am the admin of this blog.",
		Role:      model.Admin,
		Password:  hashedPassword,
		Blogs:     []model.Blog{},
	}

	author1 := model.User{
		BaseModel: model.BaseModel{CreatedAt: time.Now().Format(time.RFC3339), UpdatedAt: time.Now().Format(time.RFC3339), IsDeleted: false},
		FullName:  "Emre Akinci",
		JobTitle:  "Software Developer",
		Email:     "emreakinci@gmail.com",
		About:     "I am interested in web development.",
		Role:      model.Author,
		Password:  hashedPassword,
		Blogs:     []model.Blog{},
	}

	author2 := model.User{
		BaseModel: model.BaseModel{CreatedAt: time.Now().Format(time.RFC3339), UpdatedAt: time.Now().Format(time.RFC3339), IsDeleted: false},
		FullName:  "Ali Veli",
		JobTitle:  "Software Developer",
		Email:     "aliveli@gmail.com",
		About:     "I am interested in web development.",
		Role:      model.Author,
		Password:  hashedPassword,
		Blogs:     []model.Blog{},
	}

	users := []model.User{admin1, author1, author2}

	for _, user := range users {
		err := db.Create(&user).Error
		if err != nil {
			return err
		}
	}

	return nil
}

func categorySeeds(db *gorm.DB) error {
	var count int64
	db.Model(&model.Category{}).Count(&count)
	if count > 0 {
		return nil
	}


	categoryNames := []string{
		"Programming",
		"Web Development",
		"Cyber Security",
		"Mobile Development",
		"DevOps",
		"Cloud Computing",
		"Machine Learning",
		"Data Science",
	}

	for _, category := range categoryNames {
		category := model.Category{
			BaseModel: model.BaseModel{CreatedAt: time.Now().Format(time.RFC3339), UpdatedAt: time.Now().Format(time.RFC3339), IsDeleted: false},
			Name:      category,
			Blogs:     []model.Blog{},
		}

		err := db.Create(&category).Error
		if err != nil {
			return err
		}

	}

	return nil
}

func blogSeeds(db *gorm.DB) error {
	var count int64
	db.Model(&model.Blog{}).Count(&count)
	if count > 0 {
		return nil
	}

	fmt.Println("Seeding blogs...")


	blogContent := `<p> <span style="font-size: 18px;">Lorem Ipsum Dolor Sit Amet</span> </p> <p> <br> </p> <p>Lorem ipsum dolor sit amet, <a href="https://example.com" target="_blank">consectetur adipiscing</a> elit. Vivamus <a href="https://example.com" target="_blank">commodo</a> tortor id risus feugiat, vel <a href="https://example.com" target="_blank">auctor</a> est facilisis. Curabitur <a href="https://example.com" target="_blank">consectetur</a> magna non felis.</p> <p> <br> </p> <ul> <li>Lorem ipsum dolor sit amet</li> <li>Consectetur adipiscing elit</li> <li>Vivamus commodo tortor id risus</li> <li>Curabitur consectetur magna non felis</li> </ul> <p> <br> </p> <p> <span style="font-size: 18px;">Lorem Ipsum Dolor</span> </p> <p> <br> </p> <ul> <li> <a href="https://example.com" target="_blank">Lorem Ipsum</a>, dolor sit amet consectetur adipiscing elit</li> <li> <a href="https://example.com" target="_blank">Vivamus Commodo</a>, tortor id risus feugiat</li> </ul>`

	imagePaths := []string{
		"./seedDataUploads/blog1.jpg",
		"./seedDataUploads/blog2.jpg",
		"./seedDataUploads/blog3.png",
		"./seedDataUploads/blog4.png",
		"./seedDataUploads/blog5.jpg",
		"./seedDataUploads/blog6.jpeg",
	}

	for i := 1; i <= 6; i++ {
		response := helpers.SaveFileFromPath(imagePaths[i-1], "./uploads")
		if !response.Status {
			fmt.Println(response.Message)
			return errors.New(response.Error)
		}

		blog := model.Blog{
			BaseModel:  model.BaseModel{CreatedAt: time.Now().Format(time.RFC3339), UpdatedAt: time.Now().Format(time.RFC3339), IsDeleted: false},
			Title:      fmt.Sprintf("Blog Title %d", i),
			Content:    blogContent,
			UserId:     uint(i% 2 + 2),
			CategoryID: uint(i),
			Category:  model.Category{},
			IsHidden:   false,
			Comments:   []model.Comment{},
			ImageUri:   response.Data.(string),
		}

		err := db.Create(&blog).Error
		if err != nil {
			return err
		}
	}

	return nil
}
