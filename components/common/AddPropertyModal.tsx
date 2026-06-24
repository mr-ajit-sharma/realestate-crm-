'use client';

import { useState, useEffect, useRef } from 'react';
import { useCreateProperty } from '@/hooks/useProperties';
import type { CreatePropertyPayload } from '@/lib/services/properties';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const PROPERTY_TYPES = ['APARTMENT', 'VILLA', 'PLOT', 'COMMERCIAL', 'SHOP'] as const;
const PROPERTY_STATUSES = ['AVAILABLE', 'SOLD', 'RENTED', 'UNDER_OFFER'] as const;

const INITIAL_FORM: CreatePropertyPayload = {
  title: '',
  description: '',
  location: '',
  price: 0,
  type: 'APARTMENT',
  status: 'AVAILABLE',
  bedrooms: undefined,
  bathrooms: undefined,
  area: undefined,
  imageUrls: [],
  features: [],
};

export default function AddPropertyModal({ isOpen, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<CreatePropertyPayload>(INITIAL_FORM);
  const [featureInput, setFeatureInput] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof CreatePropertyPayload, string>>>({});
  const firstInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createProperty, isPending, isError, error } = useCreateProperty();

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 50);
    } else {
      setForm(INITIAL_FORM);
      setErrors({});
      setFeatureInput('');
      setImageUrlInput('');
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required.';
    if (!form.location.trim()) newErrors.location = 'Location is required.';
    if (!form.price || form.price <= 0) newErrors.price = 'Enter a valid price.';
    if (!form.type) newErrors.type = 'Property type is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = <K extends keyof CreatePropertyPayload>(key: K, value: CreatePropertyPayload[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !form.features?.includes(trimmed)) {
      handleChange('features', [...(form.features ?? []), trimmed]);
      setFeatureInput('');
    }
  };

  const removeFeature = (feat: string) => {
    handleChange('features', form.features?.filter((f) => f !== feat) ?? []);
  };

  const addImageUrl = () => {
    const trimmed = imageUrlInput.trim();
    if (trimmed && !form.imageUrls?.includes(trimmed)) {
      handleChange('imageUrls', [...(form.imageUrls ?? []), trimmed]);
      setImageUrlInput('');
    }
  };

  const removeImageUrl = (url: string) => {
    handleChange('imageUrls', form.imageUrls?.filter((u) => u !== url) ?? []);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const payload: CreatePropertyPayload = {
      ...form,
      price: Number(form.price),
      bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
      area: form.area ? Number(form.area) : undefined,
    };
    createProperty(payload, { onSuccess });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-gray-900 shadow-2xl flex flex-col">

          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <h2 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
              Add New Property
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-5">

            {/* API error */}
            {isError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                Something went wrong. Please try again.
              </div>
            )}

            {/* Title */}
            <Field label="Title" error={errors.title} required>
              <input
                ref={firstInputRef}
                type="text"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. 3BHK Apartment in Bandra"
                className={inputClass(!!errors.title)}
              />
            </Field>

            {/* Description */}
            <Field label="Description">
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe the property..."
                rows={3}
                className={inputClass(false) + ' resize-none'}
              />
            </Field>

            {/* Location */}
            <Field label="Location" error={errors.location} required>
              <input
                type="text"
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g. Bandra West, Mumbai"
                className={inputClass(!!errors.location)}
              />
            </Field>

            {/* Price */}
            <Field label="Price (₹)" error={errors.price} required>
              <input
                type="number"
                min={0}
                value={form.price || ''}
                onChange={(e) => handleChange('price', Number(e.target.value))}
                placeholder="e.g. 5000000"
                className={inputClass(!!errors.price)}
              />
            </Field>

            {/* Type + Status */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Property Type" error={errors.type} required>
                <select
                  value={form.type}
                  onChange={(e) => handleChange('type', e.target.value as CreatePropertyPayload['type'])}
                  className={inputClass(!!errors.type)}
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>
                  ))}
                </select>
              </Field>
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => handleChange('status', e.target.value as CreatePropertyPayload['status'])}
                  className={inputClass(false)}
                >
                  {PROPERTY_STATUSES.map((s) => (
                    <option key={s} value={s}>{s.replace('_', ' ')}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Bedrooms + Bathrooms + Area */}
            <div className="grid grid-cols-3 gap-4">
              <Field label="Bedrooms">
                <input
                  type="number"
                  min={0}
                  value={form.bedrooms ?? ''}
                  onChange={(e) => handleChange('bedrooms', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 3"
                  className={inputClass(false)}
                />
              </Field>
              <Field label="Bathrooms">
                <input
                  type="number"
                  min={0}
                  value={form.bathrooms ?? ''}
                  onChange={(e) => handleChange('bathrooms', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 2"
                  className={inputClass(false)}
                />
              </Field>
              <Field label="Area (sq ft)">
                <input
                  type="number"
                  min={0}
                  value={form.area ?? ''}
                  onChange={(e) => handleChange('area', e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 1200"
                  className={inputClass(false)}
                />
              </Field>
            </div>

            {/* Features */}
            <Field label="Features">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  placeholder="e.g. Gym, Pool"
                  className={inputClass(false) + ' flex-1'}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors"
                >
                  Add
                </button>
              </div>
              {(form.features?.length ?? 0) > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.features!.map((feat) => (
                    <span
                      key={feat}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md"
                    >
                      {feat}
                      <button onClick={() => removeFeature(feat)} className="hover:text-blue-900 dark:hover:text-blue-100">×</button>
                    </span>
                  ))}
                </div>
              )}
            </Field>

            {/* Image URLs */}
            <Field label="Image URLs">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                  placeholder="https://example.com/image.jpg"
                  className={inputClass(false) + ' flex-1'}
                />
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors"
                >
                  Add
                </button>
              </div>
              {(form.imageUrls?.length ?? 0) > 0 && (
                <ul className="mt-2 space-y-1">
                  {form.imageUrls!.map((url) => (
                    <li key={url} className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
                      <span className="truncate flex-1 mr-2">{url}</span>
                      <button onClick={() => removeImageUrl(url)} className="text-red-400 hover:text-red-600 shrink-0">×</button>
                    </li>
                  ))}
                </ul>
              )}
            </Field>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <button
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-5 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {isPending && (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
              )}
              {isPending ? 'Saving...' : 'Add Property'}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return [
    'w-full px-3 py-2 text-sm rounded-lg border outline-none transition-colors',
    'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
    'placeholder-gray-400 dark:placeholder-gray-500',
    hasError
      ? 'border-red-400 focus:ring-1 focus:ring-red-400'
      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
  ].join(' ');
}

function Field({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}