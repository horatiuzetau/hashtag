import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';

export default function SlotTimeChip({ startTimes, time, capacity, availableSpots, onClick, onDelete }) {

    let isActive = startTimes.includes(time);

    return (
        <StyledButton
            active={isActive ? 1 : 0}
            onClick={() => isActive ? onDelete(time) : onClick(time)}>

            {time}
        </StyledButton>
    );
}


const StyledButton = styled(Button)(({ theme, active }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: active ?
        theme.palette.primary.main : theme.custom.slot.timeBackgroundColor,
    fontSize: theme.custom.slot.timeTextSize,
    borderRadius: '7.5px',

    // Hover
    '&:hover': {
        opacity: 0.9
    },

    // SVG
    '& svg': {
        width: theme.custom.slot.iconSize,
        height: theme.custom.slot.iconSize,
    },
}));