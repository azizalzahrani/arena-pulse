import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, AlertTriangle, TrendingUp, TrendingDown, Calendar, Clock, Thermometer, Droplets, Activity, Globe, Trophy } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';

interface Stadium {
  id: string;
  name: string;
  city: string;
  capacity: number;
  currentOccupancy: number;
  temperature: number;
  humidity: number;
  matches: {
    upcoming: number;
    completed: number;
  };
  alerts: number;
  status: 'operational' | 'maintenance' | 'event-active';
  constructionProgress?: number;
  image: string;
}

export function WorldCupStadiums() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [stadiums, setStadiums] = useState<Stadium[]>([
    {
      id: 'king-fahd',
      name: 'King Fahd International Stadium',
      city: 'Riyadh',
      capacity: 68752,
      currentOccupancy: 56234,
      temperature: 28.4,
      humidity: 45,
      matches: {
        upcoming: 3,
        completed: 1
      },
      alerts: 0,
      status: 'operational',
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'king-abdullah',
      name: 'King Abdullah Sports City',
      city: 'Jeddah',
      capacity: 62345,
      currentOccupancy: 58234,
      temperature: 31.2,
      humidity: 62,
      matches: {
        upcoming: 4,
        completed: 0
      },
      alerts: 2,
      status: 'event-active',
      image: 'https://images.unsplash.com/photo-1577467014381-aa7c13dbf331?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'prince-mohamed',
      name: 'Prince Mohamed bin Fahd Stadium',
      city: 'Dammam',
      capacity: 45000,
      currentOccupancy: 0,
      temperature: 30.5,
      humidity: 58,
      matches: {
        upcoming: 2,
        completed: 0
      },
      alerts: 1,
      status: 'maintenance',
      constructionProgress: 85,
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'al-faisal',
      name: 'Abdullah Al-Faisal Stadium',
      city: 'Jeddah',
      capacity: 38000,
      currentOccupancy: 12590,
      temperature: 32.1,
      humidity: 60,
      matches: {
        upcoming: 2,
        completed: 0
      },
      alerts: 0,
      status: 'operational',
      image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'ksu-stadium',
      name: 'King Saud University Stadium',
      city: 'Riyadh',
      capacity: 25000,
      currentOccupancy: 18456,
      temperature: 27.8,
      humidity: 42,
      matches: {
        upcoming: 3,
        completed: 0
      },
      alerts: 0,
      status: 'operational',
      image: 'https://images.unsplash.com/photo-1577467014381-aa7c13dbf331?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'prince-sultan',
      name: 'Prince Sultan bin Abdul Aziz Stadium',
      city: 'Abha',
      capacity: 35000,
      currentOccupancy: 0,
      temperature: 24.6,
      humidity: 35,
      matches: {
        upcoming: 2,
        completed: 0
      },
      alerts: 3,
      status: 'maintenance',
      constructionProgress: 72,
      image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1200&q=80'
    }
  ]);

  // Simulate real-time updates to stadium data
  useEffect(() => {
    const interval = setInterval(() => {
      setStadiums(prevStadiums => {
        return prevStadiums.map(stadium => {
          // Only update operational or event-active stadiums
          if (stadium.status !== 'maintenance') {
            const occupancyChange = Math.floor(Math.random() * 1000) - 500;
            const tempChange = (Math.random() * 0.6) - 0.3;
            const humidityChange = Math.floor(Math.random() * 5) - 2;
            
            return {
              ...stadium,
              currentOccupancy: Math.max(0, Math.min(stadium.capacity, stadium.currentOccupancy + occupancyChange)),
              temperature: parseFloat((stadium.temperature + tempChange).toFixed(1)),
              humidity: Math.max(20, Math.min(90, stadium.humidity + humidityChange)),
              alerts: Math.random() > 0.95 ? stadium.alerts + 1 : stadium.alerts
            };
          } else {
            // For maintenance stadiums, only update construction progress
            const progressChange = Math.random() > 0.7 ? 0.5 : 0;
            
            return {
              ...stadium,
              constructionProgress: stadium.constructionProgress && 
                Math.min(99, stadium.constructionProgress + progressChange)
            };
          }
        });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: Stadium['status']) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'maintenance':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      case 'event-active':
        return 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400';
    }
  };

  const getStatusText = (status: Stadium['status']) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'maintenance':
        return 'Under Maintenance';
      case 'event-active':
        return 'Event Active';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            World Cup 2034 Stadiums
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-medium text-indigo-400">Saudi Arabia</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stadiums.map((stadium) => (
          <motion.div
            key={stadium.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl overflow-hidden border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } shadow-lg`}
          >
            <div className="relative h-48">
              <img 
                src={stadium.image}
                alt={stadium.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{stadium.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <MapPin className="w-4 h-4" />
                      <span>{stadium.city}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(stadium.status)}`}>
                    {getStatusText(stadium.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {stadium.status === 'maintenance' ? (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Construction Progress</span>
                    <span className="text-sm font-semibold">{stadium.constructionProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500 rounded-full" 
                      style={{ width: `${stadium.constructionProgress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>Capacity</span>
                    </div>
                    <div className="text-lg font-semibold">
                      {stadium.currentOccupancy.toLocaleString()} / {stadium.capacity.toLocaleString()}
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
                      <div 
                        className={`h-full ${
                          (stadium.currentOccupancy / stadium.capacity) > 0.8 
                            ? 'bg-red-500' 
                            : (stadium.currentOccupancy / stadium.capacity) > 0.6
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        } rounded-full`}
                        style={{ width: `${(stadium.currentOccupancy / stadium.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Matches</span>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <span className={`px-2 py-1 rounded text-xs ${
                        isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {stadium.matches.completed} Completed
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        isDarkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {stadium.matches.upcoming} Upcoming
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 grid grid-cols-3 gap-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span className="text-sm">{stadium.temperature}°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{stadium.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  {stadium.alerts > 0 ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">{stadium.alerts} Alerts</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500">Normal</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}