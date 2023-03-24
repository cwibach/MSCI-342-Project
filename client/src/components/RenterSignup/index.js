import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import history from '../Navigation/history';
import { Box, Button, CssBaseline, ThemeProvider, TextField, InputLabel, Select, MenuItem, FormControl, Link, Divider } from '@mui/material';
import { appTheme } from "../../themes/theme";
import { useAuth } from '../../contexts/AuthContext';
import { UserContext } from '../Navigation/PrivateRoute.js';
import ErrorAlert, {SuccessAlert} from '../GeneralResources/alert.js';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function RenterSignup() {
    // Form Value States
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirm] = React.useState();
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [bedtime, setBedtime] = React.useState('');
    const [birthday, setBirthday] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [cook, setCook] = React.useState('');
    const [first_name, setFirst_name] = React.useState('');
    const [last_name, setLast_name] = React.useState('');

    const [errorVisible, setErrorVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const [successVisible, setSuccessVisible] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("");

    const { renterRegister } = useAuth();
    const { setUserId } = React.useContext(UserContext);

    // Handles submitting the form
    async function handleFormSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Error: Passwords do not match");
            setErrorVisible(true);
        } else {

            try {
                setLoading(true);
                await renterRegister(email, password);

                // what to do if succesful

                addRenter();
                getRenterID();

                history.push('/RenterProfile');
            } catch (e) {
                console.log(e);
                setErrorMessage("Error: Failed to Register");
                setErrorVisible(true);
            }
            setLoading(false);
        }
    }

    // Functions to handle the form values
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirmPassword = (event) => {
        setConfirm(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
        setUsername(event.target.value.split("@")[0])
    }

    const handlePhone = (event) => {
        setPhone(event.target.value)
    }

    const handleBedtime = (event) => {
        setBedtime(event.target.value)
    }

    const handleBirthday = (event) => {
        setBirthday(event.target.value)
    }

    const handleGender = (event) => {
        setGender(event.target.value)
    }

    const handleCook = (event) => {
        setCook(event.target.value)
    }

    const handleFirst_name = (event) => {
        setFirst_name(event.target.value)
    }

    const handleLast_name = (event) => {
        setLast_name(event.target.value)
    }

    const goLogin = () => {
        history.push("/RenterLogin");
    }

    const goHome = () => {
        history.push('/')
    }

    // Calling server API
    const addRenter = () => {
        callApiAddRenter()
            .then(res => {
                console.log("callApiAddRenter returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiAddRenter parsed: ", parsed);
            });
    }

    const callApiAddRenter = async () => {
        const url = serverURL + "/api/addRenter";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                phone: phone,
                bedtime: bedtime,
                birthday: birthday,
                gender: gender,
                cook: cook,
                first_name: first_name,
                last_name: last_name
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Renter: ", body);
        return body;
    }

    const getRenterID = () => {
        callAPIGetRenterID()
            .then(res => {
                console.log("callAPIGetRenterID returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("parsed result: ", parsed)
                let tempUserID = parsed[0].renter_id;
                console.log("renter_id", tempUserID);
                setUserId(tempUserID);
            })
    }

    const callAPIGetRenterID = async () => {
        const url = serverURL + "/api/getRenterID";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("UserID: ", body);
        return body;
    }

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />

            <ErrorAlert alertVisible={errorVisible} alertMessage={errorMessage} setAlertVisible={setErrorVisible} />

            <SuccessAlert alertVisible={successVisible} alertMessage={successMessage} setAlertVisible={setSuccessVisible}/>

            <Box
                alignItems="center"
                style={{
                    backgroundColor: "#9D4EDD",
                    color: "#ffffff",
                    borderRadius: 12
                }}
                sx={{ p: 5, mt: 7, mx: "auto", maxWidth: 1 / 3, overflow: "hidden" }}
            >
                <Grid container
                    direction="column"
                    alignItems="center"
                    style={{ color: "#ffffff" }}
                    justifyContent="center"
                >
                    <Typography variant="h3">
                        <b>Renter Sign Up</b>
                    </Typography>

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
                                    name="first_name"
                                    value={first_name}
                                    onChange={handleFirst_name}
                                    label="First Name"
                                    id="first_name"
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
                                    name="last_name"
                                    value={last_name}
                                    onChange={handleLast_name}
                                    label="Last Name"
                                    id="last_name"
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

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            name="email"
                            value={email}
                            onChange={handleEmail}
                            label="Email Address"
                            id="email"
                            type="text"
                            sx={{ mt: 1, mb: 1 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            name="password"
                            value={password}
                            onChange={handlePassword}
                            label="Password"
                            id="password"
                            type="password"
                            sx={{ mt: 1, mb: 1 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#ffffff" }}
                            required
                            fullWidth
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            label="Confirm Password"
                            id="password"
                            type="password"
                            sx={{ mt: 1, mb: 1 }}
                            color="primary"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 1 }}
                            color="primary"
                            disabled={loading}
                        >
                            Sign Up
                        </Button>

                        <Button variant="contained"
                            fullWidth
                            sx={{ mt: 1, mb: 1 }}
                            onClick={goHome}>
                            Back to Home
                        </Button>

                        <Box
                            textAlign={"center"}
                            sx={{ mt: 2 }}
                        >
                            <Typography>
                                Already have an account? <Link onClick={goLogin} style={{ cursor: "pointer", color: "#5A189A" }}><b>Login</b></Link>
                            </Typography>
                        </Box>

                    </form>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default RenterSignup;