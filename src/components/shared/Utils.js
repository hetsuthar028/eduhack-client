const checkForApiError = (response) => {
    if (!response.error) {
        return null;
    }
    return response.message;
};

export const Utils = {
    checkForApiError
};