import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const StyledContact = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: 'rgba(231, 76, 60, 0.05)',
}));

const ContactCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: '16px',
  boxShadow: 'rgba(231, 76, 60, 0.1) 0px 8px 24px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: 'rgba(231, 76, 60, 0.15) 0px 48px 100px 0px',
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  '& .icon': {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    color: '#e74c3c',
    width: 45,
    height: 45,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
  },
}));

const SocialMediaCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: '16px',
  boxShadow: 'rgba(231, 76, 60, 0.1) 0px 8px 24px',
  background: 'linear-gradient(135deg, #fff 0%, rgba(231, 76, 60, 0.05) 100%)',
}));

const SocialButton = styled('a')(({ theme, platform }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '16px 24px',
  borderRadius: '12px',
  marginBottom: theme.spacing(2),
  textDecoration: 'none',
  color: '#fff',
  transition: 'all 0.3s ease',
  backgroundColor: getPlatformColor(platform),
  '&:hover': {
    transform: 'translateX(8px)',
    boxShadow: `0 5px 15px ${getPlatformColor(platform)}50`,
  },
}));

// Helper function to get platform-specific colors
function getPlatformColor(platform) {
  switch (platform) {
    case 'facebook':
      return '#1877F2';
    case 'instagram':
      return '#E4405F';
    case 'twitter':
      return '#000000';
    case 'linkedin':
      return '#0A66C2';
    case 'email':
      return '#e74c3c';  // Updated to tomato
    default:
      return '#000000';
  }
}

const Contact = () => {
  const socialLinks = [
    {
      platform: 'facebook',
      icon: <FacebookIcon />,
      label: 'Follow us on Facebook',
      url: 'https://facebook.com/yourpage',
    },
    {
      platform: 'instagram',
      icon: <InstagramIcon />,
      label: 'Follow us on Instagram',
      url: 'https://instagram.com/yourpage',
    },
    {
      platform: 'twitter',
      icon: <XIcon />,
      label: 'Follow us on X',
      url: 'https://x.com/yourpage',
    },
    {
      platform: 'linkedin',
      icon: <LinkedInIcon />,
      label: 'Connect on LinkedIn',
      url: 'https://linkedin.com/company/yourpage',
    },
    {
      platform: 'email',
      icon: <EmailIcon />,
      label: 'Email Us',
      url: 'mailto:contact@techstore.com',
    },
  ];

  return (
    <StyledContact>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '3.5rem',
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #e74c3c 30%, #ff6b6b 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Contact us
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: '#666', maxWidth: '600px', mx: 'auto' }}
          >
            Connect with us on social media or reach out through our contact information below
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Social Media Links */}
          <Grid item xs={12} md={7}>
            <SocialMediaCard>
              <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                Connect With Us
              </Typography>
              {socialLinks.map((social, index) => (
                <SocialButton
                  key={index}
                  href={social.url}
                  platform={social.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between'
                  }}>
                    <Typography sx={{ fontWeight: 500 }}>
                      {social.label}
                    </Typography>
                    {social.icon}
                  </Box>
                </SocialButton>
              ))}
            </SocialMediaCard>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <ContactCard>
              <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                Contact Information
              </Typography>

              <InfoItem>
                <IconButton className="icon">
                  <LocationOnIcon />
                </IconButton>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Our Location
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Greenwich Vietnam, 658 Ngo Quyen st, Son Tra district, Danang City
                  </Typography>
                </Box>
              </InfoItem>

              <InfoItem>
                <IconButton className="icon">
                  <PhoneIcon />
                </IconButton>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Phone Number
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +84 123 456 789
                  </Typography>
                </Box>
              </InfoItem>

              <InfoItem>
                <IconButton className="icon">
                  <AccessTimeIcon />
                </IconButton>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Working Hours
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mon - Fri: 9:00 AM - 8:00 PM
                    <br />
                    Sat - Sun: 9:00 AM - 5:00 PM
                  </Typography>
                </Box>
              </InfoItem>
            </ContactCard>
          </Grid>

          {/* Map Section */}
          <Grid item xs={12}>
            <ContactCard>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0092701978!2d108.23106621481846!3d16.082228688875345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421827a3c439f5%3A0xdec2fb897aa16a90!2sGreenwich%20Vi%E1%BB%87t%20Nam!5e0!3m2!1sen!2s!4v1711099431099!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Greenwich Vietnam location"
              />
            </ContactCard>
          </Grid>
        </Grid>
      </Container>
    </StyledContact>
  );
};

export default Contact;