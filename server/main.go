package main

import (
	"log"
	"path/filepath"

	"github.com/emreaknci/peakeyecase/server/config"
	"github.com/emreaknci/peakeyecase/server/route"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	loadEnv()

	db, err := config.NewDatabase()
	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	err = config.MigrateModels(db)
	if err != nil {
		panic("Failed to migrate models: " + err.Error())
	}

	router := gin.Default()

	router.Static("/images", "./uploads")

	container := config.RegisterServices(db)
	route.RegisterRoutes(container, router)

	router.Run(":8080")
}

func loadEnv() {
	err := godotenv.Load(filepath.Join("./", ".env"))
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
