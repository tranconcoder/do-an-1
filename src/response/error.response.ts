import type { StringOrUndefined } from '../types/string';
import { StatusCodes } from 'http-status-codes';

// Libs
import _ from 'lodash';

export default class ErrorResponse {
	public constructor(
		public readonly statusCode: StatusCodes,
		public readonly name: string = 'ErrorResponse',
		public readonly message: StringOrUndefined = StatusCodes[statusCode]
	) {
		this.statusCode = statusCode;
		this.name = name;
		this.message = message;
	}

	public get() {
		return _.pick(this, ['statusCode', 'name', 'message']);
	}
}

export class InternalServerErrorResponse extends ErrorResponse {
	public constructor(
		message: string = StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR]
	) {
		super(StatusCodes.INTERNAL_SERVER_ERROR, 'InternalServerError', message);
	}
}

export class BadRequestErrorResponse extends ErrorResponse {
	public constructor(message: string = StatusCodes[StatusCodes.BAD_REQUEST]) {
		super(StatusCodes.BAD_REQUEST, 'BadRequest', message);
	}
}

export class UnauthorizedErrorResponse extends ErrorResponse {
	public constructor(message: string = StatusCodes[StatusCodes.UNAUTHORIZED]) {
		super(StatusCodes.UNAUTHORIZED, 'Unauthorized', message);
	}
}

export class NotFoundErrorResponse extends ErrorResponse {
	public constructor(message: string = StatusCodes[StatusCodes.NOT_FOUND]) {
		super(StatusCodes.NOT_FOUND, 'NotFound', message);
	}
}

export class ForbiddenErrorResponse extends ErrorResponse {
	public constructor(message: string = StatusCodes[StatusCodes.FORBIDDEN]) {
		super(StatusCodes.FORBIDDEN, 'Forbidden', message);
	}
}

export class ConflictErrorResponse extends ErrorResponse {
	public constructor(message: string = StatusCodes[StatusCodes.CONFLICT]) {
		super(StatusCodes.CONFLICT, 'Conflict', message);
	}
}
