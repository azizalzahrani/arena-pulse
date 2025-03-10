import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Map as MapIcon, 
  Calendar, 
  Download, 
  RefreshCw, 
  Plus,
  ArrowRight,
  BarChart2,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  PanelLeft,
  PanelRight,
  ChevronDown,
  ChevronUp,
  Activity,
  MapPin,
  Zap,
  ArrowUpRight,
  Building,
  Ticket
} from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';

interface Zone {
  id: string;
  name: string;
  type: 'concession' | 'seating' | 'entry' | 'pathway' | 'restrooms';
  capacity: number;
  currentOccupancy: number;
  congestionLevel: 'low' | 'moderate' | 'high' | 'critical';
  staffCount: number;
  recommendedStaffCount: number;
  recommendations: string[];
}

interface AiRecommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timeRequired: string;
  steps: string[];
}

export function AIStadiumOptimization() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [selectedWeather, setSelectedWeather] = useState('clear');
  const [selectedMatch, setSelectedMatch] = useState('championship');
  const [expectedAttendance, setExpectedAttendance] = useState(42500);
  const [expandedPanel, setExpandedPanel] = useState<string | null>('overview');
  const [activeTime, setActiveTime] = useState<'pregame' | 'during' | 'postgame'>('pregame');
  
  // AI generated zones based on inputs
  const zones: Zone[] = [
    {
      id: 'gate-a',
      name: 'Main Entrance (Gate A)',
      type: 'entry',
      capacity: 5000,
      currentOccupancy: 3750,
      congestionLevel: 'high',
      staffCount: 12,
      recommendedStaffCount: 18,
      recommendations: [
        'Increase security staff to 18 personnel',
        'Open additional entry points',
        'Implement fast-track entry for season ticket holders'
      ]
    },
    {
      id: 'gate-b',
      name: 'North Entrance (Gate B)',
      type: 'entry',
      capacity: 3000,
      currentOccupancy: 1800,
      congestionLevel: 'moderate',
      staffCount: 8,
      recommendedStaffCount: 10,
      recommendations: [
        'Maintain current staffing levels',
        'Monitor queue length for potential increases'
      ]
    },
    {
      id: 'food-court',
      name: 'Main Food Court',
      type: 'concession',
      capacity: 1200,
      currentOccupancy: 1050,
      congestionLevel: 'critical',
      staffCount: 24,
      recommendedStaffCount: 32,
      recommendations: [
        'Increase concession staff immediately',
        'Open mobile concession carts in adjacent areas',
        'Implement express payment systems to reduce transaction time'
      ]
    },
    {
      id: 'west-stand',
      name: 'West Premium Seating',
      type: 'seating',
      capacity: 8000,
      currentOccupancy: 6400,
      congestionLevel: 'moderate',
      staffCount: 15,
      recommendedStaffCount: 15,
      recommendations: [
        'Maintain current staffing levels',
        'Ensure clear pathways to and from concessions'
      ]
    },
    {
      id: 'main-concourse',
      name: 'Main Concourse',
      type: 'pathway',
      capacity: 10000,
      currentOccupancy: 8500,
      congestionLevel: 'high',
      staffCount: 10,
      recommendedStaffCount: 16,
      recommendations: [
        'Add directional staff to improve foot traffic flow',
        'Implement one-way traffic in congested areas',
        'Use digital signage to direct crowds to less congested areas'
      ]
    }
  ];
  
  // AI recommendations based on inputs
  const aiRecommendations: AiRecommendation[] = [
    {
      title: 'Optimize Gate A Entry Flow',
      description: 'Current configuration is causing bottlenecks at Main Entrance. Reconfiguration will improve entry rate by an estimated 35%.',
      impact: 'high',
      timeRequired: '45 minutes',
      steps: [
        'Deploy 6 additional security staff with 3 at each end of the queue',
        'Open 4 additional security lanes',
        'Set up express entry lanes for season ticket holders',
        'Reconfigure queue barriers to create more waiting space'
      ]
    },
    {
      title: 'Food Court Capacity Management',
      description: 'Main Food Court is approaching critical capacity. Implementing these changes will reduce wait times and improve customer satisfaction.',
      impact: 'high',
      timeRequired: '30 minutes',
      steps: [
        'Deploy 8 additional concession staff',
        'Activate 4 mobile concession carts in adjacent areas',
        'Implement tap-to-pay at all registers to speed up transactions',
        'Direct some foot traffic to secondary concession areas'
      ]
    },
    {
      title: 'Weather-Adaptive Staffing',
      description: `Based on ${selectedWeather} weather forecast, adjust staffing and resources to ensure optimal visitor experience.`,
      impact: 'medium',
      timeRequired: '1 hour',
      steps: [
        selectedWeather === 'clear' 
          ? 'Deploy additional water stations throughout the venue'
          : selectedWeather === 'rain'
          ? 'Station staff with umbrellas at key transition points'
          : 'Ensure heating systems are active in all indoor areas',
        'Adjust staffing levels at enclosed vs. open-air areas',
        'Update digital signage with weather-specific directions',
        'Prepare medical staff for weather-related incidents'
      ]
    }
  ];
  
  // Get congestion level style
  const getCongestionStyle = (level: Zone['congestionLevel']) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'moderate':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      case 'high':
        return 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400';
      case 'critical':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
    }
  };
  
  // Get impact style
  const getImpactStyle = (impact: AiRecommendation['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden border shadow-lg ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className={`p-5 ${
        isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            <span>AI Stadium Optimization</span>
          </h2>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center text-indigo-700 dark:text-indigo-400">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="ml-2 text-sm font-medium">Live Optimization</span>
            </div>
            <button className="p-1 rounded-md hover:bg-white/10">
              <RefreshCw className="w-5 h-5 text-indigo-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Simulation Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border ${
            isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Event Type</h3>
            <select
              value={selectedMatch}
              onChange={(e) => setSelectedMatch(e.target.value)}
              className={`w-full p-2 rounded border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="regular">Regular League Match</option>
              <option value="championship">Championship Match</option>
              <option value="international">International Match</option>
              <option value="concert">Concert Event</option>
            </select>
          </div>
          
          <div className={`p-4 rounded-lg border ${
            isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Weather Conditions</h3>
            <select
              value={selectedWeather}
              onChange={(e) => setSelectedWeather(e.target.value)}
              className={`w-full p-2 rounded border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="clear">Clear (28°C)</option>
              <option value="rain">Rain (22°C)</option>
              <option value="cold">Cold (12°C)</option>
              <option value="windy">Windy (20°C)</option>
            </select>
          </div>
          
          <div className={`p-4 rounded-lg border ${
            isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Expected Attendance</h3>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="10000"
                max="55000"
                step="500"
                value={expectedAttendance}
                onChange={(e) => setExpectedAttendance(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="w-16 text-center font-medium">{expectedAttendance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>10,000</span>
              <span>55,000</span>
            </div>
          </div>
        </div>
        
        {/* Time Period Selection */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveTime('pregame')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                activeTime === 'pregame'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Pre-Event (Entry)
            </button>
            <button
              type="button"
              onClick={() => setActiveTime('during')}
              className={`px-4 py-2 text-sm font-medium border-t border-b ${
                activeTime === 'during'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              During Event
            </button>
            <button
              type="button"
              onClick={() => setActiveTime('postgame')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                activeTime === 'postgame'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Post-Event (Exit)
            </button>
          </div>
        </div>
        
        {/* Analysis Panels */}
        <div className="space-y-4">
          {/* Overview Panel */}
          <div className={`border rounded-lg overflow-hidden ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div 
              className={`px-4 py-3 flex items-center justify-between cursor-pointer ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setExpandedPanel(expandedPanel === 'overview' ? null : 'overview')}
            >
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-500" />
                <h3 className="font-medium">Current Stadium Status Overview</h3>
              </div>
              {expandedPanel === 'overview' ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
            
            <AnimatePresence>
              {expandedPanel === 'overview' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <Users className="w-4 h-4" />
                          Current Attendance
                        </div>
                        <div className="text-2xl font-bold">{(expectedAttendance * 0.85).toLocaleString()}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {Math.round((expectedAttendance * 0.85 / 55000) * 100)}% Capacity
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <MapIcon className="w-4 h-4" />
                          Congestion Alerts
                        </div>
                        <div className="text-2xl font-bold text-red-500">3 Critical</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          4 Moderate, 2 High
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <Calendar className="w-4 h-4" />
                          Event Status
                        </div>
                        <div className="text-2xl font-bold">{
                          activeTime === 'pregame' 
                            ? 'Entry Phase' 
                            : activeTime === 'during' 
                            ? 'In Progress'
                            : 'Exit Phase'
                        }</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedMatch === 'championship' ? 'Championship Match' : selectedMatch}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'} mb-4`}>
                      <h4 className="font-medium mb-3">Weather Impact Analysis</h4>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          {selectedWeather === 'clear' ? (
                            <Sun className="w-8 h-8 text-yellow-500" />
                          ) : selectedWeather === 'rain' ? (
                            <Droplets className="w-8 h-8 text-blue-500" />
                          ) : selectedWeather === 'cold' ? (
                            <Thermometer className="w-8 h-8 text-blue-500" />
                          ) : (
                            <Wind className="w-8 h-8 text-gray-500" />
                          )}
                          <div>
                            <div className="font-medium">
                              {selectedWeather === 'clear' 
                                ? 'Clear, 28°C'
                                : selectedWeather === 'rain'
                                ? 'Rain, 22°C'
                                : selectedWeather === 'cold'
                                ? 'Cold, 12°C'
                                : 'Windy, 20°C'
                              }
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Current conditions</div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="text-sm">
                            {selectedWeather === 'clear' 
                              ? 'Hot conditions will increase water and refreshment demand by approximately 35%. Recommend increasing beverage supply and adding water stations.'
                              : selectedWeather === 'rain'
                              ? 'Rain will cause congestion in covered areas. Recommend deploying staff with umbrellas at transition points and installing temporary covered walkways.'
                              : selectedWeather === 'cold'
                              ? 'Cold weather will increase demand for hot beverages by approximately 45%. Recommend increasing hot drink supply and staff.'
                              : 'Windy conditions may affect outer concourse areas. Recommend securing loose items and focusing staff in these areas.'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className={`w-full text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <thead className={`${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                          <tr>
                            <th className="px-4 py-2 text-left">Zone</th>
                            <th className="px-4 py-2 text-left">Type</th>
                            <th className="px-4 py-2 text-center">Occupancy</th>
                            <th className="px-4 py-2 text-center">Congestion</th>
                            <th className="px-4 py-2 text-center">Staff</th>
                            <th className="px-4 py-2 text-center">AI Recommended</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {zones.map((zone) => (
                            <tr key={zone.id} className={`${
                              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                            }`}>
                              <td className="px-4 py-3 font-medium">{zone.name}</td>
                              <td className="px-4 py-3 capitalize">{zone.type}</td>
                              <td className="px-4 py-3 text-center">
                                {zone.currentOccupancy} / {zone.capacity}
                                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-1">
                                  <div 
                                    className={`h-full rounded-full ${
                                      (zone.currentOccupancy / zone.capacity) > 0.9
                                        ? 'bg-red-500'
                                        : (zone.currentOccupancy / zone.capacity) > 0.75
                                        ? 'bg-orange-500'
                                        : (zone.currentOccupancy / zone.capacity) > 0.5
                                        ? 'bg-yellow-500'
                                        : 'bg-green-500'
                                    }`}
                                    style={{ width: `${(zone.currentOccupancy / zone.capacity) * 100}%` }}
                                  ></div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  getCongestionStyle(zone.congestionLevel)
                                }`}>
                                  {zone.congestionLevel}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">{zone.staffCount}</td>
                              <td className="px-4 py-3 text-center">
                                <span className={`font-medium ${
                                  zone.recommendedStaffCount > zone.staffCount
                                    ? 'text-red-500'
                                    : 'text-green-500'
                                }`}>
                                  {zone.recommendedStaffCount}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* AI Recommendations Panel */}
          <div className={`border rounded-lg overflow-hidden ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div 
              className={`px-4 py-3 flex items-center justify-between cursor-pointer ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setExpandedPanel(expandedPanel === 'recommendations' ? null : 'recommendations')}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-500" />
                <h3 className="font-medium">AI Recommendations</h3>
              </div>
              {expandedPanel === 'recommendations' ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
            
            <AnimatePresence>
              {expandedPanel === 'recommendations' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-4">
                    {aiRecommendations.map((recommendation, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border ${
                          isDarkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium">{recommendation.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getImpactStyle(recommendation.impact)
                          }`}>
                            {recommendation.impact} impact
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {recommendation.description}
                        </p>
                        
                        <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Time required: {recommendation.timeRequired}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Implementation Steps:</h5>
                          <ul className="space-y-2">
                            {recommendation.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start gap-2 text-sm">
                                <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                            Implement Now
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <div className={`p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-indigo-500" />
                        <h4 className="font-medium text-indigo-700 dark:text-indigo-400">AI Predictive Analysis</h4>
                      </div>
                      <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-3">
                        Based on current conditions, implementing these recommendations will result in:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                            <ArrowUpRight className="w-4 h-4" />
                            <span>Flow Efficiency</span>
                          </div>
                          <div className="text-xl font-bold mt-1">+32%</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                            <Building className="w-4 h-4" />
                            <span>Resource Utilization</span>
                          </div>
                          <div className="text-xl font-bold mt-1">+28%</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                            <Ticket className="w-4 h-4" />
                            <span>Fan Satisfaction</span>
                          </div>
                          <div className="text-xl font-bold mt-1">+45%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Stadium Map View Panel */}
          <div className={`border rounded-lg overflow-hidden ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div 
              className={`px-4 py-3 flex items-center justify-between cursor-pointer ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setExpandedPanel(expandedPanel === 'map' ? null : 'map')}
            >
              <div className="flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-indigo-500" />
                <h3 className="font-medium">Interactive Stadium Map</h3>
              </div>
              {expandedPanel === 'map' ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
            
            <AnimatePresence>
              {expandedPanel === 'map' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4">
                    <div className="relative h-80 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src="https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1200&q=80" 
                          alt="Stadium Map"
                          className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                          <span className="text-gray-500 dark:text-gray-400">
                            Interactive stadium map visualization <br />
                            (Displaying real-time heat map of crowd density)
                          </span>
                        </div>
                        
                        {/* Example of zone markers */}
                        <div className="absolute left-1/4 top-1/4 w-10 h-10 rounded-full bg-red-500/70 animate-pulse"></div>
                        <div className="absolute right-1/3 top-1/3 w-8 h-8 rounded-full bg-orange-500/70 animate-pulse"></div>
                        <div className="absolute left-1/2 bottom-1/4 w-12 h-12 rounded-full bg-red-500/70 animate-pulse"></div>
                        <div className="absolute right-1/4 bottom-1/3 w-6 h-6 rounded-full bg-yellow-500/70 animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Congestion Legend</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <RefreshCw className="w-4 h-4" />
                        <span>Live updates</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Low (0-50%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Moderate (51-75%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-sm">High (76-90%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Critical (91-100%)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        View Detailed Map <ArrowRight className="w-3 h-3" />
                      </button>
                      <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                        Export Heat Map
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}