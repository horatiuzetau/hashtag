import styled from '@emotion/styled';
import { CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchAvailabilityMap } from '../../api';
import { convertToMap } from '../../utils/MapUtils';
import { getBundledSlotError, getSlotError, validateSlotsAndUpdateWithErrors } from '../../utils/SlotValidationUtils';
import { uuidv4 } from '../../utils/UUIDUtils';
import SmallErrorMessage from '../commons/SmallErrorMessage';
import StepBody from '../commons/StepBody';
import StepHeader from '../commons/StepHeader';
import ActivityList from './activities/ActivityList';
import SlotCard from './slots/SlotCard';

export default function ReservationStep({ existingSlots, date, currentStep, nextStep, previousStep, confirmValueAndTriggerNextStep, triggerPreviousStep }) {
    const [slots, setSlots] = useState(existingSlots)
    const [validationError, setValidationError] = useState(false)

    const [availability, setAvailability] = useState({
        map: new Map(),
        loading: false,
        error: null,
        dataFetched: false
    })

    // Get availability map from backend
    useEffect(() => {
        setAvailability(prev => ({ ...prev, loading: true }))
        fetchAvailabilityMap(date)
            .then(data => {
                setAvailability(prev => ({
                    map: convertToMap(data.data),
                    loading: false,
                    error: null,
                    dataFetched: true
                }))
            })
            .catch(err => {
                setAvailability(prev => ({
                    ...prev,
                    loading: false,
                    error: err,
                    dataFetched: true
                }))
            })

    }, [date])

    // Submit slots data
    const handleSubmitData = () => {
        if (slots.length === 0) {
            setValidationError('Selectati o activitate pentru a o rezerva!')
            return
        }

        let validationResponse = validateSlotsAndUpdateWithErrors(slots)

        if (!validationResponse.isValid) {
            setSlots(validationResponse.slots)
            setValidationError('Rezolvati erorile pentru a trece mai departe')
        } else {
            confirmValueAndTriggerNextStep(nextStep, currentStep, slots)
        }
    }

    // Add slots based on clicked activity
    const handleAddSlot = (activity) => {
        let newSlot = createSlot(activity);
        setValidationError(null)
        setSlots(Array.of(newSlot, ...slots))
    }

    // Handle start time addition
    const handleStartTimeAdd = (slot, newTime, parentSlot) => {
        if (parentSlot) {
            let updatedSlots = bookTimeForBundledSlot(slots, slot, newTime, parentSlot)
            setSlots(updatedSlots)
        } else {
            let updatedSlots = bookTimeForSlot(slots, slot, newTime)
            setSlots(updatedSlots)
        }
    }

    // Handle start time deletion
    const handleStartTimeDelete = (slot, newTime, parentSlot) => {
        if (parentSlot) {
            let updatedSlots = removeTimeForBundledSlot(slots, slot, newTime, parentSlot)
            setSlots(updatedSlots)
        } else {
            let updatedSlots = removeTimeForSlot(slots, slot, newTime);
            setSlots(updatedSlots)
        }
    }

    // Handle booked spots
    const handleBookedSpotsChange = (slot, newBookedSpots) => {
        let updatedSlots = bookSpots(slots, slot, newBookedSpots);
        setSlots(updatedSlots)
    }

    // Handle slot removal
    const handleRemoveSlot = (slot) => {
        let updatedSlots = removeSlot(slots, slot)
        setSlots(updatedSlots)
    }

    const getBodyContent = () => {
        if (availability.loading || !availability.dataFetched) {
            return (
                <div className='center'>
                    <CircularProgress />
                </div>
            )
        }

        if (availability.dataFetched && availability.map.size === 0) {
            return (
                <StyledNoActivitiesMessageBox>
                    Nu exista activitati disponibile pentru data selectata. Selectati alta data sau contactati-ne telefonic!
                </StyledNoActivitiesMessageBox>
            )
        }

        return (
            <StepBody>
                {/* Activities */}
                <ActivityList
                    date={date}
                    availabilityMap={availability.map}
                    handleOnActivityPress={handleAddSlot} />

                {/* Reservations */}
                {slots.map((slot, i) =>
                    <SlotCard
                        key={i}
                        date={date}
                        slot={slot}
                        availabilityMap={availability.map}
                        handleBookedSpotsChange={handleBookedSpotsChange}
                        handleStartTimeAdd={handleStartTimeAdd}
                        handleStartTimeDelete={handleStartTimeDelete}
                        handleRemoveSlot={handleRemoveSlot} />
                )}
            </StepBody>
        )
    }

    return (
        <>
            <StepHeader
                title='2. Ce sa faci?'
                subTitle='Alege activitatile si orele la care vrei sa treci pe la noi.'
                backButtonOnClick={() => triggerPreviousStep(previousStep)}
                nextStepExists={nextStep}
                submitButtonOnClick={handleSubmitData}
            />

            <SmallErrorMessage tooltip error={validationError}>
                <Typography>
                </Typography>
            </SmallErrorMessage>

            {getBodyContent()}

        </>
    );
}

// Create slot
const createSlot = (activity) => {
    var bundledSlots = activity.bundledActivities
        .map(bundledActivity => ({
            tempId: uuidv4(),
            activity: bundledActivity.activity,
            startTimes: [],
            size: bundledActivity.size,
            error: null
        }))

    var slot = {
        tempId: uuidv4(),
        activity: activity,
        startTime: null,
        bookedSpots: activity.shareable ? 0 : activity.capacity,
        bundledSlots: bundledSlots || [],
        error: null
    }

    return slot;
}


// Remove slot from slots list
const removeSlot = (slots, slot) => {
    return slots.filter(s => s.tempId !== slot.tempId)
}

// After time was selected, specify number of booked spots
const bookSpots = (slots, slot, bookedSpots) => {
    return slots.map(s =>
        s.tempId === slot.tempId
            ? {
                ...s,
                bookedSpots: bookedSpots,
                // Update with error (if any)
                error: getSlotError({ ...s, bookedSpots })
            }
            : s
    );
}

// Book time for bundled slots
const bookTimeForBundledSlot = (slots, slot, newTime, parentSlot) => {
    let updatedSlots = [...slots];
    // Find bundle slot
    let bundleSlotIndex = updatedSlots.findIndex(s => s.tempId === parentSlot.tempId)
    // Find bundled slot
    let bundledSlotIndex = updatedSlots[bundleSlotIndex].bundledSlots.findIndex(s => s.tempId === slot.tempId)
    let bundledSlot = updatedSlots[bundleSlotIndex].bundledSlots[bundledSlotIndex]

    // If the value is the same, return
    if (bundledSlot.startTimes.includes(newTime)) {
        return updatedSlots;
    }

    // If maximum number reached, return
    if (bundledSlot.startTimes.length === 1 && bundledSlot.size === 1) {
        updatedSlots[bundleSlotIndex].bundledSlots[bundledSlotIndex].startTimes = [newTime];
    } else if (bundledSlot.startTimes.length >= bundledSlot.size) {
        return updatedSlots
    } else {
        updatedSlots[bundleSlotIndex].bundledSlots[bundledSlotIndex].startTimes.push(newTime);
    }

    // Verify and assign errors
    updatedSlots[bundleSlotIndex].bundledSlots[bundledSlotIndex].error = getBundledSlotError(updatedSlots[bundleSlotIndex].bundledSlots[bundledSlotIndex])
    return updatedSlots;
}

// Book time for slots
const bookTimeForSlot = (slots, slot, newTime) => {
    return slots.map(s =>
        s.tempId === slot.tempId
            ? {
                ...s,
                // Update startTime
                startTime: newTime,
                // If activity is shareable, update number of spots to 0
                bookedSpots: s.activity.shareable ? 0 : s.bookedSpots,
                // Update bundled slots with empty startTimes
                bundledSlots: s.bundledSlots.map(bs => ({ ...bs, startTimes: [] })),
                // Update with error
                error: s.error ? getSlotError({ ...s, startTime: newTime }) : s.error
            }
            : s
    );
}

// Remove selected time for bundled slot
const removeTimeForBundledSlot = (slots, slot, newTime, parentSlot) => {
    let updatedSlots = [...slots];
    // Find bundle slot
    let bundleSlotIndex = updatedSlots.findIndex(s => s.tempId === parentSlot.tempId)
    // Find bundled slot
    let bundledSlotIndex = updatedSlots[bundleSlotIndex].bundledSlots.findIndex(s => s.tempId === slot.tempId)

    let updatedStartTimes = updatedSlots[bundleSlotIndex].bundledSlots[bundledSlotIndex].startTimes.filter(o => newTime !== o);
    // Update
    updatedSlots[bundleSlotIndex].bundledSlots[bundledSlotIndex].startTimes = updatedStartTimes

    // Verify and assign errors
    // updatedSlots[bundleSlotIndex].bundledSlots[bundledSlotIndex].error = getBundledSlotError(updatedSlots[bundleSlotIndex].bundledSlots[bundledSlotIndex])
    return updatedSlots;
}

// Remove selected time for slot
const removeTimeForSlot = (slots, slot) => {
    return slots.map(s =>
        s.tempId === slot.tempId
            ? {
                ...s,
                // Remove the time from bundle slot
                startTime: null,
                // Reset bookedSpots
                bookedSpots: s.activity.shareable ? 0 : s.bookedSpots,
                // Reset bundledSlots times
                bundledSlots: s.bundledSlots.map(bs => ({ ...bs, startTimes: [] })),
                // Update with error
                error: getSlotError({ ...s, startTime: null })
            }
            : s
    );
}

const StyledNoActivitiesMessageBox = styled(Typography)(({ theme }) => ({
    fontSize: theme.custom.activity.textSize,
    color: theme.palette.primary.contrastText,
    padding: `0 ${theme.custom.global.paddingLeftRight}`,
    opacity: 0.75
}))