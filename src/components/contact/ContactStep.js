import styled from '@emotion/styled';
import { Email, Person, PhoneAndroid } from '@mui/icons-material';
import { Box, Checkbox, FormControlLabel, InputAdornment, Link, TextField } from '@mui/material';
import React, { useState } from 'react';
import { hexToRgba } from '../../utils/ColorUtils';
import { doesContactContainErrors, getContactFieldValidationError, validateContactAndUpdateWithErrors } from '../../utils/ContactValidationUtils';
import SmallErrorMessage from '../commons/SmallErrorMessage';
import StepBody from '../commons/StepBody';
import StepHeader from '../commons/StepHeader';
import TermsModal from './TermsModal';

const initialState = {
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    termsAndConditions: false,
    // gdpr: false,
    errors: {
        email: null,
        phone: null,
        firstName: null,
        lastName: null,
        termsAndConditions: null,
        // gdpr: null
    }
}

export default function ContactStep({ existingContact, currentStep, previousStep, nextStep, confirmValueAndTriggerNextStep, triggerPreviousStep, updateContactInWizard }) {

    const [contact, setContact] = useState(existingContact || initialState)
    const [validationError, setValidationError] = useState(null)
    const [isTermsModalOpen, setTermsModalOpen] = useState(false);

    // Submit slots data
    const handleSubmitData = () => {
        let validationResponse = validateContactAndUpdateWithErrors(contact)

        if (!validationResponse.isValid) {
            setContact(validationResponse.contact)
            setValidationError('Rezolvati erorile pentru a trece mai departe')
        } else {
            confirmValueAndTriggerNextStep(nextStep, currentStep, contact)
        }
    }

    // Contact information change 
    const handleContactChange = (data) => {
        // Update contact
        let updatedContact = updateContact(contact, data, validationError !== null)
        setContact(updatedContact)

        // If updated contact doesn't contain errors, remove validation error
        if (validationError && !doesContactContainErrors(updatedContact)) {
            setValidationError(null)
        }

        updateContactInWizard(updatedContact)
    }

    // Toggle modal open/close
    const handleTermsClick = (event) => {
        event.preventDefault(); // Prevent default link behavior
        setTermsModalOpen(true);
    };

    const handleCloseTermsModal = () => {
        setTermsModalOpen(false);
    };

    return (
        <>
            <StepHeader
                title='3. Cine esti?'
                subTitle='Completeaza datele, ca sa putem sa te contactam in vederea confirmarii.'
                backButtonOnClick={() => triggerPreviousStep(previousStep)}
                nextStepExists={nextStep}
                submitButtonOnClick={handleSubmitData} />

            <StepBody>
                <form style={{ width: '100%' }}>
                    <StyledContactFormWrapper>
                        {/* First name */}
                        <StyledTextField
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            label="Prenume"
                            type='text'
                            id='first-name'
                            name='first-name'
                            autoComplete='given-name'
                            placeholder='ex. Marinel'
                            value={contact.firstName}
                            error={contact.errors.firstName !== null}
                            helperText={contact.errors.firstName}
                            onChange={(e) => handleContactChange(buildStringChangePayload('firstName', e.target.value))}
                        />

                        {/* Last name */}
                        <StyledTextField
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            label="Nume"
                            type='text'
                            id='last-name'
                            name='last-name'
                            autoComplete='family-name'
                            placeholder='ex. Popescu'
                            value={contact.lastName}
                            error={contact.errors.lastName !== null}
                            helperText={contact.errors.lastName}
                            onChange={(e) => handleContactChange(buildStringChangePayload('lastName', e.target.value))}
                        />

                        {/* Email */}
                        <StyledTextField
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            label="E-mail"
                            type='email'
                            name='email'
                            id='email'
                            autoComplete='email'
                            placeholder='ex. marinel.popescu@gmail.com'
                            value={contact.email}
                            error={contact.errors.email !== null}
                            helperText={contact.errors.email}
                            onChange={(e) => handleContactChange(buildStringChangePayload('email', e.target.value))}
                        />

                        {/* Phone */}
                        <StyledTextField
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneAndroid />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            label="Telefon"
                            type='tel'
                            name='phone'
                            id='phone'
                            autoComplete='tel'
                            placeholder='ex. 076655443322'
                            value={contact.phone}
                            error={contact.errors.phone !== null}
                            helperText={contact.errors.phone}
                            onChange={(e) => handleContactChange(buildStringChangePayload('phone', e.target.value))}
                        />
                    </StyledContactFormWrapper>

                    {/* Terms & Co */}
                    <StyledCheckboxesWrapper>
                        <SmallErrorMessage placement={'top'} error={contact.errors.termsAndConditions}>
                            <StyledControlLabel
                                control={
                                    <Checkbox
                                        className='contact-checkbox'
                                        checked={contact.termsAndConditions}
                                        onChange={() =>
                                            handleContactChange(buildChangePayload('termsAndConditions', !contact.termsAndConditions))
                                        }
                                    />
                                }
                                label={<Link className='contact-label-link' href='#' onClick={handleTermsClick}>Termeni & Conditii</Link>}
                            />
                        </SmallErrorMessage>

                        {/* Render TermsModal */}
                        <TermsModal open={isTermsModalOpen} onClose={handleCloseTermsModal} />

                        {/* GDPR */}
                        {/* <SmallErrorMessage placement={'top'} error={contact.errors.gdpr}>
                        <StyledControlLabel
                            control={
                                <Checkbox
                                    className='contact-checkbox'
                                    checked={contact.gdpr}
                                    onChange={() => handleContactChange(buildChangePayload('gdpr', !contact.gdpr))} />
                            }
                            label={<Link className='contact-label-link' href='#'>Protectia datelor</Link>}
                        />
                    </SmallErrorMessage> */}
                    </StyledCheckboxesWrapper>
                </form>

            </StepBody>
        </>
    );
}

const StyledControlLabel = styled(FormControlLabel)(({ theme }) => ({
    padding: '0 15px',
    transition: 'color .4s ease-in-out',

    // ICON
    '& .MuiSvgIcon-root': {
        transition: 'all .4s ease-in-out',
    },

    // Icon hover
    '&:hover .MuiSvgIcon-root': {
        color: hexToRgba(theme.palette.primary.main, 1),
    },

    // Label
    '& .contact-label-link': {
        transition: 'color .4s ease-in-out',
        color: hexToRgba(theme.palette.primary.light, 0.75),
    },

    // Label hover
    '&:hover .contact-label-link': {
        color: theme.palette.primary.light,
    },

    // Checkbox
    '& .contact-checkbox': {
        color: hexToRgba(theme.palette.primary.light, 0.8),
    }
}))

const StyledCheckboxesWrapper = styled(Box)(({ theme, checked }) => ({
    width: '100%',
    padding: `0 ${theme.custom.global.paddingLeftRight}`,
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: '10px',

    '& .MuiInputBase-input': {
        color: `${theme.palette.primary.light} !important`
    },

    '& .MuiInputAdornment-root': {
        color: theme.palette.primary.light
    },

    '& .MuiInputLabel-formControl': {
        color: theme.palette.primary.light
    },

    // Outline styling
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            transition: 'all .3s ease-in-out',
            borderColor: theme.palette.primary.light,
            opacity: 0.2
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
            opacity: 1
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            opacity: 1
        },
    },
}))

const StyledContactFormWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'grid',
    padding: `0 ${theme.custom.global.paddingLeftRight}`,
    gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns by default
    gap: '10px',

    // Media query for mobile screens
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 1fr)', // 1 column on small screens
    },
}))

// Update contact information
const updateContact = (contact, data, shouldComputeErrors) => {
    let newContact = contact;

    // If submit was already tried and there are validation errors, 
    // compute at every change to remove errors when outdated
    if (shouldComputeErrors) {
        let error = getContactFieldValidationError(data.field, data.value);

        if (error) {
            newContact = {
                ...newContact,
                errors: {
                    ...newContact.errors,
                    [data.field]: error
                }
            }
        } else {
            newContact = {
                ...newContact,
                errors: {
                    ...newContact.errors,
                    [data.field]: null
                }
            }
        }
    }

    return { ...newContact, [data.field]: data.value }
}

// Build field change payload for contact fields' update
const buildStringChangePayload = (field, value) => {
    return buildChangePayload(field, value.trim())
}


// Build field change payload for contact fields' update
const buildChangePayload = (field, value) => {
    return { field: field, value: value }
}
