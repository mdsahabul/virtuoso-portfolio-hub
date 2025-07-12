
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo credentials - in a real app, this would be a secure authentication process
      if (credentials.email === 'devsahabul@gmail.com' && credentials.password === 'lovAble10dev') {
        // Set a demo token in localStorage - in a real app, this would be a JWT or similar
        localStorage.setItem('adminToken', 'demo-token');
        toast.success('Login successful!');
        navigate('/admin-dashboard');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    }, 1500);
  };

  return (
    <main className="min-h-screen pt-20 flex items-center justify-center bg-blue-50">
      <div className="container-custom max-w-md py-12">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-blue-600 mb-4">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-gray-600 mt-2">
              Enter your credentials to access the admin dashboard
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="devsahabul@gmail.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">
                Demo: Use "devsahabul@gmail.com" and "lovAble10dev"
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                Forgot password?
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-md font-medium text-white 
                ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
                transition-colors flex justify-center items-center`}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm">
            <p className="text-gray-600">
              Need help? <a href="/contact" className="text-blue-600 font-medium hover:text-blue-800">Contact support</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
