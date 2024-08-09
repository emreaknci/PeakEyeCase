package jwt

import "github.com/golang-jwt/jwt/v5"

type TokenClaims struct {
	UserID string `json:"user"`
	Role   int `json:"role"`
	jwt.RegisteredClaims
}
