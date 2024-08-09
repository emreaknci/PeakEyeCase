package model

type Category struct {
	BaseModel
	Name  string `json:"name"`
	Blogs []Blog `json:"-"`
}
