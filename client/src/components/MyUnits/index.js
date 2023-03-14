import React from 'react';
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid } from '@mui/material';
import { appTheme } from "../../themes/theme";
import { AppPaper } from "../../themes/paper";
import history from '../Navigation/history';
import NavButton from "../GeneralResources/navButton";

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function MyUnits() {

    // Template Object 
    const initialUnits = [{
        posting_id: 0,
        creator_id: 0,
        rooms: 0,
        apt_price: 0.0,
        visible: true,
        address: '',
    }]

    // Directs to Delete Page
    // const goDelete = () => {
    //     history.push('/DeletePosting')
    // }

    // Profile List State
    const [unitList, setUnitList] = React.useState(initialUnits);

    // User Id *** Temporary ***
    const [userID, setUserID] = React.useState(1);

    // Activates the intital APIs
    React.useEffect(() => {
        getMyUnits();
    }, []);

    const getMyUnits = () => {
        callApiGetMyUnits()
            .then(res => {
                console.log("getMyUnits returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getMyUnits parsed: ", parsed);
                setUnitList(parsed);
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
                creator_id: userID
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("MyUnits: ", body);
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

                        <NavButton destination="/LandlordProfile" text="Profile" strong={false} />

                        <NavButton destination="/AddUnit" text="Add Posting" strong={false} />

                        <NavButton destination="/MyUnits" text="My Units" strong={true} />

                        <NavButton destination="/LandlordLogout" text="Logout" strong={false} />

                    </Box>
                </Toolbar>
            </AppBar>

            <ListofUnits unitList={unitList} />

        </ThemeProvider>
    );
}

const ListofUnits = ({ unitList }) => {

    const [expanded, setExpanded] = React.useState([]);

    const addToExpanded = (unitID) => {
        let tempExpanded = [...expanded];

        tempExpanded.push(unitID);

        setExpanded(tempExpanded);
    }

    const removeFromExpanded = (unitID) => {
        let tempExpanded = [...expanded];

        for (let i = 0; i < tempExpanded.length; i++) {
            if (tempExpanded[i] == unitID) {
                tempExpanded.splice(i, 1);
            }
        }

        setExpanded(tempExpanded);
    }

    const goDelete = () => {
        history.push('/DeletePosting')
    }

    return (
        <Grid margin={appTheme.spacing(2)}>
            {unitList.map((unit) => {

                return (
                    <Grid item key={unit.posting_id}>
                        <AppPaper>
                            <Typography
                                style={{
                                    marginTop: appTheme.spacing(1),
                                    marginLeft: appTheme.spacing(3)
                                }}
                                variant="h5"
                                component="div"
                                color="inherit"
                            >
                                {unit.address}
                            </Typography>

                            {(expanded.includes(unit.posting_id)) ? (<>
                                <Typography
                                    style={{
                                        marginTop: appTheme.spacing(1),
                                        marginLeft: appTheme.spacing(5),
                                        marginBottom: appTheme.spacing(1)
                                    }}
                                    variant="subtitle1"
                                    component="div"
                                    color="inherit"
                                >
                                    {unit.rooms} Bedrooms, {unit.bathrooms} Bathrooms,
                                </Typography>

                                <Typography
                                    style={{
                                        marginTop: appTheme.spacing(1),
                                        marginLeft: appTheme.spacing(5),
                                        marginBottom: appTheme.spacing(1)
                                    }}
                                    variant="subtitle1"
                                    component="div"
                                    color="inherit"
                                >
                                    ${Math.round(unit.apt_price / unit.rooms)}/person/month, Total Price: ${unit.apt_price}/month
                                </Typography>

                                <Button
                                    onClick={() => removeFromExpanded(unit.posting_id)}
                                    variant="contained"
                                    style={{
                                        marginTop: appTheme.spacing(1),
                                        marginLeft: appTheme.spacing(3),
                                        marginBottom: appTheme.spacing(2)
                                    }}>
                                    Hide Details
                                </Button>

                            </>) : (<>
                                <Button
                                    onClick={() => addToExpanded(unit.posting_id)}
                                    variant="contained"
                                    style={{
                                        marginTop: appTheme.spacing(1),
                                        marginLeft: appTheme.spacing(3),
                                        marginBottom: appTheme.spacing(2)
                                    }}>
                                    Show Details
                                </Button>

                                <Button variant="contained"
                                    fullWidth
                                    sx={{ mt: 2, mb: 1 }}
                                    onClick={goDelete}>
                                    Delete Posting
                                </Button>
                            </>)}
                        </AppPaper>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default MyUnits;