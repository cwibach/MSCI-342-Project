import React from 'react';
import Typography from "@material-ui/core/Typography";
import { Button, Grid, Box, CssBaseline, ThemeProvider } from '@material-ui/core';
import { appTheme } from "../../themes/theme";

const RenterList = ({ renters }) => {
    const [expanded, setExpanded] = React.useState([]);

    const addToExpanded = (renterID) => {
        let tempExpanded = [...expanded];

        tempExpanded.push(renterID);

        setExpanded(tempExpanded);
    }

    const removeFromExpanded = (renterID) => {
        let tempExpanded = [...expanded];

        for (let i = 0; i < tempExpanded.length; i++) {
            if (tempExpanded[i] == renterID) {
                tempExpanded.splice(i, 1);
            }
        }

        setExpanded(tempExpanded);
    }

    return (
        <>
            <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                {renters.map((renter) => {
                    return (
                        <Grid item key={renter.renter_id}>
                            <Box
                                alignItems="center"
                                style={{
                                    backgroundColor: "#9D4EDD",
                                    color: "#ffffff",
                                    borderRadius: 12
                                }}
                                sx={{ mt: 3, mx: "auto", overflow: "hidden" }}
                            >
                                <Box
                                    margin={3}
                                    marginLeft={5}
                                >
                                    {(expanded.includes(renter.renter_id)) ? (<>
                                        <ExpandedRenter renter={renter} removeFromExpanded={removeFromExpanded} />
                                    </>) : (<>
                                        <UnExpandedRenter renter={renter} addToExpanded={addToExpanded} />
                                    </>)}
                                </Box>
                            </Box>
                        </Grid>
                    );
                })}
            </ThemeProvider>
        </>
    );
}

const ExpandedRenter = ({ renter, removeFromExpanded }) => {
    return (
        <>
            <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                <Typography variant="h5">
                    {renter.first_name} {renter.last_name}
                </Typography>

                <Box
                    marginLeft={2}
                    marginBottom={2}
                >
                    <Typography variant="subtitle1">
                        Birthday: {renter.birthday}, Roomate Gender: {renter.gender}
                    </Typography>

                    <Typography variant="subtitle1">
                        Typical bedtime: {renter.bedtime}, Cooking Frequency: {renter.cook}
                    </Typography>

                    <Typography variant="subtitle1">
                        Phone Number: {renter.phone}, Email address: {renter.email}
                    </Typography>
                </Box>

                <Button
                    onClick={() => removeFromExpanded(renter.renter_id)}
                    variant="contained"
                    style={{ backgroundColor: "#5A189A", color: "#ffffff" }}>
                    Hide Details
                </Button>
            </ThemeProvider>
        </>
    )
}

const UnExpandedRenter = ({ renter, addToExpanded }) => {
    return (
        <>
            <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                <Typography variant="h5">
                    {renter.first_name} {renter.last_name}
                </Typography>

                <Box
                    marginLeft={2}
                    marginBottom={2}
                >
                    <Typography variant="subtitle1">
                        Birthday: {renter.birthday}, Roomate Gender: {renter.gender}
                    </Typography>
                </Box>

                <Button
                    onClick={() => addToExpanded(renter.renter_id)}
                    variant="contained"
                    style={{ backgroundColor: "#5A189A", color: "#ffffff" }}>
                    Show Details
                </Button>
            </ThemeProvider>

        </>
    );
}

export default RenterList;