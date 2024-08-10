package controller

import (
	"net/http"
	"strconv"

	category_dto "github.com/emreaknci/peakeyecase/server/dto/category"
	"github.com/emreaknci/peakeyecase/server/service"
	"github.com/gin-gonic/gin"
)

type CategoryController interface {
	CreateCategory(c *gin.Context)
	GetAllCategories(c *gin.Context)
	GetById(c *gin.Context)
}

type categoryController struct {
	service service.CategoryService
}

func NewCategoryController(service service.CategoryService) CategoryController {
	return &categoryController{service}
}

func (controller *categoryController) CreateCategory(c *gin.Context) {
	var dto category_dto.CategoryCreationDto
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := controller.service.Add(dto)

	c.JSON(response.StatusCode, response)
}

func (controller *categoryController) GetAllCategories(c *gin.Context) {
	response := controller.service.GetAll()

	c.JSON(response.StatusCode, response)
}

func (controller *categoryController) GetById(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.ParseInt(idStr,10,64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := controller.service.GetById(uint(id))

	c.JSON(response.StatusCode, response)
}
