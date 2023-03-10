import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import history from '../Navigation/history';
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from "../../themes/theme";

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function RenterProfile() {

    // Profile List State
    const [profile, setProfile] = React.useState([]);

    // User Id *** Temporary ***
    const [userID, setUserID] = React.useState(1);

    // Activates the intital APIs
    React.useEffect(() => {
        getProfile();
    }, []);

    const getProfile = () => {
        callApiGetRenterProfileInfo()
            .then(res => {
                console.log("getRenterProfileInfo returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getRenterProfileInfo parsed: ", parsed);
                setProfile(parsed);
            });
    }

    const callApiGetRenterProfileInfo = async () => {
        const url = serverURL + "/api/getRenterProfileInfo";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                renter_id: userID
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
                            onClick={() => history.push('/RenterProfile')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                <strong>Profile</strong>
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/Community')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                Community
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/SearchUnits')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                Search Units
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/RenterLogout')}
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

                            {/* Row 5 */}
                            <Box sx={{ display: 'flex', pb: 5 }}></Box>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    <b>Bedtime:</b> {item.bedtime != '' && item.bedtime}
                                </Typography>
                            </Grid>
                            <Grid item xs={12 - 8}></Grid>

                            {/* Row 6 */}
                            <Box sx={{ display: 'flex', pb: 5 }}></Box>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    <b>Birthday:</b> {item.birthday != '' && item.birthday}
                                </Typography>
                            </Grid>
                            <Grid item xs={12 - 8}></Grid>

                            {/* Row 7 */}
                            <Box sx={{ display: 'flex', pb: 5 }}></Box>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    <b>Roomate Gender:</b> {item.gender != '' && item.gender}
                                </Typography>
                            </Grid>
                            <Grid item xs={12 - 8}></Grid>

                            {/* Row 8 */}
                            <Box sx={{ display: 'flex', pb: 5 }}></Box>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    <b>Cooking Frequency:</b> {item.cook != '' && item.cook}
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

export default RenterProfile;