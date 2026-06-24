export type UserRole = 'ADMIN' | 'MANAGER' | 'AGENT';

export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
};

export type Contact = {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  type: 'BUYER' | 'SELLER' | 'TENANT' | 'OTHER';
  budget?: number;
  tags?: string[];
  assignedAgent?: {
    _id: string;
    name: string;
    email: string;
  };
};

export type CreateContactInput = {
  name: string;
  phone: string;
  email?: string;
  type: 'BUYER' | 'SELLER' | 'TENANT' | 'OTHER';
  budget?: number;
  preferences?: string;
  notes?: string;
  tags?: string[];
};
export type Lead = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status?: string;
  source?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
};

export type LeadsResponse = {
  success: boolean;
  count: number;
  data: Lead[];
};

export type Property = {
  _id: string;
  title: string;
  description?: string;
  location: string;
  price: number;
  type: 'APARTMENT' | 'VILLA' | 'PLOT' | 'COMMERCIAL' | 'SHOP' | 'OTHER';
  status: 'AVAILABLE' | 'SOLD' | 'RENTED' | 'UNDER_OFFER';
  imageUrls: string[];
  bedrooms?: number;
  bathrooms?: number;
  assignedAgent?: {
    _id: string;
    name: string;
    email: string;
  };
};


export type PropertiesResponse = {
  success: boolean;
  count: number;
  totalPages: number;
  currentPage: number;
  data: Property[];
};

export type PropertyResponse = {
  success: boolean;
  data: Property;
};

export type CreatePropertyPayload = {
  title: string;
  description?: string;
  location: string;
  price: number;
  type: 'APARTMENT' | 'VILLA' | 'PLOT' | 'COMMERCIAL' | 'SHOP';
  status?: 'AVAILABLE' | 'SOLD' | 'RENTED' | 'UNDER_OFFER';
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  imageUrls?: string[];
  features?: string[];
  assignedAgent?: string;
};

export type UpdatePropertyPayload = Partial<CreatePropertyPayload>;


export type Deal = {
  _id: string;
  lead: string;
  contact: string;
  property: string;
  amount: number;
  commissionRate: number;
  commission: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'CLOSED_WON' | 'CLOSED_LOST';
  closedAt?: string;
  notes?: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateDealInput = {
  lead: string;
  contact: string;
  property: string;
  amount: number;
  commissionRate?: number;
  notes?: string;
};

export type UpdateDealStatusInput = {
  status: 'PENDING' | 'IN_PROGRESS' | 'CLOSED_WON' | 'CLOSED_LOST';
  notes?: string;
};

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskType = 'CALL' | 'MEETING' | 'SITE_VISIT' | 'FOLLOW_UP' | 'DOCUMENTATION' | 'NEGOTIATION' | 'OTHER';

export type Task = {
  _id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
  completedAt?: string;
  assignedTo: string;
  contact?: any;
  lead?: any;
  deal?: any;
  taskType: TaskType;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  dueDate: string;
  priority?: TaskPriority;
  taskType?: TaskType;
  contact?: string;
  lead?: string;
  deal?: string;
  notes?: string;
};

export type RecentActivityItem = {
  _id: string;
  action: string;
  user: string;
  createdAt: string;
  entityType?: string;
  details?: string;
};

export type DashboardMetrics = {
  totalLeads: number;
  totalContacts: number;
  totalProperties: number;
  totalDeals: number;
  totalTasks: number;
  overdueTasks: number;
  conversionRate: number;
  pipeline: any[];
  dealsByStatus: any[];
  financials: {
    totalRevenue: number;
    totalCommission: number;
    totalClosedDeals: number;
  };
  recentActivities: RecentActivityItem[];
};