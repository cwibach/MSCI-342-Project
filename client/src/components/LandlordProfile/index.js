import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from "../../themes/theme";
import NavButton from "../GeneralResources/navButton";
import { UserContext } from '../Navigation/PrivateRoute.js';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function LandlordProfile() {

    // Profile List State
    const [profile, setProfile] = React.useState([]);

    // User Id 
    const { userId } = React.useContext(UserContext);

    // Activates the intital APIs
    React.useEffect(() => {
        getProfile();
    }, [userId]);

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
                landlord_id: userId
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

                        <NavButton destination="/LandlordProfile" text="Profile" strong={true} />

                        <NavButton destination="/AddUnit" text="Add Posting" strong={false} />

                        <NavButton destination="/MyUnits" text="My Units" strong={false} />

                        <NavButton destination="/LandlordLogout" text="Logout" strong={false} />
                    </Box>
                </Toolbar>
            </AppBar>



            {/* User Results */}
            {profile.map((item) => {
                return (
                    <Box
                        alignItems="center"
                        style={{
                            backgroundColor: "#c785ec",
                            color: "#ffffff",
                            borderRadius: 12
                        }}
                        sx={{ pb: 7, mt: 5, mx: "auto", maxWidth: 3 / 8, overflow: "hidden" }}
                    >

                        {/* Creates a column grid for the body of the page */}
                        <Grid container
                            direction="column"
                            justifyContent="space-evenly"
                            alignItems="center"

                            display="flex"
                            style={{
                                marginTop: 45
                            }}
                        >

                            {/* Page Title */}
                            <Grid item>
                                <Typography variant="h3">
                                    <b>Profile Information</b>
                                </Typography>
                            </Grid>
                            <Grid container
                                alignContent="center"

                                direction="row" style={{
                                    marginTop: 20
                                }}
                            >
                                {/* Row 1 */}
                                <Box sx={{ display: 'flex', pb: 5 }}></Box>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={9}>
                                    <Typography variant="h5">
                                        <b>Name:</b> {item.first_name != '' && item.first_name} {item.last_name != '' && item.last_name}
                                    </Typography>
                                </Grid>

                                {/* Row 2 */}
                                <Box sx={{ display: 'flex', pb: 5 }}></Box>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h5">
                                        <b>Email:</b> {item.email != '' && item.email}
                                    </Typography>
                                </Grid>

                                {/* Row 3 */}
                                <Box sx={{ display: 'flex', pb: 5 }}></Box>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={9}>
                                    <Typography variant="h5">
                                        <b>Phone:</b> {item.phone != '' && item.phone}
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Box>

                );
            })}


        </ThemeProvider>
    );
}

export default LandlordProfile;