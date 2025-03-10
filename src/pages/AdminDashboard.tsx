import { useState } from 'react';
import { HeatMap } from '../components/HeatMap';
import { MetricsPanel } from '../components/MetricsPanel';
import { DashboardLayout } from '../components/DashboardLayout';
import { RecentActivity } from '../components/RecentActivity';
import { TaskManager } from '../components/TaskManager';
import { EventCalendar } from '../components/EventCalendar';
import { AnalyticsCharts } from '../components/AnalyticsCharts';
import { IncidentManager } from '../components/IncidentManager';
import { AdvancedAnalytics } from '../components/AdvancedAnalytics';
import { motion } from 'framer-motion';
import { useThemeStore } from '../stores/useThemeStore';
import { Filter, Download } from 'lucide-react';

export function AdminDashboard() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Filters and Export */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              } px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700`}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>

        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MetricsPanel />
        </motion.div>

        {/* Advanced Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AdvancedAnalytics />
        </motion.div>

        {/* Incident Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <IncidentManager />
        </motion.div>
        
        {/* Real-time Monitoring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-6 rounded-lg shadow-md transition-colors duration-200`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Real-time Crowd Density</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span>Warning</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span>Critical</span>
              </div>
            </div>
          </div>
          <HeatMap width={800} height={400} />
        </motion.div>

        {/* Task Manager and Calendar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TaskManager />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <EventCalendar />
          </motion.div>
        </div>

        {/* Recent Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <RecentActivity />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}