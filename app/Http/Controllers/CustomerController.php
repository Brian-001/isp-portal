<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    //
    public function index()
    {
        $customers = Customer::latest()->paginate(10);

        return Inertia::render('Customers/Index', ['customers' => $customers]);
    }

    public function create()
    {
        return Inertia::render('Customers/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|unique:customers,phone_number',
            'alt_phone_number' => 'nullable|string',
            'email' => 'required|email|unique:customers,email',
            'location_name' => 'nullable|string',
            'estate_building' => 'nullable|string',
            'gps_lat' => 'nullable|numeric',
            'gps_long' => 'nullable|numeric',
            'tower_site_name' => 'nullable|string',
            'tower_site_number' => 'nullable|string',
            'status' => 'required|in:active,pending,terminated,suspended',
            'status_reason' => 'nullable|string',
        ]);

        Customer::create($validated);
        return redirect()->route('customers.index')->with('success', 'Customer created successfully.');
    }
    public function show(Customer $customer)
    {
        return Inertia::render('Customers/Show', ['customer' => $customer,]);
    }
    public function edit(Customer $customer)
    {
        return Inertia::render('Customers/Edit', ['customer' => $customer,]);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|unique:customers,phone_number,' . $customer->id,
            'alt_phone_number' => 'nullable|string',
            'email' => 'required|email|unique:customers,email,' . $customer->id,
            'location_name' => 'nullable|string',
            'estate_building' => 'nullable|string',
            'gps_lat' => 'nullable|numeric',
            'gps_long' => 'nullable|numeric',
            'tower_site_name' => 'nullable|string',
            'tower_site_number' => 'nullable|string',
            'status' => 'required|in:active,pending,terminated,suspended',
            'status_reason' => 'nullable|string',
        ]);

        $customer->update($validated);
        return redirect()->route('customers.index')->with('success', 'Customer updated successfully.');
    }
}
