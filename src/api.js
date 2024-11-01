import axios from "axios";

const HOST = process.env.REACT_APP_API_URL

export const checkReservationsHealth = async () => {
    return await axios.get(`${HOST}/api/v1/health/reservations`);
};

export const fetchActivities = async () => {
    const response = await axios.get(`${HOST}/api/v1/activities/active`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch activities', response);
    }
    return response;
};

export const fetchAvailabilityMap = async (date) => {
    const response = await axios.get(`${HOST}/api/v1/availability?date=${date.format("MM-DD-YYYY")}`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch activities', response);
    }
    return response;
};

export const batchBookSlot = async (payload) => {
    let requestPayload = createBatchBookSlotRequestPayload(payload)
    const response = await axios.post(`${HOST}/api/v1/slots/batch`, requestPayload)

    if (response.status !== 201) {
        throw new Error('Failed to create reservations', response)
    }

    return response;
}

const createBatchBookSlotRequestPayload = (payload) => {
    let slotsToSave = [];

    // For all slots
    for (let slot of payload.slots) {
        let bundledSlotsToSave = []

        // Take all bundled slots
        for (let bundledSlot of slot.bundledSlots) {

            // Create bundled slots based on startTimes
            for (let startTime of bundledSlot.startTimes) {
                let bundledSlotToSave = {
                    activityId: bundledSlot.activity.id,
                    bookedSpots: bundledSlot.activity.capacity,
                    date: payload.date.format("YYYY-MM-DD"),
                    startTime: startTime
                }

                bundledSlotsToSave.push(bundledSlotToSave)
            }
        }

        // Create slot to send to backend 
        let slotToSave = {
            activityId: slot.activity.id,
            bookedSpots: slot.bookedSpots,
            date: payload.date.format("YYYY-MM-DD"),
            startTime: slot.startTime,
            bundledSlots: bundledSlotsToSave
        }

        slotsToSave.push(slotToSave)
    }

    return {
        slots: slotsToSave,
        client: payload.contact,
    }
}