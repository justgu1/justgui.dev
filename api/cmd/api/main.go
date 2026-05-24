package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	appEnv := os.Getenv("APP_ENV")

	if appEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	port := os.Getenv("APP_PORT")

	if port == "" {
		port = "8080"
	}

	router := gin.Default()

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	api := router.Group("/api")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	router.Run(":" + port)
}