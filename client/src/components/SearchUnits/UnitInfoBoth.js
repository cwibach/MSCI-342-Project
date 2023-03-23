import React from 'react';
import { Button, Typography, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { appTheme } from "../../themes/theme";

const serverURL = "";

export const ExpandedUnitInfo = ({ unit, unExpandUnit, userId }) => {

    /*
        Check if renter is interested
    */

    // Creates state variable
    const [interest, setInterest] = React.useState(0)

    // Activates the intital APIs
    React.useEffect(() => {
        isInterested();
    }, []);

    const isInterested = () => {
        callApiIsInterested()
            .then(res => {
                console.log("isInterested returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("isInterested parsed: ", parsed);
                setInterest(parsed[0].count);
            });
    }

    const callApiIsInterested = async () => {
        const url = serverURL + "/api/isInterested";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                posting_id: unit.posting_id,
                renter_id: userId
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("isInterested: ", body);
        return body;
    }

    /*
        Change interest
    */

    const handleChangeInterest = () => {
        addInterest()
    }

    const addInterest = () => {
        callApiAddInterest()
            .then(res => {
                console.log("callApiAddInterest returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiAddInterest parsed: ", parsed);
                isInterested();
            });
    }

    const callApiAddInterest = async () => {
        const url = serverURL + "/api/addInterest";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                renter_id: userId,
                posting_id: unit.posting_id,
                interest: interest
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Renter: ", body);
        return body;
    }

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />

            <Box
                display="flex"
                flexGrow={1}
            >
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

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    flexGrow={1}
                    alignItems="flex-start">

                    <Button variant="contained"
                        style={{
                            marginTop: appTheme.spacing(1),
                            marginRight: appTheme.spacing(3),
                            backgroundColor: "#5A189A"
                        }}
                        onClick={handleChangeInterest}
                    >
                        {interest === 0 ? "Favourite" : "Unfavourite"}
                    </Button>
                </Box>
            </Box>

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
                ${Math.round(unit.apt_price / unit.rooms)}/person/month, Total Price: ${unit.apt_price}/month
            </Typography>

            <Typography
                style={{
                    marginTop: appTheme.spacing(2),
                    marginLeft: appTheme.spacing(3),
                    marginBottom: appTheme.spacing(1)
                }}
                variant="h6"
                component="div"
                color="inherit"
            >
                Landlord Contact Information:
            </Typography>

            <Typography
                style={{
                    marginTop: appTheme.spacing(0.5),
                    marginLeft: appTheme.spacing(5),
                    marginBottom: appTheme.spacing(1)
                }}
                variant="subtitle1"
                component="div"
                color="inherit"
            >
                Phone Number: {unit.phone}
            </Typography>

            <Typography
                style={{
                    marginTop: appTheme.spacing(0.5),
                    marginLeft: appTheme.spacing(5),
                    marginBottom: appTheme.spacing(1)
                }}
                variant="subtitle1"
                component="div"
                color="inherit"
            >
                Email: {unit.email}
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
        </ThemeProvider>
    )
}

export const UnexpandedUnitInfo = ({ unit, expandUnit, userId }) => {

    /*
        Check if renter is interested
    */

    // Creates state variable
    const [interest, setInterest] = React.useState(0)

    // Activates the intital APIs
    React.useEffect(() => {
        isInterested();
    }, []);

    const isInterested = () => {
        callApiIsInterested()
            .then(res => {
                console.log("isInterested returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("isInterested parsed: ", parsed);
                setInterest(parsed[0].count);
            });
    }

    const callApiIsInterested = async () => {
        const url = serverURL + "/api/isInterested";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                posting_id: unit.posting_id,
                renter_id: userId
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("isInterested: ", body);
        return body;
    }

    /*
        Change interest
    */

    const handleChangeInterest = () => {
        addInterest()
    }

    const addInterest = () => {
        callApiAddInterest()
            .then(res => {
                console.log("callApiAddInterest returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiAddInterest parsed: ", parsed);
                isInterested();
            });
    }

    const callApiAddInterest = async () => {
        const url = serverURL + "/api/addInterest";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                renter_id: userId,
                posting_id: unit.posting_id,
                interest: interest
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Renter: ", body);
        return body;
    }
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
            <Box
                display="flex"
                flexGrow={1}
            >
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

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    flexGrow={1}
                    alignItems="flex-start">

                    <Button variant="contained"
                        style={{
                            marginTop: appTheme.spacing(1),
                            marginRight: appTheme.spacing(3),
                            backgroundColor: "#5A189A"
                        }}
                        onClick={handleChangeInterest}
                    >
                        {interest === 0 ? "Favourite" : "Unfavourite"}
                    </Button>
                </Box>
            </Box>

            <Button onClick={() => expandUnit(unit.posting_id)}
                variant="contained"
                style={{
                    marginTop: appTheme.spacing(1),
                    marginLeft: appTheme.spacing(3),
                    marginBottom: appTheme.spacing(2)
                }}>
                See Details
            </Button>
        </ThemeProvider>
    )
}