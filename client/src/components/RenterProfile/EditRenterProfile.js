import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

const EditRenterProfile = ({ item, handleChangeMode, userID, getProfile }) => {
    const [firstName, setFirstName] = React.useState(item.first_name);
    const [lastName, setLastName] = React.useState(item.last_name);
    const [phone, setPhone] = React.useState(item.phone);
    const [bedtime, setBedtime] = React.useState(item.bedtime);
    const [birthday, setBirthday] = React.useState(item.birthday);
    const [gender, setGender] = React.useState(item.gender);
    const [cook, setCook] = React.useState(item.cook);

    async function handleFormSubmit(e) {
        e.preventDefault();

        editRenterProfileInfo();
    }

    const editRenterProfileInfo = () => {
        callApiEditRenterProfileInfo()
            .then(res => {
                console.log("getEditRenterInfo returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getEditRenterInfoInfo parsed: ", parsed);
                getProfile();
            });
    }

    const callApiEditRenterProfileInfo = async () => {

        const url = serverURL + "/api/editRenterInfo";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: userID,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                bedtime: bedtime,
                birthday: birthday,
                cook: cook,
                gender: gender
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const handleFirst = (event) => {
        setFirstName(event.target.value);
    }

    const handleLast = (event) => {
        setLastName(event.target.value);
    }

    const handlePhone = (event) => {
        setPhone(event.target.value);
    }

    const handleBedtime = (event) => {
        setBedtime(event.target.value);
    }

    const handleBirthday = (event) => {
        setBirthday(event.target.value);
    }

    const handleGender = (event) => {
        setGender(event.target.value);
    }

    const handleCook = (event) => {
        setCook(event.target.value);
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

                        <Grid container
                            direction="row"
                            spacing={1}
                        >
                            <Grid item xs={6}>
                                <TextField
                                    variant="filled"
                                    style={{ background: "#ffffff" }}
                                    required
                                    fullWidth
                                    value={firstName}
                                    onChange={handleFirst}
                                    label="First Name"
                                    type="text"
                                    sx={{ mt: 2, mb: 1 }}
                                    color="primary"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    variant="filled"
                                    style={{ background: "#ffffff" }}
                                    required
                                    fullWidth
                                    value={lastName}
                                    onChange={handleLast}
                                    label="Last Name"
                                    type="text"
                                    sx={{ mt: 2, mb: 1 }}
                                    color="primary"
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            name="bedtime"
                            value={bedtime}
                            onChange={handleBedtime}
                            label="Bedtime"
                            id="bedtime"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            sx={{ mt: 1, mb: 1 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            name="birthday"
                            value={birthday}
                            onChange={handleBirthday}
                            label="Birthday"
                            id="birthday"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            sx={{ mt: 1, mb: 1 }}
                            color="primary"
                        />

                        <FormControl
                            variant="filled"
                            fullWidth sx={{ mt: 1, mb: 1 }}
                            style={{ background: "#ffffff" }}
                        >
                            <InputLabel id="gender-label">Roommate Gender*</InputLabel>
                            <Select
                                required
                                fullWidth
                                name="gender"
                                value={gender}
                                onChange={handleGender}
                                label="Gender"
                                id="gender"
                                color="primary"
                            >
                                <MenuItem value="Coed">Coed</MenuItem>
                                <MenuItem value="Male Only">Male Only</MenuItem>
                                <MenuItem value="Female Only">Female Only</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl
                            variant="filled"
                            fullWidth sx={{ mt: 1, mb: 1 }}
                            style={{ background: "#ffffff" }}
                        >
                            <InputLabel id="cook-label">Cooking Frequency*</InputLabel>
                            <Select
                                required
                                fullWidth
                                name="cook"
                                value={cook}
                                onChange={handleCook}
                                label="Cook"
                                id="cook"
                                color="primary"
                            >
                                <MenuItem value="Always">Always</MenuItem>
                                <MenuItem value="Often">Often</MenuItem>
                                <MenuItem value="Sometimes">Sometimes</MenuItem>
                                <MenuItem value="Never">Never</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            name="phone"
                            value={phone}
                            onChange={handlePhone}
                            label="Phone Number"
                            id="phone"
                            type="text"
                            sx={{ mt: 1, mb: 1 }}
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

                        <Button onClick={handleChangeMode} fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 1 }}
                            color="primary">
                            Cancel
                        </Button>
                    </form>

                </Grid>
            </Grid>
        </Box>
    );
}

export default EditRenterProfile;