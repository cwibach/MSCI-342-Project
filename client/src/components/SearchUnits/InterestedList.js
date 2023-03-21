import React from 'react';
import { Typography, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { appTheme } from "../../themes/theme";
import { AppPaper } from "../../themes/paper";
import RenterList from '../RenterList/index';

const serverURL = "";

const InterestedList = ({ unitID, userId }) => {

    // Profile List State
    const [renters, setRenters] = React.useState([]);

    // Activates the intital APIs
    React.useEffect(() => {
        getInterestedRenters();
    }, []);

    const getInterestedRenters = () => {
        callApiGetInterestedRenters()
            .then(res => {
                console.log("getInterestedRenters returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("getInterestedRenters parsed: ", parsed);
                setRenters(parsed);
            });
    }

    const callApiGetInterestedRenters = async () => {
        const url = serverURL + "/api/getInterestedRenters";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                posting_id: unitID,
                renter_id: userId
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Renters: ", body);
        return body;
    }

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
            {renters.length > 0 &&
                <>
                    <Box
                        alignItems="center"
                        style={{
                            backgroundColor: "#9D4EDD",
                            color: "#ffffff",
                            borderRadius: 12
                        }}
                        sx={{ p: 3, mt: 3, mx: "auto", overflow: "hidden" }}
                    >
                        <Typography variant="h4" color="inherit">
                            Interested Renters:
                        </Typography>
                    </Box>
                    
                    <Box
                        sx={{ ml: 4}}
                    >
                        <RenterList renters={renters} />
                    </Box>
                    
                </>
            }
        </ThemeProvider>
    );
}

export default InterestedList;