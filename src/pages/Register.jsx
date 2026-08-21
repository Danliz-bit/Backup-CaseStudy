import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-wb-bg flex flex-col items-center justify-center p-8">
      <form className="w-full max-w-md space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
        <h2 className="text-3xl font-black text-white text-center mb-6">
          Welcome to <span className="text-wb-yellow">Walang Brownout</span> Appliances..!
        </h2>
        
        <InputField label="Username" required />
        <InputField label="Password" type="password" required />
        <InputField label="Address" required />
        <InputField label="Contact number" type="tel" required />
        <InputField label="Confirm password" type="password" required />
        <InputField label="Emergency number" type="tel" required />
        
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={() => navigate('/')} className="wb-btn-orange flex-1">Back</button>
          <button type="submit" className="wb-btn-yellow flex-1">Sign in</button>
        </div>
      </form>
    </div>
  );
}