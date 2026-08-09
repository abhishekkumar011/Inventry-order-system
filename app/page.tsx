"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: string;
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.status === "ACTIVE",
  ).length;

  const lowStockProducts = products.filter(
    (product) => product.stock <= 5,
  ).length;

  const totalInventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Inventory Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your products and inventory
            </p>
          </div>

          <div className="hidden rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 sm:block">
            Admin Dashboard
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Summary Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Products</p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalProducts}
            </p>

            <p className="mt-2 text-xs text-slate-400">Products in inventory</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Active Products
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {activeProducts}
            </p>

            <p className="mt-2 text-xs text-slate-400">Currently available</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Low Stock</p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {lowStockProducts}
            </p>

            <p className="mt-2 text-xs text-slate-400">5 or fewer items</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Inventory Value
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              ₹{totalInventoryValue.toLocaleString("en-IN")}
            </p>

            <p className="mt-2 text-xs text-slate-400">Current stock value</p>
          </div>
        </div>

        {/* Products Section */}
        <section className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Products
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Overview of your current inventory
                </p>
              </div>

              <button
                onClick={fetchProducts}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
              >
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-48 items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />

                <p className="mt-3 text-sm text-slate-500">
                  Loading products...
                </p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex min-h-48 items-center justify-center px-6">
              <div className="text-center">
                <h3 className="font-semibold text-slate-900">
                  No products found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add a product to start managing your inventory.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-160 text-sm">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-slate-600">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-slate-600">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-slate-600">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-left font-semibold text-slate-600">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">
                          {product.name}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {product.category}
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={
                            product.stock <= 5
                              ? "font-medium text-amber-600"
                              : "text-slate-600"
                          }
                        >
                          {product.stock}
                        </span>

                        {product.stock <= 5 && (
                          <span className="ml-2 text-xs text-amber-600">
                            Low stock
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            product.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
