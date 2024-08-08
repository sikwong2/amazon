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

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newState: boolean) => {
    setOpen(newState);
  }

  const DrawerList = (
    <>
    <AppBar position='static'>
      <Toolbar>
        text
      </Toolbar>
    </AppBar>
      <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
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

  const CategoryButtons = (
    <>
      News
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
              mr: 1,
              '&:hover': {
                border: '1px solid white',
                borderRadius: '2px',
                // border: 'none'
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
