import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleFindWork = () => {
    navigate('/signup?role=Freelancer');
  };
  const handlePostJob = () => {
    navigate('/signup?role=Employer');
  };
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Find Secure Freelance Work
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Connect with verified employers and secure your next opportunity in a safe, 
            scam-free environment.
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={handleFindWork}
              className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Find Work
            </button>
            <button
              onClick={handlePostJob}
              className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Post a Job
            </button>
          </div>
          
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div className="p-6">
              <div className="text-blue-600 text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Verified Employers</h3>
              <p className="text-gray-600">Every employer is thoroughly vetted</p>
            </div>
            <div className="p-6">
              <div className="text-blue-600 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Your earnings are protected</p>
            </div>
            <div className="p-6">
              <div className="text-blue-600 text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Quality Work</h3>
              <p className="text-gray-600">Top-tier opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
