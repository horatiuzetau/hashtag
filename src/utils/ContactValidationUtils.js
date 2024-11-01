
// --- CONTACT VALIDATION ---
// Email validation regex (basic validation)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (validates mobile numbers, assumes it starts with + and country code or just numbers)
const phoneRegex = /^\+?\d{10,15}$/;

// Literal (only alphabetic characters) regex for name validation
const literalRegex = /^[a-zA-Z]+$/;

export const validateContactAndUpdateWithErrors = (contact) => {
    var isValid = true;
    let newContact = { ...contact }

    Object.entries(contact).forEach(([key, value]) => {
        let fieldError = getContactFieldValidationError(key, value)

        if (fieldError) {
            newContact = {
                ...newContact,
                errors: {
                    ...newContact.errors,
                    [key]: fieldError
                }
            }
            isValid = false;
        }
    });

    return {
        contact: newContact,
        isValid: isValid
    }
}

export const doesContactContainErrors = (contact) => {
    let containErrors = false

    Object.entries(contact).forEach(([key, value]) => {
        if (contact.errors[key]) {
            containErrors = true
        }
    });

    return containErrors
}


export const getContactFieldValidationError = (field, value) => {
    switch (field) {
        case 'email': {
            return getEmailValidationError(value);
        }
        case 'phone': {
            return getPhoneError(value);
        }
        case 'firstName': {
            return getFirstNameError(value);
        }
        case 'lastName': {
            return getLastNameError(value);
        }
        case 'termsAndConditions': {
            return getTermsAndConditionsError(value);
        }
        case 'gdpr': {
            return getGdprError(value);
        }
        default: {
            return undefined
        }
    }
}

export const getEmailValidationError = (email) => {
    if (!email) {
        return "Completati cu un e-mail valid!";
    }

    if (!emailRegex.test(email)) {
        return "E-mail invalid! ex: popescu@gmail.com";
    }

    return null;
}

export const getPhoneError = (phone) => {
    if (!phone) {
        return "Completati cu un numar de telefon valid!";
    }

    if (!phoneRegex.test(phone)) {
        return "Numar de telefon invalid!";
    }

    return null;
}

export const getFirstNameError = (firstName) => {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 15;

    if (!firstName) {
        return "Prenumele trebuie completat!";
    }

    if (firstName.length < MIN_LENGTH) {
        return `Prenumele trebuie sa fie mai lung de ${MIN_LENGTH} caractere`;
    }

    if (firstName.length > MAX_LENGTH) {
        return `Prenumele trebuie sa fie mai scurt de ${MAX_LENGTH} caractere`;
    }

    if (!literalRegex.test(firstName)) {
        return "Prenumele trebuie sa contina doar litere!";
    }

    return null;
}

export const getLastNameError = (lastName) => {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 15;

    if (!lastName) {
        return "Numele de familie trebuie completat!";
    }

    if (lastName.length < MIN_LENGTH) {
        return `Numele de familie trebuie sa aiba minim ${MIN_LENGTH} caractere!`;
    }

    if (lastName.length > MAX_LENGTH) {
        return `Numele de familie trebuie sa aiba maxim ${MAX_LENGTH} caractere!`;
    }

    if (!literalRegex.test(lastName)) {
        return "Numele de familie trebuie sa contina doar litere!";
    }

    return null;
}

export const getTermsAndConditionsError = (termsAndConditions) => {
    if (!termsAndConditions) {
        return "Cititi si acceptati termenii si conditiile!";
    }

    return null;
}

export const getGdprError = (gdpr) => {
    if (!gdpr) {
        return "Cititi si acceptati politica pentru prelucrarea datelor!";
    }

    return null;
}