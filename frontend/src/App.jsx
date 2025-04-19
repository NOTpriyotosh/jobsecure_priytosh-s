import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import FreelancerDashboard from './pages/FreelancerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import JobDetail from './pages/JobDetail';
import { DarkModeProvider } from './context/DarkModeContext';
import { UserProvider } from './context/UserContext';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <DarkModeProvider>
      <UserProvider>
        <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <main className="container mx-auto px-4">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
      </UserProvider>
    </DarkModeProvider>
  );
}

export default App;
