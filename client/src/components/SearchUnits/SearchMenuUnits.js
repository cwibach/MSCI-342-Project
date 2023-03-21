import React from 'react';
import {
    Button, Box, RadioGroup, FormControlLabel, Radio, FormLabel,
    ThemeProvider, CssBaseline, Grid, Typography, TextField
} from '@mui/material';
import { appTheme } from "../../themes/theme";
import LessGreaterNumericBox from "../GeneralResources/LessGreaterNumericBox";

const serverURL = "";

const SearchMenuUnits = ({ setUnitList, setUnitMode, setAlertVisible, setAlertMessage }) => {
    const [sortMethod, setSortMethod] = React.useState(0);
    const [minPrice, setMinPrice] = React.useState(0);
    const [maxPrice, setMaxPrice] = React.useState(1000000);
    const [minBed, setMinBed] = React.useState(0);
    const [maxBed, setMaxBed] = React.useState(100);
    const [minBath, setMinBath] = React.useState(0);
    const [maxBath, setMaxBath] = React.useState(100);

    const handleReset = () => {
        setSortMethod(0)
        setMinPrice(0)
        setMaxPrice(1000000)
        setMinBed(0)
        setMaxBed(100)
        setMinBath(0)
        setMaxBath(100)
    }

    const handleSearchUnits = (event) => {
        event.preventDefault();

        if (maxPrice < minPrice) {
            setAlertMessage("Maximum price must be greater than minimum price");
            setAlertVisible(true);
            setMinPrice(maxPrice);
        } else if (maxBed < minBed) {
            setAlertMessage("Maximum number of bedrooms must be greater than minimum number of bedrooms");
            setAlertVisible(true);
            setMinBed(maxBed);
        } else if (maxBath < minBath) {
            setAlertMessage("Maximum number of bedrooms must be greater than minimum number of bedrooms");
            setAlertVisible(true);
            setMinBath(maxBath);
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
                maxPrice: maxPrice,
                minBed: minBed,
                maxBed: maxBed,
                minBath: minBath,
                maxBath: maxBath
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Filtered Units: ", body);
        return body;
    }

    const handleMinPriceChange = (event) => {
        setMinPrice(parseInt(event.target.value));
    }

    const handleMaxPriceChange = (event) => {
        setMaxPrice(parseInt(event.target.value));
    }

    const handleMinBedChange = (event) => {
        setMinBed(parseInt(event.target.value));
    }

    const handleMaxBedChange = (event) => {
        setMaxBed(parseInt(event.target.value));
    }

    const handleMinBathChange = (event) => {
        setMinBath(parseInt(event.target.value));
    }

    const handleMaxBathChange = (event) => {
        setMaxBath(parseInt(event.target.value));
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

                <form onSubmit={handleSearchUnits}>
                    <Box
                        display="flex"
                        alignItems={"center"}
                    >
                        <Typography variant="h5">
                            <b>Order by:</b>
                        </Typography>

                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            flexGrow={1}
                            alignItems="flex-start"
                        >
                            <Button
                                variant="contained"
                                onClick={handleReset}
                            >
                                Reset Filters
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        textAlign={"center"}
                        alignItems={"center"}
                        alignContent={"center"}
                        sx={{ mt: 1 }}
                    >
                        <RadioGroup
                            value={sortMethod}
                            onChange={handleSortChange}
                        >
                            <Grid container
                                direction={"row"}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel value={0} control={<Radio />} label="Oldest to Newest" />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel value={1} control={<Radio />} label="Newest to Oldest" />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel value={2} control={<Radio />} label="Least to Most Expensive" />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel value={3} control={<Radio />} label="Most to Least Expensive" />
                                </Grid>
                                <Grid item xs={2}></Grid>
                            </Grid>
                        </RadioGroup>
                    </Box>

                    <Box>
                        <Typography variant="h5">
                            <b>Filter by:</b>
                        </Typography>

                        <LessGreaterNumericBox minValue={minPrice} maxValue={maxPrice} minChange={handleMinPriceChange}
                            maxChange={handleMaxPriceChange} minLabel={"Minimum Total Price"} maxLabel={"Maximum Total Price"}
                            centreLabel={"Total Price"} icon={"$"}
                        />

                        <LessGreaterNumericBox minValue={minBed} maxValue={maxBed} minChange={handleMinBedChange}
                            maxChange={handleMaxBedChange} minLabel={"Minimum # of Bedrooms"} maxLabel={"Maximum # of Bedrooms"}
                            centreLabel={"# of Bedrooms"}
                        />

                        <LessGreaterNumericBox minValue={minBath} maxValue={maxBath} minChange={handleMinBathChange}
                            maxChange={handleMaxBathChange} minLabel={"Minimum # of Bathrooms"} maxLabel={"Maximum # of Bathrooms"}
                            centreLabel={"# of Bathrooms"}
                        />

                    </Box>

                    <Box>
                        <Button sx={{ mt: 1, mb: 1, ml: 1 }} type="submit" variant="contained">
                            Search for Units
                        </Button>
                    </Box>

                </form>
            </Box>
        </ThemeProvider>
    );
}

export default SearchMenuUnits;