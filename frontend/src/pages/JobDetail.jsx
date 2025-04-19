import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { useUser } from '../context/UserContext';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accepting, setAccepting] = useState(false);
  const [acceptMsg, setAcceptMsg] = useState('');
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);



  useEffect(() => {
    if (user && job && job.acceptedBy && Array.isArray(job.acceptedBy)) {
      setHasAccepted(job.acceptedBy.includes(user._id));
    }
  }, [user, job]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!job) return <div className="p-8">Job not found.</div>;

  const handleAccept = async () => {
    setAccepting(true);
    setAcceptMsg('');
    
    // Check if user is logged in and has an ID
    if (!user || !user._id) {
      setAcceptMsg('Missing freelancer userId. Please log in first.');
      setAccepting(false);
      return;
    }
    
    try {
      const res = await axios.post(`http://localhost:5000/api/jobs/${id}/accept`, { userId: user._id });
      setAcceptMsg('Job accepted successfully!');
      setHasAccepted(true);
    } catch (err) {
      setAcceptMsg(err.response?.data?.message || 'Failed to accept job.');
    }
    setAccepting(false);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">&larr; Back</button>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Job Details</h1>
        <div className="mb-2">
          <span className="font-semibold">Description:</span>
          <div className="mt-1 whitespace-pre-line dark:text-gray-200">{job.description}</div>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Tags:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {job.tags && job.tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium dark:bg-blue-900 dark:text-blue-200">{tag}</span>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Budget:</span> {job.budget} {job.currency}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Posted On:</span> {format(new Date(job.createdAt), 'PPP p')}
        </div>
      </div>
      {/* Accept Button for Freelancers */}
      {user && user.role === 'Freelancer' && !hasAccepted && (
        <button
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors duration-200"
          onClick={handleAccept}
          disabled={accepting}
        >
          {accepting ? 'Accepting...' : 'Accept Job'}
        </button>
      )}
      {acceptMsg && (
        <div className={`mt-4 ${hasAccepted ? 'text-green-600' : 'text-red-600'}`}>{acceptMsg}</div>
      )}
    </div>
  );
};

export default JobDetail;
