import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { AppBar, Toolbar, Box, Button, CssBaseline, ThemeProvider, Grid } from '@mui/material';
import { appTheme } from "../../themes/theme";
import history from '../Navigation/history';


//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

// const fetch = require("node-fetch");

const opacityValue = 0.9;

// const theme = createTheme({
//   palette: {
//     type: 'dark',
//     background: {
//       default: "#000000"
//     },
//     primary: {
//       main: "#8549a7",
//     },
//     secondary: {
//       main: "#deb7ff",
//     },
//   },
// });

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />

        <Box
          style={{
            backgroundColor: "#a86add",
            padding: 10,
            textAlign: "center"
          }}
        >
          <Typography
            variant="h1"
            style={{
              textAlign: "center",
              margin: 10,
              color: "#ffffff"
            }}>
            Purple Pages
          </Typography>
        </Box>


        <Box
          margin={3}
          display={"flex"}
          justifyContent={"center"}
          flexGrow={4}
          alignItems={"center"}
          sx={{
            height: 350
          }}
        >
          <Grid
            container
            spacing={5}
            direction="column"
            style={{ maxWidth: "20%" }}>

            <Button variant="contained" size="large" sx={{ height: 100 }}
              onClick={() => history.push('/LandlordLogin')}>
              <Typography variant="h6">
                Landlord
              </Typography>
            </Button>

            <br />

            <Button variant="contained" size="large" sx={{ height: 100 }}
              onClick={() => history.push('/RenterLogin')}>
              <Typography variant="h6">
                Renter
              </Typography>
            </Button>
          </Grid>

        </Box>

      </ThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
