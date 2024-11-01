export const uuidv4 = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => {
        // Clarifying the order of operations with parentheses
        const randomValue = crypto.getRandomValues(new Uint8Array(1))[0];
        const maskedValue = (randomValue & 15) >> (+c / 4);
        const result = (+c ^ maskedValue).toString(16);
        return result;
    });
}

