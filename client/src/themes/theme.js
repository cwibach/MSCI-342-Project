import { dark } from "@material-ui/core/styles/createPalette";
import {purple, pink} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";

export const appTheme = createTheme({
    palette: {
        type: 'dark',
        background: {
            default: "#000000"
        },
        primary: {
            main: purple[300],
        },
        secondary: {
            main: purple[700],
        }
    }
});
