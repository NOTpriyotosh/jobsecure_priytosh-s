import React, { useState } from 'react';
import JobStatusModal from './JobStatusModal';

const JobStatusButton = ({ jobId }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
        onClick={() => setShowModal(true)}
      >
        Job Status
      </button>
      {showModal && <JobStatusModal jobId={jobId} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default JobStatusButton;
