import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {axios} from "../store/actions/actions";


export default function SignUp() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append('is_admin', isAdmin)


    let endpoint = `/signup`
    axios
        .post(endpoint, data)
        .then((res) => {
            let responseData = res.data;
            if(responseData.success===true) {
              setSuccess(true)
            }
        })
        .catch((error) => console.log({error}));
  };

  return (
      <>
        {success?
      <Stack sx={{ width: '100%' }}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        User created successfully — <strong>go to signin page!</strong>
      </Alert>
      </Stack>
            :null}
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox type="checkbox" checked={isAdmin} onChange={(event) => setIsAdmin(event.target.checked)} color="primary" />}
                  label="Is Admin"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {/*<Grid container justifyContent="flex-end">*/}
              {/*<Grid item>*/}
                <Link to='/signin' variant="body2">
                  Already have an account? Sign in
                </Link>
              {/*</Grid>*/}
            {/*</Grid>*/}
          </Box>
        </Box>
      </Container>
      </>
  );
}