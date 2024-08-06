import { Box, Container, Grid, Link, Typography, Divider, TextField, Button, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';

const FooterContainer = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4, 0),
  marginTop: theme.spacing(8),
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2)
}));

const FooterDivider = styled(Divider)(({ theme }) => ({
  marginBottom: 10,
  marginTop: 10
}));

const FooterLink = styled(Link)(({ theme }) => ({
  display: 'block',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary
  }
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio.
              </Typography>
              <br />
              <Typography variant="body2">
                <b>Email: </b> johndoe@peakeye.com
              </Typography>
              <Typography variant="body2">
                <b>Phone: </b> +123 456 7890
              </Typography>
            </FooterSection>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <FooterSection>
                  <Typography variant="h6" gutterBottom>
                    Quick Link
                  </Typography>
                  <FooterLink href="#">Home</FooterLink>
                  <FooterLink href="#">About</FooterLink>
                  <FooterLink href="#">Contact</FooterLink>
                  <FooterLink href="#">Blog</FooterLink>


                </FooterSection>
              </Grid>
              <Grid item xs={6}>
                <FooterSection>
                  <Typography variant="h6" gutterBottom>
                    Category
                  </Typography>
                  <FooterLink href="#">Technology</FooterLink>
                  <FooterLink href="#">Finance</FooterLink>
                  <FooterLink href="#">Health</FooterLink>
                  <FooterLink href="#">Travel</FooterLink>
                </FooterSection>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <FooterSection sx={{
              backgroundColor: 'divider',
              px: 5, py: 3, borderRadius: 3
            }}>
              <Typography variant="h6" gutterBottom align='center'
                fontWeight={600} >
                Weekly Newsletter
              </Typography>
              <Typography variant="body2" gutterBottom>
                Get blog articles and offers via email
              </Typography>
              <TextField variant="standard"
                placeholder="Your Email" size="small"
                fullWidth sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" fullWidth sx={{
                bgcolor: "blue", color: "white",
                '&:hover': { bgcolor: '#0d47a1', }
              }}>
                Subscribe
              </Button>
            </FooterSection>
          </Grid>
        </Grid>

        <FooterDivider />

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <img src="logo.png" alt="logo" style={{ height: 30, marginRight: 8 }} />
              <span>PeakEye <b> Blog</b></span>
            </Typography>
          </Grid>
          <Grid item>

            <FooterLink sx={{ display: 'inline-block',mx:1 }} href="#">Terms of Use</FooterLink>
            <FooterLink sx={{ display: 'inline-block',mx:1 }} href="#">Privacy Policy</FooterLink>
            <FooterLink sx={{ display: 'inline-block',mx:1 }} href="#">Cookie Policy</FooterLink>

          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
