// API utilities and client wrappers for Moamoa.
import Constants from 'expo-constants';

function getBackendBaseUrl() {
  // If running in Expo, derive the host from debuggerHost so mobile devices
  // connected to the same LAN will use the developer machine IP automatically.
  const debuggerHost = (Constants.manifest as any)?.debuggerHost;
  if (debuggerHost) {
    const host = debuggerHost.split(':')[0];
    return `http://${host}:4000`;
  }

  // Fallback to localhost for web / simulator environments.
  return 'http://localhost:4000';
}

const BASE_URL = getBackendBaseUrl();

async function request(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${text}`);
  }
  return res.json();
}

export const apiClient = {
  get: async (path: string) => request(path, { method: 'GET' }),
  post: async (path: string, body: any) =>
    request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  baseUrl: BASE_URL,
};

export default apiClient;
