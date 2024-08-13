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
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Category } from "@/graphql/category/schema";
import CustomButton from "./Button";
import { Button } from "@mui/material";

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
      '& .MuiToolbar-root': {
        minHeight: '50px', 
        pr: 0, pl: 1.5,
      }
    }}>
      <Toolbar sx={{ ml:2 }}>
        <AccountCircleIcon fontSize='medium'/>
        <Typography fontWeight='bold' fontSize='1rem' sx={{ pl:'8px' }}>
          Hello, username
        </Typography>
      </Toolbar>
    </AppBar>
      <Box sx={{ width: '340px' }} role="presentation" onClick={() => toggleDrawer(false)}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
