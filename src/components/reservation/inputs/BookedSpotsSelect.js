import styled from '@emotion/styled';
import { People } from '@mui/icons-material';
import { InputAdornment, MenuItem, TextField, Tooltip } from '@mui/material';
import React from 'react';

export default function BookedSpotsSelect({ slot, options, disabled, onChange }) {

    return (
        <Tooltip
            arrow
            title="Selecteaza ora mai intai!"
            disableHoverListener={!disabled}
            disableFocusListener={!disabled}>

            <StyledSelect
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <People />
                            </InputAdornment>
                        ),
                    },
                }}
                select
                disabled={disabled}
                size='small'
                value={slot.bookedSpots}
                onChange={(e) => onChange(slot, e.target.value)}>

                {/* Default option */}
                <MenuItem value={slot.bookedSpots}>{slot.bookedSpots}</MenuItem>
                {/* Options */}
                {!disabled && options.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
            </StyledSelect>
        </Tooltip>
    );
}

// horatiuA - colors for !disabled state on select

const StyledSelect = styled(TextField)(({ theme }) => ({
    marginRight: '8px',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',

    '& .MuiInputBase-input': {
        color: theme.palette.primary.contrastText
    },

    '& svg': {
        color: theme.palette.primary.contrastText
    }
}));
