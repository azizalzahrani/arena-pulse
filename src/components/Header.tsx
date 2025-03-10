import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Zap, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { signOut } from '../lib/auth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center justify-between h-full">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 text-indigo-400 font-semibold text-xl">
            <Zap className="w-6 h-6" />
            ArenaPulse
          </Link>

          {!user ? (
            <>
              <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
                <Link to="/logo" className="text-gray-300 hover:text-white transition-colors">Logo</Link>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Testimonials</Link>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user.email}</span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <div className="flex flex-col gap-4">
                {!user ? (
                  <>
                    <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                    <Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
                    <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
                    <Link to="/logo" className="text-gray-300 hover:text-white transition-colors">Logo</Link>
                    <Link to="/" className="text-gray-300 hover:text-white transition-colors">Testimonials</Link>
                    <Link to="/" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
                    <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Sign in</Link>
                    <Link
                      to="/signup"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-center"
                    >
                      Get Started
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                    <Link to="/settings" className="text-gray-300 hover:text-white transition-colors">Settings</Link>
                    <button
                      onClick={handleSignOut}
                      className="text-left text-gray-300 hover:text-white transition-colors"
                    >
                      Sign out
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}