import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, autocompleteClasses } from '@mui/material';
import { appTheme } from "../../themes/theme";
import NavButton from "../GeneralResources/navButton";
import { UserContext } from '../Navigation/PrivateRoute.js';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function RenterProfile() {

    // Profile List State
    const [profile, setProfile] = React.useState([]);
    const [editMode, setEditMode] = React.useState(false);

    // User Id 
    const { userId } = React.useContext(UserContext);

    // Activates the intital APIs
    React.useEffect(() => {
        getProfile();
    }, [userId]);

    const getProfile = () => {
        callApiGetRenterProfileInfo()
            .then(res => {
                console.log("getRenterProfileInfo returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getRenterProfileInfo parsed: ", parsed);
                setProfile(parsed);
            });
    }

    const callApiGetRenterProfileInfo = async () => {

        const url = serverURL + "/api/getRenterProfileInfo";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                renter_id: userId
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Profile: ", body);
        return body;
    }

    const handleChangeMode = () => {
        setEditMode(!editMode);
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

                        <NavButton destination="/RenterProfile" text="Profile" strong={true} />

                        <NavButton destination="/Community" text="Community" strong={false} />

                        <NavButton destination="/SearchUnits" text="Search Units" strong={false} />

                        <NavButton destination="/RenterLogout" text="Logout" strong={false} />
                    </Box>
                </Toolbar>
            </AppBar>

            {(editMode) ? (<>
                <EditRenterProfile item={profile[0]} handleChangeMode={handleChangeMode} />
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

                                    {/* Row 4 */}
                                    <Box sx={{ display: 'flex', pb: 5 }}></Box>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="h5">
                                            <b>Bedtime:</b> {item.bedtime != '' && item.bedtime}
                                        </Typography>
                                    </Grid>

                                    {/* Row 5 */}
                                    <Box sx={{ display: 'flex', pb: 5 }}></Box>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="h5">
                                            <b>Birthday:</b> {item.birthday != '' && item.birthday}
                                        </Typography>
                                    </Grid>

                                    {/* Row 6 */}
                                    <Box sx={{ display: 'flex', pb: 5 }}></Box>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="h5">
                                            <b>Roommate Gender:</b> {item.gender != '' && item.gender}
                                        </Typography>
                                    </Grid>

                                    {/* Row 7 */}
                                    <Box sx={{ display: 'flex', pb: 5 }}></Box>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="h5">
                                            <b>Cooking Frequency:</b> {item.cook != '' && item.cook}
                                        </Typography>
                                    </Grid>

                                    <Button onClick={handleChangeMode} sx={{ ml: 7, mt: 2 }}
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

const EditRenterProfile = ({ item, handleChangeMode }) => {
    const [firstName, setFirstName] = React.useState(item.first_name);
    const [lastName, setLastName] = React.useState(item.last_name);
    const [phone, setPhone] = React.useState(item.phone);
    const [email, setEmail] = React.useState(item.email);
    const [bedtime, setBedtime] = React.useState(item.bedtime);
    const [birthday, setBirthday] = React.useState(item.birthday);
    const [gender, setGender] = React.useState(item.gender);
    const [cook, setCook] = React.useState(item.cook);

    async function handleFormSubmit(e) {
        e.preventDefault();
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

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleBedtime = (event) => {
        setBedtime(event.target.value);
    }

    const handleBirthday = (event) => {
        setBirthday(event.target.value);
    }

    const handleGender = (event) => {
        setGender(event.target.value);
    }

    const handleCook = (event) => {
        setCook(event.target.value);
    }

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
                        <b>Edit Information</b>
                    </Typography>
                </Grid>

                <Grid container
                    alignContent="center"

                    direction="row" style={{
                        marginTop: 20
                    }}
                >
                    <form onSubmit={handleFormSubmit}>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 1 }}
                            color="primary"
                        >
                            Submit Changes
                        </Button>
                    </form>

                    <Button onClick={handleChangeMode} sx={{ ml: 7, mt: 2 }}
                        variant="contained">
                        Cancel Edit
                    </Button>

                </Grid>
            </Grid>
        </Box>
    );
}

export default RenterProfile;