import styled from '@emotion/styled';
import { AppBar, SvgIcon } from '@mui/material';
import React from 'react';
import { hexToRgba } from '../utils/ColorUtils';
import { logo } from '../utils/CustomIcons';

export default function Navbar() {
    return (
        <StyledNavbar position='static'>
            <StyledNavbarLogo>
                {logo}
            </StyledNavbarLogo>
        </StyledNavbar>
    );
}

const StyledNavbar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `2px solid ${hexToRgba(theme.palette.primary.main, 0.2)}`,
    boxShadow: 'none'
}));

const StyledNavbarLogo = styled(SvgIcon)(({ theme }) => ({
    width: theme.custom.navbar.logoSize,
    height: theme.custom.navbar.logoSize,
}));

