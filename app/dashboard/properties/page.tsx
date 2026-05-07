'use client';

import PropertyCard from '@/components/common/PropertyCard';
import { Property } from '@/types';

const dummyProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment Downtown',
    price: 450000,
    location: 'Downtown, City Center',
    type: 'Apartment',
    status: 'Available',
    images: [],
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: '2',
    title: 'Luxury Villa with Garden',
    price: 850000,
    location: 'Suburbs',
    type: 'Villa',
    status: 'Available',
    images: [],
    bedrooms: 4,
    bathrooms: 3,
  },
];

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Properties
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Browse and manage property listings.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
          Add Property
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dummyProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
