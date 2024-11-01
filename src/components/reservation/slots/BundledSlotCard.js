import React from 'react';
import BundledSlotHeader from './BundledSlotHeader';
import SlotCardAvailability from './SlotCardAvailability';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

export default function BundledSlotCard({
    bundledSlot, date, bundleSlot, availabilityMap, handleStartTimeAdd, handleStartTimeDelete
}) {

    return (
        <BundledSlotWrapper>
            {/* Bundled slot header */}
            <BundledSlotHeader bundledSlot={bundledSlot} />

            {/* Bundled slot availability */}
            <SlotCardAvailability
                slot={bundledSlot}
                bundleSlot={bundleSlot}
                date={date}
                availabilityMap={availabilityMap}
                handleStartTimeAdd={handleStartTimeAdd}
                handleStartTimeDelete={handleStartTimeDelete} />

        </BundledSlotWrapper>
    );
}


const BundledSlotWrapper = styled(Box)`
    display: flex;
    flex-flow: column;
    width: 95%;
`