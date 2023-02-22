import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';

class LandLordLogin extends Component {
    render() {
        return (
            <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />

                <Box
                    margin={6}
                    display={"flex"}
                    justifyContent={"center"}
                    flexGrow={4}
                    alignItems={"flex-start"}
                    sx={{
                        height: 1000
                    }}
                >
                    <Grid container
                        spacing={50}
                        direction="column"
                        style={{ maxWidth: "20%" }}>

                        <Button variant="contained"
                            onClick={() => history.push('/')}>
                            Back to Home
                        </Button>

                        <br />

                        <Typography variant="h4" color="primary">
                            Sign up as a Landlord
                        </Typography>

                        <br />

                        <Button variant="contained"
                            onClick={() => history.push('/LandlordSignup')}>
                            Sign Up
                        </Button>

                        <br />

                        <Typography variant="h4" color="primary">
                            Login as a Landlord
                        </Typography>

                        <br />


                        <Button variant="contained"
                            onClick={() => history.push('/LandlordProfile')}>
                            Login
                        </Button>
                    </Grid>
                </Box>
            </ThemeProvider>
        );
    }
}

export default LandLordLogin;