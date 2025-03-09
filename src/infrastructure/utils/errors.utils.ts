import { HttpCodes } from "@/domain/enums/httpCodes";
import IHttpResponse from "@/domain/interfaces/IHttpResponse";
/**
 * Function to create a internal server error response
 * @param {string} message - Error message
 * @returns {IHttpResponse<null>} - Response object
 */
export const createErrorResponse = (): IHttpResponse<null> => ({
  status: HttpCodes.INTERNAL_SERVER_ERROR,
  message: 'Internal server error',
  data: null,
});
