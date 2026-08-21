import Header from '../components/Header';
import InputField from '../components/InputField';

export default function SalesOrders() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Header title="Walang Brownout Appliances Sales Orders" />
      
      <div className="wb-card max-w-4xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Order ID" labelColor="text-black" required />
          <InputField label="Customer Name" labelColor="text-black" required />
          <InputField label="Order Date" type="date" labelColor="text-black" required />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-black">Status</label>
            <select className="wb-input">
              <option>PENDING</option>
              <option>COMPLETED</option>
              <option>CANCELLED</option>
            </select>
          </div>
          <InputField label="Product ID" labelColor="text-black" required />
          <InputField label="Quantity" type="number" labelColor="text-black" required />
          <InputField label="Price" type="number" labelColor="text-black" required />
          <InputField label="New" labelColor="text-black" />
        </div>
        <div className="flex justify-end pt-4">
          <button onClick={() => alert('Order created!')} className="wb-btn-yellow">Next</button>
        </div>
      </div>
    </div>
  );
}