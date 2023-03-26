import React from 'react';
import Typography from "@material-ui/core/Typography";
import { Box, Button, Grid } from '@mui/material';
import { appTheme } from "../../themes/theme";
import EditPosting from './EditPosting';


// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

const ListofUnits = ({ unitList, getMyUnits, userID, handleChangeMode, EditMode }) => {

    const [expanded, setExpanded] = React.useState([]);

    const addToExpanded = (unitID) => {
        let tempExpanded = [...expanded];

        tempExpanded.push(unitID);

        setExpanded(tempExpanded);
    }

    const removeFromExpanded = (unitID) => {
        let tempExpanded = [...expanded];

        for (let i = 0; i < tempExpanded.length; i++) {
            if (tempExpanded[i] == unitID) {
                tempExpanded.splice(i, 1);
            }
        }

        setExpanded(tempExpanded);
    }

    // Delete Posting Id State
    const [deletePostingID, setDeletePostingID] = React.useState("");

    React.useEffect(() => {
        deletePosting()
    }, [deletePostingID]);

    const handleDelete = (event) => {
        setDeletePostingID(event.target.value)
    }

    const deletePosting = () => {
        callApiDeletePosting()
            .then(res => {
                console.log("callApiDeletePosting returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiDeletePosting parsed: ", parsed);
                getMyUnits()
            });
    }

    const callApiDeletePosting = async () => {
        const url = serverURL + "/api/deletePosting";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                posting_id: deletePostingID,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Landlord: ", body);
        return body;
    }

    // Edit Visible Posting Id State
    const [visiblePostingID, setVisiblePostingID] = React.useState("");

    React.useEffect(() => {
        editVisibility()
    }, [visiblePostingID]);

    const handleToggleVisibility = (event) => {
        setVisiblePostingID(event.target.value)
    }

    const editVisibility = () => {
        callApiEditVisibility()
            .then(res => {
                console.log("callApiEditVisibility returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiEditVisibility parsed: ", parsed);
                getMyUnits()
                setVisiblePostingID("")
            });
    }

    const callApiEditVisibility = async () => {
        const url = serverURL + "/api/editVisibility";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                posting_id: visiblePostingID,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Landlord: ", body);
        return body;
    }

    //Janky
    // const [EditMode, setEditMode] = React.useState(false);

    // const handleChangeMode = () => {
    //     setEditMode(!EditMode);
    // }

    return (
        <>
            <Grid margin={appTheme.spacing(1)}>
                {(EditMode) ? (<>
                    <EditPosting unit={unitList[0]} handleChangeMode={handleChangeMode} userID={userID} getMyUnits={getMyUnits} />
                </>) : (<>
                    {unitList.map((unit) => {

                        return (
                            <Grid item key={unit.posting_id}>
                                <Box
                                    alignItems="center"
                                    style={{
                                        backgroundColor: "#9D4EDD",
                                        color: "#ffffff",
                                        borderRadius: 12
                                    }}
                                    sx={{ mt: 2, mx: "auto", overflow: "hidden" }}
                                >
                                    <Box
                                        margin={1}
                                        display="flex"
                                        justifyContent="flex-end"
                                        flexGrow={1}
                                        alignItems="flex-start"
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
                                                    marginRight: appTheme.spacing(1),
                                                    backgroundColor: "#5A189A"
                                                }}
                                                value={unit.posting_id}
                                                onClick={handleToggleVisibility}
                                            >
                                                {unit.visible ? "Visible" : "Hidden"}
                                            </Button>

                                            <Button variant="contained"
                                                style={{
                                                    marginTop: appTheme.spacing(1),
                                                    marginRight: appTheme.spacing(1),
                                                    backgroundColor: "#5A189A"
                                                }}
                                                value={unit.posting_id}
                                                onClick={handleDelete}>
                                                Delete
                                            </Button>

                                            <Button variant="contained"
                                                style={{
                                                    marginTop: appTheme.spacing(1),
                                                    marginRight: appTheme.spacing(3),
                                                    backgroundColor: "#5A189A"
                                                }}
                                                value={unit.posting_id}
                                                onClick={handleChangeMode}>
                                                Edit Details
                                            </Button>

                                        </Box>
                                    </Box>

                                    {(expanded.includes(unit.posting_id)) ? (<>
                                        <Typography
                                            style={{
                                                marginTop: appTheme.spacing(1),
                                                marginLeft: appTheme.spacing(5)
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

                                        <Button
                                            onClick={() => removeFromExpanded(unit.posting_id)}
                                            variant="contained"
                                            style={{
                                                marginTop: appTheme.spacing(1),
                                                marginLeft: appTheme.spacing(3),
                                                marginBottom: appTheme.spacing(2)
                                            }}>
                                            Hide Details
                                        </Button>

                                    </>) : (<>
                                        <Button
                                            onClick={() => addToExpanded(unit.posting_id)}
                                            variant="contained"
                                            style={{
                                                marginTop: appTheme.spacing(1),
                                                marginLeft: appTheme.spacing(3),
                                                marginBottom: appTheme.spacing(2)
                                            }}>
                                            Show Details
                                        </Button>
                                    </>)}
                                </Box>
                            </Grid>
                        );
                    })}
                </>)}
            </Grid>
        </>
    );
}


export default ListofUnits;