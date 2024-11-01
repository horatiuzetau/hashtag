import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationStep from './confirmation/ConfirmationStep';
import ContactStep from './contact/ContactStep';
import DateStep from './date/DateStep';
import PostConfirmationStep from './post-confirmation/PostConfirmationStep';
import ReservationStep from './reservation/ReservationStep';
import WizardProgress from './WizardProgress';

export const Steps = Object.freeze({
    SELECT_DATE: 1,
    SELECT_SLOTS: 2,
    UPDATE_CONTACT_INFORMATION: 3,
    CONFIRMATION_STEP: 4,
    POST_CONFIRMATION_STEP: 5
});

const initialState = {
    step: Steps.SELECT_DATE,
    payload: {
        date: null,
        slots: [],
        contact: null,
    }
}

export default function Wizard() {

    const navigate = useNavigate();

    const [wizard, setWizard] = useState(initialState)

    const updateContact = (contact) => {
        setWizard({ ...wizard, payload: { ...wizard.payload, contact: contact } })
    }

    const getPathFromStep = (step) => {
        switch (step) {
            case Steps.SELECT_DATE: {
                return "/data"
            }
            case Steps.SELECT_SLOTS: {
                return "/rezervare"
            }
            case Steps.UPDATE_CONTACT_INFORMATION: {
                return "/contact"
            }
            case Steps.CONFIRMATION_STEP: {
                return "/finalizare"
            }
            case Steps.POST_CONFIRMATION_STEP: {
                return "/confirmare"
            }
        }
    }

    const confirmValueAndTriggerNextStep = (nextStep, currentStep, stepPayload) => {
        let updatedPayload = wizard.payload;
        switch (currentStep) {
            case Steps.SELECT_DATE: {
                updatedPayload = {
                    ...updatedPayload,
                    date: stepPayload,
                    slots: stepPayload !== updatedPayload.date ? [] : updatedPayload.slots
                }
                break
            }
            case Steps.SELECT_SLOTS: {
                updatedPayload = {
                    ...updatedPayload,
                    slots: stepPayload
                }
                break
            }
            case Steps.UPDATE_CONTACT_INFORMATION: {
                updatedPayload = {
                    ...updatedPayload,
                    contact: { ...stepPayload, validated: true }
                }
                break
            }
            case Steps.CONFIRMATION_STEP: {
                updatedPayload = {
                    ...updatedPayload,
                }
                break
            }
            default: {
                break
            }
        }
        // Update next step
        navigate(getPathFromStep(nextStep))
        setWizard({ ...wizard, step: nextStep, payload: updatedPayload })
    }

    // Trigger previous step
    const triggerPreviousStep = (previousStep) => {
        if (previousStep) {
            navigate(getPathFromStep(previousStep))
            setWizard({ ...wizard, step: previousStep })
        }
    }

    // Render component based on step
    const getComponentBasedOnStep = () => {
        switch (wizard.step) {
            case Steps.SELECT_DATE: {
                return (
                    <DateStep
                        existingDate={wizard.payload.date}
                        currentStep={Steps.SELECT_DATE}
                        nextStep={Steps.SELECT_SLOTS}
                        confirmValueAndTriggerNextStep={confirmValueAndTriggerNextStep} />
                )
            }
            case Steps.SELECT_SLOTS: {
                return (
                    <ReservationStep
                        existingSlots={wizard.payload.slots}
                        date={wizard.payload.date}
                        previousStep={Steps.SELECT_DATE}
                        currentStep={Steps.SELECT_SLOTS}
                        nextStep={Steps.UPDATE_CONTACT_INFORMATION}
                        triggerPreviousStep={triggerPreviousStep}
                        confirmValueAndTriggerNextStep={confirmValueAndTriggerNextStep} />
                )
            }
            case Steps.UPDATE_CONTACT_INFORMATION: {
                return (
                    <ContactStep
                        existingContact={wizard.payload.contact}
                        previousStep={Steps.SELECT_SLOTS}
                        currentStep={Steps.UPDATE_CONTACT_INFORMATION}
                        nextStep={Steps.CONFIRMATION_STEP}
                        updateContactInWizard={updateContact}
                        triggerPreviousStep={triggerPreviousStep}
                        confirmValueAndTriggerNextStep={confirmValueAndTriggerNextStep} />
                )
            }
            case Steps.CONFIRMATION_STEP: {
                return (
                    <ConfirmationStep
                        payload={wizard.payload}
                        previousStep={Steps.UPDATE_CONTACT_INFORMATION}
                        currentStep={Steps.CONFIRMATION_STEP}
                        nextStep={Steps.POST_CONFIRMATION_STEP}
                        triggerPreviousStep={triggerPreviousStep}
                        confirmValueAndTriggerNextStep={confirmValueAndTriggerNextStep} />
                )
            }
            case Steps.POST_CONFIRMATION_STEP: {
                return (
                    <PostConfirmationStep
                        date={wizard.payload.date}
                        confirmValueAndTriggerNextStep={confirmValueAndTriggerNextStep}
                    />
                )
            }
            default: {
                return <></>
            }
        }
    }

    return (
        <>
            <StyledWizardWrapper id='wizard'>
                <StyledWizard>
                    <WizardProgress payload={wizard.payload} currentStep={wizard.step} />
                    <StyledStepContainer id='step-container'>
                        {getComponentBasedOnStep()}
                    </StyledStepContainer>
                </StyledWizard>
            </StyledWizardWrapper>
        </>
    );
}


const StyledStepContainer = styled(Box)`
    width: 100%;
`

const StyledWizard = styled(Box)(({ theme }) => ({
    width: theme.custom.global.minWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column'

}));


const StyledWizardWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));