import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthorDetailDto } from '../../dtos/users/authorDetailDto';
import { BlogListDto } from '../../dtos/blogs/blogListDto';
import { Grid, Paper, Typography, Avatar, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import BlogList from '../../components/layouts/main/BlogList';
import BlogService from '../../services/blog.service';
import UserService from '../../services/user.service';

const AuthorPage = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState<AuthorDetailDto | null>(null);
  const [blogs, setBlogs] = useState<BlogListDto[] | null>(null);

  useEffect(() => {
    if (!id) return;

    UserService.getById(Number(id)).then(response => {
      const defaultSocialLinks: string[] = ['https://www.facebook.com/', 'https://www.twitter.com/',];
      const data = response.data.data as AuthorDetailDto;
      data.socialLinks = defaultSocialLinks
      setAuthor(data);
    });

    BlogService.getAllByAuthorId(id).then(response => {
      setBlogs(response.data.data);
    });


  }, [id]);

  return (
    <Grid justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper variant="outlined" sx={{ textAlign: 'center', px: { xl: 30, lg: 20, md: 10, sm: 5 }, py: 5, backgroundColor: "divider", borderRadius: 3 }}>
          {author && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar alt={author.fullName}
                  style={{ width: '5rem', height: '5rem', marginRight: '1rem', backgroundColor: 'primary.main' }}
                />
                <div>
                  <Typography variant="h5">{author.fullName}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">{author.jobTitle}</Typography>
                </div>
              </div>
              <Typography variant="body1" style={{ margin: '20px 0' }}>{author.about}</Typography>
              <div>
                {author.socialLinks && author.socialLinks.map((link, index) => (
                  <IconButton key={index} href={link} target="_blank" color="primary">
                    {link.includes('facebook') && <FacebookIcon color='action' />}
                    {link.includes('twitter') && <TwitterIcon color='action' />}
                  </IconButton>
                ))}
              </div>
            </>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8} md={6} pt={5}>
        <BlogList blogs={blogs || []} showLoadMoreButton={false} />
      </Grid>
    </Grid>
  );
};

export default AuthorPage;
