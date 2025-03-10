/**
 * Enum for HTTP status codes
 * @readonly
 * @enum {number}
 */
export enum HttpCodes {
    // success
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    // error
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    // server error
    INTERNAL_SERVER_ERROR = 500,
}