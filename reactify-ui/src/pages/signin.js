import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link, Navigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {axios, userLogin} from "../store/actions/actions";
import {connect} from "react-redux";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {useState} from "react";


function SignIn(props) {
  const [alert, setAlert] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let endpoint = `/signin`
    axios
        .post(endpoint, data)
        .then((res) => {
            let responseData = res.data;
            if(responseData.success===true) {
                props.userLoginHandler({
                    login: true,
                    email: responseData.user.email,
                    name: responseData.user.name,
                    admin: responseData.user.admin
                })
                console.log('data--------------------->', responseData.user.name)
            } else {
                setAlert(true)
            }
        })
        // .catch((error) => console.log({error}));
  };


  return (
      <>
          {alert?
              <Stack sx={{ width: '100%' }}>
                  <Alert severity="error">
                    <AlertTitle>Unauthorised</AlertTitle>
                    Could not verify credentials — <strong>Please provide valid username and password!</strong>
                  </Alert>
              </Stack>
            :null}
          {props.user.login!==true?
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to='/signup' variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
                  :
          <Navigate to="/"/>}
      </>
  );
}

const mapStateToProps = state =>({
    user:state.userData.userData
})

const mapDispatchToProps = dispatch => ({
    userLoginHandler: data => dispatch(userLogin(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)