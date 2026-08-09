//This page handles page state and API communication
"use client";

import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import EditProductForm from "./EditProductForm";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Products</h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your inventory products
            </p>
          </div>

          <button
            onClick={() => setShowForm((value) => !value)}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            {showForm ? "Cancel" : "+ Add Product"}
          </button>
        </div>

        {editingProduct && (
          <EditProductForm
            product={editingProduct}
            onSuccess={() => {
              setEditingProduct(null);
              fetchProducts();
            }}
            onCancel={() => setEditingProduct(null)}
          />
        )}

        {showForm && !editingProduct && (
          <ProductForm
            onSuccess={() => {
              setShowForm(false);
              fetchProducts();
            }}
          />
        )}

        <ProductTable
          products={products}
          loading={loading}
          onEdit={(product) => setEditingProduct(product)}
        />
      </div>
    </main>
  );
}
