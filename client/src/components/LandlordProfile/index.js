import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, TextField } from '@mui/material';
import { appTheme } from "../../themes/theme";
import NavButton from "../GeneralResources/navButton";
import { UserContext } from '../Navigation/PrivateRoute.js';


// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function LandlordProfile() {

    // Profile List State
    const [profile, setProfile] = React.useState([]);
    const [EditMode, setEditMode] = React.useState(false);

    // User Id 
    const { userId } = React.useContext(UserContext);

    // Activates the intital APIs
    React.useEffect(() => {
        getProfile();
    }, [userId]);

    const getProfile = () => {
        callApiGetLandlordProfileInfo()
            .then(res => {
                console.log("getLandlordProfileInfo returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getLandlordProfileInfo parsed: ", parsed);
                setProfile(parsed);
                setEditMode(false);
            });
    }

    const callApiGetLandlordProfileInfo = async () => {

        const url = serverURL + "/api/getLandlordProfileInfo";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                landlord_id: userId
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Profile: ", body);
        return body;
    }

    const handleChangeMode = () => {
        setEditMode(!EditMode);
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

                        <NavButton destination="/LandlordProfile" text="Profile" strong={true} />

                        <NavButton destination="/AddUnit" text="Add Posting" strong={false} />

                        <NavButton destination="/MyUnits" text="My Units" strong={false} />

                        <NavButton destination="/LandlordLogout" text="Logout" strong={false} />
                    </Box>
                </Toolbar>
            </AppBar>

            {(EditMode) ? (<>
                <EditLandlordProfile item={profile[0]} handleChangeMode={handleChangeMode} userID={userId} getProfile={getProfile} />
            </>) : (<>
                {/* User Results */}
                {profile.map((item) => {
                    return (
                        <Box
                            alignItems="center"
                            style={{
                                backgroundColor: "#9D4EDD",
                                color: "#ffffff",
                                borderRadius: 12
                            }}
                            sx={{ pb: 7, mt: 5, mx: "auto", maxWidth: 3 / 8, overflow: "hidden" }}
                        >

                            {/* Creates a column grid for the body of the page */}
                            <Grid container
                                direction="column"
                                justifyContent="space-evenly"
                                alignItems="center"

                                display="flex"
                                style={{
                                    marginTop: 45
                                }}
                            >

                                {/* Page Title */}
                                <Grid item>
                                    <Typography variant="h3">
                                        <b>Profile Information</b>
                                    </Typography>
                                </Grid>
                                <Grid container
                                    alignContent="center"

                                    direction="row" style={{
                                        marginTop: 20
                                    }}
                                >
                                    {/* Row 1 */}
                                    <Box sx={{ display: 'flex', pb: 5 }}></Box>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="h5">
                                            <b>Name:</b> {item.first_name != '' && item.first_name} {item.last_name != '' && item.last_name}
                                        </Typography>
                                    </Grid>

                                    {/* Row 2 */}
                                    <Box sx={{ display: 'flex', pb: 5 }}></Box>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h5">
                                            <b>Email:</b> {item.email != '' && item.email}
                                        </Typography>
                                    </Grid>

                                    {/* Row 3 */}
                                    <Box sx={{ display: 'flex', pb: 5 }}></Box>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="h5">
                                            <b>Phone:</b> {item.phone != '' && item.phone}
                                        </Typography>
                                    </Grid>

                                    <Button onClick={handleChangeMode}
                                        sx={{ ml: "auto", mt: 4, mr: "auto", pl: 6, pr: 6 }}
                                        variant="contained">
                                        Edit Profile
                                    </Button>

                                </Grid>
                            </Grid>
                        </Box>

                    );
                })}
            </>)}

        </ThemeProvider>
    );
}

const EditLandlordProfile = ({ item, handleChangeMode, userID, getProfile }) => {
    const [firstName, setFirstName] = React.useState(item.first_name);
    const [lastName, setLastName] = React.useState(item.last_name);
    const [phone, setPhone] = React.useState(item.phone);

    async function handleFormSubmit(e) {
        e.preventDefault();

        editLandlordInfo();
    }

    const handleFirst = (event) => {
        setFirstName(event.target.value);
    }

    const handleLast = (event) => {
        setLastName(event.target.value);
    }

    const handlePhone = (event) => {
        setPhone(event.target.value);
    }


    const editLandlordInfo = () => {
        callApiEditLandlordInfo()
            .then(res => {
                console.log("editLandlordInfo returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("editLandlordInfo parsed: ", parsed);
                getProfile();
            });
    }

    const callApiEditLandlordInfo = async () => {

        const url = serverURL + "/api/editLandlordInfo";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: userID,
                first_name: firstName,
                last_name: lastName,
                phone: phone
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Profile: ", body);
        return body;
    }


    return (
        <Box
            alignItems="center"
            style={{
                backgroundColor: "#9D4EDD",
                color: "#ffffff",
                borderRadius: 12
            }}
            sx={{ p: 5, mt: 5, mx: "auto", maxWidth: 3 / 8, overflow: "hidden" }}
        >

            {/* Creates a column grid for the body of the page */}
            <Grid container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"

                display="flex"
            >

                {/* Page Title */}
                <Grid item>
                    <Typography variant="h3">
                        <b>Edit Information</b>
                    </Typography>
                </Grid>

                <Grid container
                    alignContent="center"
                    direction="column"
                    alignItems="center"
                    style={{ color: "#ffffff" }}
                    justifyContent="center"

                >
                    <form onSubmit={handleFormSubmit}>

                        <Grid container
                            direction="row"
                            spacing={1}
                        >
                            <Grid item xs={6}>
                                <TextField
                                    variant="filled"
                                    style={{ background: "#ffffff" }}
                                    required
                                    fullWidth
                                    value={firstName}
                                    onChange={handleFirst}
                                    label="First Name"
                                    type="text"
                                    sx={{ mt: 2, mb: 1 }}
                                    color="primary"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    variant="filled"
                                    style={{ background: "#ffffff" }}
                                    required
                                    fullWidth
                                    value={lastName}
                                    onChange={handleLast}
                                    label="Last Name"
                                    type="text"
                                    sx={{ mt: 2, mb: 1 }}
                                    color="primary"
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            name="phone"
                            value={phone}
                            onChange={handlePhone}
                            label="Phone Number"
                            id="phone"
                            type="text"
                            sx={{ mt: 1, mb: 1 }}
                            color="primary"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 1 }}
                            color="primary"
                        >
                            Save Changes
                        </Button>

                        <Button onClick={handleChangeMode}
                            fullWidth
                            sx={{ mt: 2, mb: 1 }}
                            color="primary"
                            variant="contained">
                            Cancel
                        </Button>

                    </form>
                </Grid>
            </Grid>
        </Box>
    );
}
export default LandlordProfile;