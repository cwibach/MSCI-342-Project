import React from 'react';
import Typography from "@material-ui/core/Typography";
import {
    AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid,
    RadioGroup, FormControlLabel, Radio, FormLabel
} from '@mui/material';
import { appTheme } from "../../themes/theme";
import { AppPaper, AppPaper2 } from "../../themes/paper";
import { UserContext } from '../Navigation/PrivateRoute.js';
import RenterList from '../RenterList/index';
import NavButton from "../GeneralResources/navButton";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function SearchRenters() {

    // Template Object 
    const initialRenters = [{
        renter_id: 0,
        username: '',
        password: '',
        email: '',
        phone: '',
        bedtime: '',
        birthday: '',
        gender: '',
        cook: '',
        first_name: '',
        last_name: '',
    }]

    // Profile List State
    const [renters, setRenters] = React.useState(initialRenters);

    // Button State
    const [renterMode, setRenterMode] = React.useState(false);

    // User Id *** Temporary ***
    const [userID, setUserID] = React.useState(1);

    // Activates the intital APIs
    React.useEffect(() => {
        getRenters();
    }, []);

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
                renter_id: userID
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
                        alignItems="center">

                        <NavButton destination="/RenterProfile" text="Profile" strong={false} />

                        <NavButton destination="/Community" text="Community" strong={true} />

                        <NavButton destination="/SearchUnits" text="Search Units" strong={false} />

                        <NavButton destination="/RenterLogout" text="Logout" strong={false} />
                    </Box>
                </Toolbar>
            </AppBar>

            <Grid margin={appTheme.spacing(0.5)}>

                {(renterMode) ? (<>
                    <Button onClick={() => setRenterMode(false)}
                        variant="outlined" >
                        <Typography variant="h5" color="inherit" noWrap>
                            Return to Search
                        </Typography>
                    </Button>

                    <RenterList renters={renters} />
                </>) : (<>
                    <Button onClick={() => setRenterMode(true)}
                        variant="outlined">
                        <Typography variant="h5" color="inherit" noWrap>
                            See Renters
                        </Typography>
                    </Button>

                    <SearchMenuRenters setRenters={setRenters} setRenterMode={setRenterMode} />
                </>)}

            </Grid>



        </ThemeProvider>
    );
}

const SearchMenuRenters = ({ setRenters, setRenterMode }) => {

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
            <Grid
                style={{ color: "#e6e6e6" }}

            >
                <AppPaper2>
                    <form /*onSubmit={handleSearchUnits}*/>
                        <FormLabel sx={{ mt: 2, mb: 1, ml: 2 }}><strong>Filter by:</strong></FormLabel>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    variant="filled"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Age"
                                    
                                // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Coed</MenuItem>
                                    <MenuItem value={20}>Male Only</MenuItem>
                                    <MenuItem value={30}>Female Only</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <TextField
                                    variant="filled"
                                    style={{ background: "#e6e6e6" }}
                                    // required
                                    // fullWidth
                                    id="Price"
                                    label="Price"
                                    name="Price"
                                    // sx={{ mt: 3, mb: 2 }}
                                    color="primary"
                                    
                                // onChange={handleEmail}
                                />
                            </FormControl>
                
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                    variant="filled"
                                    style={{ background: "#e6e6e6" }}
                                    // required
                                    // fullWidth
                                    id="Location"
                                    label="Location"
                                    name="Location"
                                    // sx={{ mt: 3, mb: 2 }}
                                    color="primary"
                                    
                                // onChange={handleEmail}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 80}}>
                                <TextField
                                    variant="filled"
                                    style={{ background: "#e6e6e6" }}
                                    // required
                                    // fullWidth
                                    id="Age"
                                    label="Age"
                                    name="Age"
                                    // sx={{ mt: 3, mb: 2 }}
                                    color="primary"
                                    
                                // onChange={handleEmail}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>

                                <TextField
                                    variant="filled"
                                    style={{ background: "#e6e6e6" }}
                                    required
                                    fullWidth
                                    name="bedtime"
                                    // value={bedtime}
                                    // onChange={handleBedtime}
                                    label="Bedtime"
                                    id="bedtime"
                                    type="time"
                                    // InputLabelProps={{ shrink: true }}
                                    // sx={{ mt: 3, mb: 2 }}
                                    color="primary"
                                    
                                />

                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="demo-simple-select-label">Cooking Frequency</InputLabel>
                                <Select
                                    variant = "filled"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Age"
                                    
                                // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Always</MenuItem>
                                    <MenuItem value={20}>Often</MenuItem>
                                    <MenuItem value={30}>Sometimes</MenuItem>
                                    <MenuItem value={30}>Never</MenuItem>

                                </Select>
                            </FormControl>

                        </div>
                        {/* <RadioGroup
                        // value={sortMethod} 
                        row
                        // onChange={handleSortChange}
                        sx={{ mt: 0, mb: 1, ml: 2 }}
                    >
                        <FormControlLabel value={0} control={<Radio />} label="Female Only" sx={{ mt: 0, mb: 0, ml: 1 }} />
                        <FormControlLabel value={1} control={<Radio />} label="Male Only" sx={{ mt: 0, mb: 0, ml: 1 }} />
                        <FormControlLabel value={2} control={<Radio />} label="Coed" sx={{ mt: 0, mb: 0, ml: 1 }} />
                        <FormControlLabel value={3} control={<Radio />} label="17 years old" sx={{ mt: 0, mb: 0, ml: 1 }} />
                    </RadioGroup> */}



                        <Button sx={{ mt: 1, mb: 1, ml: 1 }} type="submit" variant="contained">
                            Search for Units
                        </Button>
                    </form>
                </AppPaper2>
            </Grid>
        </ThemeProvider>


    );
}

export default SearchRenters;