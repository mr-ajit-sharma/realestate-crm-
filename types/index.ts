export type UserRole = 'admin' | 'agent' | 'manager';

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Visit' | 'Negotiation' | 'Closed';
  propertyId?: string;
  value?: number;
  tags: string[];
  lastContact: string;
};

export type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'Apartment' | 'Villa' | 'Plot' | 'Commercial';
  status: 'Available' | 'Sold' | 'Under Offer';
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
};

export type Deal = {
  id: string;
  leadId: string;
  propertyId: string;
  amount: number;
  commission: number;
  status: 'Pending' | 'In Progress' | 'Closed Won' | 'Closed Lost';
  progress: number;
};