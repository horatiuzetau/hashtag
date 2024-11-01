import styled from '@emotion/styled';
import { Call } from '@mui/icons-material';
import { Box, Icon, Typography } from '@mui/material';
import React, { useState } from 'react';
import { batchBookSlot } from '../../api';
import { calendar, email, personalData } from '../../utils/CustomIcons';
import SmallErrorMessage from '../commons/SmallErrorMessage';
import StepHeader from '../commons/StepHeader';
import { getDateTranslation } from '../../utils/TimeUtils';


export default function ConfirmationStep({ payload, previousStep, currentStep, nextStep, triggerPreviousStep, confirmValueAndTriggerNextStep }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmitData = () => {
        setLoading(true)

        batchBookSlot(payload)
            .then(response => {
                setLoading(false)
                confirmValueAndTriggerNextStep(nextStep, currentStep)
            })
            .catch(err => {
                setError('Ceva nu a mers bine! Incercati din nou, iar daca nu merge, va rugam sa ne contactati telefonic!')
                setLoading(false)
            })
    }

    return (
        <>
            <StepHeader
                loading={loading}
                title='4. Rezervarea ta!'
                subTitle='Verifica daca datele sunt corecte si apasa pe buton pentru a finaliza rezervarea!'
                backButtonOnClick={() => triggerPreviousStep(previousStep)}
                nextStepExists={true}
                submitButtonOnClick={handleSubmitData} />

            {/* CONTACT */}
            <StyledContactSummaryBox>
                {/* Error */}
                <SmallErrorMessage error={error} />

                {/* Date */}
                <StyledSummaryRow>
                    <Icon>
                        {calendar}
                    </Icon>
                    <Typography variant='h5'>
                        {getDateTranslation(payload.date)}
                    </Typography>
                </StyledSummaryRow>

                {/* Name */}
                <StyledSummaryRow>
                    <Icon>
                        {personalData}
                    </Icon>
                    <Typography variant='h5'>
                        {payload.contact.firstName} {payload.contact.lastName}
                    </Typography>
                </StyledSummaryRow>

                {/* Email */}
                <StyledSummaryRow>
                    <Icon>
                        {email}
                    </Icon>
                    <Typography variant='h5'>
                        {payload.contact.email}
                    </Typography>
                </StyledSummaryRow>

                {/* Phone */}
                <StyledSummaryRow>
                    <Icon>
                        <Call />
                    </Icon>
                    <Typography variant='h5'>
                        {payload.contact.phone}
                    </Typography>
                </StyledSummaryRow>

            </StyledContactSummaryBox>

            {/* SLOTS */}
            <StyledSlotsSummaryBox>
                {/* Iterate through slots */}
                {/* {payload.slots.map((slot, i) => (
                    <StyledPriceRow key={i}>
                        <Typography>{slot.activity.name}</Typography>
                        <Typography>
                            {slot.bookedSpots > 1 ? `${slot.bookedSpots} x ` : ''}{slot.activity.price} lei
                        </Typography>
                    </StyledPriceRow>
                ))} */}

                {/* Separator */}
                {/* <StyledSlotsSummarySeparator /> */}

                {/* Total */}
                {/* <StyledPriceRow>
                    <Typography>Total</Typography>
                    <Typography>
                        {payload.slots.reduce((sum, slot) => {
                            let capacityMultiplier = slot.activity.shareable ? slot.bookedSpots : 1

                            return sum + (slot.activity.price * capacityMultiplier)
                        }, 0).toFixed(2)} lei
                    </Typography>
                </StyledPriceRow> */}
                <Typography className='payment-cite'>*Plata se va efectua la locatie!</Typography>
            </StyledSlotsSummaryBox>


        </>
    );
}

const StyledSummaryRow = styled(Box)(({ theme }) => ({
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.custom.summary.summaryRowMargin,

    '& .MuiTypography-root': {
        fontSize: theme.custom.summary.textSize,
        color: theme.palette.primary.contrastText,
        opacity: theme.custom.summary.textOpacity,
    },

    '& .MuiIcon-root': {
        color: theme.palette.primary.contrastText,
        width: theme.custom.summary.iconSize,
        height: theme.custom.summary.iconSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10px',

        '& svg': {
            width: theme.custom.summary.iconSize,
            height: theme.custom.summary.iconSize,
        }
    }
}))


const StyledContactSummaryBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column',
    padding: `0px ${theme.custom.global.paddingLeftRight}`,
    position: 'relative',

    '&:after': {
        content: '""',
        width: '100%',
        height: '2px',
        backgroundColor: theme.palette.primary.light,
        opacity: 0.35,
        marginTop: '10px'
    }
}))


const StyledSlotsSummaryBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column',
    margin: theme.custom.summary.summaryRowMargin,
    padding: `0px ${theme.custom.global.paddingLeftRight}`,
    position: 'relative',

    '& .payment-cite': {
        fontSize: '1rem',
        color: theme.palette.primary.contrastText,
        opacity: 0.65,
        textAlign: 'right'
    }
}))

const StyledPriceRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.custom.summary.summaryRowMargin,

    '& .MuiTypography-root': {
        fontSize: theme.custom.summary.textSize,
        color: theme.palette.primary.contrastText,
        opacity: theme.custom.summary.textOpacity,
    },

}))

const StyledSlotsSummarySeparator = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '2px',
    margin: `${theme.custom.summary.summaryRowMargin} 0`,
    border: `1px dashed ${theme.palette.primary.contrastText}`,
    opacity: '0.3',

}))