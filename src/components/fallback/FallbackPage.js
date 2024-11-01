import styled from '@emotion/styled';
import { HideSource } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import LinksStack from '../commons/LinksStack';


export default function FallbackPage() {
    return (
        <StyledFallbackBoxWrapper>
            <StyledFallbackBox>
                <HideSource className='fallback-icon' />
                {/* <Typography className='fallback-title'>Serviciul este indisponibil</Typography> */}
                <Typography className='fallback-title'>Vom deschide in curand!</Typography>
                {/* <Typography className='fallback-subtitle'>Contactati-ne telefonic sau pe una dintre platformele de socializare</Typography> */}
                <Typography className='fallback-subtitle'>Suna-ne daca vrei sa aflii mai multe! Te tinem la curent pe Facebook si Instagram!</Typography>
                <LinksStack />
            </StyledFallbackBox>
        </StyledFallbackBoxWrapper>
    );
}

const StyledFallbackBoxWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

const StyledFallbackBox = styled(Box)(({ theme }) => ({
    padding: `0 ${theme.custom.global.paddingLeftRight}`,
    width: theme.custom.global.minWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column',

    '& .fallback-icon': {
        fontSize: theme.custom.fallback.iconSize,
        color: theme.palette.primary.contrastText,
        margin: '20px 0'
    },

    '& .fallback-title': {
        textAlign: 'center',
        fontSize: theme.custom.fallback.titleSize,
        color: theme.palette.primary.contrastText,
        fontWeight: 600,
    },

    '& .fallback-subtitle': {
        textAlign: 'center',
        fontSize: theme.custom.fallback.subtitleSize,
        color: theme.palette.primary.contrastText,
        opacity: 0.75,
    },

}))