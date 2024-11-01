import styled from '@emotion/styled';
import { FacebookRounded, Instagram, Language, WhatsApp } from '@mui/icons-material';
import { Button, Link, Stack } from '@mui/material';
import React from 'react';

export default function LinksStack() {
    return (
        <>
            <StyledLinksStack direction='row'>
                {process.env.REACT_APP_SOCIAL_FACEBOOK_URL &&
                    <Link href={process.env.REACT_APP_SOCIAL_FACEBOOK_URL} className='icon-link'>
                        <FacebookRounded />
                    </Link>
                }
                {process.env.REACT_APP_SOCIAL_INSTAGRAM_URL &&
                    <Link href={process.env.REACT_APP_SOCIAL_INSTAGRAM_URL} className='icon-link'>
                        <Instagram />
                    </Link>
                }
                {process.env.REACT_APP_SOCIAL_WHATSAPP_URL &&
                    <Link href={process.env.REACT_APP_SOCIAL_WHATSAPP_URL} className='icon-link'>
                        <WhatsApp />
                    </Link>
                }
                {process.env.REACT_APP_WEBSITE_URL &&
                    <Link href={process.env.REACT_APP_WEBSITE_URL} className='icon-link'>
                        <Language />
                    </Link>
                }
            </StyledLinksStack>
            {process.env.REACT_APP_PHONE &&
                <StyledPhoneButton component='a' href={`tel:${process.env.REACT_APP_PHONE}`} className='fallback-call' variant='outlined'>
                    {process.env.REACT_APP_PHONE}
                </StyledPhoneButton>
            }
        </>
    );
}


// Links
const StyledLinksStack = styled(Stack)(({ theme }) => ({

    '& .icon-link': {
        margin: theme.custom.links.margin,

        '& svg': {
            transition: 'opacity, transform .15s ease-in-out',
            opacity: 0.75,
            width: theme.custom.links.iconLinkSize,
            height: theme.custom.links.iconLinkSize,
        },

        '&:hover svg': {
            transform: 'translateY(-10px)',
            opacity: 1
        },
    },

    '& .fallback-call': {
        fontSize: theme.custom.fallback.subtitleSize,
        marginTop: '20px',
    },

}))

// Button
const StyledPhoneButton = styled(Button)(({ theme }) => ({
    fontSize: theme.custom.fallback.subtitleSize,
    margin: theme.custom.links.margin,
}))