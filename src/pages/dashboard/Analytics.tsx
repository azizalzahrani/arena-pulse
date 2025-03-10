import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdvancedAnalytics } from '../../components/AdvancedAnalytics';
import { AnalyticsCharts } from '../../components/AnalyticsCharts';
import { Filter, Download, TrendingUp, TrendingDown, Users, DollarSign, Clock, Activity, AlertTriangle } from 'lucide-react';
import * as d3 from 'd3';

interface AnalyticMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  color: string;
}

interface ZoneMetric {
  id: string;
  name: string;
  occupancy: number;
  revenue: number;
  satisfaction: number;
  alerts: number;
}

export function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [metrics, setMetrics] = useState<AnalyticMetric[]>([]);
  const [zoneMetrics, setZoneMetrics] = useState<ZoneMetric[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate realistic metrics data
  useEffect(() => {
    const generateMetrics = () => {
      const newMetrics: AnalyticMetric[] = [
        {
          id: 'total-attendance',
          name: 'Total Attendance',
          value: Math.floor(45000 + Math.random() * 5000),
          previousValue: 44500,
          change: 3.2,
          trend: 'up',
          unit: 'visitors',
          color: 'indigo'
        },
        {
          id: 'avg-occupancy',
          name: 'Average Occupancy',
          value: Math.floor(75 + Math.random() * 10),
          previousValue: 72,
          change: 4.1,
          trend: 'up',
          unit: '%',
          color: 'blue'
        },
        {
          id: 'revenue',
          name: 'Total Revenue',
          value: Math.floor(850000 + Math.random() * 50000),
          previousValue: 820000,
          change: 3.7,
          trend: 'up',
          unit: 'USD',
          color: 'green'
        },
        {
          id: 'satisfaction',
          name: 'Fan Satisfaction',
          value: Math.floor(92 + Math.random() * 3),
          previousValue: 91,
          change: 1.1,
          trend: 'up',
          unit: '%',
          color: 'yellow'
        }
      ];

      setMetrics(newMetrics);
    };

    const generateZoneMetrics = () => {
      const zones = [
        'Main Entrance',
        'North Stands',
        'South Stands',
        'VIP Section',
        'Concessions'
      ];

      const newZoneMetrics = zones.map((zone, index) => ({
        id: `zone-${index}`,
        name: zone,
        occupancy: Math.floor(60 + Math.random() * 30),
        revenue: Math.floor(50000 + Math.random() * 30000),
        satisfaction: Math.floor(85 + Math.random() * 10),
        alerts: Math.floor(Math.random() * 3)
      }));

      setZoneMetrics(newZoneMetrics);
    };

    generateMetrics();
    generateZoneMetrics();
    setIsLoading(false);

    // Update metrics every 30 seconds
    const interval = setInterval(() => {
      generateMetrics();
      generateZoneMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getMetricIcon = (metricId: string) => {
    switch (metricId) {
      case 'total-attendance':
        return Users;
      case 'avg-occupancy':
        return Activity;
      case 'revenue':
        return DollarSign;
      case 'satisfaction':
        return TrendingUp;
      default:
        return Activity;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Real-time insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = getMetricIcon(metric.id);
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 ${
                selectedMetric === metric.id ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-${metric.color}-50 dark:bg-${metric.color}-900/20`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                </div>
                <span className={`flex items-center gap-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {metric.change}%
                </span>
              </div>
              <h3 className="text-lg font-semibold mt-4">{metric.name}</h3>
              <div className="mt-2">
                <span className="text-2xl font-bold">
                  {metric.id === 'revenue' 
                    ? new Intl.NumberFormat('en-US', { 
                        style: 'currency', 
                        currency: 'USD',
                        maximumFractionDigits: 0 
                      }).format(metric.value)
                    : metric.value.toLocaleString()
                  }
                  {metric.unit !== 'USD' && ` ${metric.unit}`}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Advanced Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AdvancedAnalytics />
      </motion.div>

      {/* Zone Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4">Zone Performance</h3>
          <div className="space-y-4">
            {zoneMetrics.map((zone) => (
              <div
                key={zone.id}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{zone.name}</h4>
                  {zone.alerts > 0 && (
                    <span className="flex items-center gap-1 text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      {zone.alerts} {zone.alerts === 1 ? 'Alert' : 'Alerts'}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Occupancy</p>
                    <p className="text-lg font-semibold">{zone.occupancy}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                    <p className="text-lg font-semibold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0
                      }).format(zone.revenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Satisfaction</p>
                    <p className="text-lg font-semibold">{zone.satisfaction}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4">Real-time Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span>Peak Hours Analysis</span>
              </div>
              <span className="text-sm text-gray-500">Updated live</span>
            </div>
            <div className="h-64">
              <AnalyticsCharts timeRange={timeRange} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Predictive Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Predictive Analytics</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            AI-powered predictions
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
            <h4 className="font-medium text-green-700 dark:text-green-400">Expected Peak Time</h4>
            <p className="text-2xl font-bold mt-2">18:30 - 19:30</p>
            <p className="text-sm text-green-600 mt-1">85% confidence</p>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <h4 className="font-medium text-blue-700 dark:text-blue-400">Projected Attendance</h4>
            <p className="text-2xl font-bold mt-2">52,450</p>
            <p className="text-sm text-blue-600 mt-1">+12% vs last week</p>
          </div>
          <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <h4 className="font-medium text-purple-700 dark:text-purple-400">Revenue Forecast</h4>
            <p className="text-2xl font-bold mt-2">$985,000</p>
            <p className="text-sm text-purple-600 mt-1">+8% vs target</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}