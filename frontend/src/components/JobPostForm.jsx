import React, { useState } from 'react';
import axios from 'axios';

const TAG_OPTIONS = [
  'Frontend', 'Backend', 'Fullstack', 'UI/UX', 'React', 'Node.js', 'Design', 'API', 'Database', 'Remote', 'Contract', 'Internship', 'Entry Level', 'Senior', 'Management'
];

const JobPostForm = ({ onClose, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('INR');

  const CURRENCY_OPTIONS = [
    { label: 'INR (₹)', value: 'INR' },
    { label: 'USD ($)', value: 'USD' },
    { label: 'AUD (A$)', value: 'AUD' },
    { label: 'EUR (€)', value: 'EUR' },
    { label: 'GBP (£)', value: 'GBP' },
    { label: 'JPY (¥)', value: 'JPY' },
    { label: 'CNY (¥)', value: 'CNY' },
    { label: 'CAD (C$)', value: 'CAD' },
    { label: 'SGD (S$)', value: 'SGD' },
    { label: 'CHF (Fr)', value: 'CHF' },
    { label: 'ZAR (R)', value: 'ZAR' }
  ];

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.split(' ').length > 200) {
      setError('Description must be 200 words or less.');
    } else {
      setError('');
      setDescription(value);
    }
  };

  const handleTagsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setTags(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.trim().split(' ').length > 200) {
      setError('Description must be 200 words or less.');
      return;
    }
    if (!budget || isNaN(Number(budget)) || Number(budget) <= 0) {
      setError('Please enter a valid budget.');
      return;
    }
    if (!currency) {
      setError('Please select a currency.');
      return;
    }
    if (tags.length === 0) {
      setError('Please select at least one tag.');
      return;
    }
    setError('');
    setLoading(true);
    setSuccess('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/jobs',
        { description, tags, budget, currency },
        { withCredentials: true }
      );
      setSuccess('Job posted successfully!');
      setDescription('');
      setTags([]);
      setBudget('');
      setCurrency('INR');
      if (onSubmit) onSubmit(res.data);
      setTimeout(() => setSuccess(''), 2000);
      if (onClose) onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-4xl w-[700px] mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Post a New Job</h2>
      <div className="mb-4">
        <label className="block mb-2 font-semibold dark:text-gray-200">Job Description (max 200 words)</label>
        <textarea
          className="w-full p-4 border rounded-lg dark:bg-gray-700 dark:text-white text-lg"
          rows={8}
          value={description}
          onChange={handleDescriptionChange}
          maxLength={2000} // Just in case
          placeholder="Describe the job..."
        />
        <div className="text-xs text-gray-500 mt-1">{description.trim().split(' ').length} / 200 words</div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold dark:text-gray-200">Budget</label>
        <div className="flex gap-4">
          <input
            type="number"
            min="0"
            required
            className="w-1/2 p-3 border rounded-lg dark:bg-gray-700 dark:text-white text-lg"
            placeholder="Enter budget..."
            value={budget}
            onChange={e => setBudget(e.target.value)}
          />
          <select
            className="w-1/2 p-3 border rounded-lg dark:bg-gray-700 dark:text-white text-lg"
            value={currency}
            onChange={e => setCurrency(e.target.value)}
          >
            {CURRENCY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold dark:text-gray-200">Tags</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {TAG_OPTIONS.map(tag => (
            <label key={tag} className="flex items-center space-x-2 cursor-pointer text-base dark:text-white">
              <input
                type="checkbox"
                value={tag}
                checked={tags.includes(tag)}
                onChange={e => {
                  if (e.target.checked) {
                    setTags([...tags, tag]);
                  } else {
                    setTags(tags.filter(t => t !== tag));
                  }
                }}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring focus:ring-blue-300"
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-1">Select one or more tags</div>
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-200 disabled:opacity-70"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post Job'}
      </button>
      {onClose && (
        <button
          type="button"
          className="ml-4 px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default JobPostForm;
