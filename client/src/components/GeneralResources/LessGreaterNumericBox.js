import React from 'react';
import {Box, TextField, InputAdornment, Typography} from '@mui/material';


const LessGreaterNumericBox = ({ minValue, maxValue, minChange, maxChange, minLabel, maxLabel, centreLabel, icon }) => {
    return (
        <Box columnGap={2} sx={{
            display: "flex", flexwrap: 'wrap', p: 1, backgroundColor: 'primary.background',
            width: 2 / 3, alignItems: 'center', justifyContent: 'space-between', ml: 4, mt: 1
        }}>

            <TextField
                InputProps={{
                    startAdornment: <InputAdornment position="start"> {icon} </InputAdornment>
                }}
                value={minValue}
                onChange={minChange}
                label={minLabel}
                sx={{ width: 2 / 7 }}
                type="number"
            />

            <Typography
                variant="h6"
                gutterBottom
            >
                &lt;= {centreLabel} &lt;=
            </Typography>

            <TextField
                InputProps={{
                    startAdornment: <InputAdornment position="start"> {icon} </InputAdornment>
                }}
                value={maxValue}
                onChange={maxChange}
                label={maxLabel}
                sx={{ width: 2 / 7 }}
                type="number"
            />
        </Box>
    )
}

export default LessGreaterNumericBox;