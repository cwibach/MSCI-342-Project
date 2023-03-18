import React from 'react';
import {
    AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid,
    RadioGroup, FormControlLabel, Radio, FormLabel, TextField, Typography,
    InputAdornment, InputLabel
} from '@mui/material';
import { appTheme } from "../../themes/theme";
import { AppPaper, AppPaper2 } from "../../themes/paper";
import { UserContext } from '../Navigation/PrivateRoute.js';
import RenterList from '../RenterList/index';
import NavButton from "../GeneralResources/navButton";
import AlertBar from '../GeneralResources/alert';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

const SearchUnits = () => {
    // Profile List State
    const [unitList, setUnitList] = React.useState([]);
    const [unitMode, setUnitMode] = React.useState(false);
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    // User Id *** Temporary ***
    const { userID } = React.useContext(UserContext);

    // Activates the intital APIs
    React.useEffect(() => {
        getAllUnits();
    }, []);

    const getAllUnits = () => {
        callApiGetAllUnits()
            .then(res => {
                console.log("getAllUnits returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getAllUnits parsed: ", parsed);
                setUnitList(parsed);
            });
    }

    const callApiGetAllUnits = async () => {
        const url = serverURL + "/api/getAllUnits";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("All Units: ", body);
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

                        <NavButton destination="/Community" text="Community" strong={false} />

                        <NavButton destination="/SearchUnits" text="Search Units" strong={true} />

                        <NavButton destination="/RenterLogout" text="Logout" strong={false} />
                    </Box>
                </Toolbar>
            </AppBar>

            <AlertBar alertMessage={alertMessage} alertVisible={alertVisible} setAlertVisible={setAlertVisible} />

            <Grid margin={appTheme.spacing(0.5)}>

                {(unitMode) ? (<>
                    <Button onClick={() => setUnitMode(false)}
                        variant="outlined" >
                        <Typography variant="h5" color="inherit" noWrap>
                            Return to Search
                        </Typography>
                    </Button>

                    <ListofUnits units={unitList} userID={userID} />
                </>) : (<>
                    <Button onClick={() => setUnitMode(true)}
                        variant="outlined">
                        <Typography variant="h5" color="inherit" noWrap>
                            See Units
                        </Typography>
                    </Button>

                    <SearchMenuUnits setUnitList={setUnitList} setUnitMode={setUnitMode}
                        setAlertMessage={setAlertMessage} setAlertVisible={setAlertVisible} />
                </>)}

            </Grid>
        </ThemeProvider>
    );
}

const ListofUnits = ({ units, userID }) => {
    const [anyExpanded, setAnyExpanded] = React.useState(false);
    const [expanded, setExpanded] = React.useState(0);
    const [expandedDetails, setExpandedDetails] = React.useState({});

    const expandUnit = (unitID) => {
        setExpanded(unitID);
        setAnyExpanded(true);

        for (let i = 0; i < units.length; i++) {
            if (units[i].id === unitID) {
                setExpandedDetails(units[i]);
            }
        }
    }

    const unExpandUnit = () => {
        setExpanded(0);
        setAnyExpanded(false);
    }

    return (
        <Grid>
            <AppPaper2>
                {units.map((unit) => {
                    return (
                        <Grid item key={unit.posting_id}>
                            {(expanded === unit.posting_id) ? (<>
                                <ExpandedUnitInfo unit={unit} unExpandUnit={unExpandUnit} />
                            </>) : (<>
                                {(anyExpanded) ? (<> </>) : (<>
                                    <UnexpandedUnitInfo unit={unit} expandUnit={expandUnit} />
                                </>)}
                            </>)}
                        </Grid>
                    );
                })}
            </AppPaper2>

            {(anyExpanded) ? (<>
                <InterestedList unitID={expanded} userID={userID} />
            </>) : (<> </>)}
        </Grid>
    );
}

const ExpandedUnitInfo = ({ unit, unExpandUnit }) => {

    return (
        <>
            <Typography
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(3)
                }}
                variant="h5"
                component="div"
                color="inherit"
            >
                {unit.address}
            </Typography>

            <Typography
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(5),
                    marginBottom: appTheme.spacing(1)
                }}
                variant="subtitle1"
                component="div"
                color="inherit"
            >
                {unit.rooms} Bedrooms, {unit.bathrooms} Bathrooms,
            </Typography>

            <Typography
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(5),
                    marginBottom: appTheme.spacing(1)
                }}
                variant="subtitle1"
                component="div"
                color="inherit"
            >
                ${unit.apt_price / unit.rooms}/person/month, Total Price: ${unit.apt_price}/month
            </Typography>

            <Button
                onClick={() => unExpandUnit()}
                variant="contained"
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(3),
                    marginBottom: appTheme.spacing(2)
                }}>

                Hide Details
            </Button>
        </>
    )
}

const UnexpandedUnitInfo = ({ unit, expandUnit }) => {

    return (
        <>
            <Typography
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(3)
                }}
                variant="h5"
                component="div"
                color="inherit"
            >
                {unit.address}
            </Typography>

            <Button onClick={() => expandUnit(unit.posting_id)}
                variant="contained"
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(3),
                    marginBottom: appTheme.spacing(2)
                }}>
                See Details
            </Button>
        </>
    )
}

const InterestedList = ({ unitID, userID }) => {

    // Profile List State
    const [renters, setRenters] = React.useState([]);

    // Activates the intital APIs
    React.useEffect(() => {
        getInterestedRenters();
    }, []);

    const getInterestedRenters = () => {
        callApiGetInterestedRenters()
            .then(res => {
                console.log("getInterestedRenters returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getInterestedRenters parsed: ", parsed);
                setRenters(parsed);
            });
    }

    const callApiGetInterestedRenters = async () => {
        const url = serverURL + "/api/getInterestedRenters";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                posting_id: unitID,
                renter_id: userID
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Renters: ", body);
        return body;
    }

    return (
        <>
            <AppPaper>
                <Typography
                    style={{
                        marginTop: appTheme.spacing(1),
                        marginLeft: appTheme.spacing(4),
                        marginBottom: appTheme.spacing(1)
                    }}
                    variant="h5"
                    component="div"
                    color="inherit"
                >
                    Interested Renters:
                </Typography>
            </AppPaper>

            <RenterList renters={renters} />
        </>
    );
}

const SearchMenuUnits = ({ setUnitList, setUnitMode, setAlertVisible, setAlertMessage }) => {
    const [sortMethod, setSortMethod] = React.useState(0);
    const [minPrice, setMinPrice] = React.useState(0);
    const [maxPrice, setMaxPrice] = React.useState(1000000);

    const handleSearchUnits = (event) => {
        event.preventDefault();

        if (maxPrice < minPrice) {
            setAlertMessage("Maximum price must be greater than minimum price");
            setAlertVisible(true);
        } else {

            getFilteredUnits();

            setUnitMode(true);
        }
    }

    const handleSortChange = (event) => {
        setSortMethod(event.target.value);
    }

    const getFilteredUnits = () => {
        callApiGetFilteredUnits()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setUnitList(parsed);
            });
    }

    const callApiGetFilteredUnits = async () => {
        const url = serverURL + "/api/getFilteredUnits";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sortMethod: sortMethod,
                minPrice: minPrice,
                maxPrice: maxPrice
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Filtered Units: ", body);
        return body;
    }

    const handleMinPriceChange = (event) => {
        if (isNaN(event.target.value)) {
            setAlertMessage("Please enter a number for minimum price");
            setAlertVisible(true);
        } else {
            setMinPrice(parseInt(event.target.value));
        }
    }

    const handleMaxPriceChange = (event) => {
        if (isNaN(event.target.value)) {
            setAlertMessage("Please enter a number for maximum price");
            setAlertVisible(true);
        } else {
            setMaxPrice(parseInt(event.target.value));
        }

    }

    return (
        <Grid>
            <AppPaper2>
                <form onSubmit={handleSearchUnits}>
                    <FormLabel sx={{ mt: 2, mb: 1, ml: 2}}><strong>Order by:</strong></FormLabel>

                    <RadioGroup
                        value={sortMethod} row
                        onChange={handleSortChange}
                        sx={{ mt: 0, mb: 1, ml: 2 }}
                    >
                        <FormControlLabel value={0} control={<Radio />} label="Oldest to Newest" sx={{ mt: 0, mb: 0, ml: 1 }} />
                        <FormControlLabel value={1} control={<Radio />} label="Newest to Oldest" sx={{ mt: 0, mb: 0, ml: 1 }} />
                        <FormControlLabel value={2} control={<Radio />} label="Least to Most Expensive" sx={{ mt: 0, mb: 0, ml: 1 }} />
                        <FormControlLabel value={3} control={<Radio />} label="Most to Least Expensive" sx={{ mt: 0, mb: 0, ml: 1 }} />
                    </RadioGroup>

                    <Box columnGap={2} sx={{ display: "flex", flexwrap: 'wrap', p: 1, backgroundColor: 'primary.background',
                     width:2/3, alignItems: 'center', justifyContent: 'center'}}>
                        <TextField
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> $ </InputAdornment>
                            }}
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            sx={{width: 3/7 }}
                            label="Minimum Price"
                            type="number"
                        />

                        <Typography
                            sx={{width: 1/7}}
                            variant="h6"
                            gutterBottom
                        >
                            &lt;= Price &lt;=
                        </Typography>

                        <TextField
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> $ </InputAdornment>
                            }}
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            label="Maximum Price"
                            sx={{width: 3/7}}
                            type="number"
                        />
                    </Box>

                    <Button sx={{ mt: 1, mb: 1, ml: 1 }} type="submit" variant="contained">
                        Search for Units
                    </Button>
                </form>
            </AppPaper2>
        </Grid>
    );
}

export default SearchUnits;