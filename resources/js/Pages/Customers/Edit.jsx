// resources/js/Pages/Customers/Edit.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Edit({ customer }) {
  const { data, setData, put, processing, errors } = useForm({
    full_name: customer.full_name || '',
    phone_number: customer.phone_number || '',
    alt_phone_number: customer.alt_phone_number || '',
    email: customer.email || '',
    location_name: customer.location_name || '',
    estate_building: customer.estate_building || '',
    gps_lat: customer.gps_lat || '',
    gps_long: customer.gps_long || '',
    tower_site_name: customer.tower_site_name || '',
    tower_site_number: customer.tower_site_number || '',
    status: customer.status || 'pending',
    status_reason: customer.status_reason || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('customers.update', customer.id));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Edit Customer
          </h2>
          <a
            href={route('customers.index')}
            className="text-sm text-gray-600 hover:text-gray-900 underline transition"
          >
            Back to Customers
          </a>
        </div>
      }
    >
      <Head title="Edit Customer" />

      <div className="py-12">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-5 border-b border-gray-200 pb-3">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      value={data.full_name}
                      onChange={(e) => setData('full_name', e.target.value)}
                      error={errors.full_name}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      error={errors.email}
                    />
                    <Input
                      label="Phone Number"
                      value={data.phone_number}
                      onChange={(e) => setData('phone_number', e.target.value)}
                      error={errors.phone_number}
                      required
                    />
                    <Input
                      label="Alternative Phone"
                      value={data.alt_phone_number}
                      onChange={(e) => setData('alt_phone_number', e.target.value)}
                      error={errors.alt_phone_number}
                    />
                  </div>
                </div>

                {/* Location Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-5 border-b border-gray-200 pb-3">
                    Location Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Location Name"
                      value={data.location_name}
                      onChange={(e) => setData('location_name', e.target.value)}
                      error={errors.location_name}
                    />
                    <Input
                      label="Estate / Building"
                      value={data.estate_building}
                      onChange={(e) => setData('estate_building', e.target.value)}
                      error={errors.estate_building}
                    />
                    <Input
                      label="GPS Latitude"
                      type="number"
                      step="any"
                      value={data.gps_lat}
                      onChange={(e) => setData('gps_lat', e.target.value)}
                      error={errors.gps_lat}
                      placeholder="e.g. 6.5244"
                    />
                    <Input
                      label="GPS Longitude"
                      type="number"
                      step="any"
                      value={data.gps_long}
                      onChange={(e) => setData('gps_long', e.target.value)}
                      error={errors.gps_long}
                      placeholder="e.g. 3.3792"
                    />
                  </div>
                </div>

                {/* Tower Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-5 border-b border-gray-200 pb-3">
                    Tower Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Tower Site Name"
                      value={data.tower_site_name}
                      onChange={(e) => setData('tower_site_name', e.target.value)}
                      error={errors.tower_site_name}
                    />
                    <Input
                      label="Tower Site Number"
                      value={data.tower_site_number}
                      onChange={(e) => setData('tower_site_number', e.target.value)}
                      error={errors.tower_site_number}
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-5 border-b border-gray-200 pb-3">
                    Account Status
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Status"
                      value={data.status}
                      onChange={(e) => setData('status', e.target.value)}
                      options={[
                        { value: 'pending', label: 'Pending' },
                        { value: 'active', label: 'Active' },
                        { value: 'suspended', label: 'Suspended' },
                        { value: 'terminated', label: 'Terminated' },
                      ]}
                    />
                    <Input
                      label="Status Reason (if not active)"
                      value={data.status_reason}
                      onChange={(e) => setData('status_reason', e.target.value)}
                      error={errors.status_reason}
                      placeholder="e.g. Payment overdue"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => router.visit(route('customers.index'))}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white transform hover:scale-105 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Updating...' : 'Update Customer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

// Reusable Input Component
function Input({ label, error, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Reusable Select Component
function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}