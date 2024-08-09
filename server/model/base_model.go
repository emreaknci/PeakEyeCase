package model

type BaseModel struct {
	Id        uint   `json:"id" gorm:"primarykey"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
	IsDeleted bool   `json:"isDeleted"`
}
