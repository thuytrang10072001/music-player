<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\CreateUserRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SocialLoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


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
    public function register(CreateUserRequest $request): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request) {
            $user = User::create([
                'name' => $request['name'],
                'email'    => $request['email'],
                'password' => Hash::make($request['password']),
                'created_at' => now(),
            ]);

            return response()->json([
                'message' => 'register successfully',
                'data' => $user
            ], 200);
        });
    }

    public function login(LoginRequest $request): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request) {
            $credentials = $request->only('email', 'password');

            if (!Auth::attempt($credentials)) {
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
        });
    }

    public function socialLogin(SocialLoginRequest $request): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request) {
            $user = User::where('email', $request['email'])->first();

            if (!$user) {
                $user = User::create([
                    'email' => $request['email'],
                    'name' => $request['name'] ?? 'No Name',
                    'provider' => $request['provider'],
                    'picture' => $request['picture'] ?? null,
                    'password' => bcrypt(Str::random(12))
                ]);
            }
            $token = $user->createToken('access-token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'User logged in successfully',
                'name' => $user->name,
                'token' => $token
            ]);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->executeInTransaction(function () use ($id) {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'message' => 'Not found'
                ], 404);
            }
            return response()->json($user);
        });
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
    public function update(LoginRequest $request, string $id)
    {
        return $this->executeInTransaction(function () use ($request, $id) {
            $user = User::find($id);
            if (!$user) {
                return response()->json([
                    'message' => 'Not found'
                ], 404);
            }

            $credentials = $request->only('name');
            $user->update($credentials);

            return response()->json([
                'message' => 'Update successfully',
                'data' => $user
            ], 200);
        });

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
