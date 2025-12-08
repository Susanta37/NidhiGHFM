<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HREmployeeController extends Controller
{
    public function hrEmployees()
    {
        // Logic to retrieve and display HR employees
        return inertia('Hr/Employees/Index');
    }
}
