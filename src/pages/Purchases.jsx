import { useState } from 'react';
import Header from '../components/Header';
import InputField from '../components/InputField';
import { purchaseHistory } from '../data/mockData';

export default function Purchases() {
  const [view, setView] = useState('form');

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Header title="Walang Brownout Appliances Purchases" />
      
      <div className="flex gap-3">
        <button onClick={() => setView('form')} className={`wb-btn ${view === 'form' ? 'wb-btn-yellow' : 'wb-btn-gray'}`}>
          New Purchase
        </button>
        <button onClick={() => setView('history')} className={`wb-btn ${view === 'history' ? 'wb-btn-yellow' : 'wb-btn-gray'}`}>
          Purchase History
        </button>
      </div>
      
      {view === 'form' ? (
        <div className="wb-card max-w-4xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Batch ID" labelColor="text-black" required />
            <InputField label="Product ID" labelColor="text-black" required />
            <InputField label="Quantity" type="number" labelColor="text-black" required />
            <InputField label="Purchase Date" type="date" labelColor="text-black" required />
            <InputField label="Transaction ID" labelColor="text-black" required />
            <InputField label="Expiration Date" type="date" labelColor="text-black" />
            <InputField label="Transaction Date" type="date" labelColor="text-black" required />
            <InputField label="Remaining stock" type="number" labelColor="text-black" />
            <div className="md:col-span-2">
              <InputField label="Performed By" labelColor="text-black" required />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button onClick={() => alert('Purchase recorded!')} className="wb-btn-blue">Confirm</button>
          </div>
        </div>
      ) : (
        <div className="wb-card overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-3 font-black">Purchase ID</th>
                <th className="p-3 font-black">Batch ID</th>
                <th className="p-3 font-black">Product</th>
                <th className="p-3 font-black">Quantity</th>
                <th className="p-3 font-black">Date</th>
                <th className="p-3 font-black">Total</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map(p => (
                <tr key={p.id} className="border-b border-gray-400">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.batchId}</td>
                  <td className="p-3">{p.product}</td>
                  <td className="p-3">{p.quantity}</td>
                  <td className="p-3">{p.date}</td>
                  <td className="p-3 font-bold">{p.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}