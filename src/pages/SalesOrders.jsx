import { useState } from 'react';
import Header from '../components/Header';
import InputField from '../components/InputField';
import { useApp } from '../context/AppContext';

const emptyOrderForm = {
  orderId: '',
  customer: '',
  orderDate: '',
  status: 'PENDING',
  product: '',
  quantity: '',
  price: '',
};

const statusBadgeClasses = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  completed: 'bg-green-100 text-green-800 border-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
};

const getStatusBadgeClass = (status) => (
  statusBadgeClasses[String(status).toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-300'
);

export default function SalesOrders() {
  const [view, setView] = useState('form');
  const [formData, setFormData] = useState(emptyOrderForm);
  const { state, dispatch } = useApp();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const quantity = Number(formData.quantity || 0);
    const price = Number(formData.price || 0);
    const order = {
      orderId: formData.orderId || `ORD-${String(state.orders.length + 1).padStart(3, '0')}`,
      customer: formData.customer,
      orderDate: formData.orderDate,
      product: formData.product,
      quantity,
      status: formData.status,
      total: `₱${(quantity * price).toLocaleString()}`,
    };

    dispatch({ type: 'ADD_ORDER', payload: order });
    setFormData(emptyOrderForm);
    setView('history');
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Header title="Walang Brownout Appliances Sales Orders" />

      <div className="flex gap-3">
        <button onClick={() => setView('form')} className={`wb-btn ${view === 'form' ? 'wb-btn-yellow' : 'wb-btn-gray'}`}>
          New Order
        </button>
        <button onClick={() => setView('history')} className={`wb-btn ${view === 'history' ? 'wb-btn-yellow' : 'wb-btn-gray'}`}>
          Order History
        </button>
      </div>

      {view === 'form' ? (
        <form onSubmit={handleSubmit} className="wb-card max-w-4xl mx-auto space-y-4">
          <div>
            <h2 className="text-xl font-black">New Order</h2>
            <p className="text-sm text-gray-600">Record a new sales order.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Order ID" labelColor="text-black" name="orderId" value={formData.orderId} onChange={handleChange} placeholder="Auto-generated if blank" />
            <InputField label="Customer Name" labelColor="text-black" name="customer" value={formData.customer} onChange={handleChange} required />
            <InputField label="Order Date" type="date" labelColor="text-black" name="orderDate" value={formData.orderDate} onChange={handleChange} required />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-black" htmlFor="order-status">Status</label>
              <select id="order-status" name="status" value={formData.status} onChange={handleChange} className="wb-input">
                <option>PENDING</option>
                <option>COMPLETED</option>
                <option>CANCELLED</option>
              </select>
            </div>
            <InputField label="Product ID" labelColor="text-black" name="product" value={formData.product} onChange={handleChange} required />
            <InputField label="Quantity" type="number" min="1" labelColor="text-black" name="quantity" value={formData.quantity} onChange={handleChange} required />
            <InputField label="Price" type="number" min="0" labelColor="text-black" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" className="wb-btn-yellow">Save Order</button>
          </div>
        </form>
      ) : (
        <div className="wb-card overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-3 font-black">Order ID</th>
                <th className="p-3 font-black">Customer Name</th>
                <th className="p-3 font-black">Product</th>
                <th className="p-3 font-black">Quantity</th>
                <th className="p-3 font-black">Status</th>
                <th className="p-3 font-black">Total</th>
              </tr>
            </thead>
            <tbody>
              {state.orders.length > 0 ? state.orders.map((order) => (
                <tr key={order.orderId} className="border-b border-gray-400 hover:bg-gray-200 transition-colors">
                  <td className="p-3 font-semibold">{order.orderId}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.product}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-black uppercase ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-wb-black">{order.total}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500 font-semibold">No order history yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}