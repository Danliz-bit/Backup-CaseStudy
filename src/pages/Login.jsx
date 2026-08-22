import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import InputField from '../components/InputField';

export default function Login() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const username = credentials.username.trim();
    const account = state.accounts.find((item) => (
      (item.username || item.givenName || '').toLowerCase() === username.toLowerCase()
      && item.password === credentials.password
    ));
    const isAdmin = username.toLowerCase() === state.adminCredentials.username.toLowerCase()
      && credentials.password === state.adminCredentials.password;

    if (!account && !isAdmin) {
      setError('Incorrect username or password.');
      return;
    }

    dispatch({
      type: 'LOGIN',
      payload: {
        username: account?.username || state.adminCredentials.username,
        email: state.user?.email || 'WalangBrownoutAppliances@gmail.com',
      },
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-wb-bg flex flex-col items-center justify-center p-8">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-5">
        <h2 className="text-3xl font-black text-white text-center mb-6 leading-tight">
          Welcome to<br /> <span className="text-wb-yellow">Walang Brownout</span>
          <br />
          Appliances!
        </h2>
        
        <InputField
          label="Username"
          name="username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        {error && <p className="text-wb-red text-sm font-bold" role="alert">{error}</p>}
        
        <div className="flex gap-4 pt-6">
          <button type="button" onClick={() => navigate('/')} className="wb-btn-orange flex-1">Back</button>
          <button type="submit" className="wb-btn-yellow flex-1">Continue</button>
        </div>
      </form>
    </div>
  );
}