import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Car, AlertTriangle, ArrowUp, ArrowDown, Clock, TrendingUp, TrendingDown, AlertCircle, Filter, Download, Activity, Thermometer, Droplets } from 'lucide-react';
import { useStadiumStore } from '../stores/useStadiumStore';
import { HeatMap } from './HeatMap';

interface StadiumStats {
  id: string;
  name: string;
  currentOccupancy: number;
  totalCapacity: number;
  parkingOccupancy: number;
  parkingCapacity: number;
  entryRate: number;
  exitRate: number;
  alerts: number;
}

interface Suggestion {
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  priority: 'high' | 'medium' | 'low';
  actions: string[];
}

interface Zone {
  id: string;
  name: string;
  density: number;
  capacity: number;
  currentOccupancy: number;
  flowRate: number;
  trend: 'up' | 'down' | 'stable';
  alerts: Array<{
    type: 'warning' | 'critical';
    message: string;
  }>;
  lastUpdate: Date;
  temperature: number;
  humidity: number;
}

export function StadiumOverview() {
  const { stadiums, selectedStadium, selectStadium } = useStadiumStore();
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [stats, setStats] = useState<StadiumStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState<Record<string, number>>({});
  const [suggestionTimers, setSuggestionTimers] = useState<Record<string, NodeJS.Timeout>>({});
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [zones, setZones] = useState<Record<string, Zone>>(() => ({
    'main-entrance': {
      id: 'main-entrance',
      name: 'Main Entrance',
      density: 65,
      capacity: 1000,
      currentOccupancy: 650,
      flowRate: 120,
      trend: 'up',
      temperature: 23.5,
      humidity: 45,
      alerts: [],
      lastUpdate: new Date()
    },
    'north-stands': {
      id: 'north-stands',
      name: 'North Stands',
      density: 85,
      capacity: 15000,
      currentOccupancy: 12750,
      flowRate: 50,
      trend: 'stable',
      temperature: 24.2,
      humidity: 48,
      alerts: [
        { type: 'warning', message: 'High density detected' }
      ],
      lastUpdate: new Date()
    },
    'vip-section': {
      id: 'vip-section',
      name: 'VIP Section',
      density: 45,
      capacity: 500,
      currentOccupancy: 225,
      flowRate: 15,
      trend: 'up',
      temperature: 22.8,
      humidity: 42,
      alerts: [],
      lastUpdate: new Date()
    },
    'concessions': {
      id: 'concessions',
      name: 'Concessions',
      density: 92,
      capacity: 800,
      currentOccupancy: 736,
      flowRate: 85,
      trend: 'up',
      temperature: 25.1,
      humidity: 52,
      alerts: [
        { type: 'critical', message: 'Critical density - Consider flow control' }
      ],
      lastUpdate: new Date()
    },
    'south-stands': {
      id: 'south-stands',
      name: 'South Stands',
      density: 78,
      capacity: 15000,
      currentOccupancy: 11700,
      flowRate: 45,
      trend: 'down',
      temperature: 24.5,
      humidity: 47,
      alerts: [],
      lastUpdate: new Date()
    }
  }));

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          currentOccupancy: Math.min(
            stat.totalCapacity,
            stat.currentOccupancy + Math.floor(Math.random() * 21) - 10
          ),
          parkingOccupancy: Math.min(
            stat.parkingCapacity,
            stat.parkingOccupancy + Math.floor(Math.random() * 11) - 5
          ),
          entryRate: Math.max(0, Math.floor(Math.random() * 50)),
          exitRate: Math.max(0, Math.floor(Math.random() * 40)),
          alerts: Math.floor(Math.random() * 3)
        }))
      );
    }, 5000);

    // Initialize stats with stadium data
    setStats(stadiums.map(stadium => ({
      id: stadium.id,
      name: stadium.name,
      currentOccupancy: Math.floor(stadium.total_capacity * 0.6),
      totalCapacity: stadium.total_capacity,
      parkingOccupancy: Math.floor(stadium.parking_capacity * 0.7),
      parkingCapacity: stadium.parking_capacity,
      entryRate: Math.floor(Math.random() * 50),
      exitRate: Math.floor(Math.random() * 40),
      alerts: Math.floor(Math.random() * 3)
    })));

    setIsLoading(false);

    return () => clearInterval(interval);
  }, [stadiums]);

  // Simulate real-time updates for zones
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prevZones => {
        const newZones = { ...prevZones };
        Object.keys(newZones).forEach(id => {
          const zone = newZones[id];
          // Random fluctuation in density
          const densityChange = Math.random() * 6 - 3;
          zone.density = Math.max(0, Math.min(100, zone.density + densityChange));
          zone.currentOccupancy = Math.round(zone.capacity * (zone.density / 100));
          
          // Update trend
          if (densityChange > 1) zone.trend = 'up';
          else if (densityChange < -1) zone.trend = 'down';
          else zone.trend = 'stable';

          // Update alerts
          zone.alerts = [];
          if (zone.density >= 90) {
            zone.alerts.push({ type: 'critical', message: 'Critical density - Immediate action required' });
          } else if (zone.density >= 75) {
            zone.alerts.push({ type: 'warning', message: 'High density warning' });
          }

          // Update environmental data
          zone.temperature += (Math.random() * 0.4 - 0.2);
          zone.humidity += (Math.random() * 2 - 1);
          zone.humidity = Math.max(30, Math.min(70, zone.humidity));
          
          zone.lastUpdate = new Date();
        });
        return newZones;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const rotateSuggestions = () => {
      setCurrentSuggestionIndex(prevIndexes => {
        const newIndexes = { ...prevIndexes };
        stats.forEach(stat => {
          const suggestions = getSuggestions(stat);
          if (suggestions.length > 0) {
            // Only rotate if there are no high-priority suggestions
            const currentSuggestion = suggestions[newIndexes[stat.id] || 0];
            if (!currentSuggestion || currentSuggestion.priority !== 'high') {
              newIndexes[stat.id] = ((newIndexes[stat.id] || 0) + 1) % suggestions.length;
            }
          }
        });
        return newIndexes;
      });
    };

    // Clear existing timers
    Object.values(suggestionTimers).forEach(timer => clearTimeout(timer));

    // Set up new timers for high-priority suggestions
    const newTimers: Record<string, NodeJS.Timeout> = {};
    stats.forEach(stat => {
      const suggestions = getSuggestions(stat);
      const currentIndex = currentSuggestionIndex[stat.id] || 0;
      const currentSuggestion = suggestions[currentIndex];

      if (currentSuggestion?.priority === 'high') {
        newTimers[stat.id] = setTimeout(() => {
          setCurrentSuggestionIndex(prev => ({
            ...prev,
            [stat.id]: (currentIndex + 1) % suggestions.length
          }));
        }, 30000); // 30 seconds for high-priority suggestions
      }
    });

    setSuggestionTimers(newTimers);

    // Regular rotation interval for non-high-priority suggestions
    const interval = setInterval(rotateSuggestions, 5000);

    return () => {
      clearInterval(interval);
      Object.values(newTimers).forEach(timer => clearTimeout(timer));
    };
  }, [stats, currentSuggestionIndex]);

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 80) return 'text-red-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getOccupancyBg = (percentage: number) => {
    if (percentage >= 80) return 'bg-red-100 dark:bg-red-900/20';
    if (percentage >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-green-100 dark:bg-green-900/20';
  };

  const getMetricIcon = (id: string) => {
    switch (id) {
      case 'occupancy':
        return Users;
      case 'parking':
        return Car;
      case 'entry':
        return TrendingUp;
      case 'exit':
        return TrendingDown;
      default:
        return AlertCircle;
    }
  };

  const getSuggestions = (stat: StadiumStats): Suggestion[] => {
    const suggestions: Suggestion[] = [];
    const occupancyPercentage = (stat.currentOccupancy / stat.totalCapacity) * 100;
    const parkingPercentage = (stat.parkingOccupancy / stat.parkingCapacity) * 100;

    // Entry/Exit Flow Suggestions
    if (stat.entryRate > 40) {
      suggestions.push({
        title: 'High Entry Rate Detected',
        description: 'Current entry rate may cause congestion',
        impact: 'negative',
        priority: 'high',
        actions: [
          'Open additional entry gates',
          'Deploy more security personnel',
          'Activate digital signage for crowd guidance',
          'Enable express entry lanes'
        ]
      });
    }

    if (stat.exitRate > 35) {
      suggestions.push({
        title: 'High Exit Flow Management',
        description: 'Optimize exit flow to prevent bottlenecks',
        impact: 'negative',
        priority: 'high',
        actions: [
          'Open emergency exits for regular use',
          'Direct crowds to alternative exits',
          'Increase staff at exit points',
          'Stagger exit times by sections'
        ]
      });
    }

    // Occupancy-based Suggestions
    if (occupancyPercentage > 75) {
      suggestions.push({
        title: 'High Occupancy Alert',
        description: 'Stadium approaching capacity limits',
        impact: 'negative',
        priority: 'high',
        actions: [
          'Restrict additional entry temporarily',
          'Monitor emergency exits',
          'Alert emergency services',
          'Prepare overflow areas'
        ]
      });
    }

    // Parking Management
    if (parkingPercentage > 80) {
      suggestions.push({
        title: 'Parking Capacity Critical',
        description: 'Parking facilities near capacity',
        impact: 'negative',
        priority: 'high',
        actions: [
          'Direct vehicles to overflow parking',
          'Update digital signs with alternative parking',
          'Notify incoming traffic via app',
          'Deploy parking attendants'
        ]
      });
    }

    // Flow Optimization
    if (stat.entryRate < 20 && occupancyPercentage < 50) {
      suggestions.push({
        title: 'Low Attendance Optimization',
        description: 'Improve entry flow and attendance',
        impact: 'neutral',
        priority: 'medium',
        actions: [
          'Review ticket scanning efficiency',
          'Check for entry bottlenecks',
          'Analyze historical patterns',
          'Consider promotional activities'
        ]
      });
    }

    return suggestions;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening today
          </p>
        </div>
        <div className="flex items-center gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.values(zones).map((zone) => (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border ${
              zone.density >= 90
                ? 'border-red-200 dark:border-red-800'
                : zone.density >= 75
                ? 'border-yellow-200 dark:border-yellow-800'
                : 'border-green-200 dark:border-green-800'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{zone.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{zone.currentOccupancy.toLocaleString()} / {zone.capacity.toLocaleString()}</span>
                </div>
              </div>
              {zone.alerts.length > 0 && (
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  zone.alerts.some(a => a.type === 'critical')
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/20'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20'
                }`}>
                  {zone.alerts.length} {zone.alerts.length === 1 ? 'Alert' : 'Alerts'}
                </div>
              )}
            </div>

            {/* Density Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Density</span>
                <span className={`text-lg font-bold ${
                  zone.density >= 90
                    ? 'text-red-600 dark:text-red-400'
                    : zone.density >= 75
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  {Math.round(zone.density)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    zone.density >= 90
                      ? 'bg-red-500'
                      : zone.density >= 75
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${zone.density}%` }}
                />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Flow Rate</div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-500" />
                  <span className="font-semibold">{zone.flowRate}/min</span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Trend</div>
                <div className="flex items-center gap-2">
                  {zone.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : zone.trend === 'down' ? (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  ) : (
                    <Activity className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="font-semibold capitalize">{zone.trend}</span>
                </div>
              </div>
            </div>

            {/* Environmental Data */}
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span>{zone.temperature.toFixed(1)}°C</span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>{Math.round(zone.humidity)}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{new Date(zone.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            {zone.alerts.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="space-y-2">
                  {zone.alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 ${
                        alert.type === 'critical'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/20'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>{alert.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="xl:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Zone Distribution</h3>
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
          <div className="h-[500px] w-full">
            <HeatMap width={800} height={500} />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedStadium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Suggestions</h3>
              {getSuggestions(stats.find(s => s.id === selectedStadium.id)!).map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    suggestion.impact === 'negative'
                      ? 'bg-red-50 dark:bg-red-900/20'
                      : suggestion.impact === 'positive'
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-blue-50 dark:bg-blue-900/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{suggestion.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      suggestion.priority === 'high'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/40'
                        : suggestion.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40'
                    }`}>
                      {suggestion.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {suggestion.description}
                  </p>
                  <div className="space-y-1">
                    {suggestion.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center gap-2 text-sm">
                        <ArrowUp className="w-4 h-4" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}