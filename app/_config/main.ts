const LOCAL_ADDRESS = 'http://localhost:8000';
const PRODUCTION_ADDRESS = 'http://localhost/api';
export const devEnv = 'development' === process.env.NODE_ENV;
export const serverAddress = devEnv ? LOCAL_ADDRESS : PRODUCTION_ADDRESS;
export const imgAddress = 'http://localhost';