import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { List } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem'
import CarsList from './CarsList';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [drawerOpen, setDraweropen] = React.useState(false);

    const toggleDrawer = () =>{
        setDraweropen(!drawerOpen);
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} >
            {/* <Typography variant="h6">Drawer Content</Typography> */}
            <List>
            <ListItem >
              <ListItemButton component={Link} to = "/cars-list">
                <ListItemText primary="Cars" />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton component={Link} to="/trucks-list">
                <ListItemText primary="Trucks" />
              </ListItemButton>
            </ListItem>
            </List>
        </Box>
      </Drawer>
    </Box>

  );
};

export default Navbar;
