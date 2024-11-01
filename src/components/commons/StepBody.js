import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';

export default function StepBody({children}) {
    return (  
        <StyledScrollableBox>
            {children}
        </StyledScrollableBox>
    );
}

const StyledScrollableBox = styled(Box)`
    display: flex;
    flex-flow: column;
    align-items: center;
`