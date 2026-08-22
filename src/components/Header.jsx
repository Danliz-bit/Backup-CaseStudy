import { User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header({ title }) {
  const { state } = useApp();
  const userName = state.user?.username || 'Admin';

  return (
    <header className="bg-wb-sidebar p-4 flex justify-between items-center mb-6 rounded-xl border border-gray-600">
      <h1 className="text-lg font-bold text-white">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-white">{userName}</span>
        <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-gray-500 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </header>
  );
}