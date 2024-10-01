import React, { useState, useContext } from 'react';
import { login } from '../services'; // Ensure this is your login service
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Import AuthContext for login
import { FaSpinner } from 'react-icons/fa'; // Optional spinner icon (install react-icons if necessary)

const Login = () => {
  const { login: loginContext } = useContext(AuthContext); // Use login function from context
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await login(formData);
      setSuccess('Logged in successfully!');
      loginContext(response.token); // Save token via AuthContext
      setFormData({ email: '', password: '' }); // Clear form

      setTimeout(() => {
        navigate('/'); // Redirect to dashboard after login
      }, 1000); // Redirect after a short delay
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300"
            >
              {loading ? (
                <FaSpinner className="animate-spin inline-block mr-2" />
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-600 text-sm">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-4 text-green-600 text-sm">
            <p>{success}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
