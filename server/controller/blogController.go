package controller

import (
	"net/http"
	"strconv"

	blog_dto "github.com/emreaknci/peakeyecase/server/dto/blog"
	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/emreaknci/peakeyecase/server/service"
	"github.com/emreaknci/peakeyecase/server/utils/response"
	"github.com/gin-gonic/gin"
)

type BlogController interface {
	Add(c *gin.Context)
	Edit(c *gin.Context)
	Delete(c *gin.Context)
	GetById(c *gin.Context)
	GetAll(c *gin.Context)
	GetAllByAuthorId(c *gin.Context)
	GetMyBlogs(c *gin.Context)
	GetByCategoryId(c *gin.Context)
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

	authorId := GetCurrentUserId(c)
	if authorId == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	userRole := GetCurrentUserRole(c)
	if userRole == -1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User role not found"})
		return
	}

	if userRole == model.Author.Value() {
		r := b.service.IsOwnedByUser(dto.Id, uint(authorId))
		if !r.Status {
			c.JSON(http.StatusForbidden, response.CustomResponse{StatusCode: http.StatusForbidden, Message: "You are not authorized to edit this blog"})
			return
		}
	}
	
	r := b.service.Edit(dto)
	c.JSON(r.StatusCode, r)
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

func (b *blogController) GetAllByAuthorId(c *gin.Context) {
	authorIdStr := c.Param("authorId")

	authorId, err := strconv.Atoi(authorIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := b.service.GetAllByAuthorId(uint(authorId))
	c.JSON(response.StatusCode, response)
}

func (b *blogController) GetMyBlogs(c *gin.Context) {
	userId := GetCurrentUserId(c)
	if userId == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	response := b.service.GetAllByAuthorId(userId)
	c.JSON(response.StatusCode, response)
}

func (b *blogController) GetByCategoryId(c *gin.Context) {
	categoryIdStr := c.Param("id")

	categoryId, err := strconv.Atoi(categoryIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := b.service.GetAllByCategory(uint(categoryId))
	c.JSON(response.StatusCode, response)
}
