import {createTheme} from "@material-ui/core/styles";

export const appTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#160B18"
        },
        primary: {
            main: "#a86add",
            background: "#deb7ff",
            dark: "000000"
        },
        secondary: {
            main: "#634087",
            background: "#c785ec",
            dark: "#483248"
        }
    }
});
