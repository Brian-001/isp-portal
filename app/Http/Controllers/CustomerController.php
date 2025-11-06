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
        $customers = Customer::latest()->get();

        return Inertia::render('Customers/Index', ['customers' => $customers]);
    }
}
