const LOCAL_ADDRESS = 'http://localhost:8000';
const PRODUCTION_ADDRESS = 'Production url of pur server';
export const devEnv = 'development';
export const serverAddress = devEnv ? LOCAL_ADDRESS : PRODUCTION_ADDRESS;
