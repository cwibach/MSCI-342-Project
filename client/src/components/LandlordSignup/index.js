import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box, Button, CssBaseline, TextField } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';
import { ThemeProvider } from '@mui/material/styles';
import { useAuth } from "../../contexts/AuthContext";
import { UserContext } from '../Navigation/PrivateRoute.js';
import AlertBar from '../GeneralResources/alert.js';

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

export default function LandlordSignup() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState(" ");
    const [phone, setPhone] = React.useState('');
    const [first_name, setFirst_name] = React.useState('');
    const [last_name, setLast_name] = React.useState('');
    const [username, setUsername] = React.useState('');

    const [loading, setLoading] = React.useState(false);
    const [alertVisible, setAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    const { setUserId } = React.useContext(UserContext);
    const { register } = useAuth();

    async function handleFormSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setAlertMessage("Error: Passwords do not match");
            setAlertVisible(true);
        } else {

            try {
                setLoading(true);
                await register(email, password);

                // what to do if succesful

                addLandlord();
                getLandlordID();

                history.push('/LandlordProfile');
            } catch (e) {
                setAlertMessage("Error: Failed to Register");
                setAlertVisible(true);
            }
            setLoading(false);
        }
    }

    // Calling server API
    const addLandlord = () => {
        callApiAddLandlord()
            .then(res => {
                console.log("callApiAddLandlord returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiAddLandlord parsed: ", parsed);
            });
    }

    const callApiAddLandlord = async () => {
        const url = serverURL + "/api/addLandlord";
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
                first_name: first_name,
                last_name: last_name
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Landlord: ", body);
        return body;
    }

    const getLandlordID = () => {
        callAPIGetLandlordID()
            .then(res => {
                console.log("callAPIGetLandlordID returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("parsed result: ", parsed)
                let tempUserID = parsed[0].landlord_id;
                console.log("landlord_id", tempUserID);
                setUserId(tempUserID);
            })
    }

    const callAPIGetLandlordID = async () => {
        const url = serverURL + "/api/getLandlordID";
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

            <AlertBar alertVisible={alertVisible} alertMessage={alertMessage} setAlertVisible={setAlertVisible} />

            <Box
                margin={6}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"flex-start"}
            >
                {/* Creates a column grid for the body of the page */}
                <Grid container
                    direction="column"
                    alignItems="center"
                    style={{ color: "#e6e6e6" }}
                    justifyContent="center"
                    xs={4}
                >

                    <Typography variant="h3">
                        <b>Landlord Sign Up</b>
                    </Typography>

                    <form onSubmit={handleFormSubmit}>

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="username"
                            type="text"
                            label="Username"
                            name="username"
                            value={username}
                            autoComplete="Username"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="first_name"
                            type="text"
                            label="First Name"
                            name="first_name"
                            value={first_name}
                            autoComplete="First Name"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setFirst_name(e.target.value)}

                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            id="last_name"
                            type="text"
                            label="Last Name"
                            name="last_name"
                            value={last_name}
                            autoComplete="Last Name"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setLast_name(e.target.value)}

                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            label="Phone Number"
                            id="phone"
                            type="text"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="email"
                            value={email}
                            label="Email Address"
                            id="email"
                            type="text"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="password"
                            value={password}
                            label="Password"
                            id="password"
                            type="password"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <TextField
                            variant="filled"
                            style={{ background: "#e6e6e6" }}
                            required
                            fullWidth
                            name="confirm-password"
                            label="Confirm Password"
                            type="password"
                            id="confirmpassword"
                            autoComplete="confirm-password"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

                        <Button fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 1 }}
                            onClick={() => history.push('/LandlordLogin')}>
                            Return to Login
                        </Button>
                    </form>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

