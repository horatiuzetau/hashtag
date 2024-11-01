import styled from '@emotion/styled';
import { Box, SvgIcon } from '@mui/material';
import React from 'react';
import { activities, calendar, personalData } from '../utils/CustomIcons';
import { Steps } from './Wizard';


export default function WizardProgress({ payload, currentStep }) {

    const isCurrentStep = (step) => {
        return convertBoolean(currentStep === step)
    }

    const convertBoolean = (value) => {
        return value ? 1 : 0
    }

    return (
        <StyledProgressContainer id='progress-bar'>
            {/* Date step */}
            <StyledProgressStep>
                <StyledProgressStepIcon
                    current={isCurrentStep(Steps.SELECT_DATE)}
                    completed={convertBoolean(payload.date)}>
                    {calendar}
                </StyledProgressStepIcon>
                <StyledProgressBar completed={convertBoolean(payload.date)} />
            </StyledProgressStep>

            {/* Activities step */}
            <StyledProgressStep>
                <StyledProgressStepIcon
                    current={isCurrentStep(Steps.SELECT_SLOTS)}
                    completed={convertBoolean(payload.slots.length > 0)}>
                    {activities}
                </StyledProgressStepIcon>
                <StyledProgressBar completed={convertBoolean(payload.slots.length > 0)} />
            </StyledProgressStep>

            {/* Contact step */}
            <StyledProgressStep>
                <StyledProgressStepIcon
                    current={isCurrentStep(Steps.UPDATE_CONTACT_INFORMATION)}
                    completed={convertBoolean(payload.contact && payload.contact.validated)}>
                    {personalData}
                </StyledProgressStepIcon>
                <StyledProgressBar completed={convertBoolean(payload.contact && payload.contact.validated)} />
            </StyledProgressStep>
        </StyledProgressContainer>
    );
}

const StyledProgressBar = styled(Box)(({ theme, completed }) => ({
    height: '2px',
    width: '100%',
    backgroundColor: theme.palette.primary.fade,
    position: 'relative',

    '&:after': {
        content: '""',
        width: completed ? '100%' : '0px',
        position: 'absolute',
        top: '0',
        left: '0',
        height: '2px',
        transition: 'width 1s ease',
        backgroundColor: theme.palette.primary.success
    }
}));

const StyledProgressStepIcon = styled(SvgIcon)(({ theme, completed, current }) => ({
    height: theme.custom.progressBar.iconSize,
    width: theme.custom.progressBar.iconSize,
    transition: 'transform .5s ease',
    transform: current ? `scale(${theme.custom.progressBar.currentIconScale})` : 'none',
    margin: '20px 0',

    '& path': {
        transition: 'fill .5s ease',
        fill: completed ? theme.palette.primary.success : theme.palette.primary.light
    }
}));

const StyledProgressStep = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column',
    width: '100%',
    position: 'relative'
}));

const StyledProgressContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    // padding: `0 ${theme.custom.global.paddingLeftRight}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
}));
