import styled from "@emotion/styled";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Import the adapter
import React from 'react';
import { hexToRgba } from "../../utils/ColorUtils";
import dayjs from "dayjs";


export default function ReservationCalendar({ date, handleDateChange }) {

    let openingDate = dayjs("12-07-2024")
    let today = dayjs()
    let minDate = openingDate > today ? openingDate : today

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledDateCalendar
                minDate={minDate}
                disablePast={true}
                value={date}
                views={['day']}
                onChange={e => handleDateChange(e)} />
        </LocalizationProvider>
    );
}

const StyledDateCalendar = styled(DateCalendar)(({ theme }) => ({
    transform: `scale(${theme.custom.calendar.scale})`,
    transformOrigin: 'top center',
    transition: 'all .3s ease-in-out',
    // transform: 'scale()',
    // Define scaling behavior at various breakpoints
    [theme.breakpoints.up('xs')]: {
        transform: `scale(1)`, // Extra small screens
    },
    [theme.breakpoints.up('sm')]: {
        transform: `scale(1.1)`, // Small screens
    },
    [theme.breakpoints.up('md')]: {
        transform: `scale(1.3)`, // Medium screens (default size)
    },
    [theme.breakpoints.up('lg')]: {
        transform: `scale(1.5)`, // Large screens
    },
    // [theme.breakpoints.up('xl')]: {
        // transform: `scale(1.5)`, // Extra large screens
    // },

    // Today
    '& .MuiPickersDay-today, .css-1vl8lkf-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)': {
        border: `1px solid ${hexToRgba(theme.palette.primary.light, 0.2)}`
    },

    // Month
    '& .MuiPickersCalendarHeader-root': {
        color: theme.palette.primary.light
    },

    // Arrows
    '& .MuiPickersCalendarHeader-root .MuiButtonBase-root': {
        color: theme.palette.primary.light
    },

    // Week days
    '& .MuiDayCalendar-weekDayLabel': {
        color: theme.palette.primary.light,
        fontWeight: 600,
    },

    // Day numbers
    '& .MuiPickersDay-root': {
        color: theme.palette.primary.light,

        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },

    // Selected
    '& .MuiPickersDay-root.Mui-selected, .MuiPickersDay-root.Mui-selected:focus': {
        backgroundColor: theme.palette.primary.main
    },

    // Disabled days
    '& .MuiPickersDay-root.Mui-disabled:not(.Mui-selected)': {
        color: theme.palette.primary.light,
        opacity: 0.25
    }
}));
