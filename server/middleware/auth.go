package middleware

import (
	"net/http"

	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/emreaknci/peakeyecase/server/utils/response"
	"github.com/emreaknci/peakeyecase/server/utils/security/jwt"
	"github.com/gin-gonic/gin"
)

func Auth(requiredRoles []model.Role) gin.HandlerFunc {
	return func(c *gin.Context) {

		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(http.StatusUnauthorized, response.CustomResponse{Message: "Authorization header is required", Error: "Unauthorized", StatusCode: http.StatusUnauthorized})
			c.Abort()
			return
		}

		token = token[7:] // Remove "Bearer " prefix
		if token == "" {
			c.JSON(http.StatusUnauthorized, response.CustomResponse{Message: "Authorization token is required", Error: "Unauthorized", StatusCode: http.StatusUnauthorized})
			c.Abort()
			return
		}

		claims, err := jwt.ValidateToken(token)

		if err != nil {
			c.JSON(http.StatusUnauthorized, response.CustomResponse{Message: "Invalid token", Error: "Unauthorized", StatusCode: http.StatusUnauthorized})
			c.Abort()
			return
		}

		if len(requiredRoles) > 0 {
			hasRole := false
			for _, role := range requiredRoles {
				if claims.Role == role.Value() {
					hasRole = true
					break
				}
			}

			if !hasRole {
				c.JSON(http.StatusForbidden, response.CustomResponse{Message: "You do not have permission to access this resource", Error: "Forbidden", StatusCode: http.StatusForbidden})
				c.Abort()
				return
			}
		}

		c.Set("userId", claims.UserID)
		c.Set("userRole", claims.Role)

		c.Next()
	}
}
