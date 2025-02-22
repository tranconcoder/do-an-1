// Version control
export const API_VERSION = 'v1';

// Server configs
export const PORT = Number(process.env.PORT) || 3000;
export const HOST = process.env.HOST || 'localhost';
export const BASE_URL = `http://${HOST}:${PORT}`;

// Environment
export const NODE_ENV = process.env.NODE_ENV || 'development';
