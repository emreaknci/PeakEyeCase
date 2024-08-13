import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { CommentDto } from '../../../dtos/comments/commentDto';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DialogComponent from '../../common/DialogComponent';
import CommentService from '../../../services/comment.service';

interface CommentsProps {
  comments: CommentDto[];
  setComments: any;
  isMyComments: boolean;

}

const Comments = (props: CommentsProps) => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [currentCommentId, setCurrentCommentId] = useState<number>();

  const handleDelete = async (id: number) => {
    setOpenAlert(true);
    setAlertText('Are you sure you want to delete this comment?');
    setCurrentCommentId(id);
  }
  const handleConfirm = async () => {
    if (!currentCommentId) return;

    CommentService.delete(currentCommentId).then(response => {
      props.setComments(props.comments.filter(comment => comment.id !== currentCommentId));
      setOpenAlert(false);
      setCurrentCommentId(undefined);
    });

  }

  return (
    <>
      <Grid container spacing={4}>
        {props.comments.length > 0 && props.comments.map((comment) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={comment.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', }} >
              <CardContent sx={{ flex: 1 }} >
                {!props.isMyComments &&
                  <Typography sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    variant="h6" component="div" onClick={() => { navigate(`/me/authors/${comment.authorId}`) }}>
                    {comment.authorFullName}
                  </Typography>
                }
                <Typography variant="body2" color="text.secondary">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" component="div" marginTop={2}>
                  {comment.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="inherit" onClick={() => navigate(`/blog/${comment.blogId}`)}>
                  View Blog
                </Button>
                <Button size="small" color="error" onClick={() => handleDelete(comment.id)}>
                  Delete Comment
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {props.comments.length === 0 &&
          <Grid item xs={12}>
            <Typography variant="h6" component="div" marginTop={2}>
              No comments found
            </Typography>
          </Grid>
        }


      </Grid>
      {openAlert && (
        <DialogComponent
          title='Caution'
          open={openAlert}
          handleClose={() => setOpenAlert(false)}
          handleConfirm={async () => await handleConfirm()}
          text={alertText}
        />
      )}
    </>
  )
}

export default Comments;


