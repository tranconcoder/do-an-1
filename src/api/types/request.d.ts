import type { RequestHandler } from 'express';

export interface RequestWithBody<T> extends RequestHandler<any, any, T> {}
