export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  LEADS: {
    LIST: '/leads',
    CREATE: '/leads',
    GET: (id: string) => `/leads/${id}`,
    UPDATE: (id: string) => `/leads/${id}`,
    DELETE: (id: string) => `/leads/${id}`,
    UPDATE_STATUS: (id: string) => `/leads/${id}/status`,
  },
  PROPERTIES: {
    LIST: '/properties',
    CREATE: '/properties',
    GET: (id: string) => `/properties/${id}`,
    UPDATE: (id: string) => `/properties/${id}`,
    DELETE: (id: string) => `/properties/${id}`,
  },
  DEALS: {
    LIST: '/deals',
    CREATE: '/deals',
    GET: (id: string) => `/deals/${id}`,
    UPDATE: (id: string) => `/deals/${id}`,
    DELETE: (id: string) => `/deals/${id}`,
  },
  TASKS: {
    LIST: '/tasks',
    CREATE: '/tasks',
    GET: (id: string) => `/tasks/${id}`,
    UPDATE: (id: string) => `/tasks/${id}`,
    DELETE: (id: string) => `/tasks/${id}`,
  },
  CONTACTS: {
    LIST: '/contacts',
    CREATE: '/contacts',
    GET: (id: string) => `/contacts/${id}`,
    UPDATE: (id: string) => `/contacts/${id}`,
    DELETE: (id: string) => `/contacts/${id}`,
  },
};

export const STATUS_COLORS: Record<string, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Visit': 'bg-purple-100 text-purple-800',
  'Negotiation': 'bg-orange-100 text-orange-800',
  'Closed': 'bg-green-100 text-green-800',
  'Pending': 'bg-gray-100 text-gray-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  'Closed Won': 'bg-green-100 text-green-800',
  'Closed Lost': 'bg-red-100 text-red-800',
  'Available': 'bg-green-100 text-green-800',
  'Sold': 'bg-gray-100 text-gray-800',
  'Under Offer': 'bg-yellow-100 text-yellow-800',
};

export const PRIORITY_COLORS: Record<string, string> = {
  'high': 'bg-red-100 text-red-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'low': 'bg-green-100 text-green-800',
};
