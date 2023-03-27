import React from 'react';
import Typography from "@material-ui/core/Typography";
import { Grid, Box, CssBaseline, ThemeProvider } from '@material-ui/core';
import { appTheme } from "../../themes/theme";
import { UserContext } from '../Navigation/PrivateRoute.js';
import ExpandedRenter from './ExpandedRenter';
import UnExpandedRenter from './UnExpandedRenter';


const RenterList = ({ renters }) => {

    // User Id 
    const { userId } = React.useContext(UserContext);

    const [expanded, setExpanded] = React.useState([]);

    const addToExpanded = (renterID) => {
        let tempExpanded = [...expanded];

        tempExpanded.push(renterID);

        setExpanded(tempExpanded);
    }

    const removeFromExpanded = (renterID) => {
        let tempExpanded = [...expanded];

        for (let i = 0; i < tempExpanded.length; i++) {
            if (tempExpanded[i] === renterID) {
                tempExpanded.splice(i, 1);
            }
        }

        setExpanded(tempExpanded);
    }

    return (
        <>
            <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                {(renters.length === 0) ? (<>
                    <Box
                        alignItems="center"
                        style={{
                            backgroundColor: "#9D4EDD",
                            color: "#ffffff",
                            borderRadius: 12
                        }}
                        sx={{ p: 3, mt: 2, mx: "auto", overflow: "hidden" }}
                    >
                        <Typography variant="h4">
                            No Results
                        </Typography>
                    </Box>
                </>) : (<>
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
                                        <ExpandedRenter userId={userId} renter={renter} removeFromExpanded={removeFromExpanded} />
                                    </>) : (<>
                                        <UnExpandedRenter userId={userId} renter={renter} addToExpanded={addToExpanded} />
                                    </>)}
                                </Box>
                            </Box>
                        </Grid>
                    );
                })}
                </>)}
                
            </ThemeProvider>
        </>
    );
}

export default RenterList;