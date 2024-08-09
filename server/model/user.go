package model

type User struct {
	BaseModel
	FullName string  `json:"fullName"`
	JobTitle string  `json:"jobTitle"`
	Email    string  `json:"email" gorm:"unique" validate:"email"`
	About    *string `json:"about" gorm:"type:text;default:null"`
	Role     Role    `json:"role"`
	Blogs    []Blog  `json:"-"`
}
