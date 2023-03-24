import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Box, Button, CssBaseline, ThemeProvider, Typography, Link } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';
import TextField from '@mui/material/TextField';
import { useAuth } from "../../contexts/AuthContext";
import { UserContext } from '../Navigation/PrivateRoute.js';
import ErrorAlert, {SuccessAlert} from '../GeneralResources/alert.js';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

export default function RenterLogin({ setUserID }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [successVisible, setSuccessVisible] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("");

    const { renterLogin } = useAuth();
    const { setUserId } = React.useContext(UserContext);

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            await renterLogin(email, password);

            getRenterUserID();

            history.push('/RenterProfile')
        } catch (e) {
            setErrorVisible(true);
            setErrorMessage("Error on login, please try again");
        }

        setLoading(false);
    };

    const getRenterUserID = () => {
        callAPIGetRenterUserID()
            .then(res => {
                console.log("callAPIGetRenterUserID returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("parsed result: ", parsed)
                let tempUserID = parsed[0].renter_id;
                console.log("renter_id", tempUserID);
                setUserId(tempUserID);
            })
    }

    const callAPIGetRenterUserID = async () => {
        const url = serverURL + "/api/getRenterUserID";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("UserID: ", body);
        return body;
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const goHome = () => {
        history.push('/')
    }

    const goSignUp = () => {
        history.push('/RenterSignUp')
    }

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />

            <ErrorAlert alertVisible={errorVisible} alertMessage={errorMessage} setAlertVisible={setErrorVisible} />

            <SuccessAlert alertVisible={successVisible} alertMessage={successMessage} setAlertVisible={setSuccessVisible}/>

            <Box
                alignItems="center"
                style={{
                    backgroundColor: "#9D4EDD",
                    color: "#ffffff",
                    borderRadius: 12
                }}
                sx={{ p: 5, mt: 7, mx: "auto", maxWidth: 1 / 3, overflow: "hidden" }}
            >
                <Grid container
                    direction="column"
                    alignItems="center"
                    style={{ color: "#ffffff" }}
                    justifyContent="center"
                >

                    {/* Page Title */}
                    <Typography variant="h3">
                        <b>Renter Login</b>
                    </Typography>

                    <form onSubmit={handleFormSubmit}>

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            sx={{ mt: 3, mb: 1 }}
                            color="primary"
                            onChange={handleEmail}
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                            sx={{ mt: 2, mb: 3 }}
                            color="primary"
                            onChange={handlePassword}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 1 }}
                            color="primary"
                            disabled={loading}
                        >
                            Log in
                        </Button>

                        <Button variant="contained"
                            fullWidth
                            sx={{ mt: 1, mb: 1 }}
                            onClick={goHome}>
                            Back to Home
                        </Button>

                        <Box
                            textAlign={"center"}
                            sx={{ mt: 2 }}
                        >
                            <Typography>
                                Don't have an account? <Link onClick={goSignUp} style={{ cursor: "pointer", color: "#5A189A" }}><b>Sign Up</b></Link>
                            </Typography>
                        </Box>

                    </form>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}