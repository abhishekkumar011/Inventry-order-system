import type { Order } from "./OrderPage";

type OrderTableProps = {
  orders: Order[];
  loading: boolean;
  onStatusChange: (orderId: string, status: string) => void;
};

export default function OrderTable({
  orders,
  loading,
  onStatusChange,
}: OrderTableProps) {
  if (loading) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-slate-500">Loading orders...</p>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="font-semibold text-slate-900">No orders found</h2>

        <p className="mt-1 text-sm text-slate-500">
          Orders will appear here once they are created.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">Order List</h2>

        <p className="mt-1 text-sm text-slate-500">
          {orders.length} order
          {orders.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-sm">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Order ID
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Products
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Quantity
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Total
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const totalQuantity = order.items.reduce(
                (total, item) => total + item.quantity,
                0,
              );

              return (
                <tr
                  key={order._id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900">
                      #{order._id.slice(-6)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <p key={item.productId} className="text-slate-700">
                          {item.productName}
                        </p>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-600">{totalQuantity}</td>

                  <td className="px-6 py-4 font-medium text-slate-900">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(event) =>
                        onStatusChange(order._id, event.target.value)
                      }
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-slate-500"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
