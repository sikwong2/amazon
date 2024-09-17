import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const Image = ({ image, alt, square}) => {
  return (
    <Avatar
      alt={alt}
      src={image}
      sx={{
        width: 60,
        height: 56,
        marginRight: 2,
        borderRadius: square ? 0: '50%',
      }}
    />
  );
};

const TitleAndDescription = ({ title, description }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding:'0.5px' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 'bold', marginBottom: 0.5 }} color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2" color="#565959">
        {description}
      </Typography>
    </Box>
  );
};

export default function AccountLogoCards ({ image, alt, title, description, onClick, square }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
      <Card sx={{
        width: 350, minHeight: 120, boxShadow: 'none', borderRadius: '12px', padding: 1, border: '1px solid', 
        borderColor: 'rgba(0, 0, 0, 0.2)', variant: "outlined", cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },}}
        onClick={onClick}
        >
        <CardContent sx={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
          <Image image={image} alt={alt} square={square}/>
          <TitleAndDescription title={title} description={description} />
        </CardContent>
      </Card>
    </Box>
  );
}
