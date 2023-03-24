import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, TextField } from '@mui/material';
import { appTheme } from "../../themes/theme";
import NavButton from "../GeneralResources/navButton";
import { UserContext } from '../Navigation/PrivateRoute.js';
import {SuccessAlert} from '../GeneralResources/alert.js';


// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function AddUnit() {

    // User Id 
    const { userId } = React.useContext(UserContext);

    // Form Value States
    const [rooms, setRooms] = React.useState('');
    const [bathrooms, setBathrooms] = React.useState('');
    const [apt_price, setApt_price] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [visible, setVisible] = React.useState(true);

    const [successVisible, setSuccessVisible] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("");

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
                setSuccessMessage("Posting Succesfully Created!");
            });
    }

    const callApiAddPosting = async () => {
        setSuccessMessage("Creating Posting...")
        setSuccessVisible(true);

        const url = serverURL + "/api/addPosting";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                creator_id: userId,
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

                        <NavButton destination="/LandlordProfile" text="Profile" strong={false} />

                        <NavButton destination="/AddUnit" text="Add Posting" strong={true} />

                        <NavButton destination="/MyUnits" text="My Units" strong={false} />

                        <NavButton destination="/LandlordLogout" text="Logout" strong={false} />

                    </Box>
                </Toolbar>
            </AppBar>

            <SuccessAlert alertVisible={successVisible} alertMessage={successMessage} setAlertVisible={setSuccessVisible}/>

            <Box
                alignItems="center"
                style={{
                    backgroundColor: "#9D4EDD",
                    color: "#ffffff",
                    borderRadius: 12
                }}
                sx={{ mt: 5, mx: "auto", maxWidth: 3 / 8, overflow: "hidden" }}
            >
                <Box
                    margin={5}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                >
                    {/* Creates a column grid for the body of the page */}
                    <Grid container
                        direction="column"
                        alignItems="center"
                        style={{ color: "#ffffff" }}
                        justifyContent="center"
                    >

                        {/* Page Title */}
                        <Grid item>
                            <Typography variant="h3">
                                <b>Create New Posting</b>
                            </Typography>
                        </Grid>

                        {/* Posting Information Input */}
                        <Box>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    variant="filled"
                                    style={{ background: "#ffffff" }}
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
                                    style={{ background: "#ffffff" }}
                                    required
                                    fullWidth
                                    id="rooms"
                                    type="number"
                                    label="Number of Rooms"
                                    name="rooms"
                                    value={rooms}
                                    onChange={handleRooms}
                                    sx={{ mt: 2, mb: 2 }}
                                    color="primary"
                                />

                                <TextField
                                    variant="filled"
                                    style={{ background: "#ffffff" }}
                                    required
                                    fullWidth
                                    id="bathrooms"
                                    type="number"
                                    label="Number of Bathrooms"
                                    name="bathrooms"
                                    value={bathrooms}
                                    onChange={handleBathrooms}
                                    sx={{ mt: 2, mb: 2 }}
                                    color="primary"
                                />

                                <TextField
                                    variant="filled"
                                    style={{ background: "#ffffff" }}
                                    required
                                    fullWidth
                                    name="apt_price"
                                    value={apt_price}
                                    onChange={handleApt_price}
                                    label="Monthly Rent of Apartment"
                                    id="apt_price"
                                    type="number"
                                    sx={{ mt: 2, mb: 2 }}
                                    color="primary"
                                />

                                <Button
                                    type="submit"
                                    style={{ background: "#5A189A" }}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2 }}
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                </Box>
            </Box>

        </ThemeProvider>
    );
}

export default AddUnit;