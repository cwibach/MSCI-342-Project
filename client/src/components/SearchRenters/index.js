import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';
import RenterList from '../RenterList/index';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function SearchRenters() {

    // Template Object 
    const initialRenters = [{
        renter_id: 0,
        username: '',
        password: '',
        email: '',
        phone: '',
        bedtime: '',
        birthday: '',
        gender: '',
        cook: '',
        first_name: '',
        last_name: '',
    }]

    // Profile List State
    const [renters, setRenters] = React.useState(initialRenters);

    // Button State
    const [renterMode, setRenterMode] = React.useState(false);

    // User Id *** Temporary ***
    const [userID, setUserID] = React.useState(1);

    // Activates the intital APIs
    React.useEffect(() => {
        getRenters();
    }, []);

    const getRenters = () => {
        callApiGetRenters()
            .then(res => {
                console.log("getRenters returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getRenters parsed: ", parsed);
                setRenters(parsed);
            });
    }

    const callApiGetRenters = async () => {
        const url = serverURL + "/api/getRenters";
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
        console.log("Renters: ", body);
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
                                Profile
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/Community')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                <strong>Community</strong>
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

            <Grid margin={appTheme.spacing(2)}>

                {(renterMode) ? (<>
                    <Button onClick={() => setRenterMode(false)}
                        variant="outlined" >
                        <Typography variant="h5" color="inherit" noWrap>
                            Return to Search
                        </Typography>
                    </Button>

                    <RenterList renters={renters} />
                </>) : (<>
                    <Button onClick={() => setRenterMode(true)}
                        variant="outlined">
                        <Typography variant="h5" color="inherit" noWrap>
                            See Renters
                        </Typography>
                    </Button>
                </>)}

            </Grid>



        </ThemeProvider>
    );
}

export default SearchRenters;