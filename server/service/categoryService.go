package service

import (
	category_dto "github.com/emreaknci/peakeyecase/server/dto/category"
	"github.com/emreaknci/peakeyecase/server/repository"
	"github.com/emreaknci/peakeyecase/server/utils/mapping"
	"github.com/emreaknci/peakeyecase/server/utils/response"
	"github.com/go-playground/validator/v10"
)

type CategoryService interface {
	Add(dto category_dto.CategoryCreationDto) response.CustomResponse
	GetAll() response.CustomResponse
	GetById(id uint) response.CustomResponse
}

type categoryService struct {
	repo     repository.CategoryRepository
	validate *validator.Validate
}

func NewCategoryService(repo repository.CategoryRepository, validate *validator.Validate) CategoryService {
	return &categoryService{repo, validate}
}

func (c *categoryService) Add(dto category_dto.CategoryCreationDto) response.CustomResponse {
	err := c.validate.Struct(dto)

	if err != nil {
		return response.CustomResponse{Status: false, Message: "Validation error occurred", Error: err.Error(), StatusCode: 400}
	}

	category := mapping.CategoryCreateDtoToCategory(dto)

	category, err = c.repo.Create(category)
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while creating category", Status: false, StatusCode: 500, Error: err.Error(), Data: nil}
	}

	return response.CustomResponse{Message: "Category created successfully", Status: true, StatusCode: 201, Data: category}
}

func (c *categoryService) GetAll() response.CustomResponse {
	categories, err := c.repo.GetAll()
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while getting categories", Status: false, StatusCode: 500, Error: err.Error(), Data: nil}
	}

	return response.CustomResponse{Message: "Categories fetched successfully", Status: true, StatusCode: 200, Data: categories}
}

func (c *categoryService) GetById(id uint) response.CustomResponse {
	category, err := c.repo.GetByID(id)
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while getting category", Status: false, StatusCode: 500, Error: err.Error(), Data: nil}
	}

	return response.CustomResponse{Message: "Category fetched successfully", Status: true, StatusCode: 200, Data: category}
}
