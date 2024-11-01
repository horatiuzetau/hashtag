export const convertToMap = (obj) => {
    const map = new Map();

    if (obj.capacity) {
        return obj;
    }

    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            // Recursively convert nested objects to Maps
            map.set(key, convertToMap(obj[key]));
        } else {
            map.set(key, obj[key]);
        }
    });

    return map;
};

export const getFromMap = (availabilityMap, activityId, date, time) => {
    let response;

    if (time === null) {
        return undefined
    }

    if (availabilityMap) {
        response = availabilityMap;

        if (activityId) {
            response = response.get(`${activityId}`)

            if (date) {
                response = response.get(date.format('YYYY-MM-DD'))

                if (time) {
                    response = response.get(time)
                }
            }
        }
    }

    return response;
}

