import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const location = useLocation();
  const { saveUser } = useUser();
  const navigate = useNavigate();
  const [role, setRole] = useState('Freelancer');
  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryRole = params.get('role');
    if (queryRole && (queryRole === 'Freelancer' || queryRole === 'Employer')) {
      setRole(queryRole);
    }
  }, [location.search]);
// Removed duplicate declarations below (already declared at the top)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    if (form.password !== form.passwordConfirm) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        ...form,
        role,
      });
      saveUser(res.data);
      setMessage('Signup successful!');
      setForm({ username: '', password: '', passwordConfirm: '', email: '' });
      if (role === 'Freelancer') {
        navigate('/freelancer-dashboard');
      } else {
        navigate('/employer-dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Network Error');
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sign Up</h2>
        <div className="mb-4 flex justify-center space-x-4">
          <label className={`px-4 py-2 rounded cursor-pointer ${role === 'Freelancer' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'}`}> 
            <input type="radio" name="role" value="Freelancer" checked={role === 'Freelancer'} onChange={handleRoleChange} className="hidden" />
            Freelancer
          </label>
          <label className={`px-4 py-2 rounded cursor-pointer ${role === 'Employer' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'}`}> 
            <input type="radio" name="role" value="Employer" checked={role === 'Employer'} onChange={handleRoleChange} className="hidden" />
            Employer
          </label>
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="abc@gmail.com"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={form.passwordConfirm}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {message && <div className="mt-4 text-center text-red-600 dark:text-red-400">{message}</div>}
      </form>
    </div>
  );
};

export default Signup;
