import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Button, Grid } from '@material-ui/core';
import { appTheme } from "../../themes/theme";
import { AppPaper } from "../../themes/paper";

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
        <Grid margin={appTheme.spacing(2)}>
            {renters.map((renter) => {
                return (
                    <Grid item key={renter.renter_id}>
                        <AppPaper>
                            {(expanded.includes(renter.renter_id)) ? (<>
                                <ExpandedRenter renter={renter} removeFromExpanded={removeFromExpanded} />
                            </>) : (<>
                                <UnExpandedRenter renter={renter} addToExpanded={addToExpanded}/>
                            </>)}
                        </AppPaper>
                    </Grid>
                );
            })}
        </Grid>
    );
}

const ExpandedRenter = ({ renter, removeFromExpanded }) => {
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
                {renter.first_name} {renter.last_name}
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
                Birthday: {renter.birthday}, Roomate Gender: {renter.gender}
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
                Typical bedtime: {renter.bedtime}, Cooking Frequency: {renter.cook}
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
                Phone Number: {renter.phone}, Email address: {renter.email}
            </Typography>

            <Button
                onClick={() => removeFromExpanded(renter.renter_id)}
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

const UnExpandedRenter = ({ renter, addToExpanded }) => {
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
                {renter.first_name} {renter.last_name}
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
                Birthday: {renter.birthday}, Roomate Gender: {renter.gender}
            </Typography>

            <Button
                onClick={() => addToExpanded(renter.renter_id)}
                variant="contained"
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(3),
                    marginBottom: appTheme.spacing(2)
                }}>
                Show Details
            </Button>
        </>
    );
}

export default RenterList;