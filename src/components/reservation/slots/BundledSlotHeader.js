import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import SmallErrorMessage from '../../commons/SmallErrorMessage';

export default function BundledSlotHeader({ bundledSlot }) {
    return (
        <SlotHeaderBox>
            <SmallErrorMessage tooltip placement={'top'} error={bundledSlot.error}>
                <Stack direction={'column'}>
                    <Typography className='bundled-slot-header-title' >
                        {bundledSlot.size} x {bundledSlot.activity.name}
                    </Typography>
                    <Typography className='bundled-slot-header-subtitle'>
                        Alege {bundledSlot.size} {bundledSlot.size === 1 ? 'ora' : 'ore'}
                    </Typography>
                </Stack>
            </SmallErrorMessage>
        </SlotHeaderBox>
    );
}


const SlotHeaderBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.custom.activity.backgroundColor,
    marginTop: theme.custom.slot.gap,
    marginBottom: theme.custom.slot.gap,
    color: theme.palette.primary.contrastText,
    padding: `5px ${theme.custom.global.paddingLeftRight}`,

    // Title
    '& .bundled-slot-header-title': {
        fontSize: theme.custom.slot.textSize
    },

    // Subtitle
    '& .bundled-slot-header-subtitle': {
        fontSize: '0.85rem',
        opacity: 0.75
    }
}));