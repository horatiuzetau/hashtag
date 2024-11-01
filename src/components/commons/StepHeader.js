import styled from '@emotion/styled';
import { Check } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { hexToRgba } from '../../utils/ColorUtils';
import { next, prev } from '../../utils/CustomIcons';

export default function StepHeader({ title, subTitle, loading, nextStepExists, backButtonOnClick, submitButtonOnClick }) {

    let submitButton = {
        icon: nextStepExists ? <>{next}</> : <Check />
    }

    return (
        <StyledHeader>
            <StyledTitleWrapper>
                <StyledTitle component='span'>{title}</StyledTitle>

                <StyledNavigationItems>
                    {/* Back */}
                    {backButtonOnClick &&
                        <IconButton onClick={backButtonOnClick}>
                            {prev}
                        </IconButton>
                    }
                    {/* Submit button */}
                    <StyledLoadingButton
                        size='large'
                        loadingPosition="center"
                        loading={loading}
                        startIcon={loading ? null : submitButton.icon}
                        onClick={submitButtonOnClick}
                    />
                </StyledNavigationItems>
            </StyledTitleWrapper>
            <StyledSubtitle component='span'>{subTitle}</StyledSubtitle>
        </StyledHeader>
    );
}

const StyledTitleWrapper = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

const StyledNavigationItems = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledLoadingButton = styled(LoadingButton)(({ theme, loading }) => ({
    backgroundColor: loading ? hexToRgba(theme.palette.primary.main, .5) : theme.palette.primary.main,
    borderRadius: '50%',
    width: theme.custom.stepHeader.submitButtonSize,
    height: theme.custom.stepHeader.submitButtonSize,
    minWidth: 'auto',
    marginLeft: '10px',

    '& .MuiButtonBase-root': {
        padding: '0'
    },

    '& .MuiButton-icon': {
        margin: '0',
        padding: '0',
    },

    '& .MuiLoadingButton-loadingIndicator .MuiCircularProgress-root': { // Correct class for loading indicator
        width: '25px !important ',
        height: '25px !important',
        color: theme.palette.primary.contrastText
    },

    '&:after': {
        content: '""',
        position: 'absolute',
        borderRadius: '50%',
        width: `calc(${theme.custom.stepHeader.submitButtonSize} - 10px)`,
        height: `calc(${theme.custom.stepHeader.submitButtonSize} - 10px)`,
        border: `3px solid ${theme.palette.primary.main}`,
        transition: 'all .1s ease-in-out'
    },

    '&:hover': {
        '&:after': {
            width: `calc(${theme.custom.stepHeader.submitButtonSize} + 5px)`,
            height: `calc(${theme.custom.stepHeader.submitButtonSize} + 5px)`,
        },
    }
}));


const StyledTitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.custom.stepHeader.titleSize,
    fontWeight: 500,
}))

const StyledSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.custom.stepHeader.subtitleSize,
    opacity: theme.custom.global.textContrastOpacity,
}))


const StyledHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column',
    backgroundColor: theme.palette.primary.dark,
    padding: `15px ${theme.custom.global.paddingLeftRight}`,
    position: 'relative',
    color: theme.palette.primary.contrastText,

    '&:after': {
        content: '""',
        width: '100%',
        height: '2px',
        backgroundColor: theme.palette.primary.light,
        opacity: 0.35,
        marginTop: '10px'
    }
}))