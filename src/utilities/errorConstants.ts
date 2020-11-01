
export const USER_NOT_FOUND = "USER NOT FOUND";
export const WRONG_PASSWORD = "WRONG PASSWORD";
export const INVALID_REFRESH_TOKEN = "INVALID REFRESH TOKEN";
export const UNAUTHORIZED_REQUEST = "UNAUTHORIZED REQUEST";
export const REFRESH_TOKEN_EXPIRED = "REFRESH TOKEN EXPIRED";
export const INVALID_AUTH_TOKEN = "INVALID AUTH TOKEN";
export const NOT_FOUND = "NOT FOUND";
export const INVALID_HEADER_VALUE = "INVALID HEADERS VALUE";
export const INVALID_TOKEN = "INVALID TOKEN";
export const TOKEN_EXPIRED = "TOKEN EXPIRED";
export const INVALID_ID = "INVALID ID";
export const UNEXPECTED_ERROR="UNEXPECTED ERROR"

export const generateError = (error:any) => {
    if(error.message && error.stack) {
        error = {message: error.message, stack: error.stack};
    }
    if(typeof(error) === "object") {
        error = JSON.stringify(error);
    }
    return error;
};