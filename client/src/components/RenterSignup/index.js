import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import history from '../Navigation/history';
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, TextField } from '@mui/material';
import { appTheme } from "../../themes/theme";

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function RenterSignup() {

    // Form Value States
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [bedtime, setBedtime] = React.useState('');
    const [birthday, setBirthday] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [cook, setCook] = React.useState('');
    const [first_name, setFirst_name] = React.useState('');
    const [last_name, setLast_name] = React.useState('');

    // Handles submitting the form
    const handleSubmit = (event) => {

        // Checks if every input was filled in
        if (username !== '' && password !== '' && email !== '' && phone !== '' && first_name !== '' && last_name !== '') {
            // Post to Database
            addLandlord();

            // Reset Textfields
            setUsername('');
            setPassword('');
            setEmail('');
            setPhone('');
            setFirst_name('');
            setLast_name('');

            // Go to profile page
            history.push('/LandlordProfile')

        }

    };

    // Functions to handle the form values
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
        setUsername(event.target.value.split("@")[0])
    }
    const handlePhone = (event) => {
        setPhone(event.target.value)
    }
    const handleFirst_name = (event) => {
        setFirst_name(event.target.value)
    }
    const handleLast_name = (event) => {
        setLast_name(event.target.value)
    }

    // Calling server API
    const addLandlord = () => {
        callApiAddLandlord()
            .then(res => {
                console.log("callApiAddLandlord returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiAddLandlord parsed: ", parsed);
            });
    }

    const callApiAddLandlord = async () => {
        const url = serverURL + "/api/addLandlord";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                phone: phone,
                bedtime: bedtime,
                birthday: birthday,
                gender: gender,
                cook: cook,
                first_name: first_name,
                last_name: last_name
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Landlord: ", body);
        return body;
    }

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />

            <Box
                margin={6}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"flex-start"}
            >
                {/* Creates a column grid for the body of the page */}
                <Grid container
                    direction="column"
                    alignItems="center"
                    style={{ color: "#e6e6e6" }}
                    justifyContent="center"
                    xs={4}
                >

                    {/* Page Title */}
                    <Grid item>
                        <Typography variant="h3">
                            <b>Renter Sign Up</b>
                        </Typography>
                    </Grid>

                    {/* Posting Information Input */}
                    <Box>
                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="first_name"
                            value={first_name}
                            onChange={handleFirst_name}
                            label="First Name"
                            id="first_name"
                            type="text"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="last_name"
                            value={last_name}
                            onChange={handleLast_name}
                            label="Last Name"
                            id="last_name"
                            type="text"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="phone"
                            value={phone}
                            onChange={handlePhone}
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
                            name="email"
                            value={email}
                            onChange={handleEmail}
                            label="Email Address"
                            id="email"
                            type="text"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="password"
                            value={password}
                            onChange={handlePassword}
                            label="Password"
                            id="password"
                            type="text"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Box>

        </ThemeProvider>
    );
}

export default RenterSignup;