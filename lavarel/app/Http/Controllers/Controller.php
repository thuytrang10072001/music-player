<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

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
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }}
