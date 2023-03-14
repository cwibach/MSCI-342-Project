import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Box, Button, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';
import TextField from '@mui/material/TextField';
import { useAuth } from "../../contexts/AuthContext";
import { UserContext } from '../Navigation/PrivateRoute.js';
import { AppPaper } from "../../themes/paper";
import NavButton from "../GeneralResources/navButton";

// SERVER MODE
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3103"; 
// DEV MODE
const serverURL = "";

function DeletePosting() {

}

export default DeletePosting;