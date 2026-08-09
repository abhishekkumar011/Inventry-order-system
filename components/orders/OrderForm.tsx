"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  status: string;
};

type OrderFormProps = {
  onSuccess: () => void;
};

export default function OrderForm({ onSuccess }: OrderFormProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      if (data.success) {
        setProducts(
          data.products.filter(
            (product: Product) =>
              product.status === "ACTIVE" && product.stock > 0,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoadingProducts(false);
    }
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!productId) {
      alert("Please select a product.");
      return;
    }

    if (Number(quantity) <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              productId,
              quantity: Number(quantity),
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create order.");
        return;
      }

      alert("Order created successfully.");

      setProductId("");
      setQuantity("1");

      onSuccess();
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Create Order</h2>

        <p className="mt-1 text-sm text-slate-500">
          Select a product and enter the quantity.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Product *
            </label>

            <select
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              disabled={loadingProducts}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500"
            >
              <option value="">
                {loadingProducts ? "Loading products..." : "Select a product"}
              </option>

              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} — ₹{product.price.toLocaleString("en-IN")} (
                  {product.stock} in stock)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Quantity *
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={submitting || loadingProducts}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Creating..." : "Create Order"}
          </button>
        </div>
      </form>
    </section>
  );
}
