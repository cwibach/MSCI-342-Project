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

function AddUnit() {

    // User Id *** Temporary ***
    const [userID, setUserID] = React.useState(1);

    // Form Value States
    const [rooms, setRooms] = React.useState('');
    const [bathrooms, setBathrooms] = React.useState('');
    const [apt_price, setApt_price] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [visible, setVisible] = React.useState(true);

    // Handles submitting the form
    const handleSubmit = (event) => {

        // Checks if every input was filled in
        if (rooms !== '' && bathrooms !== '' && apt_price !== '' && address !== '') {
            // Post to Database
            addPosting();

            // Reset Textfields
            setRooms('');
            setBathrooms('');
            setApt_price('');
            setAddress('');
        }

    };

    // Functions to handle the form values
    const handleRooms = (event) => {
        setRooms(event.target.value)
    }

    const handleBathrooms = (event) => {
        setBathrooms(event.target.value)
    }
    const handleApt_price = (event) => {
        setApt_price(event.target.value)
    }
    const handleAddress = (event) => {
        setAddress(event.target.value)
    }

    // Calling server API
    const addPosting = () => {
        callApiAddPosting()
            .then(res => {
                console.log("callApiAddPosting returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiAddPosting parsed: ", parsed);
            });
    }

    const callApiAddPosting = async () => {
        const url = serverURL + "/api/addPosting";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                creator_id: userID,
                rooms: rooms,
                bathrooms: bathrooms,
                apt_price: apt_price,
                visible: visible,
                address: address
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Posting: ", body);
        return body;
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
                            onClick={() => history.push('/LandlordProfile')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                Profile
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/AddUnit')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                <strong>Add Posting</strong>
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/MyUnits')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                My Units
                            </Typography>
                        </Button>

                        <Button
                            color="inherit"
                            style={{ cursor: "pointer" }}
                            onClick={() => history.push('/')}
                            size='medium'
                            sx={{ p: 3 }}>
                            <Typography variant="h5" noWrap>
                                Logout
                            </Typography>
                        </Button>

                    </Box>
                </Toolbar>
            </AppBar>



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
                            <b>Create New Posting</b>
                        </Typography>
                    </Grid>

                    {/* Posting Information Input */}
                    <Box>
                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            color="primary"
                            name="address"
                            value={address}
                            onChange={handleAddress}
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            sx={{ mt: 3, mb: 2 }}
                            autoFocus
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="rooms"
                            type="number"
                            label="Number of Rooms"
                            name="rooms"
                            value={rooms}
                            onChange={handleRooms}
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="bathrooms"
                            type="number"
                            label="Number of Bathrooms"
                            name="bathrooms"
                            value={bathrooms}
                            onChange={handleBathrooms}
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="apt_price"
                            value={apt_price}
                            onChange={handleApt_price}
                            label="Monthly Rent of Apartment"
                            id="apt_price"
                            type="number"
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

export default AddUnit;