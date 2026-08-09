//This page handles displaying products
import type { Product } from "./ProductPage";

type ProductTableProps = {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
};

export default function ProductTable({
  products,
  loading,
  onEdit,
}: ProductTableProps) {
  if (loading) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-slate-500">Loading products...</p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="font-semibold text-slate-900">No products found</h2>

        <p className="mt-1 text-sm text-slate-500">
          Add your first product to get started.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">Product List</h2>

        <p className="mt-1 text-sm text-slate-500">
          {products.length} product
          {products.length !== 1 ? "s" : ""} in inventory
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-sm">
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

              <th className="px-6 py-4 text-right font-semibold text-slate-600">
                Actions
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
                  <p className="font-medium text-slate-900">{product.name}</p>

                  <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
                    {product.description}
                  </p>
                </td>

                <td className="px-6 py-4 text-slate-600">{product.category}</td>

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

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Edit
                    </button>

                    <button className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
