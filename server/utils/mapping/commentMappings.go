package mapping

import (
	"time"

	comment_dto "github.com/emreaknci/peakeyecase/server/dto/comment"
	"github.com/emreaknci/peakeyecase/server/model"
)

func CommentCreationDtoToComment(dto comment_dto.CommentCreationDto) model.Comment {
	return model.Comment{
		Content: dto.Content,
		BlogId:  dto.BlogId,
		UserId:  dto.AuthorId,
		BaseModel: model.BaseModel{
			CreatedAt: time.Now().Format(time.RFC3339),
			UpdatedAt: time.Now().Format(time.RFC3339),
			IsDeleted: false,
		},
	}
}

func CommentToCommentDto(comment model.Comment) comment_dto.CommentDto {
	return comment_dto.CommentDto{
		Id:             comment.Id,
		Content:        comment.Content,
		CreatedAt:      comment.CreatedAt,
		AuthorId:       comment.UserId,
		AuthorFullName: comment.User.FullName,
		BlogId:         comment.BlogId,
		BlogTitle:      comment.Blog.Title,
	}
}
