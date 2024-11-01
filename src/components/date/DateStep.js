import React, { useState } from 'react';
import StepBody from '../commons/StepBody';
import StepHeader from '../commons/StepHeader';
import ReservationCalendar from './ReservationCalendar';
import SmallErrorMessage from '../commons/SmallErrorMessage';
import { Typography } from '@mui/material';

export default function DateStep({ existingDate, currentStep, nextStep, confirmValueAndTriggerNextStep }) {
    const [date, setDate] = useState(existingDate)
    const [validationError, setValidationError] = useState(null)

    // Submit date
    const handleSubmitData = () => {
        if (!date) {
            setValidationError('Selectati data pentru a continua!')
            return
        }

        confirmValueAndTriggerNextStep(nextStep, currentStep, date)
    }

    // Handle date change
    const handleDateChange = (date) => {
        setValidationError(null)
        setDate(date)
    }

    return (
        <>
            {/* Step header */}
            <StepHeader
                title='1. Cand sa vii?'
                subTitle='Selecteaza data, apoi apasa pe buton pentru a continua.'
                nextStepExists={true}
                submitButtonOnClick={handleSubmitData}
            />

            {/* ERROR */}
            <SmallErrorMessage tooltip error={validationError}>
                <Typography>
                </Typography>
            </SmallErrorMessage>

            {/* Calendar */}
            <StepBody>
                <ReservationCalendar date={date} handleDateChange={handleDateChange} />
            </StepBody>
        </>
    );
}
