<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Validation\ValidationException;

abstract class Controller
{
    /**
     * Execute logic in transaction.
     *
     * @param \Closure $callback
     * @return mixed
     * @throws \Exception
     */
    protected function executeInTransaction(\Closure $callback)
    {
        DB::beginTransaction();

        try {
            $result = $callback();
            DB::commit();
            return $result;

        }catch (ValidationException $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Dữ liệu không hợp lệ',
                'errors'  => $e->errors(),
            ], 422);

        }catch (Exception $e) {
            DB::rollBack();
            throw $e;

        }
    }}
