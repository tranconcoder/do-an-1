import type { RequestHandler } from 'express';

export interface RequestWithBody<T> extends RequestHandler<any, any, T> {}

export interface RequestWithParams<T> extends RequestHandler<T, any, any> {}
