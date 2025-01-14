import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut } from 'lucide-react';

const Navbar = ({ onStartCall }: { onStartCall: (userId: string) => void }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('jwt');  // Check if JWT is stored in localStorage

  const handleLogout = () => {
    localStorage.removeItem('jwt');  // Remove the JWT token on logout
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              SkillFusion
            </span>
          </Link>

          {/* Navbar Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" text="Home" />
            <NavLink to="/search" text="Search" />
            <NavLink to="/opportunities" text="Opportunities" />

            {isLoggedIn ? (
              <>
                <NavLink to="/profile" icon={<User size={20} />} text="Profile" />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink to="/login" text="Login" />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="mobile-menu-button">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// NavLink component for individual links
const NavLink = ({ to, icon, text }: { to: string; icon?: React.ReactNode; text: string }) => (
  <motion.div whileHover={{ y: -2 }}>
    <Link to={to} className="flex items-center space-x-1 text-gray-600 hover:text-indigo-500 transition-colors">
      {icon && icon}
      <span>{text}</span>
    </Link>
  </motion.div>
);

export default Navbar;
