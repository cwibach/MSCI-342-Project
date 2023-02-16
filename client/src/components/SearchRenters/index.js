import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid} from '@mui/material';
import {appTheme} from "../../themes/theme";
import history from '../Navigation/history';
import RenterList from '../RenterList/index';

const SearchRenters = () => {
    const [renters, setRenters] = React.useState([]);
    const [renterMode, setRenterMode] = React.useState(false);

    const tempRenters = [
        {id: 1,
            name: "Renter 1",
            age: 21,
            gender: "male",
            phone: "613-737-1111",
            email: "my.name@email.com",
            maxrent: 900,
            bedtime: "11:15 PM",
            cooking: "never"
        },{id: 2,
            name: "Renter 2",
            age: 21,
            gender: "helicopter",
            phone: "613-737-1111",
            email: "my.name@email.com",
            maxrent: 915,
            bedtime: "11:15 AM",
            cooking: "always"
        },{id: 3,
            name: "Renter 3",
            age: 21,
            gender: "none",
            phone: "613-737-1111",
            email: "my.name@email.com",
            maxrent: 930,
            bedtime: "4:00 PM",
            cooking: "daily"
        },{id: 4,
            name: "Renter 4",
            age: 21,
            gender: "all",
            phone: "613-737-1111",
            email: "my.name@email.com",
            maxrent: 945,
            bedtime: "4:00 AM",
            cooking: "weekly"
        },{id: 5,
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

    React.useEffect(() => {
        setRenters(tempRenters);
    }, [0]);

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />

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
                            sx={{ p: 5 }}>
                            <Typography variant="h5" color="inherit" noWrap>
                                Profile
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/SearchUnits')}
                            size='medium'
                            sx={{ p: 5 }}>
                            <Typography variant="h5" color="inherit" noWrap>
                                Search Units
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/RenterLogin')}
                            size='medium'
                            sx={{ p: 5 }}>
                            <Typography variant="h5" color="inherit" noWrap>
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

                    <RenterList renters={renters}/>
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