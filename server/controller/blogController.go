package controller

import (
	"net/http"
	"strconv"

	blog_dto "github.com/emreaknci/peakeyecase/server/dto/blog"
	"github.com/emreaknci/peakeyecase/server/service"
	"github.com/gin-gonic/gin"
)

type BlogController interface {
	Add(c *gin.Context)
	Edit(c *gin.Context)
	Delete(c *gin.Context)
	GetById(c *gin.Context)
	GetAll(c *gin.Context)
}

type blogController struct {
	service service.BlogService
}

func NewBlogController(service service.BlogService) BlogController {
	return &blogController{service}
}

func (b *blogController) Add(c *gin.Context) {
	categoryIdStr := c.PostForm("categoryId")
	authorIdStr := c.PostForm("authorId")
	image, err := c.FormFile("image")

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	categoryId, err := strconv.Atoi(categoryIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	authorId, err := strconv.Atoi(authorIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dto := blog_dto.BlogCreationDto{
		Title:      c.PostForm("title"),
		Content:    c.PostForm("content"),
		CategoryId: uint(categoryId),
		AuthorId:   uint(authorId),
		Image:      image,
	}

	response := b.service.Add(dto)

	c.JSON(response.StatusCode, response)
}

func (b *blogController) Delete(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := b.service.Delete(uint(id))
	c.JSON(response.StatusCode, response)
}

func (b *blogController) Edit(c *gin.Context) {
	var dto blog_dto.BlogEditDto
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := b.service.Edit(dto)
	c.JSON(response.StatusCode, response)
}

func (b *blogController) GetAll(c *gin.Context) {
	response := b.service.GetAll()
	c.JSON(response.StatusCode, response)
}

func (b *blogController) GetById(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := b.service.GetById(uint(id))
	c.JSON(response.StatusCode, response)
}
