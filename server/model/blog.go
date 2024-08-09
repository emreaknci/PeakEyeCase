package model

type Blog struct {
	BaseModel
	Title      string   `json:"title"`
	Content    string   `json:"content"`
	CategoryID uint     `json:"categoryId"`
	Category   Category `json:"category"`
}
