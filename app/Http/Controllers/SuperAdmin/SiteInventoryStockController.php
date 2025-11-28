<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\SiteInventoryStock;
use App\Models\Inventory;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteInventoryStockController extends Controller
{
    public function index(Request $request)
    {
        $query = SiteInventoryStock::with(['site', 'inventory', 'updater']);

        // Filters
        if ($request->search) {
            $query->whereHas('inventory', function ($q) use ($request) {
                $q->where('item_name', 'like', "%{$request->search}%")
                  ->orWhere('sku', 'like', "%{$request->search}%");
            });
        }

        if ($request->site_id) {
            $query->where('site_id', $request->site_id);
        }

        if ($request->inventory_id) {
            $query->where('inventory_id', $request->inventory_id);
        }

        $stocks = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/SiteInventoryStock/Index', [
            'stocks'   => $stocks,
           'sites' => Site::select('id', 'site_name')->get(),
            'items'    => Inventory::select('id', 'item_name')->get(),
            'filters'  => $request->only('search', 'site_id', 'inventory_id'),
            'kpi' => [
                'total'   => SiteInventoryStock::count(),
                'sites'   => SiteInventoryStock::distinct('site_id')->count('site_id'),
                'items'   => SiteInventoryStock::distinct('inventory_id')->count('inventory_id'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'site_id'      => 'required|exists:sites,id',
            'inventory_id' => 'required|exists:inventories,id',
            'quantity'     => 'required|integer|min:0',
        ]);

        $data['updated_by'] = auth()->id();

        SiteInventoryStock::create($data);

        return back()->with('success', 'Stock added successfully.');
    }

    public function update(Request $request, SiteInventoryStock $siteInventoryStock)
    {
        $data = $request->validate([
            'site_id'      => 'required|exists:sites,id',
            'inventory_id' => 'required|exists:inventories,id',
            'quantity'     => 'required|integer|min:0',
        ]);

        $data['updated_by'] = auth()->id();

        $siteInventoryStock->update($data);

        return back()->with('success', 'Stock updated.');
    }

    public function destroy(SiteInventoryStock $siteInventoryStock)
    {
        $siteInventoryStock->delete();

        return back()->with('success', 'Record deleted.');
    }
}
