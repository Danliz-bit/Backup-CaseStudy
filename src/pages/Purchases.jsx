import { useState, useEffect } from 'react';
import Header from '../components/Header';
import InputField from '../components/InputField';
import { purchaseHistory as initialPurchaseHistory } from '../data/mockData';
import { Pencil, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'wb_purchase_history';

const emptyForm = {
  batchId: '',
  productId: '',
  quantity: '',
  purchaseDate: '',
  transactionId: '',
  expirationDate: '',
  transactionDate: '',
  remainingStock: '',
  performedBy: '',
};

const getInitialPurchaseHistory = () => {
  if (typeof window === 'undefined') return initialPurchaseHistory;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return initialPurchaseHistory;

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialPurchaseHistory;
  } catch {
    return initialPurchaseHistory;
  }
};

export default function Purchases() {
  const [view, setView] = useState('form');
  const [purchaseHistory, setPurchaseHistory] = useState(getInitialPurchaseHistory);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(purchaseHistory));
    }
  }, [purchaseHistory]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const quantity = Number(formData.quantity || 0);
    const total = quantity > 0 ? `₱${(quantity * 3000).toLocaleString()}` : '₱0';

    const purchase = {
      id: editingId || `PUR-${String(purchaseHistory.length + 1).padStart(3, '0')}`,
      batchId: formData.batchId,
      product: formData.productId,
      quantity,
      date: formData.purchaseDate || formData.transactionDate,
      total,
      transactionId: formData.transactionId,
      expirationDate: formData.expirationDate,
      transactionDate: formData.transactionDate,
      remainingStock: formData.remainingStock,
      performedBy: formData.performedBy,
    };

    setPurchaseHistory((prev) => editingId
      ? prev.map((item) => item.id === editingId ? purchase : item)
      : [purchase, ...prev]);
    setFormData(emptyForm);
    setEditingId(null);
    setView('history');
  };

  const handleEdit = (purchase) => {
    setEditingId(purchase.id);
    setFormData({
      batchId: purchase.batchId || '',
      productId: purchase.product || '',
      quantity: purchase.quantity || '',
      purchaseDate: purchase.date || '',
      transactionId: purchase.transactionId || '',
      expirationDate: purchase.expirationDate || '',
      transactionDate: purchase.transactionDate || '',
      remainingStock: purchase.remainingStock || '',
      performedBy: purchase.performedBy || '',
    });
    setView('form');
  };

  const handleDelete = (purchaseId) => {
    if (!window.confirm('Delete this purchase record?')) return;
    setPurchaseHistory((prev) => prev.filter((purchase) => purchase.id !== purchaseId));
  };

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
        <form onSubmit={handleSubmit} className="wb-card max-w-4xl mx-auto space-y-4">
          <div>
            <h2 className="text-xl font-black">{editingId ? 'Edit Purchase' : 'New Purchase'}</h2>
            <p className="text-sm text-gray-600">{editingId ? 'Update the selected purchase record.' : 'Record a new purchase transaction.'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Batch ID"
              labelColor="text-black"
              name="batchId"
              value={formData.batchId}
              onChange={handleChange}
              required
            />
            <InputField
              label="Product ID"
              labelColor="text-black"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
            />
            <InputField
              label="Quantity"
              type="number"
              labelColor="text-black"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <InputField
              label="Purchase Date"
              type="date"
              labelColor="text-black"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              required
            />
            <InputField
              label="Transaction ID"
              labelColor="text-black"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              required
            />
            <InputField
              label="Expiration Date"
              type="date"
              labelColor="text-black"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
            />
            <InputField
              label="Transaction Date"
              type="date"
              labelColor="text-black"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
              required
            />
            <InputField
              label="Remaining stock"
              type="number"
              labelColor="text-black"
              name="remainingStock"
              value={formData.remainingStock}
              onChange={handleChange}
            />
            <div className="md:col-span-2">
              <InputField
                label="Performed By"
                labelColor="text-black"
                name="performedBy"
                value={formData.performedBy}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" className="wb-btn-blue">{editingId ? 'Update Purchase' : 'Confirm'}</button>
          </div>
        </form>
      ) : (
        <div className="wb-card overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-3 font-black">Purchase ID</th>
                <th className="p-3 font-black">Batch ID</th>
                <th className="p-3 font-black">Product</th>
                <th className="p-3 font-black">Quantity</th>
                <th className="p-3 font-black">Date</th>
                <th className="p-3 font-black">Total</th>
                <th className="p-3 font-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.length > 0 ? (
                purchaseHistory.map((p) => (
                  <tr key={p.id} className="border-b border-gray-400 hover:bg-gray-200 transition-colors">
                    <td className="p-3 font-semibold">{p.id}</td>
                    <td className="p-3">{p.batchId}</td>
                    <td className="p-3">{p.product}</td>
                    <td className="p-3">{p.quantity}</td>
                    <td className="p-3">{p.date}</td>
                    <td className="p-3 font-bold text-wb-black">{p.total}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => handleEdit(p)} className="wb-btn-yellow px-3 py-2" aria-label={`Edit ${p.id}`} title="Edit purchase">
                          <Pencil size={16} />
                        </button>
                        <button type="button" onClick={() => handleDelete(p.id)} className="wb-btn-red px-3 py-2" aria-label={`Delete ${p.id}`} title="Delete purchase">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500 font-semibold">
                    No purchase history yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}