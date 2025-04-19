import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const RecentlyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs?limit=10');
        setJobs(res.data.jobs || res.data); // support both array and { jobs: [] }
      } catch (err) {
        setError('Failed to fetch jobs.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 transition-colors duration-200">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Recently Posted Jobs</h2>
      {loading ? (
        <div>Loading jobs...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : jobs.length === 0 ? (
        <div>No jobs found.</div>
      ) : (
        <div className="space-y-6">
          {jobs.map(job => (
            <div key={job.id || job._id} className="border-b pb-4 mb-4 last:border-b-0 last:mb-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-lg dark:text-white mb-1">
                    {job.description.split(' ').slice(0, 8).join(' ')}{job.description.split(' ').length > 8 ? '...' : ''}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {job.tags && job.tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium dark:bg-blue-900 dark:text-blue-200">{tag}</span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">
                    Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                  </div>
                </div>
                <button
                  className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => navigate(`/jobs/${job.id || job._id}`)}
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyPostedJobs;
