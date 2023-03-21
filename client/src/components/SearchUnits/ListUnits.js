import React from 'react';
import { Grid, Typography, ThemeProvider, CssBaseline } from '@mui/material';
import { appTheme } from "../../themes/theme";
import { AppPaper2 } from "../../themes/paper";
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
            <Grid>
                <AppPaper2>
                    {(units.length === 0) ? (<>
                        <Typography
                            style={{
                                marginTop: appTheme.spacing(1),
                                marginLeft: appTheme.spacing(3)
                            }}
                            variant="h4"
                            component="div"
                            color="inherit"
                        >
                            Sorry, no units found. Try different filters.
                        </Typography>
                    </>) : (<>
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
                    </>)}

                </AppPaper2>

                {(anyExpanded) ? (<>
                    <InterestedList unitID={expanded} userId={userId} />
                </>) : (<> </>)}
            </Grid>
        </ThemeProvider>
    );
}


export default ListofUnits;