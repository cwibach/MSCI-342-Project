import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from "../../themes/theme";
import { AppPaper, AppPaper2 } from "../../themes/paper";
import history from '../Navigation/history';
import TextField from '@mui/material/TextField';
import { useAuth } from "../../contexts/AuthContext";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function LandlordLogout() {
    const { logout } = useAuth();
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    

    async function handleLogout() {
        try {
          await logout();
          history.push("/");
        } catch {
          setAlertVisible(true);
          setAlertMessage("Error: Failed to Logout");
        }
      }

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
                            onClick={() => history.push('/LandlordLogout')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                Logout
                            </Typography>
                        </Button>

                    </Box>
                </Toolbar>
            </AppBar>

            {(alertVisible) ? (<>
                <Alert severity="error"
                action={
                    <Button color='inherit' size='small'
                    onClick={() => {setAlertVisible(false)}}>
                        CLOSE
                    </Button>
                }>
                    <AlertTitle>Error</AlertTitle>
                    {alertMessage}
                </Alert>
            </>) : (<>
            </>)}

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
                    spacing={5}
                    direction="column"
                    style={{ maxWidth: "20%" }}>

                        <Typography
                                style={{
                                    marginTop: appTheme.spacing(1),
                                    marginLeft: appTheme.spacing(3)
                                }}
                                variant="h5"
                                component="div"
                                color="inherit"
                            >
                            Are you sure you want to Logout?
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onClick={() => {handleLogout()}}
                        >
                            Confirm Logout
                        </Button>
                </Grid>
            </Box>
        </ThemeProvider>);
}