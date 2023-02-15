import { Paper, styled } from "@mui/material"

export const AppPaper =  styled(Paper)(({theme}) => ({
    opacity: 0.8, // opacity of boxes for grid
    backgroundColor: theme.palette.primary.background,
    color: theme.palette.secondary.dark,
    padding: 4, // dead space around text in box
    borderRadius: 15, // radius of curved edges
    marginTop: theme.spacing(1), // spacing from the top
    marginBottom: theme.spacing(1), // spacing from the bottom
    elevation: 5 // apparent height off page
}));

export const AppPaper2 =  styled(Paper)(({theme}) => ({
    opacity: 0.7, // opacity of boxes for grid
    backgroundColor: theme.palette.secondary.background,
    color: theme.palette.primary.dark,
    padding: 4, // dead space around text in box
    borderRadius: 12, // radius of curved edges
    marginTop: theme.spacing(1), // spacing from the top
    marginBottom: theme.spacing(1), // spacing from the bottom
    elevation: 5 // apparent height off page
}));
