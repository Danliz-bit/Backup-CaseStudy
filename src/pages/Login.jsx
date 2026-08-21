import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import InputField from '../components/InputField';

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN', payload: { username: 'admin', email: 'WalangBrownoutAppliances@gmail.com' } });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-wb-bg flex flex-col items-center justify-center p-8">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-5">
        <h2 className="text-3xl font-black text-white text-center mb-8 leading-tight">
          Welcome to<br />
          <span className="text-wb-yellow">Walang Brownout</span><br />
          <span className="text-xl font-bold">Appliances..!</span>
        </h2>
        
        <InputField label="Username" required />
        <InputField label="Password" type="password" required />
        
        <div className="flex gap-4 pt-6">
          <button type="button" onClick={() => navigate('/')} className="wb-btn-orange flex-1">Back</button>
          <button type="submit" className="wb-btn-yellow flex-1">Continue</button>
        </div>
      </form>
    </div>
  );
}