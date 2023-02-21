import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import history from '../Navigation/history';
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid } from '@mui/material';
import { appTheme } from "../../themes/theme";
import { AppPaper } from "../../themes/paper";

const MyUnits = () => {
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
                                Profile
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
                                <strong>My Units</strong>
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

            <ListofUnits />

        </ThemeProvider>
    );
}

const ListofUnits = () => {
    const tempUnits = [
        {
            id: 1,
            Address: "First address",
            NumRooms: 4,
            Price: 850,
            TotalPrice: 3400,
            Visible: false,
            PostingDate: "2023-01-12",
            Bath: 2,
            AmenitiesInc: "Heating, Cooling, Water, Hydro, Internet"
        },
        {
            id: 2,
            Address: "Second address",
            NumRooms: 5,
            Price: 1000,
            TotalPrice: 3400,
            Visible: false,
            PostingDate: "2023-01-12",
            Bath: 2,
            AmenitiesInc: "Heating, Cooling, Water, Hydro, Internet"
        },
        {
            id: 3,
            Address: "Third address",
            NumRooms: 3,
            Price: 500,
            TotalPrice: 3400,
            Visible: false,
            PostingDate: "2023-01-12",
            Bath: 2,
            AmenitiesInc: "Heating, Cooling, Water, Hydro, Internet"
        },
        {
            id: 4,
            Address: "Fourth address",
            NumRooms: 2,
            Price: 705,
            TotalPrice: 3400,
            Visible: false,
            PostingDate: "2023-01-12",
            Bath: 2,
            AmenitiesInc: "Heating, Cooling, Water, Hydro, Internet"
        },
        {
            id: 5,
            Address: "Fifth address",
            NumRooms: 4,
            Price: 800,
            TotalPrice: 3400,
            Visible: false,
            PostingDate: "2023-01-12",
            Bath: 2,
            AmenitiesInc: "Heating, Cooling, Water, Hydro, Internet"
        }
    ];

    const [unitList, setUnitList] = React.useState([]);
    const [expanded, setExpanded] = React.useState([]);

    React.useEffect(() => {
        setUnitList(tempUnits);
    }, [0]);

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

    return (
        <Grid margin={appTheme.spacing(2)}>
            {unitList.map((unit) => {

                return (
                    <Grid item key={unit.id}>
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
                                {unit.Address}
                            </Typography>

                            {(expanded.includes(unit.id)) ? (<>
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
                                    {unit.NumRooms} Bedrooms, {unit.Bath} Bathroooms, ${unit.Price}/person/month, Total Price: ${unit.TotalPrice}
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
                                    This Posting is currently: {unit.Visible} to potential renters. Posted on {unit.PostingDate}
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
                                    Utilities included: {unit.AmenitiesInc}
                                </Typography>

                                <Button
                                    onClick={() => removeFromExpanded(unit.id)}
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
                                    onClick={() => addToExpanded(unit.id)}
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

export default MyUnits;