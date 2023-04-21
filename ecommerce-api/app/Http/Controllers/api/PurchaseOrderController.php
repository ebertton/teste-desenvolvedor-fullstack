<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\PurchaseOrder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PurchaseOrderController extends Controller
{
    protected PurchaseOrder $purchaseOrder;

    public function __construct()
    {
        $this->purchaseOrder = new PurchaseOrder();
    }

    /**
     * Listar pedidos de compras de usuário
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json([
            'puschases' => $this->purchaseOrder->where('users_id', '=', auth('api')->id())->with('orderItems')->orderBy('id', 'desc')->get()
            ], 200);
    }

    /**
     * Salvar pedidos de compra de usuário
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $this->purchaseOrder->users_id = auth('api')->id();
        $this->purchaseOrder->save();
        $items = $request->items;
        foreach ($items as $item) {
            $this->purchaseOrder->orderItems()->create($item);
        }
        return response()->json([
            'data' => $this->purchaseOrder->with('orderItems')->orderBy('id', 'desc')->get()
        ], 201);

    }
}
