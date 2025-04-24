<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class AuthController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255|unique:users,email',
                'password' => 'required|string|max:255',
            ]);

            $user = User::create([
                'name' => $validated['name'],
                'email'    => $validated['email'],
                'password' => Hash::make($validated['password']),
                'created_at' => now(),
            ]);

            return response()->json([
                'message' => 'register successfully',
                'data' => $user
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request): JsonResponse
    {
        try {
            $validate = $request->validate([
                'email' => 'required|string|max:255, email',
                'password' => 'required|string|max:255',
            ]);

            if (!Auth::attempt($validate)) {
                return response()->json(['message' => 'Login failed'], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('access-token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'User logged in successfully',
                'name' => $user->name,
                'token' => $token
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $user->update($validated);
        return response()->json([
            'message' => 'Update successfully',
            'data' => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json([
            'message' => 'Delete successfully'
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

}
