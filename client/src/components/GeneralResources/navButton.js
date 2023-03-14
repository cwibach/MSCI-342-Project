import React from 'react';
import Typography from "@material-ui/core/Typography";
import history from '../Navigation/history';
import { Button} from '@mui/material';

const NavButton = ({ destination, text, strong }) => {
    const goToPage = () => {
        history.push(destination);
    }

    return (
        <>
            <Button
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={goToPage}
                size='medium'
                sx={{ p: 3 }}>
                <Typography variant="h5" noWrap>
                    {(strong) ? (<>
                        <strong>{text}</strong>
                    </>): (<>
                        {text}
                    </>)}
                </Typography>
            </Button>
        </>
    );
}

export default NavButton;
