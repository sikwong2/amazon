// source: https://mui.com/material-ui/react-app-bar/#basic-app-bar
// source: https://mui.com/material-ui/react-drawer/

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import { US } from 'country-flag-icons/react/3x2';
import { Category } from "@/graphql/category/schema";
import { Button, ListItemIcon } from "@mui/material";
import CustomDivider from "./Divider";

const fetchCategories = async (): Promise<string[]> => {
  try {
    const query = {
      query: `query getAllCategories {
      getAllCategories {
        name
      }
    }`,
    };
    const res = await fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    if (json.errors) {
      console.error('Error fetching categoriess: ', json.errors);
      throw new Error('Error fetching categoriess: ', json.errors);
    }
    return json.data.getAllCategories.map((cat: { name: string }) => {return cat.name});
  } catch (error) {
    console.error('Error fetching categories: ', error);
    throw error;
  }
};

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<string[]>([]);
  const drawerListContents= [
    {
      'title': 'Trending', 
      'content': ['Best Sellers', 'New Releases', 'Movers & Shakers']
    },
    {
      'title': 'Digital Content & Devices', 
      'content': ['Prime Video', 'Amazon Music', 'Echo & Alexa', 'Fire Tablets', 'Fire TV', 'Kindle E-readers & Books', 'Audible Books & Originals', 'Amazon Photos', 'Amazon Appstore']
    },
    {
      'title': 'Shop by Department', 
      'content': ['Clothing, Shoes, Jewelry & Watches', 'Amazon Fresh', 'Whole Foods Market', 'Books']
    },
    {
      'title': 'Programs & Features', 
      'content': ['Medical Care & Pharmacy', 'Amazon Physical Stores', 'Amazon Business', 'Subscribe & Save']
    },
    {
      'title': 'Help & Settings',
      'content': ['Your Account', 'English', 'United States', 'Sign Out']
    },
  ]

  const toggleDrawer = (newState: boolean) => {
    setOpen(newState);
  }

  const goToCategoryPage = (e: any) => {
    console.log("go to category page: ", e.target.innerText);
  }
  
  React.useEffect(() =>  {
    const getCategories = async () => {
      try {
        const categoriesFromDB = await fetchCategories();
        if (categoriesFromDB) {
          setCategories(categoriesFromDB);
        }
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    getCategories();
  }, []);

  const DrawerList = (
    <>
    <AppBar position='static' sx={{
      backgroundColor: '#232f3e',
      boxShadow:'none',
      '& .MuiToolbar-root': {
        minHeight: '50px', 
        pr: 0, pl: 1.5,
      }
    }}>
      <Toolbar sx={{ ml:3 }}>
        <AccountCircleIcon sx={{ fontSize:'1.8rem' }}/>
        <Typography fontWeight='bold' fontSize='1.1rem' letterSpacing='1px' sx={{ pl:'8px' }}>
          Hello, nochoy
        </Typography>
      </Toolbar>
    </AppBar>
    <Box sx={{ width: '365px', pt:1, pb:4 }} role="presentation" onClick={() => toggleDrawer(false)}>
      {drawerListContents.map((section, index) => (
        <>
          <Typography key={section.title} fontSize='1.13rem' fontWeight='bold' sx={{ p:'0.8rem 1.25rem 0.3rem 2.25rem', color: '#111', letterSpacing:'0.5px'}}>
            {section.title}
          </Typography>
          <List disablePadding>
            {section.content.map((text, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton disableGutters sx={{ 
                  p:'0.8rem 1.25rem 0.8rem 2.25rem',
                  '&:hover': {
                    backgroundColor: '#eaeded',
                  }
                }}>
                  {section.title === 'Help & Settings' && (text === 'English' || text === 'United States') && 
                    <ListItemIcon sx={{ minWidth:0, justifyContent:'center', pr:'12px' }}>
                      {text === 'English' && <LanguageIcon fontSize='small' sx={{ ml:-0.5, height:'1rem', color:'#bfbdbd' }}/>}
                      {text === 'United States' && <US style={{ height: '0.6rem' }} title="United States" />}
                    </ListItemIcon>
                  }
                  <ListItemText primary={text} sx={{ 
                    m:0,
                    '& .MuiTypography-root': {
                      fontSize:'0.88rem',
                      lineHeight:'normal',
                      color:'#111',
                    }
                  }}/>
                  {section.title !== 'Trending' && section.title !== 'Help & Settings' && 
                    <IconButton edge="end" aria-label="delete" sx={{ p:0, m:0 }}>
                      <ArrowForwardIosIcon fontSize='small' sx={{ height:'1rem' }}/>
                    </IconButton>
                  }
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {section.title !== 'Help & Settings' &&
            <CustomDivider sx={{ my:0.8 }} />
          }
        </>
      ))}
    </Box>
    </>
  );

  // TODO: add box? around categories array to create horizontal scroll on mobile view
  const CategoryButtons = (
    <>
      {categories.slice(0, 12).map((cat) => 
        <Button variant='text' aria-label={`${cat}-button`} onClick={goToCategoryPage} sx={{
          color: 'white',
          border: 'none',
          p: 1,
          height: '100%', 
          '&:hover': {
            border: '1px solid white',
            borderRadius: '2px',
            color: 'white',
            backgroundColor: 'inherit',
            p:0.9,
          },
          '&:focus': {
            color: '#ccc',
          }
        }}> 
          <Typography textTransform='capitalize' fontSize='0.88rem' border='none'>
            {cat}
          </Typography>
        </Button>
      )}
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
        sx={{	
          backgroundColor: '#232f3e', 
          height: '40px', 
          justifyContent: 'center', 
          '& .MuiToolbar-root': {
            minHeight: '40px', 
            pr: 0, pl: 1.5
          }
        }}>
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
            sx={{ 
              '&:hover': {
                border: '1px solid white',
                borderRadius: '2px',
                p: '7px',
              },

            }}
          >
            <MenuIcon /> 
            <Typography fontSize='0.88rem' sx={{ pl:'2px' }}>
              All
            </Typography>
          </IconButton>
          <Drawer open={open} onClose={() => toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          {CategoryButtons}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
