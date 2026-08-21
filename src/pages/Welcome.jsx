import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-wb-bg flex flex-col items-center justify-center gap-8 p-8 animate-fade-in">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
          Welcome to
        </h1>
        <h2 className="text-4xl md:text-5xl font-black text-wb-yellow">
          Walang Brownout
        </h2>
      </div>
      
      <button
        onClick={() => navigate('/login')}
        className="w-72 md:w-96 py-5 bg-wb-yellow rounded-full text-white text-2xl font-black hover:scale-105 transition-transform shadow-2xl border-2 border-yellow-300"
      >
        sign in
      </button>
      
      <button
        onClick={() => navigate('/register')}
        className="w-72 md:w-96 py-5 bg-wb-yellow rounded-full text-white text-2xl font-black hover:scale-105 transition-transform shadow-2xl border-2 border-yellow-300"
      >
        Create a account
      </button>
    </div>
  );
}