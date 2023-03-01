import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from "../../contexts/AuthContext";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const theme = createTheme();

export default function LandlordSignup() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const { currentUser, register } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };

    async function handleFormSubmit(e) {
        console.log("email: " + email);
        console.log("p1: " + password);
        console.log("p2: " + confirmPassword);

        e.preventDefault();

        if (password !== confirmPassword) {
            setAlertMessage("Error: Passwords do not match");
            setAlertVisible(true);
        } else {

            try {
                setLoading(true);
                await register(email, password);
                history.push('/LandlordProfile');
            } catch (e) {
                setAlertMessage("Error: Failed to Register");
                setAlertVisible(true);
            }
            setLoading(false);
        }


    }

    React.useEffect(() => {
        if (currentUser) {
            history.push('/')
        }
    }, [currentUser]);

    return (

        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />

            {(alertVisible) ? (<>
                <Alert severity="error">
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
                    spacing={0}
                    direction="column"
                    style={{ maxWidth: "20%" }}>

                    <Typography component="h1" variant="h5" color="primary">
                        Sign up
                    </Typography>

                    <form>

                        <Button fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => history.push('/LandlordLogin')}>
                            Back to Login
                        </Button>

                        {/* <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            color="primary"
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            sx={{ mt: 3, mb: 2 }}
                            autoFocus
                        /> */}

                        {/* <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        /> */}

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="confirm-password"
                            label="Confirm Password"
                            type="password"
                            id="confirmpassword"
                            autoComplete="confirm-password"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onClick={() => handleFormSubmit}
                            disabled={loading}
                        >
                            Sign Up
                        </Button>
                    </form>
                </Grid>
            </Box>
        </ThemeProvider>



    );
}