package service

import (
	comment_dto "github.com/emreaknci/peakeyecase/server/dto/comment"
	"github.com/emreaknci/peakeyecase/server/model"
	"github.com/emreaknci/peakeyecase/server/repository"
	"github.com/emreaknci/peakeyecase/server/utils/mapping"
	"github.com/emreaknci/peakeyecase/server/utils/response"
	"github.com/go-playground/validator/v10"
)

type CommentService interface {
	Add(dto comment_dto.CommentCreationDto) response.CustomResponse
	Delete(id uint) response.CustomResponse
	GetAllByBlogId(blogId uint) response.CustomResponse
	GetAllByAuthorId(authorId uint) response.CustomResponse
	GetAllWithDetails() response.CustomResponse
	IsOwner(userId uint, commentId uint) response.CustomResponse
}

type commentService struct {
	repo     repository.CommentRepository
	validate *validator.Validate
}

func NewCommentService(repo repository.CommentRepository, validate *validator.Validate) CommentService {
	return &commentService{repo, validate}
}

func (c *commentService) Add(dto comment_dto.CommentCreationDto) response.CustomResponse {
	err := c.validate.Struct(dto)
	if err != nil {
		return response.CustomResponse{Message: "Validation error occurred", Status: false, Error: err.Error(), StatusCode: 400}
	}

	comment := mapping.CommentCreationDtoToComment(dto)

	comment, err = c.repo.Create(comment)
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while creating comment", Status: false, Error: err.Error(), StatusCode: 500}
	}

	return response.CustomResponse{Message: "Comment created successfully", Status: true, Data: comment, StatusCode: 201}
}

func (c *commentService) Delete(id uint) response.CustomResponse {
	err := c.repo.Delete(id)
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while deleting comment", Status: false, Error: err.Error(), StatusCode: 500}
	}

	return response.CustomResponse{Message: "Comment deleted successfully", Status: true, StatusCode: 200}
}

func (c *commentService) GetAllByAuthorId(authorId uint) response.CustomResponse {
	comments, err := c.repo.GetAllByFilter(func(c model.Comment) bool {
		return c.UserId == authorId
	}, "User", "Blog")

	if err != nil {
		return response.CustomResponse{Message: "An error occurred while getting comments", Status: false, Error: err.Error(), StatusCode: 500}
	}

	if len(comments) == 0 {
		return response.CustomResponse{Message: "No comments found", Status: false, StatusCode: 404}
	}

	var commentDTOs []comment_dto.CommentDto

	for _, comment := range comments {
		commentDTOs = append(commentDTOs, mapping.CommentToCommentDto(comment))
	}

	return response.CustomResponse{Message: "Comments listed successfully", Status: true, Data: commentDTOs, StatusCode: 200}

}

func (c *commentService) GetAllByBlogId(blogId uint) response.CustomResponse {
	comments, err := c.repo.GetAllByFilter(func(c model.Comment) bool {
		return c.BlogId == blogId
	}, "User", "Blog")

	if err != nil {
		return response.CustomResponse{Message: "An error occurred while getting comments", Status: false, Error: err.Error(), StatusCode: 500}
	}

	if len(comments) == 0 {
		return response.CustomResponse{Message: "No comments found", Status: false, StatusCode: 404}
	}

	var commentDTOs []comment_dto.CommentDto

	for _, comment := range comments {
		commentDTOs = append(commentDTOs, mapping.CommentToCommentDto(comment))
	}

	return response.CustomResponse{Message: "Comments listed successfully", Status: true, Data: commentDTOs, StatusCode: 200}

}

func (c *commentService) GetAllWithDetails() response.CustomResponse {
	comments, err := c.repo.GetAllByFilter(func(c model.Comment) bool {
		return true
	}, "User", "Blog")
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while getting comments", Status: false, Error: err.Error(), StatusCode: 500}
	}

	if len(comments) == 0 {
		return response.CustomResponse{Message: "No comments found", Status: false, StatusCode: 404}
	}

	var commentDTOs []comment_dto.CommentDto

	for _, comment := range comments {
		commentDTOs = append(commentDTOs, mapping.CommentToCommentDto(comment))
	}

	return response.CustomResponse{Message: "Comments listed successfully", Status: true, Data: commentDTOs, StatusCode: 200}
}

func (c *commentService) IsOwner(userId uint, commentId uint) response.CustomResponse {
	comment, err := c.repo.GetByID(commentId)
	if err != nil {
		return response.CustomResponse{Message: "An error occurred while checking comment", Status: false, Error: err.Error(), StatusCode: 500}
	}

	if comment.UserId != userId {
		return response.CustomResponse{Message: "You are not the owner of this comment", Status: false, StatusCode: 403}
	}

	return response.CustomResponse{Message: "You are the owner of this comment", Status: true, StatusCode: 200}
}


