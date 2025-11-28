<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Inventory::query();

        // Filters
        if ($request->search) {
            $query->where('item_name', 'like', "%{$request->search}%")
                  ->orWhere('sku', 'like', "%{$request->search}%");
        }

        if ($request->unit) {
            $query->where('unit', $request->unit);
        }

        if ($request->reorder) {
            $query->where('reorder_level', '<=', $request->reorder);
        }

        $items = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/Inventory/Index', [
            'items'   => $items,
            'filters' => $request->only('search', 'unit', 'reorder'),
            'kpi'     => [
                'total'     => Inventory::count(),
                'low_stock' => Inventory::whereColumn('reorder_level', '>=', 'id')->count(),
                'units'     => Inventory::distinct('unit')->count('unit'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'item_name' => 'required',
            'sku' => 'required',
            'unit' => 'required',
            'reorder_level' => 'required|integer',
        ]);

        Inventory::create($data);
        return back()->with('success', 'Item added.');
    }

    public function update(Request $request, Inventory $inventory)
    {
        $data = $request->validate([
            'item_name' => 'required',
            'sku' => 'required',
            'unit' => 'required',
            'reorder_level' => 'required|integer',
        ]);

        $inventory->update($data);
        return back()->with('success', 'Item updated.');
    }

    public function destroy(Inventory $inventory)
    {
        $inventory->delete();
        return back()->with('success', 'Item deleted.');
    }
}
