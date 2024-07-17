import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import UploadIcon from '@mui/icons-material/CloudUpload'; // Example icon
import LinkIcon from '@mui/icons-material/Link';
import PeopleIcon from '@mui/icons-material/People';

const DashboardCard = ({ title, description, link, Icon }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(link);
  };

  return (
    <Card
      sx={{
        width: '100%',
        mb: 2,
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: 6,
        },
        transition: 'transform 0.3s, box-shadow 0.3s',
        px: 2, // Padding left and right
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" component="div">{title}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>{description}</Typography>
        </Box>
        <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
      </CardContent>
      <CardActions>
        <Button sx={{ fontSize: 17}} component={Link} to={link}>Go to {title}</Button>
      </CardActions>
    </Card>
  );
};

const DoctorDashboard = () => {
  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={5}>
        <Typography color="primary" variant="h4" gutterBottom>Doctor Dashboard</Typography>
      </Box>
      <Box mt={2} mb={4}>
        <Typography variant="h6" gutterBottom>
          Welcome to your Dashboard!
        </Typography>
        <Typography variant="body1">
          This is your personal dashboard where you can manage all your medical documents and patient information. Use the options below to get started.
        </Typography>
      </Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sx={{ px: 2 }}> {/* Padding left and right */}
          <DashboardCard
            title="Upload PDF"
            description="Upload medical documents and reports."
            link="/upload"
            Icon={UploadIcon}
          />
        </Grid>
        <Grid item xs={12} sx={{ px: 2 }}> {/* Padding left and right */}
          <DashboardCard
            title="Link Patient"
            description="Link patients to your account."
            link="/link"
            Icon={LinkIcon}
          />
        </Grid>
        <Grid item xs={12} sx={{ px: 2 }}> {/* Padding left and right */}
          <DashboardCard
            title="Linked Patients"
            description="View patients linked to your account."
            link="/linked-patients"
            Icon={PeopleIcon}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DoctorDashboard;
