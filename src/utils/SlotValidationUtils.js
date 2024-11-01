
// --- SLOTS VALIDATION ---
export const validateSlotsAndUpdateWithErrors = (slots) => {
    let isValid = true;

    let updatedSlots = slots.map(slot => {
        let slotError = getSlotError(slot);
        let updatedSlot = { ...slot };

        if (slotError) {
            updatedSlot = { ...updatedSlot, error: slotError };
            isValid = false;
        }

        updatedSlot.bundledSlots = updatedSlot.bundledSlots.map(bundledSlot => {
            let bundledSlotError = getBundledSlotError(bundledSlot);
            let updatedBundledSlot = { ...bundledSlot };

            if (bundledSlotError) {
                updatedBundledSlot = { ...updatedBundledSlot, error: bundledSlotError };
                isValid = false;
            }

            return updatedBundledSlot;
        });

        return updatedSlot;
    });

    return {
        slots: updatedSlots,
        isValid: isValid
    };
}

// Slot validation
export const getSlotError = (slot) => {
    // Verify that the startTime is selected
    if (!slot.startTime) {
        return 'Trebuie sa alegeti ora!'
    }

    // Verify that bookedSpots are selected
    if (slot.bookedSpots === 0) {
        return 'Trebuie sa alegeti numarul de persoane!';
    }

    return null;
}

// Bundled Slot validation
export const getBundledSlotError = (bundledSlot) => {
    // Verify that startTimes size coincide with the number of required reservations
    if (!bundledSlot.startTimes || bundledSlot.startTimes.length !== bundledSlot.size) {
        return `Trebuie sa alegeti ora pentru ${bundledSlot.size} rezervari!`
    }

    return null;
}
