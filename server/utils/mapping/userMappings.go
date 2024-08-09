package mapping

import (
	"time"

	user_dto "github.com/emreaknci/peakeyecase/server/dto/user"
	"github.com/emreaknci/peakeyecase/server/model"
)

func UserToUserDto(user model.User) user_dto.UserDto {
	return user_dto.UserDto{
		Id:       user.Id,
		FullName: user.FullName,
		JobTitle: user.JobTitle,
		Email:    user.Email,
		About:    user.About,
		Role:     user.Role.Value(),
	}
}

func SignUpDtoToUser(dto user_dto.SignUpDto, hashedPassword string) model.User {
	return model.User{
		FullName: dto.FullName,
		JobTitle: dto.JobTitle,
		Email:    dto.Email,
		About:    dto.About,
		Role:     model.Role(2),
		Password: hashedPassword,
		BaseModel: model.BaseModel{
			CreatedAt: time.Now().Format(time.RFC3339),
			UpdatedAt: time.Now().Format(time.RFC3339),
			IsDeleted: false,
		},
	}
}
