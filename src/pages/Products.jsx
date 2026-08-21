import { useState } from 'react';
import Header from '../components/Header';
import InputField from '../components/InputField';
import { useApp } from '../context/AppContext';

export default function Products() {
  const [step, setStep] = useState(1);
  const { dispatch } = useApp();

  const handleSave = () => {
    dispatch({ type: 'ADD_PRODUCT', payload: { id: Date.now(), name: 'New Product' } });
    alert('Product saved successfully!');
    setStep(1);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Header title="Walang Brownout Appliances Products" />
      
      <div className="wb-card max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-2 flex-1 rounded-full ${s === step ? 'bg-wb-yellow' : 'bg-gray-400'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <InputField label="Product Name" labelColor="text-black" required />
            <InputField label="Category ID" labelColor="text-black" required />
            <InputField label="ID" labelColor="text-black" required />
            <InputField label="Suppliers ID" labelColor="text-black" required />
            <InputField label="Unit Cost" type="number" labelColor="text-black" required />
            <div className="md:col-span-2 flex justify-end pt-4">
              <button onClick={() => setStep(2)} className="wb-btn-yellow">Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Current Stock" type="number" labelColor="text-black" required />
            <InputField label="Recorded Stock" type="number" labelColor="text-black" />
            <InputField label="Seasonal" labelColor="text-black" />
            <InputField label="Safety Stock" type="number" labelColor="text-black" required />
            <InputField label="Stock" type="number" labelColor="text-black" required />
            <div className="md:col-span-2 flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="wb-btn-orange">Back</button>
              <button onClick={() => setStep(3)} className="wb-btn-yellow">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Selling Price" type="number" labelColor="text-black" required />
            <InputField label="Price" type="number" labelColor="text-black" required />
            <InputField label="New" labelColor="text-black" />
            <div className="md:col-span-2 flex justify-between pt-4">
              <button onClick={() => setStep(2)} className="wb-btn-orange">Back</button>
              <button onClick={handleSave} className="wb-btn-blue">Save Product</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}