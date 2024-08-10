package main

import (
	"log"
	"path/filepath"

	"github.com/emreaknci/peakeyecase/server/config"
	"github.com/emreaknci/peakeyecase/server/route"
	"github.com/gin-contrib/cors"
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

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // React app
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

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
