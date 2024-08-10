package controller

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetCurrentUserId(c *gin.Context) uint {
	value, exists := c.Get("userId")
	if !exists {
		return 0
	}

	userId, err := strconv.Atoi(value.(string))
	if err != nil {
		return 0
	}

	return uint(userId)
}

func GetCurrentUserRole(c *gin.Context) int {
	value, exists := c.Get("userRole")
	if !exists {
		return -1 
	}

	userRole, ok := value.(int)
	if !ok {
		return -1 
	}

	return userRole
}


