import './NavBar.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContextUser } from '../context/AuthContextUser';
import { account } from '../appwrite/appwriteConfig';


const NavBar = (props) => {
  const drawerWidth = 240;
  const navItems = ['Home', 'Novo post', 'Dashboard', 'Sobre', 'Sair', 'Context'];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userAuth, setUserAuth } = useContext(AuthContextUser)
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <span className='logo-span'>Mini <span className='strong'>BLOG</span></span>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  

  const logout = () => {
    setUserAuth(false)
    account.deleteSession('current').then(() => {
      navigate("/login")
    }, (error) => {
      console.log("nao deu certo chefia")
      setUserAuth(true)
    })
  }

  return (
    <div>
      <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
      <AppBar component="nav" className="box" sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className="o">
            <Typography
              variant="h6"
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' }, color: 'black' }}
            >
              <span className='logo-span'>Mini <span className='strong'>BLOG</span></span>
            </Typography>
          </Link>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <NavLink to="/" className="o">
              <Button sx={{ color: '#000' }}>
                Home
              </Button>
            </NavLink>
            {!userAuth && (
              <>
                <NavLink to="/login" className="o">
                  <Button sx={{ color: '#000' }}>
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/register" className="o">
                  <Button sx={{ color: '#000' }}>
                    Register
                  </Button>
                </NavLink>
              </>
            )}
            {userAuth && (
              <>
                <NavLink to="/dashboard" className="o">
                  <Button sx={{ color: '#000' }}>
                    Dashboard
                  </Button>
                </NavLink>
              </>
            )}
            <NavLink to="/about" className="o">
              <Button sx={{ color: '#000' }}>
                Sobre
              </Button>
            </NavLink>
            {userAuth && (
              <>
                <Button sx={{ color: '#000' }} onClick={logout}>
                  Sair
                </Button>
              </>
            )}
            {/* <Button sx={{ color: '#000'}} onClick={() => console.log(userAuth)}>
              Context
            </Button> */}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
    </div>
  );
}

export default NavBar