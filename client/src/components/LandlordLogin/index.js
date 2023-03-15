import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Box, Button, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';
import TextField from '@mui/material/TextField';
import { useAuth } from "../../contexts/AuthContext";
import { UserContext } from '../Navigation/PrivateRoute.js';
import AlertBar from '../GeneralResources/alert.js';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

export default function LandlordLogin({ setUserID }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    const { login } = useAuth();
    const { setUserId } = React.useContext(UserContext);

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            await login(email, password);

            getLandlordUserID();

            history.push('/LandlordProfile')
        } catch (e) {
            setAlertVisible(true);
            setAlertMessage("Error on login, please try again");
        }

        setLoading(false);
    }

    const getLandlordUserID = () => {
        callAPIGetLandlordUserID()
            .then(res => {
                console.log("callAPIGetLandlordUserID returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("parsed result: ", parsed)
                let tempUserID = parsed[0].landlord_id;
                console.log("landlord_id", tempUserID);
                setUserId(tempUserID);
            })
    }

    const callAPIGetLandlordUserID = async () => {
        const url = serverURL + "/api/getLandlordUserID";
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

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const goHome = () => {
        history.push('/')
    }

    const goProfile = () => {
        history.push('/LandlordProfile')
    }

    const goSignUp = () => {
        history.push('/LandlordSignup')
    }

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />

            <AlertBar alertVisible={alertVisible} alertMessage={alertMessage} setAlertVisible={setAlertVisible} />

            <Box
                margin={6}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"flex-start"}
            >
                <Grid container xs={4}
                    direction="column"
                    alignItems="center"
                    style={{ color: "#e6e6e6" }}
                    justifyContent="center"
                >

                    {/* Page Title */}
                    <Typography variant="h3">
                        <b>Landlord login</b>
                    </Typography>

                    <form onSubmit={handleFormSubmit}>

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
                            onChange={handleEmail}
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
                            autoComplete="password"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={handlePassword}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 1 }}
                            color="primary"
                            disabled={loading}
                        >
                            Log in
                        </Button>

                        <Button variant="contained"
                            fullWidth
                            sx={{ mt: 2, mb: 1 }}
                            onClick={goSignUp}>
                            Don't Have an Account? Sign Up Here
                        </Button>

                        <Button variant="contained"
                            fullWidth
                            sx={{ mt: 2, mb: 1 }}
                            onClick={goProfile}>
                            Bypass Login
                        </Button>

                        <Button variant="contained"
                            fullWidth
                            sx={{ mt: 2, mb: 1 }}
                            onClick={goHome}>
                            Back to Home
                        </Button>
                    </form>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}