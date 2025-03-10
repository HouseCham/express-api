/**
 * @interface IBadRequestError
 * @description Interface for bad request error
 * @property {string} path - Path of the error
 * @property {string} message - Error message
 */
export default interface IBadRequestError {
    path: string;
    message: string;
};