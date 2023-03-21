import React from 'react';
import { Button, Typography, ThemeProvider, CssBaseline } from '@mui/material';
import { appTheme } from "../../themes/theme";

export const ExpandedUnitInfo = ({ unit, unExpandUnit }) => {

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
                ${Math.round(unit.apt_price / unit.rooms)}/person/month, Total Price: ${unit.apt_price}/month
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
        </ThemeProvider>
    )
}

export const UnexpandedUnitInfo = ({ unit, expandUnit }) => {

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
        </ThemeProvider>
    )
}