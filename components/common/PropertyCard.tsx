'use client';

import { Property } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const imageUrl = property.imageUrls?.[0];

  return (
    <div
      onClick={onClick}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-lg cursor-pointer"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={property.title}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {property.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
          {property.location}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(property.price)}
          </span>
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded">
            {property.type}
          </span>
        </div>
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          {property.bedrooms && (
            <div>
              <span className="font-medium">{property.bedrooms}</span> Beds
            </div>
          )}
          {property.bathrooms && (
            <div>
              <span className="font-medium">{property.bathrooms}</span> Baths
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
