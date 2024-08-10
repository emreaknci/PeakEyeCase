package category_dto

type CategoryCreationDto struct {
	Name string `json:"name" validate:"required"`
}