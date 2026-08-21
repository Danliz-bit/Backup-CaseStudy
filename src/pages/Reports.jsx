import { useState } from 'react';
import Header from '../components/Header';
import { notificationsData, ordersData, powerUsageData, chatLogs } from '../data/mockData';
import { User } from 'lucide-react';

const tabs = [
  { id: 'notifications', label: 'Notifications' },
  { id: 'orders', label: 'Orders' },
  { id: 'power', label: 'Power Usage' },
  { id: 'cancel', label: 'Cancel/Refund' },
  { id: 'payment', label: 'Payment' },
  { id: 'chat', label: 'Chat Logs' },
  { id: 'delayed', label: 'Delayed Orders' },
];

const statusBadge = (status) => {
  const colors = {
    'Critical': 'bg-red-600',
    'Low stock': 'bg-orange-500',
    'Maintenance': 'bg-blue-500',
    'New Product': 'bg-green-600',
    'Purchase': 'bg-purple-500',
    'Pending': 'bg-yellow-500 text-black',
    'Completed': 'bg-green-600',
    'High': 'bg-orange-500',
    'Normal': 'bg-green-600',
  };
  return <span className={`px-2 py-1 rounded text-xs font-bold text-white ${colors[status] || 'bg-gray-500'}`}>{status}</span>;
};

export default function Reports() {
  const [tab, setTab] = useState('notifications');

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Header title="Walang Brownout Appliances Reports and Alerts" />
      
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
              tab === t.id ? 'bg-wb-yellow text-white shadow-lg scale-105' : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="wb-card overflow-x-auto">
        {tab === 'notifications' && (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-3 font-black">Product</th>
                <th className="p-3 font-black">Current Stock</th>
                <th className="p-3 font-black">Category</th>
                <th className="p-3 font-black">Quantity</th>
                <th className="p-3 font-black">Date</th>
                <th className="p-3 font-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {notificationsData.map(row => (
                <tr key={row.id} className="border-b border-gray-400">
                  <td className="p-3">{row.product}</td>
                  <td className="p-3">{row.currentStock}</td>
                  <td className="p-3">{row.category}</td>
                  <td className="p-3">{row.quantity}</td>
                  <td className="p-3">{row.date}</td>
                  <td className="p-3">{statusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'orders' && (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-3 font-black">Order ID</th>
                <th className="p-3 font-black">Customer Name</th>
                <th className="p-3 font-black">Product</th>
                <th className="p-3 font-black">Quantity</th>
                <th className="p-3 font-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((row, i) => (
                <tr key={i} className="border-b border-gray-400">
                  <td className="p-3">{row.orderId}</td>
                  <td className="p-3">{row.customer}</td>
                  <td className="p-3">{row.product}</td>
                  <td className="p-3">{row.quantity}</td>
                  <td className="p-3">{statusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'power' && (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-3 font-black">Date</th>
                <th className="p-3 font-black">Area/Equipment</th>
                <th className="p-3 font-black">Power Used (kWh)</th>
                <th className="p-3 font-black">Cost (₱)</th>
                <th className="p-3 font-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {powerUsageData.map(row => (
                <tr key={row.id} className="border-b border-gray-400">
                  <td className="p-3">{row.date}</td>
                  <td className="p-3">{row.area}</td>
                  <td className="p-3">{row.kwh}</td>
                  <td className="p-3">{row.cost}</td>
                  <td className="p-3">{statusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'cancel' && (
          <div className="p-4">
            <div className="grid grid-cols-2 font-black border-b-2 border-black pb-2 mb-2">
              <span>Date</span><span>Status</span>
            </div>
            <p className="text-gray-600 py-4">No cancel/refund records found.</p>
          </div>
        )}

        {tab === 'payment' && (
          <div className="p-4">
            <div className="grid grid-cols-2 font-black border-b-2 border-black pb-2 mb-2">
              <span>Date</span><span>Status</span>
            </div>
            <p className="text-gray-600 py-4">No payment records found.</p>
          </div>
        )}

        {tab === 'chat' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {chatLogs.map((name, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-200 p-4 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-black text-lg">
                  <User size={20} />
                </div>
                <span className="font-bold text-black">{name}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'delayed' && (
          <div className="p-8 text-center text-gray-600">
            <p className="text-lg">No delayed orders at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}