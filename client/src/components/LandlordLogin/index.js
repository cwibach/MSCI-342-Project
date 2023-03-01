import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';
import TextField from '@mui/material/TextField';
import { useAuth } from "../../contexts/AuthContext";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { UserContext } from '../Navigation/PrivateRoute.js';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

export default function LandlordLogin({setUserID}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { currentUser, login } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    const { userId, setUserId } = React.useContext(UserContext);

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            await login(email, password);

            getLandlordID();

            history.push('/LandlordProfile')
        } catch (e) {
            setAlertVisible(true);
            setAlertMessage("Error on login, please try again");
        }

        setLoading(false);
    }

    const getLandlordID = () => {
        callAPIGetLandlordID()
        .then(res => {
            console.log("callAPIGetLandlordID returned: ", res)
            var parsed = JSON.parse(res.express);
            console.log("parsed result: ", parsed)
            let tempUserID = parsed[0].landlord_id;
            console.log("landlord_id", tempUserID);
            setUserId(tempUserID);
        })
    }

    const callAPIGetLandlordID = async () => {
        const url = serverURL + "/api/getLandlordID";
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

    // React.useEffect(() => {
    //     if (currentUser) {
    //         history.push("/");
    //     }
    // }, [currentUser,]);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };

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
                    spacing={5}
                    direction="column"
                    style={{ maxWidth: "20%" }}>

                    <Button variant="contained"
                        onClick={() => history.push('/')}>
                        Back to Home
                    </Button>
                    
                    <br />

                    <Button variant="contained"
                        onClick={() => history.push('/LandlordSignup')}>
                        Sign Up
                    </Button>

                    <br />

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
                            autoComplete="password"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            disabled={loading}
                        >
                            Log in
                        </Button>
                    </form>


                    <Button variant="contained"
                        onClick={() => history.push('/LandlordProfile')}>
                        Bypass Login
                    </Button>



                </Grid>
            </Box>
        </ThemeProvider>
    );
}


