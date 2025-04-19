import { Link } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-50 transition-colors duration-200">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">JobSecure</Link>
          <div className="space-x-6">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
            <Link to="/freelancer-dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Find Jobs</Link>
            <Link to="/employer-dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Post a Job</Link>
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Login</Link>
            <Link to="/signup" className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 font-medium transition-colors duration-200">Sign Up</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
