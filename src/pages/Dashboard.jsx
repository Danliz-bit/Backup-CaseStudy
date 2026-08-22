import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DonutChart from '../components/DonutChart';
import { useApp } from '../context/AppContext';
import { inventoryData } from '../data/mockData';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  ShoppingCart,
  Zap
} from 'lucide-react';

const statStyles = [
  { 
    label: 'Total Inventory Value', 
    icon: Package, 
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-500',
  },
  { 
    label: 'Total Items', 
    icon: ShoppingCart, 
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-500',
  },
  { 
    label: 'Low Stock Items', 
    icon: AlertTriangle, 
    color: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-500',
  },
  { 
    label: 'Expiring Soon', 
    icon: Calendar, 
    color: 'from-red-500 to-red-600',
    bg: 'bg-red-500',
  },
];

const defaultTopInventory = [
  { name: 'Portable AC Units', value: 35, color: '#3b82f6' },
  { name: 'Air Purifiers', value: 25, color: '#10b981' },
  { name: 'Filter', value: 20, color: '#f59e0b' },
  { name: 'Smart Thermostats', value: 20, color: '#ef4444' },
];

const defaultRecentActivity = [
  { action: 'New purchase order', item: 'Portable AC x50', time: '2m ago', color: 'bg-blue-500 text-white' },
  { action: 'Low stock alert', item: 'Smart Fan X200', time: '15m ago', color: 'bg-orange-500 text-white' },
  { action: 'Order completed', item: 'ORD-004', time: '1h ago', color: 'bg-green-500 text-white' },
  { action: 'New product added', item: 'PO-1002 CoolTech', time: '3h ago', color: 'bg-purple-500 text-white' },
];

const TargetChart = () => (
  <svg viewBox="0 0 300 150" className="w-full h-44">
    <defs>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#e6b800" />
        <stop offset="100%" stopColor="#ff8c00" />
      </linearGradient>
      <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e6b800" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#e6b800" stopOpacity="0" />
      </linearGradient>
    </defs>
    
    <polygon 
      fill="url(#areaGrad)" 
      points="10,120 60,80 100,100 150,40 200,60 250,20 290,30 290,150 10,150" 
    />
    
    <polyline 
      fill="none" 
      stroke="url(#lineGrad)" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      points="10,120 60,80 100,100 150,40 200,60 250,20 290,30" 
    />
    
    {[
      [10, 120], [60, 80], [100, 100], [150, 40], [200, 60], [250, 20], [290, 30]
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="5" fill="white" stroke="#e6b800" strokeWidth="3" />
    ))}
  </svg>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const baseInventoryItems = inventoryData.reduce((sum, row) => sum + row.total, 0);
  const baseLowStockItems = inventoryData.reduce((sum, row) => sum + row.lowStock, 0);
  const baseExpiringItems = inventoryData.reduce((sum, row) => sum + row.expiring, 0);
  const addedStock = state.products.reduce(
    (sum, product) => sum + Number(product.currentStock || product.stock || 0),
    0,
  );
  const purchasedStock = state.purchases.reduce((sum, purchase) => sum + Number(purchase.quantity || 0), 0);
  const expiringPurchases = state.purchases.filter((purchase) => {
    if (!purchase.expirationDate) return false;
    const expirationDate = new Date(purchase.expirationDate);
    const daysUntilExpiration = (expirationDate - new Date()) / (1000 * 60 * 60 * 24);
    return daysUntilExpiration >= 0 && daysUntilExpiration <= 30;
  }).length;
  const inventoryValue = state.products.reduce(
    (sum, product) => sum + Number(product.currentStock || product.stock || 0) * Number(product.unitCost || product.price || 0),
    0,
  );
  const stats = statStyles.map((stat, index) => ({
    ...stat,
    value: [
      `₱${(3550 + inventoryValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      (baseInventoryItems + addedStock + purchasedStock).toLocaleString(),
      Math.max(0, baseLowStockItems + state.products.filter((product) => Number(product.currentStock || product.stock || 0) <= Number(product.safetyStock || 0)).length).toLocaleString(),
      (baseExpiringItems + expiringPurchases).toLocaleString(),
    ][index],
    change: index === 0 ? (inventoryValue ? 'Live' : '+12%') : index === 1 ? (addedStock || purchasedStock ? 'Live' : '+5%') : index === 2 ? 'Live' : 'Static',
    up: index !== 2,
  }));
  const liveActivity = [
    ...state.purchases.slice(0, 2).map((purchase) => ({
      action: 'New purchase recorded',
      item: `${purchase.product || 'Product'} x${purchase.quantity || 0}`,
      time: 'Just now',
      color: 'bg-purple-500 text-white',
    })),
    ...state.products.slice(-2).reverse().map((product) => ({
      action: 'New product added',
      item: product.name || product.id,
      time: 'Just now',
      color: 'bg-blue-500 text-white',
    })),
  ];
  const recentActivity = [...liveActivity, ...defaultRecentActivity].slice(0, 4);
  const addedCategoryStock = state.products.reduce((categories, product) => {
    const category = product.categoryId || 'Other';
    categories[category] = (categories[category] || 0) + Number(product.currentStock || product.stock || 0);
    return categories;
  }, {});
  const liveCategories = Object.entries(addedCategoryStock)
    .sort(([, firstValue], [, secondValue]) => secondValue - firstValue)
    .slice(0, 4);
  const liveCategoryTotal = liveCategories.reduce((sum, [, value]) => sum + value, 0);
  const dashboardTopInventory = state.products.length > 0
    ? liveCategories.map(([name, value], index) => ({
      name,
      value: Math.round((value / liveCategoryTotal) * 100),
      color: defaultTopInventory[index % defaultTopInventory.length].color,
    }))
    : defaultTopInventory;

  const quickActions = [
    { label: 'Add Product', icon: Package, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100', path: '/products' },
    { label: 'New Order', icon: ShoppingCart, color: 'bg-green-50 text-green-600 hover:bg-green-100', path: '/sales' },
    { label: 'Record Purchase', icon: TrendingUp, color: 'bg-purple-50 text-purple-600 hover:bg-purple-100', path: '/purchases' },
    { label: 'View Reports', icon: Zap, color: 'bg-orange-50 text-orange-600 hover:bg-orange-100', path: '/reports' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <Header title="Dashboard" subtitle="Overview of your appliance inventory" />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group cursor-pointer">
            <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} text-white shadow-lg`}>
                  <stat.icon size={22} />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                  stat.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top Inventory */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Top Inventory Categories</h3>
              <p className="text-sm text-gray-500">Distribution by product type</p>
            </div>
            <button 
              onClick={() => navigate('/inventory')}
              className="text-wb-yellow text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all bg-yellow-50 px-3 py-1.5 rounded-lg"
            >
              View All <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <DonutChart data={dashboardTopInventory} size={180} stroke={40} />
            <div className="space-y-3 w-full sm:w-auto">
              {dashboardTopInventory.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-4 h-4 rounded-md shadow-sm" style={{ background: item.color }} />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-900">{item.name}</div>
                  </div>
                  <div className="text-sm font-black text-gray-900">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Performance Target</h3>
          <p className="text-sm text-gray-500 mb-4">Monthly sales goal</p>
          <TargetChart />
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Current Progress</span>
              <span className="font-bold text-gray-900">67%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#e6b800] to-[#ff8c00] h-2.5 rounded-full transition-all duration-1000" 
                style={{ width: '67%' }} 
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>₱0</span>
              <span>Goal: ₱5M</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Moving */}
        <div className="bg-white rounded-2xl shadow-lg p-3">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Moving Items</h3>
          <div className="space-y-20">
            {[
              { name: 'Portable AC', sold: 230, trend: '+12%', color: 'bg-blue-500' },
              { name: 'Air Purifier', sold: 170, trend: '+8%', color: 'bg-emerald-500' },
              { name: 'Smart Fan', sold: 210, trend: '+15%', color: 'bg-purple-500' },
              { name: 'Filter Pack', sold: 130, trend: '+5%', color: 'bg-orange-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-lg ${item.color} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.sold} items sold</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">{item.trend}</div>
                  <div className="text-xs text-gray-400">this month</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity + Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-500">Latest updates from your inventory</p>
            </div>
            <button 
              onClick={() => navigate('/reports')}
              className="text-sm font-bold text-blue-400 hover:text-gray-600 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div className={`w-2 h-12 rounded-full ${activity.color.split(' ')[0].replace('bg-', 'bg-').replace('100', '500')}`} />
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-sm">{activity.action}</div>
                  <div className="text-xs text-gray-500">{activity.item}</div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${activity.color}`}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
          
          {/* Quick Actions - MAY FUNCTION NA */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickActions.map((action, i) => (
                <button 
                  key={i} 
                  onClick={() => navigate(action.path)}
                  className={`p-3 rounded-xl ${action.color} transition-all flex flex-col items-center gap-2 text-xs font-bold hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <action.icon size={20} />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}