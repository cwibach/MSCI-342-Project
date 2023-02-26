import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';
import TextField from '@mui/material/TextField';


export default function LandlordLogin() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />

            <Box
                margin={6}
                display={"flex"}
                justifyContent={"center"}
                flexGrow={4}
                alignItems={"flex-start"}
                sx={{
                    height: 1000
                }}
            >
                <Grid container
                    spacing={50}
                    direction="column"
                    style={{ maxWidth: "20%" }}>

                    <Button variant="contained"
                        onClick={() => history.push('/')}>
                        Back to Home
                    </Button>

                    <br />

                    <Typography variant="h4" color="primary">
                        Sign up as a Landlord
                    </Typography>

                    <br />

                    <Button variant="contained"
                        onClick={() => history.push('/LandlordSignup')}>
                        Sign Up
                    </Button>

                    <br />

                    <Typography variant="h4" color="primary">
                        Login as a Landlord
                    </Typography>

                    <br />

                    <Box onSubmit={handleSubmit}>

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            color="primary"
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            sx={{ mt: 3, mb: 2 }}
                            autoFocus
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        >
                            Log in
                        </Button>
                    </Box>

                    
                    <Button variant="contained"
                        onClick={() => history.push('/LandlordProfile')}>
                        Bypass Login
                    </Button>
                    


                </Grid>
            </Box>
        </ThemeProvider>
    );
}


