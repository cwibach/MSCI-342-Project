import React, { Component } from 'react';
import {CssBaseline, ThemeProvider, Typography} from '@mui/material';
import { appTheme } from "../../themes/theme";


function Messaging() {

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />

            <Typography
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(3)
                }}
                variant="h5"
                component="div"
                color="inherit"
            >
                Communicate with other renters
            </Typography>

        </ThemeProvider>
    );
}

export default Messaging;