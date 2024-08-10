package user_dto

type AssignRoleDto struct {
	UserId uint `json:"userId" validate:"required"`
	Role   int  `json:"role" validate:"required"`
}
