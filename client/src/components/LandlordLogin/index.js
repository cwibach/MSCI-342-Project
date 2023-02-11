import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

class LandLordLogin extends Component {
    render () {
        return(
            <div>
                Login as a Landlord
            </div>
        );
    }
}

export default withStyles(styles)(LandLordLogin);