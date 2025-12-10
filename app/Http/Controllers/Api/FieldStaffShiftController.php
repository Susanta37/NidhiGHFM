<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShiftAssignment;
use App\Models\ShiftSwapRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class FieldStaffShiftController extends Controller
{
    /**
     * Get shifts assigned to authenticated field staff (NO PAGINATION)
     */
    public function getAssignedShifts(Request $request)
    {
        try {
            $user = Auth::user();

            if ($user->role !== 'fieldstaff') {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized. Only field staff can access this endpoint.'
                ], 403);
            }

            $query = ShiftAssignment::with([
                'shift' => function ($q) {
                    $q->select('id', 'name', 'start_time', 'end_time', 'break_minutes', 'client_id', 'site_id', 'tasks');
                },
                'shift.client:id,name,contact_person,phone,email',
                'shift.site:id,client_id,site_name,address,geo_lat,geo_lng'
            ])->where('user_id', $user->id);

            // Date Filtering
            if ($request->has('start_date') && $request->has('end_date')) {
                $query->whereBetween('date', [$request->start_date, $request->end_date]);
            } elseif ($request->has('date')) {
                $query->where('date', $request->date);
            } elseif ($request->has('month')) {
                $month = Carbon::parse($request->month);
                $query->whereYear('date', $month->year)->whereMonth('date', $month->month);
            } else {
                $query->whereYear('date', Carbon::now()->year)
                      ->whereMonth('date', Carbon::now()->month);
            }

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            $query->orderBy('date', $request->input('sort', 'asc'));

            // 👉 NO PAGINATION
            $assignments = $query->get();

            // Transform output
            $shiftList = $assignments->map(function ($assignment) {
                return [
                    'id' => $assignment->id,
                    'date' => $assignment->date,
                    'status' => $assignment->status,
                    'shift' => [
                        'id' => $assignment->shift->id,
                        'name' => $assignment->shift->name,
                        'start_time' => $assignment->shift->start_time,
                        'end_time' => $assignment->shift->end_time,
                        'break_minutes' => $assignment->shift->break_minutes,
                        'tasks' => $assignment->shift->tasks,
                    ],
                    'client' => $assignment->shift->client ? [
                        'id' => $assignment->shift->client->id,
                        'name' => $assignment->shift->client->name,
                        'contact_person' => $assignment->shift->client->contact_person,
                        'phone' => $assignment->shift->client->phone,
                        'email' => $assignment->shift->client->email,
                    ] : null,
                    'site' => $assignment->shift->site ? [
                        'id' => $assignment->shift->site->id,
                        'name' => $assignment->shift->site->site_name,
                        'address' => $assignment->shift->site->address,
                        'latitude' => $assignment->shift->site->geo_lat,
                        'longitude' => $assignment->shift->site->geo_lng,
                    ] : null,
                    'assigned_at' => $assignment->created_at->format('Y-m-d H:i:s'),
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Shifts retrieved successfully',
                'data' => $shiftList
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve shifts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get shift details by assignment ID
     */
    public function getShiftDetails($id)
    {
        try {
            $user = Auth::user();

            $assignment = ShiftAssignment::with([
                'shift.client',
                'shift.site'
            ])
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->first();

            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Shift assignment not found or unauthorized'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Shift details retrieved successfully',
                'data' => [
                    'id' => $assignment->id,
                    'date' => $assignment->date,
                    'status' => $assignment->status,
                    'shift' => [
                        'id' => $assignment->shift->id,
                        'name' => $assignment->shift->name,
                        'start_time' => $assignment->shift->start_time,
                        'end_time' => $assignment->shift->end_time,
                        'break_minutes' => $assignment->shift->break_minutes,
                        'tasks' => $assignment->shift->tasks,
                        'auto_assign_rules' => $assignment->shift->auto_assign_rules ?? null,
                    ],
                    'client' => $assignment->shift->client ? [
                        'id' => $assignment->shift->client->id,
                        'name' => $assignment->shift->client->name,
                        'contact_person' => $assignment->shift->client->contact_person,
                        'phone' => $assignment->shift->client->phone,
                        'email' => $assignment->shift->client->email,
                    ] : null,
                    'site' => $assignment->shift->site ? [
                        'id' => $assignment->shift->site->id,
                        'name' => $assignment->shift->site->site_name,
                        'address' => $assignment->shift->site->address,
                        'latitude' => $assignment->shift->site->geo_lat,
                        'longitude' => $assignment->shift->site->geo_lng,
                    ] : null,
                    'assigned_at' => $assignment->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $assignment->updated_at->format('Y-m-d H:i:s'),
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve shift details',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get today's shift (no pagination needed)
     */
    public function getTodayShift()
    {
        try {
            $user = Auth::user();

            $assignment = ShiftAssignment::with([
                'shift.client',
                'shift.site'
            ])
            ->where('user_id', $user->id)
            ->where('date', Carbon::today()->format('Y-m-d'))
            ->first();

            if (!$assignment) {
                return response()->json([
                    'success' => true,
                    'message' => 'No shift assigned for today',
                    'data' => null
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => "Today's shift retrieved successfully",
                'data' => [
                    'id' => $assignment->id,
                    'date' => $assignment->date,
                    'status' => $assignment->status,
                    'shift' => [
                        'id' => $assignment->shift->id,
                        'name' => $assignment->shift->name,
                        'start_time' => $assignment->shift->start_time,
                        'end_time' => $assignment->shift->end_time,
                        'break_minutes' => $assignment->shift->break_minutes,
                        'tasks' => $assignment->shift->tasks,
                    ],
                    'client' => $assignment->shift->client ? [
                        'id' => $assignment->shift->client->id,
                        'name' => $assignment->shift->client->name,
                        'contact_person' => $assignment->shift->client->contact_person,
                        'phone' => $assignment->shift->client->phone,
                    ] : null,
                    'site' => $assignment->shift->site ? [
                        'id' => $assignment->shift->site->id,
                        'name' => $assignment->shift->site->site_name,
                        'address' => $assignment->shift->site->address,
                        'latitude' => $assignment->shift->site->geo_lat,
                        'longitude' => $assignment->shift->site->geo_lng,
                    ] : null,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve today\'s shift',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get upcoming shifts (next 7 days)
     */
    public function getUpcomingShifts()
    {
        try {
            $user = Auth::user();

            $assignments = ShiftAssignment::with([
                'shift.client',
                'shift.site'
            ])
            ->where('user_id', $user->id)
            ->whereBetween('date', [
                Carbon::today()->format('Y-m-d'),
                Carbon::today()->addDays(7)->format('Y-m-d')
            ])
            ->orderBy('date', 'asc')
            ->get();

            $shiftList = $assignments->map(function ($assignment) {
                return [
                    'id' => $assignment->id,
                    'date' => $assignment->date,
                    'status' => $assignment->status,
                    'shift' => [
                        'id' => $assignment->shift->id,
                        'name' => $assignment->shift->name,
                        'start_time' => $assignment->shift->start_time,
                        'end_time' => $assignment->shift->end_time,
                    ],
                    'client' => $assignment->shift->client?->name,
                    'site' => $assignment->shift->site?->site_name,
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Upcoming shifts retrieved successfully',
                'data' => $shiftList
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve upcoming shifts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get shift statistics
     */
    public function getShiftStats()
    {
        try {
            $user = Auth::user();
            $currentMonth = Carbon::now();

            $stats = [
                'total_shifts_this_month' => ShiftAssignment::where('user_id', $user->id)
                    ->whereYear('date', $currentMonth->year)
                    ->whereMonth('date', $currentMonth->month)
                    ->count(),

                'completed_shifts' => ShiftAssignment::where('user_id', $user->id)
                    ->whereYear('date', $currentMonth->year)
                    ->whereMonth('date', $currentMonth->month)
                    ->where('status', 'completed')
                    ->count(),

                'upcoming_shifts' => ShiftAssignment::where('user_id', $user->id)
                    ->where('date', '>=', Carbon::today()->format('Y-m-d'))
                    ->count(),

                'today_shift' => ShiftAssignment::where('user_id', $user->id)
                    ->where('date', Carbon::today()->format('Y-m-d'))
                    ->exists(),
            ];

            return response()->json([
                'success' => true,
                'message' => 'Shift statistics retrieved successfully',
                'data' => $stats
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve shift statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

/**
     * FIELD STAFF APPLY FOR SHIFT SWAP REQUEST
     */
     /**
     * FIELD STAFF REQUEST SHIFT SWAP (NO to_user_id)
     */
    public function apply(Request $request)
    {
        try {
            $user = Auth::user();

            // Only fieldstaff can apply
            if ($user->role !== 'fieldstaff') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only field staff can request shift swaps.'
                ], 403);
            }

            $request->validate([
                'shift_assignment_id' => 'required|exists:shift_assignments,id',
            ]);

            // Ensure the shift belongs to this user
            $assignment = ShiftAssignment::where('id', $request->shift_assignment_id)
                ->where('user_id', $user->id)
                ->first();

            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'This shift does not belong to you.'
                ], 400);
            }

            // Create swap request → NO to_user_id
            $swapRequest = ShiftSwapRequest::create([
                'from_user_id' => $user->id,
                'to_user_id' => null, // manager will assign later
                'shift_assignment_id' => $request->shift_assignment_id,
                'status' => 'pending',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Shift swap request submitted successfully.',
                'data' => $swapRequest
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit shift swap request.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
