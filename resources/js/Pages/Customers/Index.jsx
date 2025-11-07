// resources/js/Pages/Customers/Index.jsx
import React, { useState, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import DropdownMenu from '@/Components/DropdownMenu';

const Index = ({ customers }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, height: 0 });
  const buttonRefs = useRef({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCustomer, setDeletingCustomer] = useState(null);

  const openMenu = (customerId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.right + window.scrollX,
      height: rect.height,
    });
    setOpenMenuId(customerId);
  };

  const closeMenu = () => setOpenMenuId(null);

  const handleDelete = (customer) => {
    setDeletingCustomer(customer);
    setShowDeleteModal(true);
    closeMenu();
  };

  const confirmDelete = () => {
    if (deletingCustomer) {
      router.delete(route('customers.destroy', deletingCustomer.id), {
        onSuccess: () => {
          setShowDeleteModal(false);
          setDeletingCustomer(null);
        },
      });
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Customers
        </h2>
      }
    >
      <Head title="Customers" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Customer List
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                        Manage all your customers in one place
                        </p>
                    </div>

                    <Link
                        href={route('customers.create')}
                        className="
                        group
                        inline-flex items-center justify-center
                        w-full sm:w-auto
                        px-6 py-3.5
                        text-base font-medium
                        text-white
                        bg-gradient-to-r from-blue-600 to-cyan-600
                        rounded-xl
                        shadow-lg hover:shadow-xl
                        transform hover:scale-105 active:scale-95
                        transition-all duration-200
                        focus:outline-none focus:ring-4 focus:ring-cyan-300
                        "
                    >
                        <svg className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Create Customer</span>
                    </Link>
                </div>

              {/* Table - Only Horizontal Scroll */}
              <div className="rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
                <table className="w-full min-w-max table-auto border-collapse bg-white text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Tower</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 w-12">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customers.data.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                          {c.full_name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-600">{c.phone_number}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-600">{c.email}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                          {c.location_name} {c.estate_building}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                          {c.tower_site_name} {c.tower_site_number}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
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
                        <td className="px-6 py-4">
                          <button
                            ref={(el) => (buttonRefs.current[c.id] = el)}
                            onClick={(e) => openMenu(c.id, e)}
                            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                          >
                            <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{customers.from}</span> to{' '}
                  <span className="font-medium">{customers.to}</span> of{' '}
                  <span className="font-medium">{customers.total}</span> results
                </p>
                <nav className="flex items-center gap-1">
                  {customers.links.map((link, i) => {
                    if (!link.url)
                      return (
                        <span
                          key={i}
                          className="px-4 py-2 text-sm text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed"
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      );
                    if (link.active)
                      return (
                        <span key={i} className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg">
                          {link.label === '&laquo; Previous' ? 'Previous' : link.label === 'Next &raquo;' ? 'Next' : link.label}
                        </span>
                      );
                    return (
                      <Link
                        key={i}
                        href={link.url}
                        preserveScroll
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PORTAL Dropdown - Never clipped! */}
      <DropdownMenu isOpen={!!openMenuId} onClose={closeMenu} position={menuPosition}>
        {openMenuId && (
          <>
            <Link
              href={route('customers.show', openMenuId)}
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              View Details
            </Link>
            <Link
              href={route('customers.edit', openMenuId)}
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(customers.data.find(c => c.id === openMenuId))}
              className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
            >
              Delete
            </button>
          </>
        )}
      </DropdownMenu>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Delete Customer</h3>
            <p className="text-sm text-gray-600 mb-6">
              Permanently delete <strong>{deletingCustomer?.full_name}</strong>? This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
};

export default Index;