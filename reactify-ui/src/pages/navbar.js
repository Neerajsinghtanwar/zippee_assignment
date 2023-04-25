import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {userLogin} from "../store/actions/actions";
import {connect} from "react-redux";
import {useEffect} from "react";

function Navbar(props) {
  const [notify, setNotify] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  useEffect(() => {
      const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:5000/notifications');
      const responseData = await response.json();
      console.log(responseData)
      setNotify(responseData.notifications);
      setTimeout(fetchData, 5000); // Send a new request every 5 seconds
    };
    fetchData();
  },[])
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
     window.localStorage.clear();
     props.userLoginHandler({ undefined })
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PersonIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '40px'}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
              {props.user.name.toUpperCase()}
          </Typography>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <NotificationsActiveIcon style={{fontSize: '30px', color: 'white'}}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <h4 className='notify'>Notifications</h4>
                <hr/>
              {notify?notify.map((item) => (
                <MenuItem>
                  <Typography textAlign="center">{item.msg}</Typography>
                </MenuItem>
              )):null}
            </Menu>
          </Box>
        <Box >
          <Button
            onClick={logout}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Logout
          </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
const mapStateToProps = state =>({
    user:state.userData.userData
})

const mapDispatchToProps = dispatch => ({
    userLoginHandler: data => dispatch(userLogin(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
