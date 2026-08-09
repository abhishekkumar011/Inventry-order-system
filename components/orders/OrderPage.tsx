"use client";

import { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import OrderForm from "./OrderForm";

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

export type Order = {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  async function fetchOrders() {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Orders</h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor customer orders
            </p>
          </div>

          <button
            onClick={() => setShowForm((value) => !value)}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 cursor-pointer"
          >
            {showForm ? "Cancel" : "+ Create Order"}
          </button>
        </div>

        {showForm && (
          <OrderForm
            onSuccess={() => {
              setShowForm(false);
              fetchOrders();
            }}
          />
        )}

        <OrderTable orders={orders} loading={loading} />
      </div>
    </main>
  );
}
