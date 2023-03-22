import React from 'react';
import { Grid, Typography, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { appTheme } from "../../themes/theme";
import InterestedList from "./InterestedList";
import { ExpandedUnitInfo, UnexpandedUnitInfo } from "./UnitInfoBoth";

const ListofUnits = ({ units, userId }) => {
    const [anyExpanded, setAnyExpanded] = React.useState(false);
    const [expanded, setExpanded] = React.useState(0);

    const expandUnit = (unitID) => {
        setExpanded(unitID);
        setAnyExpanded(true);
    }

    const unExpandUnit = () => {
        setExpanded(0);
        setAnyExpanded(false);
    }

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
            {(units.length === 0) ? (<>
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
                {units.map((unit) => {
                    return (
                        <Grid item key={unit.posting_id}>

                            {(expanded === unit.posting_id) ? (<>
                                <Box
                                    alignItems="center"
                                    style={{
                                        backgroundColor: "#9D4EDD",
                                        color: "#ffffff",
                                        borderRadius: 12
                                    }}
                                    sx={{ p: 1, mt: 2, mx: "auto", overflow: "hidden" }}
                                >
                                    <ExpandedUnitInfo unit={unit} unExpandUnit={unExpandUnit} userId={userId} />
                                </Box>
                            </>) : (<>
                                {(anyExpanded) ? (<> </>) : (<>
                                    <Box
                                        alignItems="center"
                                        style={{
                                            backgroundColor: "#9D4EDD",
                                            color: "#ffffff",
                                            borderRadius: 12
                                        }}
                                        sx={{ p: 1, mt: 2, mx: "auto", overflow: "hidden" }}
                                    >
                                        <UnexpandedUnitInfo unit={unit} expandUnit={expandUnit} userId={userId} />
                                    </Box>
                                </>)}
                            </>)}
                        </Grid>
                    );
                })}
            </>)}

            {(anyExpanded) ? (<>
                <InterestedList unitID={expanded} userId={userId} />
            </>) : (<> </>)
            }
        </ThemeProvider >
    );
}


export default ListofUnits;