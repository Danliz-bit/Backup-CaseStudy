import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import InputField from '../components/InputField';
import { useApp } from '../context/AppContext';
import { User, Lock, Mail, Wrench, LogOut, Plus, Trash2, Edit3 } from 'lucide-react';

const menuItems = [
  { id: 'username', label: 'Change Username', icon: User, color: 'wb-btn-yellow' },
  { id: 'password', label: 'Change Password', icon: Lock, color: 'wb-btn-yellow' },
  { id: 'email', label: 'Change Email', icon: Mail, color: 'wb-btn-yellow' },
  { id: 'appliance', label: 'Appliance Management', icon: Wrench, color: 'wb-btn-yellow' },
  { id: 'logout', label: 'Log Out', icon: LogOut, color: 'wb-btn-red' },
];

const applianceModes = [
  { id: 'add', label: 'Add Appliance', icon: Plus, color: 'bg-wb-red hover:bg-red-600' },
  { id: 'remove', label: 'Remove Appliance', icon: Trash2, color: 'bg-wb-red hover:bg-red-600' },
  { id: 'rename', label: 'Rename Appliance', icon: Edit3, color: 'bg-wb-red hover:bg-red-600' },
];

export default function Settings() {
  const [subPage, setSubPage] = useState('menu');
  const [applianceMode, setApplianceMode] = useState(null);
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  if (subPage === 'menu') {
    return (
      <div className="p-6 space-y-6 animate-fade-in">
        <Header title="Walang Brownout Appliances Settings" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => item.id === 'logout' ? handleLogout() : setSubPage(item.id)}
              className={`wb-btn ${item.color} flex items-center gap-3 justify-center py-4`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (subPage === 'appliance') {
    return (
      <div className="p-6 space-y-6 animate-fade-in">
        <Header title="Walang Brownout Appliances Settings" />
        
        <div className="flex flex-wrap gap-3 mb-4">
          {applianceModes.map(mode => (
            <button
              key={mode.id}
              onClick={() => setApplianceMode(mode.id)}
              className={`wb-btn text-white px-6 py-3 ${mode.color} ${applianceMode === mode.id ? 'ring-4 ring-white scale-105' : ''}`}
            >
              <mode.icon size={18} className="inline mr-2" />
              {mode.label}
            </button>
          ))}
        </div>

        {applianceMode && (
          <div className="wb-card max-w-4xl mx-auto space-y-4">
            <h3 className="text-xl font-black capitalize mb-4">{applianceMode} Appliance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Product Name" labelColor="text-black" required />
              <InputField label="Category ID" labelColor="text-black" required />
              <InputField label="Supplier ID" labelColor="text-black" required />
              <InputField label="Current Stock" type="number" labelColor="text-black" required />
              <InputField label="Safety Stock" type="number" labelColor="text-black" required />
              <InputField label="Selling Price" type="number" labelColor="text-black" required />
              <InputField label="Unit cost" type="number" labelColor="text-black" required />
              <InputField label="New item" labelColor="text-black" />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setApplianceMode(null)} className="wb-btn-orange">Back</button>
              <button onClick={() => { alert(`${applianceMode} confirmed!`); setApplianceMode(null); }} className="wb-btn-blue">Confirm</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Generic form renderer for username/password/email
  const formConfigs = {
    username: { title: 'Change Username', fields: ['Username', 'Password', 'New Username', 'Confirm Password'] },
    password: { title: 'Change Password', fields: ['Username', 'Current Password', 'Confirm Password', 'Contact number'] },
    email: { title: 'Change Email', fields: ['Username', 'Password', 'New Email', 'Confirm Password'] },
  };

  const config = formConfigs[subPage];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Header title="Walang Brownout Appliances Settings" />
      <div className="wb-card max-w-md mx-auto space-y-4">
        <h3 className="text-xl font-black">{config.title}</h3>
        {config.fields.map(field => (
          <InputField 
            key={field} 
            label={field} 
            labelColor="text-black"
            type={field.toLowerCase().includes('password') ? 'password' : field.toLowerCase().includes('email') ? 'email' : 'text'} 
            required 
          />
        ))}
        <div className="flex gap-4 pt-4">
          <button onClick={() => setSubPage('menu')} className="wb-btn-orange flex-1">Back</button>
          <button onClick={() => { alert(`${config.title} successful!`); setSubPage('menu'); }} className="wb-btn-yellow flex-1">Confirm</button>
        </div>
      </div>
    </div>
  );
}