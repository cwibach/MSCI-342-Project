import React from 'react';
import { Button} from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function ErrorAlert({alertVisible, alertMessage, setAlertVisible}) {

    const handleClose = () => {
        setAlertVisible(false);
    }

    return (
        <>
        {(alertVisible) ? (<>
            <Alert severity="error"
                action={
                    <Button color='inherit' size='small'
                        onClick={handleClose}>
                        CLOSE
                    </Button>
                }>
                <AlertTitle>Error</AlertTitle>
                {alertMessage}
            </Alert>
        </>) : (<>
        </>)}
        </>
    )
}

export function SuccessAlert({alertVisible, alertMessage, setAlertVisible}) {

    const handleClose = () => {
        setAlertVisible(false);
    }

    return (
        <>
        {(alertVisible) ? (<>
            <Alert severity="success"
                action={
                    <Button color='inherit' size='small'
                        onClick={handleClose}>
                        CLOSE
                    </Button>
                }>
                <AlertTitle>Error</AlertTitle>
                {alertMessage}
            </Alert>
        </>) : (<>
        </>)}
        </>
    )
}
