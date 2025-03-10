import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Users, DollarSign, TrendingUp, TrendingDown, ArrowRight, Calendar, Clock, Shield, Radius as Stadium, Map, ChevronRight, Filter, ChevronDown, Download, Eye, ThumbsUp, AlertTriangle } from 'lucide-react';
import { useStadiumStore } from '../stores/useStadiumStore';
import { HeatMap } from './HeatMap';
import { AnalyticsCharts } from './AnalyticsCharts';
import { useThemeStore } from '../stores/useThemeStore';

interface ComparisonMetric {
  id: string;
  name: string;
  current: number;
  previous: number;
  unit: string;
  format: (value: number) => string;
  icon: React.ElementType;
  color: string;
}

export function StadiumComparison() {
  const { stadiums, selectedStadium } = useStadiumStore();
  const [comparisonStadiumId, setComparisonStadiumId] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedView, setSelectedView] = useState<'overview' | 'heatmap' | 'traffic' | 'revenue'>('overview');
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const chartRef = useRef<HTMLDivElement>(null);

  // Find comparison stadium object based on selected ID
  const comparisonStadium = stadiums.find(s => s.id === comparisonStadiumId);

  // Set first stadium as comparison by default (if available and not the same as selected)
  useEffect(() => {
    if (stadiums.length > 0 && !comparisonStadiumId) {
      const firstDifferentStadium = stadiums.find(s => s.id !== selectedStadium?.id);
      if (firstDifferentStadium) {
        setComparisonStadiumId(firstDifferentStadium.id);
      }
    }
  }, [stadiums, selectedStadium, comparisonStadiumId]);

  const metrics: ComparisonMetric[] = [
    {
      id: 'attendance',
      name: 'Attendance',
      current: 45231,
      previous: 42150,
      unit: 'visitors',
      format: (value) => value.toLocaleString(),
      icon: Users,
      color: 'blue'
    },
    {
      id: 'occupancy',
      name: 'Occupancy',
      current: 78.5,
      previous: 76.4,
      unit: '%',
      format: (value) => value.toFixed(1) + '%',
      icon: Stadium,
      color: 'indigo'
    },
    {
      id: 'revenue',
      name: 'Revenue',
      current: 847293,
      previous: 805123,
      unit: 'USD',
      format: (value) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value),
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 'satisfaction',
      name: 'Satisfaction',
      current: 92,
      previous: 90.2,
      unit: '%',
      format: (value) => value.toFixed(1) + '%',
      icon: ThumbsUp,
      color: 'amber'
    },
    {
      id: 'wait-time',
      name: 'Avg. Wait Time',
      current: 8.2,
      previous: 12.5,
      unit: 'min',
      format: (value) => value.toFixed(1) + ' min',
      icon: Clock,
      color: 'purple'
    },
    {
      id: 'incidents',
      name: 'Incidents',
      current: 3,
      previous: 5,
      unit: 'count',
      format: (value) => value.toString(),
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const getPercentageChange = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const scrollToCharts = () => {
    chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Helper function to get appropriate background color based on isDarkMode
  const getMetricBgColor = (color: string) => {
    if (isDarkMode) {
      return `bg-${color}-900/20`;
    }
    return `bg-${color}-50`;
  };

  // Helper function to get appropriate text color based on isDarkMode
  const getMetricTextColor = (color: string) => {
    if (isDarkMode) {
      return `text-${color}-400`;
    }
    return `text-${color}-600`;
  };

  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold">Stadium Comparison</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Compare performance metrics across venues
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Stadium Selection */}
          <div className="relative">
            <select
              value={comparisonStadiumId || ''}
              onChange={(e) => setComparisonStadiumId(e.target.value)}
              className={`pl-4 pr-10 py-2 rounded-lg border appearance-none ${
                isDarkMode
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-200 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="" disabled>Select stadium</option>
              {stadiums
                .filter(stadium => stadium.id !== selectedStadium?.id)
                .map((stadium) => (
                  <option key={stadium.id} value={stadium.id}>
                    {stadium.name}
                  </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Time Range Selection */}
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`pl-4 pr-10 py-2 rounded-lg border appearance-none ${
                isDarkMode
                  ? 'border-gray-700 bg-gray-800 text-white'
                  : 'border-gray-200 bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Stadium Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selected Stadium Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-6 overflow-hidden border shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/20`}>
              <Stadium className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {selectedStadium?.name || 'Current Stadium'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Primary</p>
            </div>
          </div>
          
          <div className="relative h-40 mb-6 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1200&q=80"
              alt="Stadium view" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 text-white">
                <Map className="w-4 h-4" />
                <span>{selectedStadium?.city || 'Riyadh'}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {metrics.slice(0, 4).map(metric => (
              <div key={metric.id} className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <metric.icon className={`w-4 h-4 ${getMetricTextColor(metric.color)}`} />
                  <span>{metric.name}</span>
                </div>
                <div className="text-lg font-semibold">
                  {metric.format(metric.current)}
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  getPercentageChange(metric.current, metric.previous) > 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}>
                  {getPercentageChange(metric.current, metric.previous) > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(getPercentageChange(metric.current, metric.previous)).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={scrollToCharts}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Eye className="w-5 h-5" />
            View Detailed Analytics
          </button>
        </motion.div>
        
        {/* Comparison Stadium Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-6 overflow-hidden border shadow-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/20`}>
              <Stadium className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {comparisonStadium?.name || 'Comparison Stadium'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Comparison</p>
            </div>
          </div>
          
          <div className="relative h-40 mb-6 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1577467014381-aa7c13dbf331?auto=format&fit=crop&w=1200&q=80"
              alt="Stadium view" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 text-white">
                <Map className="w-4 h-4" />
                <span>{comparisonStadium?.city || 'Jeddah'}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {metrics.slice(0, 4).map(metric => {
              // Generate slightly different comparison values
              const comparisonValue = metric.current * (0.85 + Math.random() * 0.3);
              const prevComparisonValue = metric.previous * (0.85 + Math.random() * 0.3);
              
              return (
                <div key={metric.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <metric.icon className={`w-4 h-4 ${getMetricTextColor(metric.color)}`} />
                    <span>{metric.name}</span>
                  </div>
                  <div className="text-lg font-semibold">
                    {metric.format(comparisonValue)}
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    getPercentageChange(comparisonValue, prevComparisonValue) > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}>
                    {getPercentageChange(comparisonValue, prevComparisonValue) > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(getPercentageChange(comparisonValue, prevComparisonValue)).toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
          
          <button
            onClick={scrollToCharts}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
          >
            <Eye className="w-5 h-5" />
            View Detailed Analytics
          </button>
        </motion.div>
      </div>

      {/* Metrics Comparison */}
      <div ref={chartRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          // Create realistic comparison value that's somewhat different
          const comparisonValue = metric.current * (0.85 + Math.random() * 0.3);
          const percentDiff = ((metric.current - comparisonValue) / comparisonValue) * 100;
          const isPositive = percentDiff > 0;
          
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${getMetricBgColor(metric.color)}`}>
                  <metric.icon className={`w-5 h-5 ${getMetricTextColor(metric.color)}`} />
                </div>
                <h3 className="font-semibold">{metric.name}</h3>
              </div>
              
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Primary</p>
                  <p className="text-2xl font-bold">{metric.format(metric.current)}</p>
                </div>
                
                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700">
                  {isPositive ? (
                    <>
                      <ArrowRight className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">+{Math.abs(percentDiff).toFixed(1)}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-4 h-4 text-red-500" />
                      <span className="text-red-500">-{Math.abs(percentDiff).toFixed(1)}%</span>
                    </>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Comparison</p>
                  <p className="text-2xl font-bold">{metric.format(comparisonValue)}</p>
                </div>
              </div>
              
              {/* Visualization Bar */}
              <div className="relative h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <div className={`absolute inset-y-0 left-0 ${
                  isPositive ? 'bg-green-500' : 'bg-red-500'
                } rounded-lg`} style={{ 
                  width: `${50 + (percentDiff * 0.5)}%`,
                  maxWidth: '100%',
                  minWidth: '5%'
                }}>
                  <div className="h-full flex items-center justify-end px-3">
                    <span className="text-xs font-medium text-white">{selectedStadium?.name || 'Current'}</span>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0.5 h-full bg-gray-500/30"></div>
                </div>
                
                <div className="absolute inset-y-0 right-0 flex items-center px-3">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {comparisonStadium?.name || 'Comparison'}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Analytics */}
      <div className={`mt-8 rounded-xl p-6 border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Detailed Comparison</h3>
          <div className="flex items-center gap-4">
            <div className="flex">
              <button
                onClick={() => setSelectedView('overview')}
                className={`px-4 py-2 first:rounded-l-lg last:rounded-r-lg transition-colors ${
                  selectedView === 'overview'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedView('heatmap')}
                className={`px-4 py-2 first:rounded-l-lg last:rounded-r-lg transition-colors ${
                  selectedView === 'heatmap'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Users className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedView('revenue')}
                className={`px-4 py-2 first:rounded-l-lg last:rounded-r-lg transition-colors ${
                  selectedView === 'revenue'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <DollarSign className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className={`pl-4 pr-10 py-2 rounded-lg border appearance-none ${
                  isDarkMode
                    ? 'border-gray-700 bg-gray-700 text-white'
                    : 'border-gray-200 bg-gray-100 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {selectedView === 'overview' && (
            <div className="p-4">
              <AnalyticsCharts timeRange={timeRange} />
            </div>
          )}

          {selectedView === 'heatmap' && (
            <div className="aspect-[16/9] max-h-[500px]">
              <HeatMap width={800} height={450} />
            </div>
          )}

          {selectedView === 'revenue' && (
            <div className="p-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Total Revenue
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold">{selectedStadium?.name || 'Current'}</div>
                    <div className="text-2xl font-bold">$847,293</div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-xl font-bold">{comparisonStadium?.name || 'Comparison'}</div>
                    <div className="text-2xl font-bold">$721,150</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-500 mt-4 justify-end">
                    <TrendingUp className="w-4 h-4" />
                    17.5% difference
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Average Transaction
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold">{selectedStadium?.name || 'Current'}</div>
                    <div className="text-2xl font-bold">$42.50</div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-xl font-bold">{comparisonStadium?.name || 'Comparison'}</div>
                    <div className="text-2xl font-bold">$38.75</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-500 mt-4 justify-end">
                    <TrendingUp className="w-4 h-4" />
                    9.7% difference
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Conversion Rate
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold">{selectedStadium?.name || 'Current'}</div>
                    <div className="text-2xl font-bold">32.5%</div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-xl font-bold">{comparisonStadium?.name || 'Comparison'}</div>
                    <div className="text-2xl font-bold">29.8%</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-500 mt-4 justify-end">
                    <TrendingUp className="w-4 h-4" />
                    9.1% difference
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Tickets', primaryAmount: 523450, comparisonAmount: 450200 },
                    { name: 'Concessions', primaryAmount: 187234, comparisonAmount: 156780 },
                    { name: 'Merchandise', primaryAmount: 98234, comparisonAmount: 82570 },
                    { name: 'Parking', primaryAmount: 38375, comparisonAmount: 31600 }
                  ].map((category) => {
                    const primaryPercentage = (category.primaryAmount / 847293) * 100;
                    const comparisonPercentage = (category.comparisonAmount / 721150) * 100;
                    const difference = ((category.primaryAmount - category.comparisonAmount) / category.comparisonAmount) * 100;
                    
                    return (
                      <div key={category.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-lg">{category.name}</h4>
                          <div className={`flex items-center gap-1 text-sm ${
                            difference > 0 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {difference > 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            {Math.abs(difference).toFixed(1)}% difference
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>{selectedStadium?.name || 'Current'}</span>
                              <span className="font-medium">
                                {new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                  maximumFractionDigits: 0
                                }).format(category.primaryAmount)}
                                {' '}
                                ({primaryPercentage.toFixed(1)}%)
                              </span>
                            </div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-600 rounded-full"
                                style={{ width: `${primaryPercentage}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>{comparisonStadium?.name || 'Comparison'}</span>
                              <span className="font-medium">
                                {new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                  maximumFractionDigits: 0
                                }).format(category.comparisonAmount)}
                                