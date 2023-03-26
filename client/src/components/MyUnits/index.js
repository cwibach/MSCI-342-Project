import React from 'react';
import Typography from "@material-ui/core/Typography";
import {
    AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid, autocompleteClasses,
    TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { appTheme } from "../../themes/theme";
import NavButton from "../GeneralResources/navButton";
import { UserContext } from '../Navigation/PrivateRoute.js';
import ListofUnits from './ListofUnits';
import EditPosting from './EditPosting';
import { Edit } from '@mui/icons-material';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function MyUnits() {

    // Profile List State
    const [unitList, setUnitList] = React.useState([]);
    const [EditMode, setEditMode] = React.useState(false);

    // User Id 
    const { userId } = React.useContext(UserContext);

    // Activates the intital APIs
    React.useEffect(() => {
        getMyUnits();
    }, [userId]);

    const getMyUnits = () => {
        callApiGetMyUnits()
            .then(res => {
                console.log("getMyUnits returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getMyUnits parsed: ", parsed);
                setUnitList(parsed);
                setEditMode(false);
            });
    }

    const callApiGetMyUnits = async () => {

        const url = serverURL + "/api/getMyUnits";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                creator_id: userId
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("MyUnits: ", body);
        return body;
    }

    const handleChangeMode = () => {
        setEditMode(!EditMode);
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

                        <NavButton destination="/LandlordProfile" text="Profile" strong={false} />

                        <NavButton destination="/AddUnit" text="Add Posting" strong={false} />

                        <NavButton destination="/MyUnits" text="My Units" strong={true} />

                        <NavButton destination="/LandlordLogout" text="Logout" strong={false} />

                    </Box>
                </Toolbar>
            </AppBar>

            <ListofUnits getMyUnits={getMyUnits} unitList={unitList} EditMode={EditMode} handleChangeMode={handleChangeMode}/>

        </ThemeProvider>
    );
}


export default MyUnits;