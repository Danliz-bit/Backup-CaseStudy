import Header from '../components/Header';
import { inventoryData } from '../data/mockData';

export default function Inventory() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Header title="Walang Brownout Appliances Inventory" />
      
      <div className="wb-card overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="p-3 font-black">Category</th>
              <th className="p-3 font-black">Total Items</th>
              <th className="p-3 font-black">Low Stock Items</th>
              <th className="p-3 font-black">Expiring Items</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((row) => (
              <tr key={row.id} className="border-b border-gray-400 hover:bg-gray-200 transition-colors">
                <td className="p-3 font-semibold">{row.category}</td>
                <td className="p-3">{row.total}</td>
                <td className="p-3">
                  <span className={`font-bold ${row.lowStock > 10 ? 'text-orange-600' : 'text-green-700'}`}>
                    {row.lowStock}
                  </span>
                </td>
                <td className="p-3">{row.expiring}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}