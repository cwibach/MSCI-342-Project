import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import history from '../Navigation/history';
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, TextField } from '@mui/material';
import { appTheme } from "../../themes/theme";

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function AddUnit() {

    // User Id *** Temporary ***
    const [userID, setUserID] = React.useState(1);

    // Handles submitting the form
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

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h3" >
                        PurplePages
                    </Typography>

                    <Box
                        margin={1}
                        display="flex"
                        justifyContent="flex-end"
                        flexGrow={1}
                        alignItems="center">

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/LandlordProfile')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                Profile
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/AddUnit')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                <strong>Add Posting</strong>
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/MyUnits')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                My Units
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                Logout
                            </Typography>
                        </Button>

                    </Box>
                </Toolbar>
            </AppBar>



            <Box
                margin={6}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"flex-start"}
            >
                {/* Creates a column grid for the body of the page */}
                <Grid container
                    direction="column"
                    alignItems="center"
                    style={{ color: "#e6e6e6" }}
                    justifyContent="center"
                    textAlign="center"
                    xs={4}
                >

                    {/* Page Title */}
                    <Grid item>
                        <Typography variant="h3">
                            <b>Create New Posting</b>
                        </Typography>
                        <Box sx={{ display: 'flex', pb: 2 }}></Box>
                    </Grid>

                    {/* Posting Information Input */}
                    <Box onSubmit={handleSubmit}>
                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            color="primary"
                            name="address"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            sx={{ mt: 3, mb: 2 }}
                            autoFocus
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="rooms"
                            type="number"
                            label="Number of Rooms"
                            name="rooms"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="bathrooms"
                            type="number"
                            label="Number of Bathrooms"
                            name="bathrooms"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="apt_price"
                            label="Monthly Rent of Apartment"
                            id="apt_price"
                            type="number"
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
                            Sign Up
                        </Button>
                    </Box>
                </Grid>
            </Box>

        </ThemeProvider>
    );
}

export default AddUnit;