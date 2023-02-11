import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import history from '../Navigation/history';
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider} from '@mui/material';
import {appTheme} from "../../themes/theme";

class LandLordProfile extends Component {
    render () {
        return(
            <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme/>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" >
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
                        onClick={() => history.push('/AddUnit')}
                        size='medium'
                        sx={{p: 5}}>
                            <Typography variant="h5" noWrap>
                                Add Posting
                            </Typography>
                        </Button>

                        <Button
                        color="inherit" 
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push('/MyUnits')}
                        size='medium'
                        sx={{p: 5}}>
                            <Typography variant="h5" noWrap>
                                My Units
                            </Typography>
                        </Button>

                        <Button
                        color="inherit" 
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push('/LandLordLogin')}
                        size='medium'
                        sx={{p: 5}}>
                            <Typography variant="h5" noWrap>
                                Logout
                            </Typography>
                        </Button>

                    </Box>
                </Toolbar>
            </AppBar>
            </ThemeProvider>
        );
    }
}

export default LandLordProfile;