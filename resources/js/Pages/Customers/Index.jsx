import React from 'react'
import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const Index = ({customers}) => {
  return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Customers
            </h2>
        }
    >
        <Head title='Customers' />

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h1 className="text-2xl font-bold mb-6">Customer List</h1>
                        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                            <table className="w-full min-w-max table-auto border-collapse bg-white text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Phone</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Tower</th>
                                    <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {customers.map((c) => (
                                    <tr
                                        key={c.id}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                                        {c.full_name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                                        {c.phone_number}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                                        {c.email}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                                        {c.location_name} {c.estate_building}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                                        {c.tower_site_name} {c.tower_site_number}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                            c.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : c.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {c.status || '—'}
                                        </span>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
        
  );
}

export default Index