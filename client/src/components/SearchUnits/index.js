import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid, Paper } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';
import { AppPaper, AppPaper2 } from "../../themes/paper";
import RenterList from '../RenterList/index';

const SearchUnits = () => {
    const tempUnits = [
        {
            id: 1,
            Address: "First address",
            NumRooms: 4,
            Price: 850
        },
        {
            id: 2,
            Address: "Second address",
            NumRooms: 5,
            Price: 1000
        },
        {
            id: 3,
            Address: "Third address",
            NumRooms: 3,
            Price: 500
        },
        {
            id: 4,
            Address: "Fourth address",
            NumRooms: 2,
            Price: 705
        },
        {
            id: 5,
            Address: "Fifth address",
            NumRooms: 4,
            Price: 800
        }
    ];

    const tempRenters = [{
        id: 1,
        name: "Renter 1",
        age: 21,
        gender: "male",
        phone: "613-737-1111",
        email: "my.name@email.com",
        maxrent: 900,
        bedtime: "11:15 PM",
        cooking: "never"
    }, {
        id: 2,
        name: "Renter 2",
        age: 21,
        gender: "helicopter",
        phone: "613-737-1111",
        email: "my.name@email.com",
        maxrent: 915,
        bedtime: "11:15 AM",
        cooking: "always"
    }, {
        id: 3,
        name: "Renter 3",
        age: 21,
        gender: "none",
        phone: "613-737-1111",
        email: "my.name@email.com",
        maxrent: 930,
        bedtime: "4:00 PM",
        cooking: "daily"
    }, {
        id: 4,
        name: "Renter 4",
        age: 21,
        gender: "all",
        phone: "613-737-1111",
        email: "my.name@email.com",
        maxrent: 945,
        bedtime: "4:00 AM",
        cooking: "weekly"
    }, {
        id: 5,
        name: "Renter 5",
        age: 21,
        gender: "female",
        phone: "613-737-1111",
        email: "my.name@email.com",
        maxrent: 960,
        bedtime: "11:15",
        cooking: "what's that?"
    }
    ];

    const [unitList, setUnitList] = React.useState([]);
    const [unitMode, setUnitMode] = React.useState(false);
    const [renters, setRenters] = React.useState([]);


    React.useEffect(() => {
        setUnitList(tempUnits);
        setRenters(tempRenters);
    }, []);



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

                    <ListofUnits units={unitList} renters={renters} />
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

const ListofUnits = ({ units, renters }) => {
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
                        <Grid item key={unit.id}>
                            <Typography
                                style={{
                                    marginTop: appTheme.spacing(1),
                                    marginLeft: appTheme.spacing(3)
                                }}
                                variant="h5"
                                component="div"
                                color="inherit"
                            >
                                {unit.Address}
                            </Typography>

                            <Typography
                                style={{
                                    marginTop: appTheme.spacing(1),
                                    marginLeft: appTheme.spacing(4),
                                    marginBottom: appTheme.spacing(1)
                                }}
                                variant="subtitle1"
                                component="div"
                                color="inherit"
                            >
                                {unit.NumRooms} Rooms, ${unit.Price}/person/month
                            </Typography>

                            {(expanded === unit.id) ? (<>
                                <Typography
                                    style={{
                                        marginTop: appTheme.spacing(1),
                                        marginLeft: appTheme.spacing(4),
                                        marginBottom: appTheme.spacing(1)
                                    }}
                                    variant="subtitle1"
                                    component="div"
                                    color="inherit"
                                >
                                    Details below list
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
                                <Button onClick={() => expandUnit(unit.id)}
                                    variant="contained"
                                    style={{
                                        marginTop: appTheme.spacing(1),
                                        marginLeft: appTheme.spacing(3),
                                        marginBottom: appTheme.spacing(2)
                                    }}>

                                    See Details
                                </Button>
                            </>)}
                        </Grid>
                    );
                })}
            </AppPaper2>

            {(anyExpanded) ? (<>
                <UnitDetails unitDetails={expandedDetails} />

                <RenterList renters={renters} />
            </>) : (<>
            </>)}
        </Grid>
    );
}

const UnitDetails = ({ unitDetails }) => {
    return (
        <AppPaper>
            <Typography
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(4),
                    marginBottom: appTheme.spacing(1)
                }}
                variant="h4"
                component="div"
                color="inherit"
            >
                {unitDetails.Address}
            </Typography>

            <Typography
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(4),
                    marginBottom: appTheme.spacing(1)
                }}
                variant="subtitle1"
                component="div"
                color="inherit"
            >
                Bedrooms: {unitDetails.NumRooms}
            </Typography>
            <Typography
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(4),
                    marginBottom: appTheme.spacing(1)
                }}
                variant="subtitle1"
                component="div"
                color="inherit"
            >
                Price/Person monthly: ${unitDetails.Price}
            </Typography>
        </AppPaper>
    );
}

export default SearchUnits;