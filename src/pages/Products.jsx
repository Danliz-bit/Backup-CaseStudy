import { useState } from 'react';
import Header from '../components/Header';
import InputField from '../components/InputField';
import { useApp } from '../context/AppContext';

const emptyProductForm = {
  productName: '',
  categoryId: '',
  id: '',
  supplierId: '',
  unitCost: '',
  currentStock: '',
  recordedStock: '',
  seasonal: '',
  safetyStock: '',
  stock: '',
  sellingPrice: '',
  price: '',
  status: '',
};

export default function Products() {
  const [step, setStep] = useState(1);
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState(emptyProductForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const newProduct = {
      id: formData.id || `PRD-${Date.now()}`,
      name: formData.productName,
      categoryId: formData.categoryId,
      supplierId: formData.supplierId,
      unitCost: formData.unitCost,
      currentStock: formData.currentStock,
      recordedStock: formData.recordedStock,
      seasonal: formData.seasonal,
      safetyStock: formData.safetyStock,
      stock: formData.stock,
      sellingPrice: formData.sellingPrice,
      price: formData.price,
      status: formData.status || 'New',
    };

    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    alert('Product saved successfully!');
    setFormData(emptyProductForm);
    setStep(1);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Header title="Walang Brownout Appliances Products" />

      <div className="wb-card max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-2 flex-1 rounded-full ${s === step ? 'bg-wb-yellow' : 'bg-gray-400'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Product Name" labelColor="text-black" name="productName" value={formData.productName} onChange={handleChange} required />
            <InputField label="Category ID" labelColor="text-black" name="categoryId" value={formData.categoryId} onChange={handleChange} required />
            <InputField label="ID" labelColor="text-black" name="id" value={formData.id} onChange={handleChange} required />
            <InputField label="Suppliers ID" labelColor="text-black" name="supplierId" value={formData.supplierId} onChange={handleChange} required />
            <InputField label="Unit Cost" type="number" labelColor="text-black" name="unitCost" value={formData.unitCost} onChange={handleChange} required />
            <div className="md:col-span-2 flex justify-end pt-4">
              <button onClick={() => setStep(2)} className="wb-btn-yellow">Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Current Stock" type="number" labelColor="text-black" name="currentStock" value={formData.currentStock} onChange={handleChange} required />
            <InputField label="Recorded Stock" type="number" labelColor="text-black" name="recordedStock" value={formData.recordedStock} onChange={handleChange} />
            <InputField label="Seasonal" labelColor="text-black" name="seasonal" value={formData.seasonal} onChange={handleChange} />
            <InputField label="Safety Stock" type="number" labelColor="text-black" name="safetyStock" value={formData.safetyStock} onChange={handleChange} required />
            <InputField label="Stock" type="number" labelColor="text-black" name="stock" value={formData.stock} onChange={handleChange} required />
            <div className="md:col-span-2 flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="wb-btn-orange">Back</button>
              <button onClick={() => setStep(3)} className="wb-btn-yellow">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Selling Price" type="number" labelColor="text-black" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} required />
            <InputField label="Price" type="number" labelColor="text-black" name="price" value={formData.price} onChange={handleChange} required />
            <InputField label="New" labelColor="text-black" name="status" value={formData.status} onChange={handleChange} />
            <div className="md:col-span-2 flex justify-between pt-4">
              <button onClick={() => setStep(2)} className="wb-btn-orange">Back</button>
              <button onClick={handleSave} className="wb-btn-blue">Save Product</button>
            </div>
          </div>
        )}
      </div>

      <div className="wb-card max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-black text-black">Added Products</h3>
          <span className="text-sm font-bold text-gray-600">{state.products.length} item(s)</span>
        </div>

        {state.products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="p-3 font-black">Product Name</th>
                  <th className="p-3 font-black">ID</th>
                  <th className="p-3 font-black">Category</th>
                  <th className="p-3 font-black">Supplier</th>
                  <th className="p-3 font-black">Stock</th>
                  <th className="p-3 font-black">Price</th>
                </tr>
              </thead>
              <tbody>
                {state.products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-400 hover:bg-gray-200 transition-colors">
                    <td className="p-3 font-semibold">{product.name}</td>
                    <td className="p-3">{product.id}</td>
                    <td className="p-3">{product.categoryId || '-'}</td>
                    <td className="p-3">{product.supplierId || '-'}</td>
                    <td className="p-3">{product.currentStock || product.stock || 0}</td>
                    <td className="p-3 font-bold text-wb-black">₱{Number(product.price || product.sellingPrice || 0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 font-semibold">No products added yet.</p>
        )}
      </div>
    </div>
  );
}