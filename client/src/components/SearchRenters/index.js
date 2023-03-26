import React from 'react';
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid } from '@mui/material';
import { appTheme } from "../../themes/theme";
import RenterList from '../RenterList/index';
import NavButton from "../GeneralResources/navButton";
import { UserContext } from '../Navigation/PrivateRoute.js';
import SearchMenuRenters from './SearchMenuRenters';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function SearchRenters() {

    // Profile List State
    const [renters, setRenters] = React.useState([]);

    // Button State
    const [renterMode, setRenterMode] = React.useState(false);

    // User Id 
    const { userId } = React.useContext(UserContext);

    // Activates the intital APIs
    React.useEffect(() => {
        getRenters();
    }, [userId]);

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
                renter_id: userId
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
                        alignItems="center"
                    >

                        <NavButton destination="/RenterProfile" text="Profile" strong={false} />

                        <NavButton destination="/Community" text="Community" strong={true} />

                        <NavButton destination="/SearchUnits" text="Search Units" strong={false} />

                        <NavButton destination="/RenterLogout" text="Logout" strong={false} />
                    </Box>
                </Toolbar>
            </AppBar>

            <Grid margin={appTheme.spacing(3 / 4)}>

                {(renterMode) ? (<>

                    <Button onClick={() => setRenterMode(false)}
                        variant="outlined"
                    >
                        <Typography variant="h5" noWrap>
                            Return to Search
                        </Typography>
                    </Button>

                    <RenterList renters={renters} />

                </>) : (<>

                    <SearchMenuRenters userId={userId} setRenters={setRenters} setRenterMode={setRenterMode} />


                </>)}

            </Grid>



        </ThemeProvider>
    );
}


export default SearchRenters;