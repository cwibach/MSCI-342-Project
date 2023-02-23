import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid, Paper } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';
import { AppPaper, AppPaper2 } from "../../themes/paper";
import RenterList from '../RenterList/index';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

const SearchUnits = () => {

    // Template Object 
    const initialUnits = [{
        posting_id: 0,
        creator_id: 0,
        rooms: 0,
        apt_price: 0.0,
        visible: true,
        address: '',
    }]

    // Profile List State
    const [unitList, setUnitList] = React.useState(initialUnits);

    // User Id *** Temporary ***
    const [userID, setUserID] = React.useState(1);

    // Activates the intital APIs
    React.useEffect(() => {
        getAllUnits();
    }, []);

    const getAllUnits = () => {
        callApiGetAllUnits()
            .then(res => {
                console.log("getAllUnits returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getAllUnits parsed: ", parsed);
                setUnitList(parsed);
            });
    }

    const callApiGetAllUnits = async () => {
        const url = serverURL + "/api/getAllUnits";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("All Units: ", body);
        return body;
    }

    const [unitMode, setUnitMode] = React.useState(false);

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
                                <strong>Search Units</strong>
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

            <Grid margin={appTheme.spacing(2)}>


                {(unitMode) ? (<>
                    <Button onClick={() => setUnitMode(false)}
                        variant="outlined" >
                        <Typography variant="h5" color="inherit" noWrap>
                            Return to Search
                        </Typography>
                    </Button>

                    <ListofUnits units={unitList} userID={userID} />
                </>) : (<>
                    <Button onClick={() => setUnitMode(true)}
                        variant="outlined">
                        <Typography variant="h5" color="inherit" noWrap>
                            See Units
                        </Typography>
                    </Button>
                </>)}

            </Grid>
        </ThemeProvider>
    );
}

const ListofUnits = ({ units, userID }) => {
    const [anyExpanded, setAnyExpanded] = React.useState(false);
    const [expanded, setExpanded] = React.useState(0);
    const [expandedDetails, setExpandedDetails] = React.useState({});

    const expandUnit = (unitID) => {
        setExpanded(unitID);
        setAnyExpanded(true);

        for (let i = 0; i < units.length; i++) {
            if (units[i].id === unitID) {
                setExpandedDetails(units[i]);
            }
        }
    }

    const unExpandUnit = () => {
        setExpanded(0);
        setAnyExpanded(false);
    }

    return (
        <Grid>
            <AppPaper2>
                {units.map((unit) => {
                    return (
                        <Grid item key={unit.posting_id}>
                            {(expanded === unit.posting_id) ? (<>
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
                                    ${unit.apt_price / unit.rooms}/person/month, Total Price: ${unit.apt_price}/month
                                </Typography>

                                <Button
                                    onClick={() => unExpandUnit()}
                                    variant="contained"
                                    style={{
                                        marginTop: appTheme.spacing(1),
                                        marginLeft: appTheme.spacing(3),
                                        marginBottom: appTheme.spacing(2)
                                    }}>

                                    Hide Details
                                </Button>
                            </>) : (<>
                                {(anyExpanded) ? (<>
                                    <Typography></Typography>
                                    </>) : (<>
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
                                        <Button onClick={() => expandUnit(unit.posting_id)}
                                            variant="contained"
                                            style={{
                                                marginTop: appTheme.spacing(1),
                                                marginLeft: appTheme.spacing(3),
                                                marginBottom: appTheme.spacing(2)
                                            }}>

                                            See Details
                                        </Button>
                                </>)}
                            </>)}
                        </Grid>
                    );
                })}
            </AppPaper2>


            {(anyExpanded) ? (<>
                <AppPaper>
                    <Typography
                        style={{
                            marginTop: appTheme.spacing(1),
                            marginLeft: appTheme.spacing(4),
                            marginBottom: appTheme.spacing(1)
                        }}
                        variant="h5"
                        component="div"
                        color="inherit"
                    >
                        Interested Renters:
                    </Typography>
                </AppPaper>

                <InterestedList unitID={expanded} userID={userID} />
            </>) : (<>
            </>)}
        </Grid>
    );
}


const InterestedList = ({ unitID, userID }) => {

    // Profile List State
    const [renters, setRenters] = React.useState([]);

    // Activates the intital APIs
    React.useEffect(() => {
        getInterestedRenters();
    }, []);

    const getInterestedRenters = () => {
        callApiGetInterestedRenters()
            .then(res => {
                console.log("getInterestedRenters returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getInterestedRenters parsed: ", parsed);
                setRenters(parsed);
            });
    }

    const callApiGetInterestedRenters = async () => {
        const url = serverURL + "/api/getInterestedRenters";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                posting_id: unitID,
                renter_id: userID
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Renters: ", body);
        return body;
    }



    const [expanded, setExpanded] = React.useState([]);

    const addToExpanded = (renterID) => {
        let tempExpanded = [...expanded];

        tempExpanded.push(renterID);

        setExpanded(tempExpanded);
    }

    const removeFromExpanded = (renterID) => {
        let tempExpanded = [...expanded];

        for (let i = 0; i < tempExpanded.length; i++) {
            if (tempExpanded[i] == renterID) {
                tempExpanded.splice(i, 1);
            }
        }

        setExpanded(tempExpanded);
    }

    return (
        <Grid margin={appTheme.spacing(2)}>
            {renters.map((renter) => {
                return (
                    <Grid item key={renter.renter_id}>
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
                                {renter.first_name} {renter.last_name}
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
                                Birthday: {renter.birthday}, Gender: {renter.gender}
                            </Typography>

                            {(expanded.includes(renter.renter_id)) ? (<>
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
                                    Typical bedtime: {renter.bedtime}, Cooking Frequency: {renter.cook}
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
                                    Phone Number: {renter.phone}, Email address: {renter.email}
                                </Typography>

                                <Button
                                    onClick={() => removeFromExpanded(renter.renter_id)}
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
                                    onClick={() => addToExpanded(renter.renter_id)}
                                    variant="contained"
                                    style={{
                                        marginTop: appTheme.spacing(1),
                                        marginLeft: appTheme.spacing(3),
                                        marginBottom: appTheme.spacing(2)
                                    }}>
                                    Show Details
                                </Button>
                            </>)}
                        </AppPaper>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default SearchUnits;