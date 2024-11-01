import styled from '@emotion/styled';
import { Cancel } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { getFromMap } from '../../../utils/MapUtils';
import SmallErrorMessage from '../../commons/SmallErrorMessage';
import BookedSpotsSelect from '../inputs/BookedSpotsSelect';

export default function SlotCardHeader({ slot, date, availabilityMap, handleBookedSpotsChange, handleRemoveSlot }) {

    const getBookingOptions = () => {
        let slotSummary = getFromMap(availabilityMap, slot.activity.id, date, slot.startTime);
        return Array.from({ length: slotSummary.availableSpots }, (_, i) => i + 1)
    }

    // Display text under selected slot to 
    const getSubtitle = () => {
        if (slot.startTime) {
            // Only show cati if activity is shareable
            if (slot.activity.shareable) { 
                return 'Cati?'
            }
        } else {
            return 'Cand?'
        }
    }

    return (
        <SlotHeaderBox>
            {/* Title */}
            <StyledSlotTitle>
                {/* Remove slot button */}
                <StyledCloseButton onClick={() => handleRemoveSlot(slot)}>
                    <Cancel />
                </StyledCloseButton>

                <SmallErrorMessage tooltip error={slot.error}>
                    <Stack direction={'column'}>
                        <Typography className='slot-header-title'>
                            {slot.activity.name}
                        </Typography>
                        <Typography className='slot-header-subtitle' size='small'>
                            {getSubtitle()}
                        </Typography>
                    </Stack>
                </SmallErrorMessage>

            </StyledSlotTitle>

            {/* Number of booked spots select */}
            {slot.activity.shareable &&
                <BookedSpotsSelect
                    slot={slot}
                    disabled={!slot.activity.shareable || !slot.startTime}
                    options={slot.startTime && getBookingOptions()}
                    onChange={handleBookedSpotsChange} />
            }
        </SlotHeaderBox >
    );
}

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.contrastText,

    // SVG
    '& svg': {
        width: theme.custom.activity.iconSize,
        height: theme.custom.activity.iconSize,
    },
}));

const StyledSlotTitle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',

    // Title
    '& .slot-header-title': {
        fontSize: theme.custom.slot.textSize
    },

    // Subtitle
    '& .slot-header-subtitle': {
        fontSize: '0.85rem',
        opacity: 0.75
    }

}));

const SlotHeaderBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.custom.activity.backgroundColor,
    marginBottom: theme.custom.slot.gap,
    color: theme.palette.primary.contrastText,
}));
