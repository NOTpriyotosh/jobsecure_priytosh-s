import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobStatusModal = ({ jobId, onClose }) => {
  const [accepted, setAccepted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccepted = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}/accepted`);
        setAccepted(res.data.acceptedBy || []);
      } catch (err) {
        setError('Failed to fetch accepted freelancers.');
      } finally {
        setLoading(false);
      }
    };
    fetchAccepted();
  }, [jobId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-600 dark:text-gray-200" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 dark:text-white">Accepted Freelancers</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : accepted.length === 0 ? (
          <div>No freelancers have accepted this job yet.</div>
        ) : (
          <ul className="space-y-2">
            {accepted.map(freelancer => (
              <li key={freelancer._id} className="bg-gray-100 dark:bg-gray-700 rounded p-2">
                <div className="font-semibold dark:text-white">{freelancer.username}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{freelancer.email}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobStatusModal;
