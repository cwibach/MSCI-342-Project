import React from 'react';
import {
    AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid, Typography
} from '@mui/material';
import { appTheme } from "../../themes/theme";
import { UserContext } from '../Navigation/PrivateRoute.js';
import NavButton from "../GeneralResources/navButton";
import AlertBar from '../GeneralResources/alert';
import SearchMenuUnits from "./SearchMenuUnits";
import ListofUnits from "./ListUnits";

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

const SearchUnits = () => {
    // Profile List State
    const [unitList, setUnitList] = React.useState([]);
    const [unitMode, setUnitMode] = React.useState(false);
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    // User Id
    const { userId } = React.useContext(UserContext);

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

                        <NavButton destination="/RenterProfile" text="Profile" strong={false} />

                        <NavButton destination="/Community" text="Community" strong={false} />

                        <NavButton destination="/SearchUnits" text="Search Units" strong={true} />

                        <NavButton destination="/RenterLogout" text="Logout" strong={false} />
                    </Box>
                </Toolbar>

            </AppBar>

            <AlertBar alertMessage={alertMessage} alertVisible={alertVisible} setAlertVisible={setAlertVisible} />

            <Grid margin={appTheme.spacing(3 / 4)}>

                {(unitMode) ? (<>
                    <Button onClick={() => setUnitMode(false)}
                        variant="outlined" >
                        <Typography variant="h5" noWrap>
                            Return to Search
                        </Typography>
                    </Button>

                    <ListofUnits units={unitList} userId={userId} />
                </>) : (<>
                    <SearchMenuUnits setUnitList={setUnitList} setUnitMode={setUnitMode}
                        setAlertMessage={setAlertMessage} setAlertVisible={setAlertVisible} userId={userId}/>
                </>)}

            </Grid>
        </ThemeProvider>
    );
}

export default SearchUnits;