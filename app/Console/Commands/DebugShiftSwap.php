<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ShiftSwapRequest;
use App\Models\User;

class DebugShiftSwap extends Command
{
    protected $signature = 'debug:shift-swap';
    protected $description = 'Debug shift swap user relationships';

    public function handle()
    {
        $swap = ShiftSwapRequest::with(['fromUser', 'toUser', 'assignment.shift'])->first();

        if (!$swap) {
            $this->error('No shift swap requests found.');
            return;
        }

        $this->info('=== Shift Swap Debug Info ===');
        $this->line('Swap ID: ' . $swap->id);
        $this->line('from_user_id: ' . $swap->from_user_id);
        $this->line('to_user_id: ' . ($swap->to_user_id ?? 'NULL'));
        $this->line('');
        
        // Check fromUser relationship
        $this->info('FromUser Relationship:');
        if ($swap->fromUser) {
            $this->line('  ✓ Loaded successfully');
            $this->line('  Name: ' . $swap->fromUser->name);
            $this->line('  Email: ' . $swap->fromUser->email);
        } else {
            $this->error('  ✗ NULL - Relationship failed');
            
            // Check if user exists
            $user = User::find($swap->from_user_id);
            if ($user) {
                $this->line('  User EXISTS in database: ' . $user->name);
                $this->error('  Problem: Relationship is not loading correctly');
            } else {
                $this->error('  User with ID ' . $swap->from_user_id . ' does NOT exist in users table');
            }
        }
        
        $this->line('');
        
        // Check toUser relationship
        $this->info('ToUser Relationship:');
        if ($swap->to_user_id) {
            if ($swap->toUser) {
                $this->line('  ✓ Loaded successfully');
                $this->line('  Name: ' . $swap->toUser->name);
                $this->line('  Email: ' . $swap->toUser->email);
            } else {
                $this->error('  ✗ NULL - Relationship failed');
                
                $user = User::find($swap->to_user_id);
                if ($user) {
                    $this->line('  User EXISTS in database: ' . $user->name);
                    $this->error('  Problem: Relationship is not loading correctly');
                } else {
                    $this->error('  User with ID ' . $swap->to_user_id . ' does NOT exist in users table');
                }
            }
        } else {
            $this->line('  Not assigned yet (to_user_id is NULL)');
        }
        
        $this->line('');
        $this->info('=== All Shift Swaps Summary ===');
        $allSwaps = ShiftSwapRequest::with(['fromUser', 'toUser'])->get();
        
        foreach ($allSwaps as $s) {
            $fromUserName = $s->fromUser ? $s->fromUser->name : 'NULL';
            $toUserName = $s->toUser ? $s->toUser->name : 'NULL';
            $this->line("ID: {$s->id} | From: {$fromUserName} | To: {$toUserName} | Status: {$s->status}");
        }
    }
}
