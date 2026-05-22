import axios from 'axios';

const BYPASS_TOKEN = 'qahAdRIAEUf1NshZIcoIbC0SLdCpR36Y';
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://drivefleet-backend-vercel-6cn38h87h-syfulsharifs-projects.vercel.app';

export const api = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add bypass token to all requests
api.interceptors.request.use((config) => {
  const separator = config.url?.includes('?') ? '&' : '?';
  config.url = `${config.url}${separator}x-vercel-protection-bypass=${BYPASS_TOKEN}`;
  return config;
});
