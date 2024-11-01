import dayjs from "dayjs";

export const isTimeBetween = (currentTime, startTime, duration) => {
    // Append a fixed date and create Date objects
    const start = dayjs(`1970-01-01T${startTime}:00`);
    const end = start.add(duration, 'minute');
    const current = dayjs(`1970-01-01T${currentTime}:00`);
    // Check if current time is between start and end times
    return current >= start && current < end;
}

export const getDateTranslation = (date) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    let formattedDate = date.toDate()
    return toCamelCase(formattedDate.toLocaleDateString('ro', options))
}


const toCamelCase = (str) => {
    return str
        .toLowerCase() // Step 1: Convert entire string to lowercase
        .split(/[\s-_]+/) // Step 2: Split by spaces, hyphens, or underscores
        .map((word, index) => word.charAt(0).toUpperCase() + word.slice(1)
        ) // Step 3: Capitalize first letter of each word except the first one
        .join(' '); // Step 4: Join words together
}