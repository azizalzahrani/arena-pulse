import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../../stores/useThemeStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { signOut } from '../../lib/auth';
import {
  LayoutDashboard,
  BarChart2,
  Calendar,
  Settings as SettingsIcon,
  Bell,
  Users,
  AlertTriangle,
  ChevronRight,
  Menu as MenuIcon,
  Sun,
  Moon,
  User,
  LogOut,
  Search,
  Shield,
  MessageSquare,
  FileText,
  HelpCircle,
  X,
  Loader2,
  Zap
} from 'lucide-react';

interface NavItem {
  name: string;
  to: string;
  icon: React.ElementType;
  badge?: number;
  disabled?: boolean;
}

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationError, setNavigationError] = useState<string | null>(null);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const navigation: NavItem[] = [
    { name: 'Overview', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', to: '/dashboard/analytics', icon: BarChart2, badge: 3 },
    { name: 'Events', to: '/dashboard/events', icon: Calendar },
    { name: 'Staff', to: '/dashboard/staff', icon: Users },
    { name: 'Security', to: '/dashboard/security', icon: Shield },
    { name: 'Incidents', to: '/dashboard/incidents', icon: AlertTriangle, badge: 2 },
    { name: 'Reports', to: '/dashboard/reports', icon: FileText },
    { name: 'Support', to: '/dashboard/support', icon: MessageSquare },
    { name: 'Settings', to: '/dashboard/settings', icon: SettingsIcon }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Critical Alert',
      description: 'Zone A capacity exceeding 90%',
      time: '2 minutes ago',
      type: 'critical'
    },
    {
      id: 2,
      title: 'Staff Update',
      description: 'New security team deployed to Gate B',
      time: '10 minutes ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'System Update',
      description: 'Analytics module maintenance in 2 hours',
      time: '1 hour ago',
      type: 'warning'
    }
  ];

  const quickActions = [
    {
      name: 'Emergency Broadcast',
      description: 'Send immediate alert to all zones',
      icon: AlertTriangle,
      action: () => handleQuickAction('emergency-broadcast')
    },
    {
      name: 'Lock Down',
      description: 'Restrict access to specific zones',
      icon: Shield,
      action: () => handleQuickAction('lock-down')
    },
    {
      name: 'Staff Alert',
      description: 'Notify all active staff members',
      icon: Bell,
      action: () => handleQuickAction('staff-alert')
    }
  ];

  useEffect(() => {
    if (navigationError) {
      const timer = setTimeout(() => setNavigationError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [navigationError]);

  const handleNavigation = async (to: string) => {
    try {
      setIsNavigating(true);
      setNavigationError(null);
      await navigate(to);
    } catch (error) {
      console.error('Navigation error:', error);
      setNavigationError('Failed to navigate. Please try again.');
    } finally {
      setIsNavigating(false);
    }
  };

  const handleQuickAction = async (action: string) => {
    try {
      console.log(`Executing quick action: ${action}`);
    } catch (error) {
      console.error(`Quick action error (${action}):`, error);
      setNavigationError('Failed to execute action. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setNavigationError('Failed to sign out. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? '16rem' : '4rem' }}
        className={`fixed inset-y-0 left-0 z-50 ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        } border-r border-gray-200 dark:border-gray-700 transition-colors`}
      >
        <div className="h-16 flex items-center justify-between px-4">
          {isSidebarOpen ? (
            <Link 
              to="/" 
              className="flex items-center gap-2 text-indigo-600 font-semibold transition-colors hover:text-indigo-500"
            >
              <Zap className="w-6 h-6" />
              <span>ArenaPulse</span>
            </Link>
          ) : (
            <Zap className="w-6 h-6 text-indigo-600 mx-auto" />
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronRight 
              className={`w-5 h-5 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        <nav className="mt-4 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors relative ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`
              }
              onClick={(e) => {
                if (item.disabled || isNavigating) {
                  e.preventDefault();
                  return;
                }
                handleNavigation(item.to);
              }}
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && (
                <>
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Actions */}
        {isSidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Quick Actions
              </h3>
              <div className="mt-2 space-y-2">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    onClick={action.action}
                    className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-white dark:hover:bg-gray-800 transition-colors text-left group"
                  >
                    <action.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium">{action.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main content */}
      <div className={`flex-1 transition-all ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden transition-colors"
              >
                <MenuIcon className="w-5 h-5" />
              </button>

              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 w-64 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsHelpOpen(!isHelpOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'critical' ? 'bg-red-500' :
                              notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                            }`} />
                            <div>
                              <p className="font-medium">{notification.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {notification.description}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                        <button className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">{user?.email}</span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700"
                    >
                      <Link
                        to="/dashboard/profile"
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                      >
                        <SettingsIcon className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        disabled={isNavigating}
                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors disabled:opacity-50"
                      >
                        {isNavigating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <LogOut className="w-4 h-4" />
                        )}
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Error Message */}
          <AnimatePresence>
            {navigationError && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                {navigationError}
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Help Panel */}
      <AnimatePresence>
        {isHelpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsHelpOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Help & Resources</h2>
                  <button
                    onClick={() => setIsHelpOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-indigo-600 hover:text-indigo-500 transition-colors">
                          Documentation
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-indigo-600 hover:text-indigo-500 transition-colors">
                          Video Tutorials
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-indigo-600 hover:text-indigo-500 transition-colors">
                          FAQs
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Contact Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Need help? Our support team is available 24/7.
                    </p>
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Contact Support
                    </button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Keyboard Shortcuts</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Toggle Sidebar</span>
                        <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">⌘/</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Quick Search</span>
                        <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">⌘K</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Toggle Theme</span>
                        <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700">⌘D</kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}