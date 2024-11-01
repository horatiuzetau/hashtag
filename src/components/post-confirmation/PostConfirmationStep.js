import styled from '@emotion/styled';
import { CheckCircle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import StepBody from '../commons/StepBody';
import LinksStack from '../commons/LinksStack';
import { getDateTranslation } from '../../utils/TimeUtils';

export default function PostConfirmationStep({ date }) {

    return (
        <StepBody>
            <StyledPostConfirmationMessage>
                <CheckCircle className='post-confirmation__icon' />
                <Typography className='post-confirmation__title'>Rezervarea a fost finalizata cu succes!</Typography>
                <Typography className='post-confirmation__subtitle'>Te asteptam {getDateTranslation(date)}!</Typography>
                <LinksStack />
            </StyledPostConfirmationMessage>
            <StyledPostConfirmationTips>
                <Typography>Asigura-te ca ai la tine imbracaminte confortabila!</Typography>
                <Typography>Vino cu 10 minute inainte, ca sa avem timp de echipare si instructaj!</Typography>
                <Typography>Adu scorul din meciul trecut! Daca te-ai auto-depasit, primesti 10% reducere la urmatoarea batalie!</Typography>
            </StyledPostConfirmationTips>
        </StepBody>
    );
}

const StyledPostConfirmationTips = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    padding: `0 ${theme.custom.global.paddingLeftRight}`,
    color: theme.palette.primary.contrastText,
    margin: '20px 0',


    '& .MuiTypography-root': {
        fontSize: theme.custom.postConfirmation.subtitleSize,
        backgroundColor: theme.custom.postConfirmation.tipsBackgroundColor,
        marginBottom: theme.custom.postConfirmation.tipsGap,
        padding: '10px 20px'
    }
}))


const StyledPostConfirmationMessage = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: `0 ${theme.custom.global.paddingLeftRight}`,


    '&:after': {
        content: '""',
        width: '100%',
        height: '2px',
        backgroundColor: theme.palette.primary.light,
        opacity: 0.35,
        marginTop: '10px'
    },

    '& .post-confirmation__icon': {
        color: theme.palette.primary.success,
        fontSize: theme.custom.postConfirmation.iconSize,
        margin: '20px 0 10px'
    },

    '& .post-confirmation__title': {
        fontSize: theme.custom.postConfirmation.titleSize,
        color: theme.palette.primary.contrastText,
        textAlign: 'center'
    },

    '& .post-confirmation__subtitle': {
        fontSize: theme.custom.postConfirmation.subtitleSize,
        color: theme.palette.primary.contrastText,
        textAlign: 'center',
        opacity: 0.75
    },

    '& .post-confirmation__subtitle a': {
        fontSize: theme.custom.postConfirmation.subtitleSize,
        fontWeight: 600,
    }
}))