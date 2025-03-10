import { motion } from 'framer-motion';
import { AlertTriangle, UserPlus, ShoppingCart, Bell, CheckCircle2 } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';
import { format } from 'date-fns';

interface Activity {
  id: string;
  type: 'alert' | 'user' | 'order' | 'notification' | 'system';
  message: string;
  timestamp: Date;
  status?: 'warning' | 'success' | 'error';
}

export function RecentActivity() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const activities: Activity[] = [
    {
      id: '1',
      type: 'alert',
      message: 'High crowd density detected in Zone A',
      timestamp: new Date(2025, 2, 15, 14, 30),
      status: 'warning'
    },
    {
      id: '2',
      type: 'user',
      message: 'New staff member added to system',
      timestamp: new Date(2025, 2, 15, 14, 15)
    },
    {
      id: '3',
      type: 'order',
      message: 'Concession stand inventory updated',
      timestamp: new Date(2025, 2, 15, 14, 0),
      status: 'success'
    },
    {
      id: '4',
      type: 'notification',
      message: 'Emergency protocol test completed',
      timestamp: new Date(2025, 2, 15, 13, 45)
    },
    {
      id: '5',
      type: 'system',
      message: 'System maintenance scheduled for tonight',
      timestamp: new Date(2025, 2, 15, 13, 30)
    }
  ];

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'user':
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'order':
        return <ShoppingCart className="w-5 h-5 text-green-500" />;
      case 'notification':
        return <Bell className="w-5 h-5 text-purple-500" />;
      case 'system':
        return <CheckCircle2 className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } p-6 rounded-lg shadow-md transition-colors duration-200`}>
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-4 p-3 rounded-lg ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            } transition-colors`}
          >
            <div className="flex-shrink-0">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className={`${
                activity.status === 'warning'
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : activity.status === 'error'
                  ? 'text-red-600 dark:text-red-400'
                  : ''
              }`}>
                {activity.message}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {format(activity.timestamp, 'MMM d, yyyy HH:mm')}
              </p>
            </div>
            {activity.status && (
              <span className={`text-xs px-2 py-1 rounded ${
                activity.status === 'warning'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20'
                  : activity.status === 'error'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/20'
                  : 'bg-green-100 text-green-700 dark:bg-green-900/20'
              }`}>
                {activity.status}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}