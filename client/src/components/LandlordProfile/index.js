import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import history from '../Navigation/history';
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from "../../themes/theme";
import { AppPaper } from "../../themes/paper";
import { Container } from '@material-ui/core';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function LandlordProfile() {

    // Template Object 
    const initialProfile = [{
        landlord_id: 0,
        username: '',
        password: '',
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
    }]

    // Profile List State
    const [profile, setProfile] = React.useState(initialProfile);

    // User Id *** Temporary ***
    const [userID, setUserID] = React.useState(1);

    // Activates the intital APIs
    React.useEffect(() => {
        getProfile();
    }, []);

    const getProfile = () => {
        callApiGetLandlordProfileInfo()
            .then(res => {
                console.log("getLandlordProfileInfo returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getLandlordProfileInfo parsed: ", parsed);
                setProfile(parsed);
            });
    }

    const callApiGetLandlordProfileInfo = async () => {
        const url = serverURL + "/api/getLandlordProfileInfo";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                landlord_id: userID
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Profile: ", body);
        return body;
    }


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
                                <strong>Profile</strong>
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/AddUnit')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                Add Posting
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

            {/* Adds spacing */}
            <Box sx={{ display: 'flex', pb: 5 }}></Box>

            {/* Creates a column grid for the body of the page */}
            <Grid container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                display="flex"
                style={{ color: "#e6e6e6" }}
                
            >

                {/* Page Title */}
                <Grid item>
                    <Typography variant="h3">
                        <b>Profile Information</b>
                    </Typography>
                    <Box sx={{ display: 'flex', pb: 2 }}></Box>
                </Grid>

                {/* User Results */}
                {profile.map((item) => {
                    return (
                        <Grid container
                            alignContent="center"
                            direction="row"
                        >
                            {/* Row 1 */}
                            <Box sx={{ display: 'flex', pb: 5 }}></Box>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    <b>First Name:</b> {item.first_name != '' && item.first_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12 - 8}></Grid>

                            {/* Row 2 */}
                            <Box sx={{ display: 'flex', pb: 5 }}></Box>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    <b>Last Name:</b> {item.last_name != '' && item.last_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12 - 8}></Grid>

                            {/* Row 3 */}
                            <Box sx={{ display: 'flex', pb: 5 }}></Box>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    <b>Email:</b> {item.email != '' && item.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12 - 8}></Grid>

                            {/* Row 4 */}
                            <Box sx={{ display: 'flex', pb: 5 }}></Box>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    <b>Phone:</b> {item.phone != '' && item.phone}
                                </Typography>
                            </Grid>
                            <Grid item xs={12 - 8}></Grid>

                        </Grid>
                    );
                })}

            </Grid>

        </ThemeProvider>
    );
}

export default LandlordProfile;