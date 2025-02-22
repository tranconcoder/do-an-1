import { StatusCodes } from 'http-status-codes';

export default class ErrorResponse {
	public constructor(
		public readonly statusCode: StatusCodes,
		public readonly message?: string
	) {}
}
