import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from "../../themes/theme";
import { AppPaper} from "../../themes/paper";
import history from '../Navigation/history';
import { useAuth } from "../../contexts/AuthContext";
import AlertBar from '../GeneralResources/alert.js';
import NavButton from "../GeneralResources/navButton";

export default function RenterLogout() {
    const { renterLogout } = useAuth();
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");


    async function handleLogout() {
        try {
            await renterLogout();
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

                        <NavButton destination="/RenterProfile" text="Profile" strong={false} />

                        <NavButton destination="/Community" text="Community" strong={false} />

                        <NavButton destination="/SearchUnits" text="Search Units" strong={false} />

                        <NavButton destination="/RenterLogout" text="Logout" strong={true} />
                    </Box>
                </Toolbar>
            </AppBar>

            <AlertBar alertVisible={alertVisible} alertMessage={alertMessage} setAlertVisible={setAlertVisible} />

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
                            Are you sure you want to Logout?
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onClick={() => { handleLogout() }}
                        >
                            Confirm Logout
                        </Button>

                    </AppPaper>
                </Grid>
            </Box>
        </ThemeProvider>);
}