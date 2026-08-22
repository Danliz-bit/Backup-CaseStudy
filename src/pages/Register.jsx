import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { useApp } from '../context/AppContext';

export default function Register() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [givenName, setGivenName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedName = givenName.trim();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const existingAccount = state.accounts.find((account) => (
      account.givenName?.toLowerCase() === normalizedName.toLowerCase()
    ));
    if (existingAccount?.password) {
      setError('That account already exists. Please sign in with its existing password.');
      return;
    }

    if (existingAccount) {
      dispatch({
        type: 'UPDATE_ACCOUNT',
        payload: { id: existingAccount.id, username: normalizedName, password },
      });
      navigate('/login');
      return;
    }

    dispatch({
      type: 'ADD_ACCOUNT',
      payload: { id: Date.now(), givenName: normalizedName, username: normalizedName, password },
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-wb-bg flex flex-col items-center justify-center p-8">
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-black text-white text-center mb-6 leading-tight">
          Welcome to<br /> <span className="text-wb-yellow">Walang Brownout</span>
          <br />
          Appliances!
        </h2>
        
        <InputField
          label="Given name"
          placeholder="e.g. Clara Dela Cruz"
          value={givenName}
          onChange={(e) => { setGivenName(e.target.value); setError(''); }}
          required
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
          required
        />
        <InputField label="Address" required />
        <InputField label="Contact number" type="tel" required />
        <InputField
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
          required
        />
        <InputField label="Emergency number" type="tel" required />
        {error && <p className="text-wb-red text-sm font-bold" role="alert">{error}</p>}
        
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={() => navigate('/')} className="wb-btn-orange flex-1">Back</button>
          <button type="submit" className="wb-btn-yellow flex-1">Sign in</button>
        </div>
      </form>
    </div>
  );
}