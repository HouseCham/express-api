/**
 * Interface for the HTTP response
 * @interface IHttpResponse
 * @description Interface for the HTTP response
 * @property {number} status - HTTP status code
 * @property {string} message - Response message
 * @property {any} data - Response data
 */
export default interface IHttpResponse<T> {
    status: number;
    message: string;
    data: T;
}