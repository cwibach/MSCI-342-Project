import React from 'react';
import {Button, Grid,RadioGroup, FormControlLabel, Radio, FormLabel
} from '@mui/material';
import { appTheme } from "../../themes/theme";
import {AppPaper2 } from "../../themes/paper";
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
        <Grid>
            <AppPaper2>
                <form onSubmit={handleSearchUnits}>
                    <FormLabel sx={{ mt: 2, mb: 1, ml: 2 }}><strong>Order by:</strong></FormLabel>

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

                    <Button sx={{ mt: 1, mb: 1, ml: 1 }} type="submit" variant="contained">
                        Search for Units
                    </Button>
                </form>
            </AppPaper2>
        </Grid>
    );
}

export default SearchMenuUnits;