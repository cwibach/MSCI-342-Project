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

export default function LandlordSignup() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState(" ");
    const [phone, setPhone] = React.useState('');
    const [first_name, setFirst_name] = React.useState('');
    const [last_name, setLast_name] = React.useState('');

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
        e.preventDefault();

        if (password !== confirmPassword) {
            setAlertMessage("Error: Passwords do not match");
            setAlertVisible(true);
        } else {

            try {
                setLoading(true);
                await register(email, password);

                // what to do if succesful

                // Create new entry in database w/ f-name, l-name, email, phone
                // Get ID from database for matching email
                // Set global userID state variable

                history.push('/LandlordProfile');
            } catch (e) {
                setAlertMessage("Error: Failed to Register");
                setAlertVisible(true);
            }
            setLoading(false);
        }


    }

    // React.useEffect(() => {
    //     if (currentUser) {
    //         history.push('/')
    //     }
    // }, [currentUser]);

    return (

        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />

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
                    spacing={0}
                    direction="column"
                    style={{ maxWidth: "20%" }}>

                    <Typography component="h1" variant="h5" color="primary">
                        Sign up
                    </Typography>

                    <form onSubmit={handleFormSubmit}>

                        <Button fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => history.push('/LandlordLogin')}>
                            Back to Login
                        </Button>

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="first_name"
                            type="text"
                            label="First Name"
                            name="first_name"
                            value={first_name}
                            autoComplete="First Name"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setFirst_name(e.target.value)}
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="last_name"
                            type="text"
                            label="Last Name"
                            name="last_name"
                            value={last_name}
                            autoComplete="Last Name"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setLast_name(e.target.value)}
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            label="Phone Number"
                            id="phone"
                            type="text"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

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