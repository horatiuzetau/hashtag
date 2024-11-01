import styled from '@emotion/styled';
import { AccessTime, AddCircle, TimeToLeave } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { TimeClock } from '@mui/x-date-pickers';
import React from 'react';


export default function Activity({ activity, handleOnActivityPress }) {

    return (
        <StyledActivity onClick={(e) => handleOnActivityPress(activity)}>
            {/* Title */}
            <StyledActivityTitle>
                {/* <StyledIconButton> */}
                {/* Info modal */}
                {/* <InfoRounded /> */}
                {/* </StyledIconButton> */}
                <Typography className='activity-title' component='span'>{activity.name}</Typography>
                <StyledActivitySubtitle>
                    {/* <AccessTime className='activity-subtitle__icon' /> */}
                    <Typography className='activity-subtitle' size='small'>
                        {activity.duration} minute - {activity.price}lei{activity.shareable ? '/persoana' : ''}
                    </Typography>

                    {/* <Typography className='activity-subtitle' size='small'>{activity.duration}''</Typography> */}
                </StyledActivitySubtitle>
            </StyledActivityTitle>

            {/* Add Slot button */}
            <StyledIconButton className='activity-header-add-btn'>
                <AddCircle />
            </StyledIconButton>
        </StyledActivity>
    );
}

const StyledIconButton = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.light,
    transition: 'transform .4s ease-in-out',
    padding: '0 15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // SVG
    '& svg': {
        width: theme.custom.activity.iconSize,
        height: theme.custom.activity.iconSize,
    },

}));

const StyledActivitySubtitle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& .activity-subtitle': {
        fontSize: `calc(${theme.custom.activity.textSize} / 1.5)`,
        fontWeight: '200',
        textTransform: 'none',
    },

    '& .activity-subtitle__icon': {
        marginRight: '5px',
        color: 'white',
        opacity: 0.75
    }

}))

const StyledActivityTitle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    padding: `10px 15px`,
    flexFlow: 'column',

    // Subtitle
    '& .activity-subtitle': {
        fontSize: '0.85rem',
        opacity: 0.75
    }
}))

const StyledActivity = styled(Button)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.custom.activity.backgroundColor,
    marginBottom: theme.custom.activity.gap,
    padding: '0',

    '& .MuiTypography-root': {
        color: theme.palette.primary.light,
        fontWeight: 600,
        fontSize: theme.custom.activity.textSize
    },

    // HOVER
    '&:hover .activity-header-add-btn': {
        transform: 'rotate(360deg)'
    }

}))