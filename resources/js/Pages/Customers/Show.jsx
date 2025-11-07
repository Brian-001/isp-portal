// resources/js/Pages/Customers/Show.jsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, UserIcon, BuildingOfficeIcon, SignalIcon, CalendarIcon, CheckBadgeIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Show({ customer }) {
  const statusConfig = {
    active: { color: 'emerald', label: 'Active', icon: CheckBadgeIcon },
    pending: { color: 'amber', label: 'Pending', icon: CalendarIcon },
    suspended: { color: 'orange', label: 'Suspended', icon: SignalIcon },
    terminated: { color: 'red', label: 'Terminated', icon: XMarkIcon },
  };

  const status = statusConfig[customer.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <AuthenticatedLayout
      header={
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={route('customers.index')}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
              <p className="text-sm text-gray-600 mt-1">ID: #{customer.id}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={route('customers.edit', customer.id)}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:shadow-lg transform hover:scale-105 transition"
            >
              Edit Customer
            </Link>
          </div>
        </div>
      }
    >
      <Head title={`Customer - ${customer.full_name}`} />

      <div className="py-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Main Card */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-10 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <UserIcon className="w-12 h-12" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{customer.full_name}</h1>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-${status.color}-100 text-${status.color}-800`}>
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </span>
                      {customer.status_reason && (
                        <span className="text-sm opacity-90 italic">
                          {customer.status_reason}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <PhoneIcon className="w-5 h-5 text-gray-500" />
                    Contact Information
                  </h3>
                  <div className="space-y-4 bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{customer.email || '—'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <PhoneIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="font-medium text-gray-900">{customer.phone_number}</p>
                      </div>
                    </div>
                    {customer.alt_phone_number && (
                      <div className="flex items-start gap-4">
                        <PhoneIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">Alternative Phone</p>
                          <p className="font-medium text-gray-900">{customer.alt_phone_number}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-gray-500" />
                    Location Details
                  </h3>
                  <div className="space-y-4 bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <BuildingOfficeIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium text-gray-900">
                          {customer.location_name || '—'} {customer.estate_building && `• ${customer.estate_building}`}
                        </p>
                      </div>
                    </div>
                    {(customer.gps_lat && customer.gps_long) && (
                      <div className="flex items-start gap-4">
                        <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">GPS Coordinates</p>
                          <p className="font-medium text-gray-900">
                            {customer.gps_lat}, {customer.gps_long}
                          </p>
                          <a
                            href={`https://www.google.com/maps?q=${customer.gps_lat},${customer.gps_long}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                          >
                            Open in Google Maps
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tower Info */}
                <div className="space-y-6 md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <SignalIcon className="w-5 h-5 text-gray-500" />
                    Tower & Network
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-6">
                    <div>
                      <p className="text-sm text-gray-600">Tower Site Name</p>
                      <p className="font-medium text-gray-900 mt-1">
                        {customer.tower_site_name || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tower Site Number</p>
                      <p className="font-medium text-gray-900 mt-1">
                        {customer.tower_site_number || '—'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 sm:justify-end">
                <Link
                  href={route('customers.index')}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Back to List
                </Link>
                <Link
                  href={route('customers.edit', customer.id)}
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:shadow-lg transform hover:scale-105 transition"
                >
                  Edit Customer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}