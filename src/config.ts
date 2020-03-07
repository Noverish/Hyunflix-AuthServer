export const PORT = parseInt(process.env.PORT) || 80;
export const SESSION_ID_LENGTH = parseInt(process.env.SESSION_ID_LEGNTH || '32');
export const SESSION_ID_COOKIE_KEY = 'x-hyunsub-session-id';

export const ACCESS_TOKEN_EXPIRE = '1h';
export const REFRESH_TOKEN_EXPIRE = '30d';
export const TOKEN_ALGORITHM = 'RS256';
export const REFRESH_TOKEN_HEADER = 'x-hyunsub-refresh-token';
export const ACCESS_TOKEN_HEADER = 'x-hyunsub-access-token';

export const ACCESS_PRIVATE_KEY_PATH = 'keys/access-private.pem';
export const ACCESS_PUBLIC_KEY_PATH = 'keys/access-public.pem';
export const REFRESH_PRIVATE_KEY_PATH = 'keys/refresh-private.pem';
export const REFRESH_PUBLIC_KEY_PATH = 'keys/refresh-public.pem';
export const REFRESH_TOKEN_PAYLOAD_FILED = 'token-payload';
