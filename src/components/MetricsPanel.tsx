import { useAnalyticsStore } from '../stores/useAnalyticsStore';
import { BarChart3, Users, ThumbsUp, DollarSign, TrendingUp, AlertTriangle, Trophy, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../stores/useThemeStore';

export function MetricsPanel() {
  const { metrics, isLoading, error } = useAnalyticsStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  // Calculate aggregated metrics
  const aggregatedMetrics = Object.values(metrics).reduce(
    (acc, metric) => {
      acc.attendance += metric?.occupancy || 0;
      acc.revenue += metric?.revenue || 0;
      return acc;
    },
    { attendance: 0, revenue: 0 }
  );

  // Calculate averages and format values
  const totalZones = Math.max(Object.keys(metrics).length, 1);
  const averageAttendance = (aggregatedMetrics.attendance / totalZones).toFixed(1);
  const totalRevenue = aggregatedMetrics.revenue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  // Generate smart recommendations based on metrics
  const getAttendanceRecommendations = (attendance: number) => {
    if (attendance > 90) {
      return [
        "Consider opening additional entry points",
        "Activate overflow areas",
        "Deploy additional security personnel"
      ];
    } else if (attendance < 40) {
      return [
        "Review ticket pricing strategy",
        "Increase marketing efforts",
        "Consider special promotions"
      ];
    }
    return [
      "Monitor entry/exit flow rates",
      "Optimize staff distribution",
      "Review historical patterns"
    ];
  };

  const getEngagementRecommendations = (engagement: number) => {
    if (engagement < 85) {
      return [
        "Launch interactive fan activities",
        "Enhance mobile app features",
        "Implement real-time polls"
      ];
    }
    return [
      "Maintain current engagement programs",
      "Collect fan feedback",
      "Plan future improvements"
    ];
  };

  const getRevenueRecommendations = (revenue: number) => {
    return [
      "Optimize concession stand placement",
      "Implement dynamic pricing",
      "Analyze peak purchase times"
    ];
  };

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">
        Error loading metrics: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Key Performance Metrics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-200`}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold">Attendance</h3>
          </div>
          <p className="text-3xl font-bold mt-4 mb-2">
            {isLoading ? '...' : `${averageAttendance}%`}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current capacity</p>
          
          {/* Recommendations */}
          <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
            <h4 className="text-sm font-semibold text-blue-500 mb-2">Recommendations:</h4>
            <ul className="text-sm space-y-2">
              {getAttendanceRecommendations(Number(averageAttendance)).map((rec, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-200`}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">Engagement</h3>
          </div>
          <p className="text-3xl font-bold mt-4 mb-2">82%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Fan participation</p>
          
          {/* Recommendations */}
          <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
            <h4 className="text-sm font-semibold text-green-500 mb-2">Recommendations:</h4>
            <ul className="text-sm space-y-2">
              {getEngagementRecommendations(82).map((rec, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-200`}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <DollarSign className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold">Revenue</h3>
          </div>
          <p className="text-3xl font-bold mt-4 mb-2">
            {isLoading ? '...' : totalRevenue}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Today's earnings</p>
          
          {/* Recommendations */}
          <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
            <h4 className="text-sm font-semibold text-yellow-500 mb-2">Revenue Optimization:</h4>
            <ul className="text-sm space-y-2">
              {getRevenueRecommendations(0).map((rec, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <TrendingUp className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        
        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-200`}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <Trophy className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold">World Cup Ready</h3>
          </div>
          <p className="text-3xl font-bold mt-4 mb-2">42%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Overall preparedness</p>
          
          {/* Key Areas */}
          <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
            <h4 className="text-sm font-semibold text-purple-500 mb-2">Priority Areas:</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <User className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <span>Staff training (35% complete)</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <AlertTriangle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <span>Emergency protocols (58% ready)</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <ThumbsUp className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <span>Fan experience enhancements</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}