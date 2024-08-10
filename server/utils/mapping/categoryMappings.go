package mapping

import (
	"time"

	category_dto "github.com/emreaknci/peakeyecase/server/dto/category"
	"github.com/emreaknci/peakeyecase/server/model"
)

func CategoryCreateDtoToCategory(dto category_dto.CategoryCreationDto) model.Category {
	return model.Category{
		Name: dto.Name,
		BaseModel: model.BaseModel{
			CreatedAt: time.Now().Format(time.RFC3339),
			UpdatedAt: time.Now().Format(time.RFC3339),
			IsDeleted: false,
		},
	}
}
