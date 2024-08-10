package controller

import (
	"net/http"
	"strconv"

	comment_dto "github.com/emreaknci/peakeyecase/server/dto/comment"
	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/emreaknci/peakeyecase/server/service"
	"github.com/gin-gonic/gin"
)

type CommentController interface {
	Add(c *gin.Context)
	Delete(c *gin.Context)
	GetAllByBlogId(c *gin.Context)
	GetAllByAuthorId(c *gin.Context)
	GetAll(c *gin.Context)
}

type commentController struct {
	service service.CommentService
}

func NewCommentController(service service.CommentService) CommentController {
	return &commentController{service}
}

func (controller *commentController) Add(c *gin.Context) {
	var dto comment_dto.CommentCreationDto
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId := GetCurrentUserId(c)
	if userId == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	dto.AuthorId = userId
	response := controller.service.Add(dto)
	c.JSON(response.StatusCode, response)
}

func (controller *commentController) Delete(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userRole := GetCurrentUserRole(c)
	if userRole == -1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User role not found"})
		return
	}

	if userRole == model.Admin.Value() {
		response := controller.service.Delete(uint(id))
		c.JSON(response.StatusCode, response)
		return
	}

	authorId := GetCurrentUserId(c)
	if authorId == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	response := controller.service.IsOwner(authorId, uint(id))
	if !response.Status {
		c.JSON(http.StatusForbidden, response)
		return
	}

	response = controller.service.Delete(uint(id))
	c.JSON(response.StatusCode, response)
}

func (controller *commentController) GetAll(c *gin.Context) {
	response := controller.service.GetAllWithDetails()
	c.JSON(response.StatusCode, response)
}

func (controller *commentController) GetAllByAuthorId(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := controller.service.GetAllByAuthorId(uint(id))
	c.JSON(response.StatusCode, response)
}

func (controller *commentController) GetAllByBlogId(c *gin.Context) {
	idStr := c.Param("id")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response := controller.service.GetAllByBlogId(uint(id))
	c.JSON(response.StatusCode, response)
}
