// source: https://mui.com/material-ui/react-app-bar/#basic-app-bar
// source: https://mui.com/material-ui/react-drawer/

import * as React from "react";
import { useTranslation } from 'next-i18next';
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
import { Button, ListItemIcon } from "@mui/material";
import router from "next/router";
import CustomDivider from "./Divider";
import { LoginContext } from "@/context/Login";
import { SearchContext } from "@/context/Search";
import {CategoryContext } from "@/context/Category";

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

export default function CategoryTopBar() {
  const { t } = useTranslation('common');
  const [open, setOpen] = React.useState(false);
  const { categories, setCategories, selectedCategory, setSelectedCategory } = React.useContext(CategoryContext);
  const loginContext = React.useContext(LoginContext);
  const { searchValue, setSearchValue, handleSearch } = React.useContext(SearchContext);
  const today = new Date();

  const toggleDrawer = (newState: boolean) => {
    setOpen(newState);
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchValue(category);
    handleSearch(category);
  }

  // TODO: link to language selector page
  const handleLanguageClick = () => {
    console.log("go to change language page");
  }

  const handleYourAccountClick = () => {
    router.push('/account');
  }

  const handleSignIn = () => {
    router.push('/login');
  }

  const handleSignOut = () => {
		loginContext.setUserName('');
		loginContext.setAccessToken('');
		loginContext.setId('');
		loginContext.setRole('');
  }

  const signInText = (loginContext.accessToken.length > 0 ? 'Sign Out' : 'Sign In');
  const signInHandler = (loginContext.accessToken.length > 0 ? handleSignOut : handleSignIn);
  const drawerListContents= [
    {
      'title': t('categoryTopbar.title.trending'), 
      'content': [categories[today.getDate() % categories.length], categories[(today.getDate() % categories.length) + 1], categories[(today.getDate() % categories.length) + 2]],
      'clickHandler': [handleCategoryClick]
    },
    {
      'title': t('categoryTopbar.title.digital-content'), 
      'content': ['Prime Video', 'Amazon Music', 'Echo & Alexa', 'Fire Tablets', 'Fire TV', 'Kindle E-readers & Books', 'Audible Books & Originals', 'Amazon Photos', 'Amazon Appstore'],
      'clickHandler': [handleCategoryClick]
    },
    {
      'title': t('categoryTopbar.title.by-department'), 
      'content': categories.slice(0, 15),
      'clickHandler': [handleCategoryClick]
    },
    {
      'title': t('categoryTopbar.title.programs'),
      'content': ['Medical Care & Pharmacy', 'Amazon Physical Stores', 'Amazon Business', 'Subscribe & Save'],
      'clickHandler': [handleCategoryClick]
    },
    {
      'title': t('categoryTopbar.title.help'),
      'content': ['Your Account', 'English', 'United States', signInText],
      'clickHandler': [handleYourAccountClick, handleLanguageClick, handleLanguageClick, signInHandler]
    },
  ]
  
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
          <Typography fontWeight='bold' fontSize='1.1rem' letterSpacing='1px' sx={{ pl:'8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>
            {t('topbar.Hello')}, {loginContext.accessToken.length > 0 ? loginContext.userName : 'sign in'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '365px', pt:1, pb:4 }} role="presentation" onClick={() => toggleDrawer(false)}>
        {drawerListContents.map((section, index) => (
          <React.Fragment key={section.title}>
            <Typography fontSize='1.13rem' fontWeight='bold' sx={{ p:'0.8rem 1.25rem 0.3rem 2.25rem', color: '#111', letterSpacing:'0.5px'}}>
              {section.title}
            </Typography>
            <List disablePadding>
              {section.content.map((text, index) => (
                <ListItem key={`${section.title}-${index}`} disablePadding>
                  <ListItemButton disableGutters sx={{ 
                      p:'0.8rem 1.25rem 0.8rem 2.25rem',
                      '&:hover': {
                        backgroundColor: '#eaeded',
                      }
                    }}
                    onClick={() => section.clickHandler[section.clickHandler.length > 1 ? index : 0](text)}
                  >
                    {section.title === t('categoryTopbar.title.help') && (text === 'English' || text === 'United States') && 
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
                        textTransform: 'capitalize'
                      }
                    }}/>
                    {section.title !== t('categoryTopbar.title.trending') && section.title !== t('categoryTopbar.title.help') && 
                      <IconButton edge="end" aria-label="delete" sx={{ p:0, m:0 }}>
                        <ArrowForwardIosIcon fontSize='small' sx={{ height:'1rem' }}/>
                      </IconButton>
                    }
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {section.title !== t('categoryTopbar.title.help') &&
              <CustomDivider sx={{ my:0.8 }} />
            }
          </React.Fragment>
        ))}
      </Box>
    </>
  );

  const CategoryButtons = (
    <Box sx={{ 
      overflowX:'auto', 
      whiteSpace:'nowrap', 
      scrollbarWidth: 'none',     // hide scrollbar for Firefox
      msOverflowStyle: 'none',    // hide scrollbar for Internet Explorer + Edge
      '&::-webkit-scrollbar': { display: 'none'}    // hide scrollbar for WebKit browsers
    }}>
      {categories.slice(0, 13).map((cat) => 
        <Button variant='text' key={cat} aria-label={`${cat}-button`} onClick={() => handleCategoryClick(cat)} 
          sx={{
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
          }}
        > 
          <Typography textTransform='capitalize' fontSize='0.88rem' border='none'>
            {cat}
          </Typography>
        </Button>
      )}
    </Box>
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
              }
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
