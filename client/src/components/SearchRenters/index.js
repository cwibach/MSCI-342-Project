import React from 'react';
import Typography from "@material-ui/core/Typography";
import {
    AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, 
    Grid, FormControlLabel, Checkbox
} from '@mui/material';
import { appTheme } from "../../themes/theme";
import RenterList from '../RenterList/index';
import NavButton from "../GeneralResources/navButton";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { UserContext } from '../Navigation/PrivateRoute.js';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function SearchRenters() {

    // Profile List State
    const [renters, setRenters] = React.useState([]);

    // Button State
    const [renterMode, setRenterMode] = React.useState(false);

    // User Id 
    const { userId } = React.useContext(UserContext);

    // Activates the intital APIs
    React.useEffect(() => {
        getRenters();
    }, [userId]);

    const getRenters = () => {
        callApiGetRenters()
            .then(res => {
                console.log("getRenters returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getRenters parsed: ", parsed);
                setRenters(parsed);
            });
    }

    const callApiGetRenters = async () => {
        const url = serverURL + "/api/getRenters";
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
        console.log("Renters: ", body);
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
                        alignItems="center"
                    >

                        <NavButton destination="/RenterProfile" text="Profile" strong={false} />

                        <NavButton destination="/Community" text="Community" strong={true} />

                        <NavButton destination="/SearchUnits" text="Search Units" strong={false} />

                        <NavButton destination="/RenterLogout" text="Logout" strong={false} />
                    </Box>
                </Toolbar>
            </AppBar>

            <Grid margin={appTheme.spacing(3 / 4)}>

                {(renterMode) ? (<>

                    <Button onClick={() => setRenterMode(false)}
                        variant="outlined"
                    >
                        <Typography variant="h5" noWrap>
                            Return to Search
                        </Typography>
                    </Button>

                    <RenterList renters={renters} />

                </>) : (<>

                    <SearchMenuRenters userId={userId} setRenters={setRenters} setRenterMode={setRenterMode} />


                </>)}

            </Grid>



        </ThemeProvider>
    );
}


const SearchMenuRenters = ({ userId, setRenters, setRenterMode }) => {

    const [renterCook, setRenterCook] = React.useState("");
    const [renterGender, setRenterGender] = React.useState("");
    const [renterBed, setRenterBed] = React.useState("");
    const [onlyFriends, setOnlyFriends] = React.useState(false);

    const handleSearchRenters = (event) => {
        event.preventDefault()

        getFilteredRenters()
    }

    const handleReset = () => {
        setRenterCook("")
        setRenterGender("")
        setRenterBed("")
        setOnlyFriends(false)
    }

    const getFilteredRenters = () => {
        callApiGetFilteredRenters()
            .then(res => {
                console.log("getFilteredRenters returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getFilteredRenters parsed: ", parsed);
                setRenters(parsed);
                setRenterMode(true)
            });
    }

    const callApiGetFilteredRenters = async () => {
        const url = serverURL + "/api/getFilteredRenters";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                renterCook: renterCook,
                renterGender: renterGender,
                renterBed: renterBed,
                renter_id: userId,
                onlyFriends: onlyFriends
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Renters: ", body);
        return body;
    }



    const handleCookChange = (event) => {
        setRenterCook(event.target.value)
    }

    const handleBedChange = (event) => {
        setRenterBed(event.target.value)
    }

    const handleGenderChange = (event) => {
        setRenterGender(event.target.value)
    }

    const handleOnlyFriends = (event) => {
        setOnlyFriends(event.target.checked);
    }

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
            <Box
                alignItems="center"
                style={{
                    backgroundColor: "#9D4EDD",
                    color: "#ffffff",
                    borderRadius: 12
                }}
                sx={{ p: 2, mt: 5, mx: "auto", overflow: "hidden" }}
            >

                <form onSubmit={handleSearchRenters}>
                    <Box
                        display="flex"
                        alignItems={"center"}
                    >
                        <Typography variant="h5">
                            <b>Filter by:</b>
                        </Typography>

                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            flexGrow={1}
                            alignItems="flex-start"
                        >
                            <Button variant="contained" onClick={handleReset}>
                                Reset Filters
                            </Button>
                        </Box>
                    </Box>

                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl
                                    variant="filled"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{ background: "#ffffff" }}
                                >
                                    <InputLabel id="gender-label">Roomate Gender</InputLabel>
                                    <Select
                                        name="gender"
                                        value={renterGender}
                                        onChange={handleGenderChange}
                                        label="Gender"
                                        id="gender"
                                        color="primary"
                                    >
                                        <MenuItem value="Coed">Coed</MenuItem>
                                        <MenuItem value="Male Only">Male Only</MenuItem>
                                        <MenuItem value="Female Only">Female Only</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    variant="filled"
                                    style={{ background: "#ffffff" }}
                                    fullWidth
                                    name="bedtime"
                                    value={renterBed}
                                    onChange={handleBedChange}
                                    label="Bedtime Before"
                                    id="bedtime"
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mt: 3, mb: 2 }}
                                    color="primary"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl
                                    variant="filled"
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{ background: "#ffffff" }}
                                >
                                    <InputLabel id="cook-label">Cooking Frequency</InputLabel>
                                    <Select
                                        name="cook"
                                        value={renterCook}
                                        onChange={handleCookChange}
                                        label="Cook"
                                        id="cook"
                                        color="primary"
                                    >
                                        <MenuItem value="Always">Always</MenuItem>
                                        <MenuItem value="Often">Often</MenuItem>
                                        <MenuItem value="Sometimes">Sometimes</MenuItem>
                                        <MenuItem value="Never">Never</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box
                        display="flex"
                        alignItems={"center"}
                        sx={{ mt: 4, mb: 1 }}
                    >
                        <Button sx={{ ml: 1 }} type="submit" variant="contained">
                            Search for Renters
                        </Button>

                        <Box
                            display="flex"
                            justifyContent="flex-start"
                            alignContent={"center"}
                            flexGrow={1}
                            alignItems="flex-start"
                            sx={{ ml: 3 }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={onlyFriends}
                                        onChange={handleOnlyFriends}
                                    />
                                }
                                label="Only Show Friends"
                            />
                        </Box>
                    </Box>

                </form>
            </Box>

        </ThemeProvider>
    );
}

export default SearchRenters;