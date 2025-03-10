import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flag, Calendar, MapPin, Users, BarChart2, Clock, Activity, ArrowRight } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';

export function WorldCupOverview() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [days, setDays] = useState(3392); // Days until World Cup 2034 (approximate)
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: '1',
      title: 'Stadium Expansion - King Fahd International Stadium',
      date: 'Mar 15, 2025',
      location: 'Riyadh',
      type: 'construction'
    },
    {
      id: '2',
      title: 'Infrastructure Review Meeting',
      date: 'Mar 22, 2025',
      location: 'Jeddah',
      type: 'meeting'
    },
    {
      id: '3',
      title: 'Test Event - Abdullah Al-Faisal Stadium',
      date: 'Apr 5, 2025',
      location: 'Jeddah',
      type: 'event'
    }
  ]);
  
  const [metrics, setMetrics] = useState({
    stadiumsReady: 4,
    stadiumsTotal: 12,
    infrastructureProgress: 42,
    totalBudget: 300,
    budgetSpent: 78,
    visitorEstimate: 2.4,
    economicImpact: 17.5
  });

  // Simulate decreasing days counter
  useEffect(() => {
    const timer = setTimeout(() => {
      setDays(prev => Math.max(0, prev - 1));
    }, 86400000); // 24 hours in milliseconds
    
    return () => clearTimeout(timer);
  }, [days]);

  // Format time remaining
  const formatTimeRemaining = () => {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;
    
    return `${years}y ${months}m ${remainingDays}d`;
  };

  return (
    <div className={`rounded-xl overflow-hidden border shadow-lg ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-300" />
            <div>
              <h2 className="text-xl font-bold text-white">FIFA World Cup 2034™</h2>
              <p className="text-green-100">Saudi Arabia</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="text-xs text-white/80">Time Remaining</div>
            <div className="text-xl font-bold text-white">{formatTimeRemaining()}</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-sm text-gray-500 dark:text-gray-400">Stadiums Ready</div>
            <div className="text-2xl font-bold mt-1">{metrics.stadiumsReady}/{metrics.stadiumsTotal}</div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${(metrics.stadiumsReady / metrics.stadiumsTotal) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-sm text-gray-500 dark:text-gray-400">Infrastructure</div>
            <div className="text-2xl font-bold mt-1">{metrics.infrastructureProgress}%</div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${metrics.infrastructureProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-sm text-gray-500 dark:text-gray-400">Budget (Billion $)</div>
            <div className="text-2xl font-bold mt-1">${metrics.budgetSpent}B / ${metrics.totalBudget}B</div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
              <div 
                className="h-full bg-purple-500 rounded-full" 
                style={{ width: `${(metrics.budgetSpent / metrics.totalBudget) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-sm text-gray-500 dark:text-gray-400">Est. Visitors</div>
            <div className="text-2xl font-bold mt-1">{metrics.visitorEstimate}M</div>
            <div className="text-xs text-green-500 mt-1">
              ${metrics.economicImpact}B economic impact
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Upcoming Events</h3>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <motion.div 
                key={event.id}
                whileHover={{ x: 5 }}
                className={`p-3 rounded-lg border flex items-center gap-3 ${
                  isDarkMode 
                    ? 'border-gray-700 hover:bg-gray-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                } cursor-pointer transition-colors`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  event.type === 'construction' 
                    ? 'bg-yellow-100 dark:bg-yellow-900/30'
                    : event.type === 'meeting'
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'bg-green-100 dark:bg-green-900/30'
                }`}>
                  {event.type === 'construction' ? (
                    <Users className={`w-5 h-5 ${
                      isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                    }`} />
                  ) : event.type === 'meeting' ? (
                    <Calendar className={`w-5 h-5 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  ) : (
                    <Activity className={`w-5 h-5 ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{event.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}