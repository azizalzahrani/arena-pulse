import { useState } from 'react';
import { motion } from 'framer-motion';
import { MetricsPanel } from '../../components/MetricsPanel';
import { StadiumNotifications } from '../../components/StadiumNotifications';
import { StadiumOverview } from '../../components/StadiumOverview';
import { EventCalendar } from '../../components/EventCalendar';
import { IncidentManager } from '../../components/IncidentManager';
import { AdvancedAnalytics } from '../../components/AdvancedAnalytics';
import { WorldCupStadiums } from '../../components/WorldCupStadiums';
import { WorldCupOverview } from '../../components/WorldCupOverview';
import { SaudiLeagueSection } from '../../components/SaudiLeagueSection';
import { useAuthStore } from '../../stores/useAuthStore';
import {
  Filter,
  Download,
  MessageSquare,
  Share2,
  Bell,
  Clock,
  ChevronRight,
  ChevronDown,
  X,
  Zap,
  Menu,
  LogOut,
  Calendar,
  DollarSign,
  Activity,
  Trophy,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowRight
} from 'lucide-react';

export function DashboardHome() {
  const { user } = useAuthStore();
  const currentTime = new Date();
  const hour = currentTime.getHours();

  // Get appropriate greeting based on time of day
  const getGreeting = () => {
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Get user's first name
  const firstName = user?.email?.split('@')[0] || 'there';

  return (
    <div className="space-y-6">
      {/* Header with Quick Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {getGreeting()}, {firstName}
            </h1>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
            <Users className="w-4 h-4" />
            <span>45,231 Attendees</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg">
            <Clock className="w-4 h-4" />
            <span>Peak Time: 18:30</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            <span>3 Active Alerts</span>
          </div>
        </div>
      </div>

      {/* Stadium Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <StadiumNotifications />
      </motion.div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Filter className="w-4 h-4" />
            Filter View
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Bell className="w-4 h-4" />
            Notifications
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>
      
      {/* Saudi Professional League Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <SaudiLeagueSection />
      </motion.div>

      {/* World Cup 2034 Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <WorldCupOverview />
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MetricsPanel />
      </motion.div>

      {/* World Cup 2034 Stadiums */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <WorldCupStadiums />
      </motion.div>

      {/* Advanced Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AdvancedAnalytics />
      </motion.div>

      {/* Real-time Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5" />
                <span>Emergency Broadcast</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span>Deploy Security Team</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5" />
                <span>Adjust Capacity Limits</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Event Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-2"
        >
          <EventCalendar />
        </motion.div>
      </div>

      {/* Real-time Stadium Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <StadiumOverview />
      </motion.div>

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Trending Insights</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Attendance Rate +12%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Higher than last week's average</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">Revenue Growth +8%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Concession sales performing well</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <div>
                <p className="font-medium">Queue Times -15%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Improved entry flow management</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
          <div className="space-y-4">
            <div className="p-4 border border-yellow-200 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h3 className="font-medium text-yellow-800 dark:text-yellow-400">Capacity Management</h3>
              <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-300">
                Consider opening additional entry points in North Wing to reduce congestion
              </p>
              <button className="mt-2 text-sm text-yellow-700 dark:text-yellow-400 font-medium hover:text-yellow-800 dark:hover:text-yellow-300">
                View Details →
              </button>
            </div>
            <div className="p-4 border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-blue-800 dark:text-blue-400">Staff Deployment</h3>
              <p className="mt-1 text-sm text-blue-600 dark:text-blue-300">
                Deploy additional security personnel to South Gate during peak hours
              </p>
              <button className="mt-2 text-sm text-blue-700 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300">
                Take Action →
              </button>
            </div>
            <div className="p-4 border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-medium text-green-800 dark:text-green-400">Resource Optimization</h3>
              <p className="mt-1 text-sm text-green-600 dark:text-green-300">
                Adjust concession stand inventory based on current demand patterns
              </p>
              <button className="mt-2 text-sm text-green-700 dark:text-green-400 font-medium hover:text-green-800 dark:hover:text-green-300">
                Optimize →
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Incident Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <IncidentManager />
      </motion.div>
    </div>
  );
}