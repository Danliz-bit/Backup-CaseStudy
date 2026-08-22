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
  const [formData, setFormData] = useState({});
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const updateField = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setFormMessage({ type: '', text: '' });
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
              onClick={() => { setApplianceMode(mode.id); setFormData({}); setFormMessage({ type: '', text: '' }); }}
              className={`wb-btn text-white px-6 py-3 ${mode.color} ${applianceMode === mode.id ? 'ring-4 ring-white scale-105' : ''}`}
            >
              <mode.icon size={18} className="inline mr-2" />
              {mode.label}
            </button>
          ))}
        </div>

        {applianceMode && (
          <form className="wb-card max-w-4xl mx-auto space-y-4" onSubmit={(event) => {
            event.preventDefault();
            if (applianceMode === 'add') {
              dispatch({
                type: 'ADD_PRODUCT',
                payload: {
                  id: formData.id || `PRD-${Date.now()}`,
                  name: formData.productName,
                  categoryId: formData.categoryId,
                  supplierId: formData.supplierId,
                  currentStock: formData.currentStock,
                  safetyStock: formData.safetyStock,
                  sellingPrice: formData.sellingPrice,
                  unitCost: formData.unitCost,
                  status: 'New',
                },
              });
              setFormMessage({ type: 'success', text: 'Appliance added successfully.' });
            }
            if (applianceMode === 'remove') {
              dispatch({ type: 'REMOVE_PRODUCT', payload: formData.productId });
              setFormMessage({ type: 'success', text: 'Appliance removed successfully.' });
            }
            if (applianceMode === 'rename') {
              dispatch({ type: 'RENAME_PRODUCT', payload: { id: formData.productId, name: formData.newName } });
              setFormMessage({ type: 'success', text: 'Appliance renamed successfully.' });
            }
            setFormData({});
          }}>
            <h3 className="text-xl font-black capitalize mb-4">{applianceMode} Appliance</h3>
            {applianceMode === 'add' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="Product Name" name="productName" value={formData.productName || ''} onChange={updateField} labelColor="text-black" required />
                <InputField label="Category ID" name="categoryId" value={formData.categoryId || ''} onChange={updateField} labelColor="text-black" required />
                <InputField label="Supplier ID" name="supplierId" value={formData.supplierId || ''} onChange={updateField} labelColor="text-black" required />
                <InputField label="Current Stock" name="currentStock" value={formData.currentStock || ''} onChange={updateField} type="number" labelColor="text-black" required />
                <InputField label="Safety Stock" name="safetyStock" value={formData.safetyStock || ''} onChange={updateField} type="number" labelColor="text-black" required />
                <InputField label="Selling Price" name="sellingPrice" value={formData.sellingPrice || ''} onChange={updateField} type="number" labelColor="text-black" required />
                <InputField label="Unit Cost" name="unitCost" value={formData.unitCost || ''} onChange={updateField} type="number" labelColor="text-black" required />
              </div>
            )}
            {(applianceMode === 'remove' || applianceMode === 'rename') && (
              <div className="space-y-4">
                <label className="flex flex-col gap-1.5 text-sm font-bold text-black">
                  Select appliance
                  <select name="productId" value={formData.productId || ''} onChange={updateField} required className="wb-input">
                    <option value="">Choose an appliance</option>
                    {state.products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
                  </select>
                </label>
                {applianceMode === 'rename' && (
                  <InputField label="New appliance name" name="newName" value={formData.newName || ''} onChange={updateField} labelColor="text-black" placeholder="Enter the new name" required />
                )}
                {state.products.length === 0 && <p className="text-sm text-wb-red font-bold">No appliances available yet. Add one first.</p>}
              </div>
            )}
            {formMessage.text && <p className={`text-sm font-bold ${formMessage.type === 'error' ? 'text-wb-red' : 'text-green-600'}`}>{formMessage.text}</p>}
            <div className="flex justify-end gap-4 mt-6">
              <button type="button" onClick={() => { setApplianceMode(null); setFormData({}); }} className="wb-btn-orange">Back</button>
              <button type="submit" className="wb-btn-blue">
                {applianceMode === 'remove' ? 'Remove Application' : applianceMode === 'rename' ? 'Rename' : 'Save appliance'}
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  const formConfigs = {
    username: {
      title: 'Change Username',
      description: 'Update the name used to sign in to the admin account.',
      fields: [
        { name: 'currentUsername', label: 'Current username', placeholder: state.user?.username || 'Admin' },
        { name: 'newUsername', label: 'New username', placeholder: 'Enter a new username' },
        { name: 'confirmUsername', label: 'Confirm new username', placeholder: 'Re-enter the new username' },
        { name: 'password', label: 'Current password', type: 'password', placeholder: 'Enter your current password' },
      ],
    },
    password: {
      title: 'Change Password',
      description: 'Create a new password for the admin account.',
      fields: [
        { name: 'currentPassword', label: 'Current password', type: 'password', placeholder: 'Enter your current password' },
        { name: 'newPassword', label: 'New password', type: 'password', placeholder: 'Enter a new password' },
        { name: 'confirmPassword', label: 'Confirm new password', type: 'password', placeholder: 'Re-enter the new password' },
      ],
    },
    email: {
      title: 'Change Email',
      description: 'Update the email address connected to the admin account.',
      fields: [
        { name: 'username', label: 'Admin username', placeholder: state.user?.username || 'Admin' },
        { name: 'password', label: 'Current password', type: 'password', placeholder: 'Enter your current password' },
        { name: 'newEmail', label: 'New email address', type: 'email', placeholder: 'admin@example.com' },
        { name: 'confirmEmail', label: 'Confirm new email', type: 'email', placeholder: 'Re-enter the new email address' },
      ],
    },
  };

  const config = formConfigs[subPage];

  const submitAccountForm = (event) => {
    event.preventDefault();
    const values = formData;
    if (values.password && values.password !== state.adminCredentials.password) {
      setFormMessage({ type: 'error', text: 'Current password is incorrect.' });
      return;
    }
    if (subPage === 'username' && values.newUsername !== values.confirmUsername) {
      setFormMessage({ type: 'error', text: 'The new usernames do not match.' });
      return;
    }
    if (subPage === 'password' && values.newPassword !== values.confirmPassword) {
      setFormMessage({ type: 'error', text: 'The new passwords do not match.' });
      return;
    }
    if (subPage === 'email' && values.newEmail !== values.confirmEmail) {
      setFormMessage({ type: 'error', text: 'The new email addresses do not match.' });
      return;
    }

    if (subPage === 'username') {
      dispatch({ type: 'UPDATE_USER', payload: { username: values.newUsername } });
      dispatch({ type: 'UPDATE_ADMIN_CREDENTIALS', payload: { username: values.newUsername } });
    }
    if (subPage === 'password') dispatch({ type: 'UPDATE_ADMIN_CREDENTIALS', payload: { password: values.newPassword } });
    if (subPage === 'email') dispatch({ type: 'UPDATE_USER', payload: { email: values.newEmail } });
    setFormMessage({ type: 'success', text: `${config.title} successful.` });
    setFormData({});
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Header title="Walang Brownout Appliances Settings" />
      <form className="wb-card max-w-md mx-auto space-y-4" onSubmit={submitAccountForm}>
        <h3 className="text-xl font-black">{config.title}</h3>
        <p className="text-sm text-gray-600">{config.description}</p>
        {config.fields.map(field => (
          <InputField
            key={field.name}
            name={field.name}
            label={field.label}
            labelColor="text-black"
            type={field.type || 'text'}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={updateField}
            required
          />
        ))}
        {formMessage.text && (
          <p className={`text-sm font-bold ${formMessage.type === 'error' ? 'text-wb-red' : 'text-green-600'}`} role="status">
            {formMessage.text}
          </p>
        )}
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={() => setSubPage('menu')} className="wb-btn-orange flex-1">Back</button>
          <button type="submit" className="wb-btn-yellow flex-1">Save changes</button>
        </div>
      </form>
    </div>
  );
}