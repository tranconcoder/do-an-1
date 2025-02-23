import type { StringOrUndefined } from '../types/string';
import { StatusCodes } from 'http-status-codes';

// Libs
import _ from 'lodash';

export default class ErrorResponse {
	private readonly file: StringOrUndefined;

	public constructor(
		public readonly statusCode: StatusCodes,
		public readonly name: string = 'ErrorResponse',
		public readonly message: StringOrUndefined = StatusCodes[statusCode],
		public readonly routePath: StringOrUndefined = undefined
	) {
		this.statusCode = statusCode;
		this.name = name;
		this.message = message;
		this.routePath = routePath;
		this.file = new Error()?.stack
			?.split('\n')
			?.at(2)
			?.split('/')
			?.slice(-2)
			?.join('/')
			?.slice(0, -1);

		if (this.file && !this.file.includes('index')) {
			this.file = this.file.split('/').at(-1);
		}
	}

	public get() {
		return _.pick(this, ['statusCode', 'name', 'message']);
	}

	public toString() {
		return `${this.statusCode}::${this.name}::${this.message}::`;
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
