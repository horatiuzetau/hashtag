import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import BundledSlotCard from './BundledSlotCard';
import SlotCardAvailability from './SlotCardAvailability';
import SlotCardHeader from './SlotCardHeader';

export default function SlotCard({
    slot, date, availabilityMap,
    handleStartTimeAdd, handleStartTimeDelete, handleBookedSpotsChange, handleRemoveSlot
}) {

    const shouldDisplayBundledSlotCards = () => {
        return slot.startTime && slot.bundledSlots
    }

    return (
        <StyledSlotBoxWrapper>
            <StyledSlotBox>
                {/* Slot header */}
                <SlotCardHeader
                    slot={slot}
                    date={date}
                    availabilityMap={availabilityMap}
                    handleBookedSpotsChange={handleBookedSpotsChange}
                    handleRemoveSlot={handleRemoveSlot} />

                {/* Slot availability */}
                <SlotCardAvailability
                    slot={slot}
                    date={date}
                    availabilityMap={availabilityMap}
                    handleStartTimeAdd={handleStartTimeAdd}
                    handleStartTimeDelete={handleStartTimeDelete} />

                {/* Bundled slots */}
                {shouldDisplayBundledSlotCards() &&
                    slot.bundledSlots.map(bundledSlot =>
                        <BundledSlotCard
                            key={bundledSlot.tempId}
                            date={date}
                            bundledSlot={bundledSlot}
                            bundleSlot={slot}
                            availabilityMap={availabilityMap}
                            handleStartTimeAdd={handleStartTimeAdd}
                            handleStartTimeDelete={handleStartTimeDelete} />
                    )
                }
            </StyledSlotBox>
        </StyledSlotBoxWrapper>
    );
}

const StyledSlotBoxWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `0 ${theme.custom.global.paddingLeftRight}`,
    marginBottom: `${theme.custom.slot.gap}`,
}));


const StyledSlotBox = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04084A',
    paddingBottom: '10px',
}));


