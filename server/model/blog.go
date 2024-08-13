package model

type Blog struct {
	BaseModel
	Title      string   `json:"title"`
	Content    string   `json:"content"`
	CategoryID uint     `json:"categoryId"`
	Category   Category `json:"-"`
	IsHidden   bool     `json:"isHidden"`
	UserId     uint     `json:"authorId"`
	User       User     `json:"-"`
	ImageUri   string   `json:"imageUri"`
	Comments   []Comment `json:"-"`
}
