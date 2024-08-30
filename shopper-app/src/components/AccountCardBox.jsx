import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PageContext } from '@/context/Page';
import { useRouter } from 'next/router';

export default function OutlinedCard({ title, list }) {
  const pageContext = React.useContext(PageContext);
  const router = useRouter();
  const handleNavigation = (page) => {
    switch (page) {
      case 'account':
        pageContext.setPage('account')
        router.push('/')
        break;
      case 'orderHistory':
        pageContext.setPage('orderHistory')
        router.push('/');
        break;
      case 'comingSoon':
        pageContext.setPage('comingSoon')
        router.push('/')
        break;
      default:
        break;
    }
  };

  const mappedOutLinks = (arr) => {
    return (
      <div>
        {
          arr.map((item, index) => (
            <div key={index} className="link-container">
              <a onClick={() => handleNavigation(item.onClick)} className='link-no-underline-blue'>
                {item.name}
              </a>
            </div>
          ))
        }
      </div>
    );
  };

  const TitleAndDescription = ({ title, description }) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0.5px' }}>
        <Typography sx={{ fontSize: 18, fontWeight: 'bold', marginBottom: 0.5 }} color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {mappedOutLinks(description)}
        </Typography>
      </Box>
    );
  };


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
      <Card sx={{
        width: 350, minHeight: 120, boxShadow: 'none', borderRadius: '12px', padding: 1, border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.2)', variant: "outlined" 
      }}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center', padding: '5px' }}> 
          <TitleAndDescription title={title} description={list} />
        </CardContent>
      </Card>
    </Box>
  );
}
