import { dark } from "@material-ui/core/styles/createPalette";
import {purple, pink} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";

export const appTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#160B18"
        },
        primary: {
            main: "#a86add",
            background: "#deb7ff"
        },
        secondary: {
            main: "#634087",
            background: "#c785ec",
            dark: "#483248"
        }
    }
});
