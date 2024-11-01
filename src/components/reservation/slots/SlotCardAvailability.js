import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import React from 'react';
import { getFromMap } from '../../../utils/MapUtils';
import { isTimeBetween } from '../../../utils/TimeUtils';
import SlotTimeChip from '../inputs/SlotTimeChip';

export default function SlotCardAvailability({ slot, date, bundleSlot, availabilityMap, handleStartTimeAdd, handleStartTimeDelete }) {

    let timeMap = getFromMap(availabilityMap, slot.activity.id, date);

    if (!timeMap) {
        return <></>
    }

    const isBundledSlot = () => {
        return bundleSlot
    }

    // If the slot is bundled, it should be hidden if availableSpots are less than capacity
    const shouldHideTimeSlot = (time, slotSummary) => {
        return isBundledSlot()
            && (!isTimeBetween(time, bundleSlot.startTime, bundleSlot.activity.duration)
                || slotSummary.capacity !== slotSummary.availableSpots)
    }

    return (
        <StyledSlotAvailabilityStack gap={1} direction={'row'}>
            {
                // For each available time, create a chip to display
                Array.from(timeMap.keys()).map((time, i) => {
                    let slotSummary = getFromMap(availabilityMap, slot.activity.id, date, time);

                    // Hide this slot if
                    if (shouldHideTimeSlot(time, slotSummary)) {
                        return null
                    }

                    // Display slot time chip
                    return <SlotTimeChip
                        key={i}
                        startTimes={isBundledSlot() ? slot.startTimes : [slot.startTime]}
                        time={time}
                        capacity={slotSummary.capacity}
                        availableSpots={slotSummary.availableSpots}
                        onClick={(time) => handleStartTimeAdd(slot, time, bundleSlot)}
                        onDelete={(time) => handleStartTimeDelete(slot, time, bundleSlot)} />
                })
            }
        </StyledSlotAvailabilityStack>
    );
}

const StyledSlotAvailabilityStack = styled(Stack)`
    width: 100%;
    padding: 0 2.5%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
`