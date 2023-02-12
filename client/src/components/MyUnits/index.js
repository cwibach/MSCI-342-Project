import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import history from '../Navigation/history';
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid} from '@mui/material';
import {appTheme} from "../../themes/theme";
import {AppPaper} from "../../themes/paper";

const MyUnits = () => {
    return(
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme/>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" color="inherit" >
                        My Postings                    
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
                        onClick={() => history.push('/LandLordProfile')}
                        size='medium'
                        sx={{p: 5}}>
                            <Typography variant="h5" color="inherit" noWrap>
                                Profile
                            </Typography>
                        </Button>

                        <Button
                        color="inherit" 
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push('/AddUnit')}
                        size='medium'
                        sx={{p: 5}}>
                            <Typography variant="h5" color="inherit" noWrap>
                                Add Posting
                            </Typography>
                        </Button>

                        <Button
                        color="inherit" 
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push('/LandLordLogin')}
                        size='medium'
                        sx={{p: 5}}>
                            <Typography variant="h5" color="inherit" noWrap>
                                Logout
                            </Typography>
                        </Button>

                    </Box>
                </Toolbar>
            </AppBar>

            <ListofUnits/>

        </ThemeProvider>
    );
}

const ListofUnits = () => {
    const tempUnits = [
        {id: 1,
        Address: "First address",
        NumRooms: 4,
        Price: 850,
        TotalPrice: 3400,
        Visible: false,
        PostingDate: "2023-01-12",
        Bath: 2,
        AmenitiesInc: "Heating, Cooling, Water, Hydro, Internet",
        expanded: false,
        buttonText: "Show Info"},
        {id: 2,
        Address: "Second address",
        NumRooms: 5,
        Price: 1000,
        TotalPrice: 3400,
        Visible: false,
        PostingDate: "2023-01-12",
        Bath: 2,
        AmenitiesInc: "Heating, Cooling, Water, Hydro, Internet",
        expanded: false,
        buttonText: "Show Info"},
        {id: 3,
        Address: "Third address",
        NumRooms: 3,
        Price: 500,
        TotalPrice: 3400,
        Visible: false,
        PostingDate: "2023-01-12",
        Bath: 2,
        AmenitiesInc: "Heating, Cooling, Water, Hydro, Internet",
        expanded: false,
        buttonText: "Show Info"},
        {id: 4,
        Address: "Fourth address",
        NumRooms: 2,
        Price: 705,
        TotalPrice: 3400,
        Visible: false,
        PostingDate: "2023-01-12",
        Bath: 2,
        AmenitiesInc: "Heating, Cooling, Water, Hydro, Internet",
        expanded: false,
        buttonText: "Show Info"},
        {id: 5,
        Address: "Fifth address",
        NumRooms: 4,
        Price: 800,
        TotalPrice: 3400,
        Visible: false,
        PostingDate: "2023-01-12",
        Bath: 2,
        AmenitiesInc: "Heating, Cooling, Water, Hydro, Internet",
        expanded: false,
        buttonText: "Show Info"}
    ];

    const [unitList, setUnitList] = React.useState([]);

    React.useEffect(() => {
        setUnitList(tempUnits);
    }, []);

    // const expandUnit = (id) => {
    //     const tempUnitList = [...unitList];

    //     console.log(id);

    //     const enabled = tempUnitList[id - 1].expanded;

    //     if (enabled){
    //         tempUnitList[id].expanded = false;
    //         tempUnitList[id].buttonText = "Show Info";
    //     } else {
    //         tempUnitList[id].expanded = true;
    //         tempUnitList[id].buttonText = "Hide Info";
    //     }

    //     setUnitList(tempUnitList);

    // }

    return(
        <Grid margin={appTheme.spacing(2)}>
            {unitList.map((unit) => {
                

                return(
                    <Grid item key={unit.id}>
                        <AppPaper>
                            <Typography
                                style={{marginTop: appTheme.spacing(1),
                                    marginLeft: appTheme.spacing(3)}}
                                variant="h5"
                                component="div"
                                color="inherit"
                            >
                                {unit.Address}
                            </Typography>

                            {/* {(unit.expanded) ? (<> */}
                                <Typography
                                style={{marginTop: appTheme.spacing(1),
                                    marginLeft: appTheme.spacing(4),
                                    marginBottom: appTheme.spacing(1)}}
                                variant="subtitle1"
                                component="div"
                                color="inherit"
                            >
                                {unit.NumRooms} Bedrooms, {unit.Bath} Bathroooms, ${unit.Price}/person/month, Total Price: ${unit.TotalPrice}
                            </Typography>

                            <Typography
                                style={{marginTop: appTheme.spacing(1),
                                    marginLeft: appTheme.spacing(4),
                                    marginBottom: appTheme.spacing(1)}}
                                variant="subtitle1"
                                component="div"
                                color="inherit"
                            >
                                This Posting is currently: {unit.Visible} to potential renters. Posted on {unit.PostingDate}
                            </Typography>

                            <Typography
                                style={{marginTop: appTheme.spacing(1),
                                    marginLeft: appTheme.spacing(4),
                                    marginBottom: appTheme.spacing(1)}}
                                variant="subtitle1"
                                component="div"
                                color="inherit"
                            >
                                Utilities included: {unit.AmenitiesInc}
                            </Typography>
                            {/* </>): (<>
                            </>)} */}

                            {/* <Button onClick={expandUnit(unit.id)}
                                variant="contained">
                                 {unit.buttonText}
                            </Button> */}
                        </AppPaper>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default MyUnits;