import styled from '@emotion/styled';
import { Tooltip, Typography } from '@mui/material';
import React from 'react';

export default function SmallErrorMessage({ tooltip, error, placement, children }) {

    return (
        tooltip ?
            <StyledErrorTooltip
                open={error ? true : false}
                arrow
                placement={placement || 'top'}
                title={error}>
                    
                {children}
            </StyledErrorTooltip>
            :
            <>
                {children}
                <StyledErrorTypography>{error}</StyledErrorTypography>
            </>

    );
}

const StyledErrorTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.error,
    fontSize: '0.9rem',
    padding: `0 15px`,
    textAlign: 'center'
}))

const StyledErrorTooltip = styled(Tooltip)(({ theme }) => ({

    '& .MuiPopper-root': {
        backgroundColor: 'red',
        fontSize: '4rem',
        margin: '20px',
        padding: '20px'
    }
}));
