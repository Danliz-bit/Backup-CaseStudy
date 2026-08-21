import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, ClipboardList, FileText, Bell, Settings, LogOut } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/products', label: 'Products', icon: ShoppingCart },
  { to: '/purchases', label: 'Purchases', icon: ClipboardList },
  { to: '/sales', label: 'Sales Orders', icon: FileText },
  { to: '/reports', label: 'Reports and alerts', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-52 bg-wb-sidebar flex flex-col gap-2 p-4 min-h-screen border-r border-gray-600">
      <div className="text-center font-bold text-lg mb-4 text-white tracking-wide">
        WALANG BROWNOUT
      </div>
      
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3 px-4 rounded-full font-bold text-sm transition-all hover:scale-105 ${
              isActive ? 'bg-yellow-400 text-black shadow-md' : 'bg-wb-yellow text-white hover:bg-yellow-500'
            }`
          }
        >
          <item.icon size={18} />
          {item.label}
        </NavLink>
      ))}
      
      <button
        onClick={() => navigate('/')}
        className="mt-auto flex items-center gap-3 py-3 px-4 rounded-full font-bold text-sm bg-wb-orange text-white hover:bg-orange-600 transition-all hover:scale-105"
      >
        <LogOut size={18} />
        Back / Logout
      </button>
    </aside>
  );
}