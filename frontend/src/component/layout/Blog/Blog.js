import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledBlog = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: 'rgba(231, 76, 60, 0.05)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  border: 'none',
  boxShadow: 'rgba(231, 76, 60, 0.1) 0px 8px 24px',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: '#ffffff',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: 'rgba(231, 76, 60, 0.15) 0px 48px 100px 0px',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  '& h1': {
    fontSize: '3.5rem',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    background: 'linear-gradient(45deg, #e74c3c 30%, #ff6b6b 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  '& .subtitle': {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto',
  },
}));

const ReadMoreButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: '8px 20px',
  borderRadius: '25px',
  textTransform: 'none',
  fontSize: '0.9rem',
  backgroundColor: 'rgba(231, 76, 60, 0.1)',
  color: '#e74c3c',
  '&:hover': {
    backgroundColor: '#e74c3c',
    color: '#ffffff',
  },
}));

const CategoryChip = styled(Typography)(({ theme }) => ({
  backgroundColor: 'rgba(231, 76, 60, 0.1)',
  color: '#e74c3c',
  padding: '4px 12px',
  borderRadius: '12px',
  fontWeight: 500,
  fontSize: '0.75rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
  },
}));


const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Smartphones: What to Expect in 2024",
      excerpt: "Exploring how artificial intelligence is revolutionizing smartphone technology and enhancing user experiences...",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format",
      category: "AI Technology",
      readTime: "6 min read"
    },
    {
      id: 2,
      title: "MacBook M3 Pro vs PC Workstations",
      excerpt: "A detailed comparison of Apple's latest M3 Pro chip against high-end PC workstations for professional work...",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format",
      category: "Laptops",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Gaming in 2024: Next-Gen Consoles and Hardware",
      excerpt: "What's new in gaming technology? From PS5 Pro rumors to next-gen graphics cards...",
      image: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?q=80&w=1000&auto=format",
      category: "Gaming",
      readTime: "7 min read"
    },
    {
      id: 4,
      title: "Best Wireless Earbuds for Every Budget",
      excerpt: "From premium to budget-friendly options, find the perfect wireless earbuds for your needs...",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format",
      category: "Audio",
      readTime: "5 min read"
    },
    {
      id: 5,
      title: "The Rise of Foldable Smartphones",
      excerpt: "How foldable technology is changing the smartphone landscape and what to expect next...",
      image: "https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?q=80&w=1000&auto=format",
      category: "Smartphones",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "Smart Home Essentials in 2024",
      excerpt: "The must-have smart home devices that are transforming modern living spaces...",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format",
      category: "Smart Home",
      readTime: "7 min read"
    },
    {
      id: 7,
      title: "Mechanical Keyboards: A Buyer's Guide",
      excerpt: "Everything you need to know about choosing the perfect mechanical keyboard...",
      image: "https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?q=80&w=1000&auto=format",
      category: "Peripherals",
      readTime: "5 min read"
    },
    {
      id: 8,
      title: "The Evolution of Cloud Gaming",
      excerpt: "How cloud gaming services are reshaping the future of video game consumption...",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000&auto=format",
      category: "Cloud Tech",
      readTime: "6 min read"
    },
    {
      id: 9,
      title: "Best 4K Monitors for Productivity",
      excerpt: "Top picks for professionals who need the perfect display for their work...",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format",
      category: "Monitors",
      readTime: "7 min read"
    },

  ];

  return (
    <StyledBlog>
      <Container maxWidth="lg">
        <HeroSection>
          <Typography variant="h1" component="h1">
            TechShopping Blog
          </Typography>
          <Typography className="subtitle">
            Discover the latest in technology, reviews, and expert insights on cutting-edge innovations
          </Typography>
        </HeroSection>

        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="240"
                  image={post.image}
                  alt={post.title}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CategoryChip>
                      {post.category}
                    </CategoryChip>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#e74c3c',
                        fontWeight: 500
                      }}
                    >
                      {post.readTime}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      fontSize: '1.25rem',
                      lineHeight: 1.3,
                      height: '3.25em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      color: '#333333',
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.6,
                      mb: 2,
                      height: '4.8em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      color: '#666666',
                    }}
                  >
                    {post.excerpt}
                  </Typography>
                  <ReadMoreButton
                    endIcon={<ArrowForwardIcon />}
                  >
                    Read More
                  </ReadMoreButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledBlog>
  );
};

export default Blog;