import React from 'react';
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';
import { useAuth } from "../../contexts/AuthContext";
import ErrorAlert from '../GeneralResources/alert.js';
import NavButton from "../GeneralResources/navButton";

export default function RenterLogout() {
    const { renterLogout } = useAuth();
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");


    async function handleLogout() {
        try {
            await renterLogout();
            history.push("/");
        } catch {
            setErrorVisible(true);
            setErrorMessage("Error: Failed to Logout");
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

            <ErrorAlert alertVisible={errorVisible} alertMessage={errorMessage} setAlertVisible={setErrorVisible} />

            <Box
                alignItems="center"
                textAlign={"center"}
                style={{
                    backgroundColor: "#9D4EDD",
                    color: "#ffffff",
                    borderRadius: 12
                }}
                sx={{ mt: 5, mx: "auto", maxWidth: 1 / 6, overflow: "hidden" }}
            >
                <Box
                    margin={2}
                >
                    <Typography variant="h5">
                        Are you sure you want to Logout?
                    </Typography>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="primary"
                        onClick={handleLogout}
                    >
                        Confirm Logout
                    </Button>
                </Box>
            </Box>

        </ThemeProvider>);
}