export const PORT = parseInt(process.env.PORT) || 80;
export const JWT_SECRET = process.env.JWT_SECRET || Math.random().toString();
