import React from 'react';
import Typography from "@material-ui/core/Typography";
import { Box, Button, Grid, TextField } from '@mui/material';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

const EditPosting = ({ editUnitID, getMyUnits, handleChangeMode }) => {

    React.useEffect(() => {
        getPostingInfo()
    }, []);

    const [unit, setUnit] = React.useState([])

    const getPostingInfo = () => {
        callApiGetPostingInfo()
            .then(res => {
                console.log("callApiGetPostingInfo returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiGetPostingInfo parsed: ", parsed);
                setUnit(parsed);
            });
    }

    const callApiGetPostingInfo = async () => {

        const url = serverURL + "/api/getPostingInfo";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                posting_id: editUnitID
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Posting: ", body);
        return body;
    }


    const [address, setAddress] = React.useState("");
    const [bathroom, setBathroom] = React.useState("");
    const [bedroom, setBedroom] = React.useState("");
    const [price, setAptPrice] = React.useState("");

    React.useEffect(() => {
        setAddress(unit[0].address)
        setBathroom(unit[0].bathrooms)
        setBedroom(unit[0].rooms)
        setAptPrice(unit[0].apt_price)

    }, [unit]);

    async function handleFormSubmit(e) {
        e.preventDefault();

        editPostingInfo();
    }

    const handleAddress = (event) => {
        setAddress(event.target.value);
    }

    const handleBathroom = (event) => {
        setBathroom(event.target.value);
    }

    const handleBedroom = (event) => {
        setBedroom(event.target.value);
    }

    const handlePrice = (event) => {
        setAptPrice(event.target.value);
    }

    const editPostingInfo = () => {
        callApiEditPostingInfo()
            .then(res => {
                console.log("editPostingInfo returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("editPostingInfo parsed: ", parsed);
                getMyUnits();
            });
    }

    const callApiEditPostingInfo = async () => {

        const url = serverURL + "/api/editPostingInfo";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postingID: unit.posting_id,
                rooms: bedroom,
                bathrooms: bathroom,
                apt_price: price,
                address: address
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Profile: ", body);
        return body;
    }

    return (
        <Box
            alignItems="center"
            style={{
                backgroundColor: "#9D4EDD",
                color: "#ffffff",
                borderRadius: 12
            }}
            sx={{ p: 5, mt: 5, mx: "auto", maxWidth: 3 / 8, overflow: "hidden" }}
        >

            {/* Creates a column grid for the body of the page */}
            <Grid container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"

                display="flex"
            >

                {/* Page Title */}
                <Grid item>
                    <Typography variant="h3">
                        <b>Edit Information</b>
                    </Typography>
                </Grid>

                <Grid container
                    alignContent="center"
                    direction="column"
                    alignItems="center"
                    style={{ color: "#ffffff" }}
                    justifyContent="center"

                >
                    <form onSubmit={handleFormSubmit}>

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            value={address}
                            onChange={handleAddress}
                            label="Address"
                            type="text"
                            sx={{ mt: 2, mb: 1 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            id="rooms"
                            type="number"
                            label="Number of Rooms"
                            name="rooms"
                            value={bedroom}
                            onChange={handleBedroom}
                            sx={{ mt: 2, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            id="bathrooms"
                            type="number"
                            label="Number of Bathrooms"
                            name="bathrooms"
                            value={bathroom}
                            onChange={handleBathroom}
                            sx={{ mt: 2, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            name="apt_price"
                            value={price}
                            onChange={handlePrice}
                            label="Monthly Rent of Apartment"
                            id="apt_price"
                            type="number"
                            sx={{ mt: 2, mb: 2 }}
                            color="primary"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 1 }}
                            color="primary"
                        >
                            Save Changes
                        </Button>

                        <Button onClick={handleChangeMode}
                            fullWidth
                            sx={{ mt: 2, mb: 1 }}
                            color="primary"
                            variant="contained">
                            Cancel
                        </Button>


                    </form>
                </Grid>
            </Grid>
        </Box>
    );
}

export default EditPosting;