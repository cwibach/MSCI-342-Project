import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid, Paper} from '@mui/material';
import {appTheme} from "../../themes/theme";
import history from '../Navigation/history';
import {appPaper} from "../../themes/paper";

const ThisPaper = appPaper;

const SearchUnits = () => {
    const tempUnits = [
        {id: 1,
        Address: "First address",
        NumRooms: 4,
        Price: 850},
        {id: 2,
        Address: "Second address",
        NumRooms: 5,
        Price: 1000},
        {id: 3,
        Address: "Third address",
        NumRooms: 3,
        Price: 500},
        {id: 4,
        Address: "Fourth address",
        NumRooms: 2,
        Price: 705},
        {id: 5,
        Address: "Fifth address",
        NumRooms: 4,
        Price: 800}
    ];

    const [unitList, setUnitList] = React.useState([]);
    const [unitMode, setUnitMode] = React.useState(true);

    React.useEffect(() => {
        setUnitList(tempUnits);
    }, []);

    return(
        <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme/>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" color="inherit" >
                        Profile
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
                        sx={{p: 5}}>
                            <Typography variant="h5" color="inherit" noWrap>
                                Profile
                            </Typography>
                        </Button>

                        <Button
                        color="inherit" 
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push('/Community')}
                        size='medium'
                        sx={{p: 5}}>
                            <Typography variant="h5" color="inherit" noWrap>
                                Community
                            </Typography>
                        </Button>

                        <Button
                        color="inherit" 
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push('/RenterLogin')}
                        size='medium'
                        sx={{p: 5}}>
                            <Typography variant="h5" color="inherit" noWrap>
                                Logout
                            </Typography>
                        </Button>

                    </Box>
                </Toolbar>
            </AppBar>

            <Grid margin={appTheme.spacing(2)}>


            {(unitMode) ? (<>
                <Button onClick={() => setUnitMode(false)}
                variant="outlined">
                    <Typography variant="h5" color="inherit" noWrap>
                        Return to Search
                    </Typography>
                </Button>

                <ListofUnits units={unitList}/>
            </>): (<>
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

const ListofUnits = ({units}) => {
    return(
            <ThisPaper elevation={5}>
            {units.map((unit) => {
                return(
                    <Grid item key={unit.id}>
                        <Typography
                            style={{marginTop: appTheme.spacing(1),
                                marginLeft: appTheme.spacing(3)}}
                            variant="h5"
                            component="div"
                            color="inherit"
                        >
                            {unit.Address}
                        </Typography>

                        <Typography
                            style={{marginTop: appTheme.spacing(1),
                                marginLeft: appTheme.spacing(4),
                                marginBottom: appTheme.spacing(1)}}
                            variant="subtitle1"
                            component="div"
                            color="inherit"
                        >
                            {unit.NumRooms} Rooms, ${unit.Price}/person/month
                        </Typography>
                    </Grid>
                );
            })}
        </ThisPaper>
    );
}

export default SearchUnits;