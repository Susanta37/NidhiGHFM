<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $query = Client::query();

        // SEARCH
        if ($request->search) {
            $query->where('name', 'like', "%{$request->search}%")
                  ->orWhere('contact_person', 'like', "%{$request->search}%")
                  ->orWhere('phone', 'like', "%{$request->search}%");
        }

        // STATUS FILTER
        if ($request->status !== null && $request->status !== "") {
            $query->where('status', $request->status);
        }

        $clients = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/Clients/Index', [
            'clients' => $clients,
            'filters' => $request->only('search', 'status'),
            'kpi' => [
                'total'   => Client::count(),
                'active'  => Client::where('status', 1)->count(),
                'inactive'=> Client::where('status', 0)->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'            => 'required|string|max:255',
            'address'         => 'nullable|string',
            'contact_person'  => 'nullable|string',
            'phone'           => 'nullable|string',
            'email'           => 'nullable|string|email',
            'gst_no'          => 'nullable|string',
            'status'          => 'required|boolean',
        ]);

        Client::create($data);

        return back()->with('success', 'Client created successfully');
    }

    public function update(Request $request, Client $client)
    {
        $data = $request->validate([
            'name'            => 'required|string|max:255',
            'address'         => 'nullable|string',
            'contact_person'  => 'nullable|string',
            'phone'           => 'nullable|string',
            'email'           => 'nullable|string|email',
            'gst_no'          => 'nullable|string',
            'status'          => 'required|boolean',
        ]);

        $client->update($data);

        return back()->with('success', 'Client updated successfully');
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return back()->with('success', 'Client deleted successfully');
    }
}
