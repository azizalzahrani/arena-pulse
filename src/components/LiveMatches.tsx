import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, TrendingUp, TrendingDown, RefreshCw, ArrowRight, ChevronRight, ChevronLeft, Activity, Castle as Whistle, Timer, Gauge } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';

interface Match {
  id: string;
  homeTeam: {
    name: string;
    logo: string;
    score?: number;
  };
  awayTeam: {
    name: string;
    logo: string;
    score?: number;
  };
  stadium: string;
  date: string;
  time: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed';
  minute?: number;
  attendance?: number;
  capacity?: number;
  stats?: {
    possession: [number, number];
    shots: [number, number];
    shotsOnTarget: [number, number];
    corners: [number, number];
    fouls: [number, number];
  };
}

export function LiveMatches() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [selectedDate, setSelectedDate] = useState<number>(0); // 0 = today, 1 = tomorrow, -1 = yesterday
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  
  // Generate matches based on selected date
  useEffect(() => {
    const generateMatches = () => {
      if (selectedDate === 0) {
        // Today's matches with some in progress
        return [
          {
            id: '1',
            homeTeam: {
              name: 'Al Hilal',
              logo: 'https://upload.wikimedia.org/wikipedia/en/3/3c/Al_Hilal_logo.png',
              score: 2
            },
            awayTeam: {
              name: 'Al Shabab',
              logo: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Al_Shabab_FC_%28Saudi_Arabia%29_logo.png',
              score: 0
            },
            stadium: 'Kingdom Arena',
            date: today,
            time: '19:00',
            status: 'live',
            minute: 67,
            attendance: 48234,
            capacity: 55000,
            stats: {
              possession: [64, 36],
              shots: [12, 5],
              shotsOnTarget: [6, 2],
              corners: [7, 2],
              fouls: [6, 11]
            }
          },
          {
            id: '2',
            homeTeam: {
              name: 'Al Ittihad',
              logo: 'https://upload.wikimedia.org/wikipedia/en/2/2c/Al-Ittihad_Club_logo.png',
              score: 0
            },
            awayTeam: {
              name: 'Al Taawoun',
              logo: 'https://upload.wikimedia.org/wikipedia/en/6/62/AlTaawoun.png',
              score: 0
            },
            stadium: 'King Abdullah Sports City',
            date: today,
            time: '20:15',
            status: 'scheduled'
          },
          {
            id: '3',
            homeTeam: {
              name: 'Al Nassr',
              logo: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Al_Nassr_FC.svg',
              score: 4
            },
            awayTeam: {
              name: 'Al Fayha',
              logo: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Al-Fayha_FC.png',
              score: 1
            },
            stadium: 'Al-Awwal Park',
            date: today,
            time: '17:00',
            status: 'completed',
            attendance: 31256,
            capacity: 35000
          }
        ];
      } else if (selectedDate === 1) {
        // Tomorrow's matches
        return [
          {
            id: '4',
            homeTeam: {
              name: 'Al Ahli',
              logo: 'https://upload.wikimedia.org/wikipedia/en/3/36/AlAhliFC.png'
            },
            awayTeam: {
              name: 'Al Feiha',
              logo: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Al-Fayha_FC.png'
            },
            stadium: 'Prince Abdullah Al-Faisal Stadium',
            date: 'Tomorrow',
            time: '19:00',
            status: 'scheduled'
          },
          {
            id: '5',
            homeTeam: {
              name: 'Al Riyadh',
              logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/Al-Riyadh.png'
            },
            awayTeam: {
              name: 'Al Wehda',
              logo: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Al_Wehda_Club_New_Logo.png'
            },
            stadium: 'Prince Faisal bin Fahd Stadium',
            date: 'Tomorrow',
            time: '20:30',
            status: 'scheduled'
          }
        ];
      } else {
        // Yesterday's matches
        return [
          {
            id: '6',
            homeTeam: {
              name: 'Al Fateh',
              logo: 'https://upload.wikimedia.org/wikipedia/en/2/26/Al-Fateh_SC_Logo.png',
              score: 1
            },
            awayTeam: {
              name: 'Damac',
              logo: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Damac_FC.png',
              score: 1
            },
            stadium: 'Prince Abdullah bin Jalawi Stadium',
            date: 'Yesterday',
            time: '19:00',
            status: 'completed',
            attendance: 9854,
            capacity: 12500
          },
          {
            id: '7',
            homeTeam: {
              name: 'Al Khaleej',
              logo: 'https://upload.wikimedia.org/wikipedia/en/f/f0/Al_Khaleej_Club_Logo.png',
              score: 0
            },
            awayTeam: {
              name: 'Abha',
              logo: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Abha_Club.png',
              score: 2
            },
            stadium: 'Prince Mohamed bin Fahd Stadium',
            date: 'Yesterday',
            time: '18:00',
            status: 'completed',
            attendance: 11250,
            capacity: 22000
          }
        ];
      }
    };
    
    setMatches(generateMatches());
    setSelectedMatch(null);
  }, [selectedDate, today]);

  // Update live match data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prev => prev.map(match => {
        if (match.status === 'live') {
          // Update match time
          let updatedMinute = (match.minute || 0) + 1;
          if (updatedMinute > 90) updatedMinute = 90;
          
          // Randomly update score
          const updateHomeScore = Math.random() > 0.97;
          const updateAwayScore = Math.random() > 0.98;
          
          return {
            ...match,
            minute: updatedMinute,
            homeTeam: {
              ...match.homeTeam,
              score: updateHomeScore ? (match.homeTeam.score || 0) + 1 : match.homeTeam.score
            },
            awayTeam: {
              ...match.awayTeam,
              score: updateAwayScore ? (match.awayTeam.score || 0) + 1 : match.awayTeam.score
            },
            // Update stats
            stats: match.stats ? {
              possession: [match.stats.possession[0] + (Math.random() > 0.8 ? 1 : 0), match.stats.possession[1] - (Math.random() > 0.8 ? 1 : 0)],
              shots: [
                Math.random() > 0.9 ? match.stats.shots[0] + 1 : match.stats.shots[0],
                Math.random() > 0.95 ? match.stats.shots[1] + 1 : match.stats.shots[1]
              ],
              shotsOnTarget: [
                Math.random() > 0.95 ? match.stats.shotsOnTarget[0] + 1 : match.stats.shotsOnTarget[0],
                Math.random() > 0.97 ? match.stats.shotsOnTarget[1] + 1 : match.stats.shotsOnTarget[1]
              ],
              corners: [
                Math.random() > 0.93 ? match.stats.corners[0] + 1 : match.stats.corners[0],
                Math.random() > 0.95 ? match.stats.corners[1] + 1 : match.stats.corners[1]
              ],
              fouls: [
                Math.random() > 0.92 ? match.stats.fouls[0] + 1 : match.stats.fouls[0],
                Math.random() > 0.90 ? match.stats.fouls[1] + 1 : match.stats.fouls[1]
              ]
            } : undefined
          };
        }
        return match;
      }));
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`rounded-xl overflow-hidden border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } shadow-lg`}>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Whistle className="w-5 h-5 text-green-500" />
            <span>Matches</span>
            {matches.some(m => m.status === 'live') && (
              <span className="flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs px-2 py-0.5 rounded-full">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>LIVE</span>
              </span>
            )}
          </h2>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedDate(prev => prev - 1)}
              className={`p-1 rounded-full ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              } transition-colors`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedDate(-1)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedDate === -1
                    ? 'bg-indigo-600 text-white'
                    : isDarkMode
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                }`}
              >
                Yesterday
              </button>
              <button
                onClick={() => setSelectedDate(0)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedDate === 0
                    ? 'bg-indigo-600 text-white'
                    : isDarkMode
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setSelectedDate(1)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedDate === 1
                    ? 'bg-indigo-600 text-white'
                    : isDarkMode
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                }`}
              >
                Tomorrow
              </button>
            </div>
            
            <button 
              onClick={() => setSelectedDate(prev => prev + 1)}
              className={`p-1 rounded-full ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              } transition-colors`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {matches.map(match => (
          <motion.div
            key={match.id}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedMatch(match.id === selectedMatch?.id ? null : match)}
            className={`rounded-xl border overflow-hidden cursor-pointer transition-all ${
              match.id === selectedMatch?.id
                ? isDarkMode
                  ? 'border-indigo-500 bg-gray-700'
                  : 'border-indigo-500 bg-gray-50'
                : isDarkMode
                  ? 'border-gray-700 hover:border-gray-600'
                  : 'border-gray-200 hover:border-gray-300'
            } ${
              match.status === 'live'
                ? 'ring-2 ring-red-500 ring-opacity-50'
                : ''
            }`}
          >
            <div className={`p-4 ${
              match.status === 'live'
                ? 'bg-red-50 dark:bg-red-900/20'
                : match.status === 'completed'
                  ? 'bg-green-50 dark:bg-green-900/20'
                  : 'bg-blue-50 dark:bg-blue-900/20'
            }`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{match.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{match.time}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-center mb-6">
                <div className="text-center flex-1">
                  <img 
                    src={match.homeTeam.logo} 
                    alt={`${match.homeTeam.name} logo`}
                    className="w-14 h-14 mx-auto object-contain"
                  />
                  <h3 className="font-medium mt-2">{match.homeTeam.name}</h3>
                </div>
                
                <div className="mx-6 text-center">
                  {match.status === 'scheduled' ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400">vs</div>
                  ) : (
                    <div className="text-2xl font-bold">
                      {match.homeTeam.score} - {match.awayTeam.score}
                    </div>
                  )}
                  
                  {match.status === 'live' && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span>{match.minute}'</span>
                    </div>
                  )}
                </div>
                
                <div className="text-center flex-1">
                  <img 
                    src={match.awayTeam.logo} 
                    alt={match.awayTeam.name}
                    className="w-14 h-14 mx-auto object-contain"
                  />
                  <h3 className="font-medium mt-2">{match.awayTeam.name}</h3>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{match.stadium}</span>
              </div>
              
              {match.attendance && (
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <Users className="w-4 h-4" />
                  <span>{match.attendance.toLocaleString()} / {match.capacity?.toLocaleString()}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Match Details Panel */}
      <AnimatePresence>
        {selectedMatch && selectedMatch.status !== 'scheduled' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Match Statistics</h3>
                <div className="flex items-center gap-2 text-sm">
                  <RefreshCw className="w-4 h-4 text-indigo-500" />
                  <span className="text-gray-500 dark:text-gray-400">Live updates</span>
                </div>
              </div>
              
              {selectedMatch.stats ? (
                <div className="space-y-4">
                  {/* Possession Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span className="font-medium">{selectedMatch.stats.possession[0]}%</span>
                      <span className="text-gray-500 dark:text-gray-400">Possession</span>
                      <span className="font-medium">{selectedMatch.stats.possession[1]}%</span>
                    </div>
                    <div className="flex h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500" 
                        style={{ width: `${selectedMatch.stats.possession[0]}%` }}
                      ></div>
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${selectedMatch.stats.possession[1]}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Other Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-3 items-center">
                      <div className="text-right font-medium">{selectedMatch.stats.shots[0]}</div>
                      <div className="text-center text-gray-500 dark:text-gray-400">Shots</div>
                      <div className="font-medium">{selectedMatch.stats.shots[1]}</div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <div className="text-right font-medium">{selectedMatch.stats.shotsOnTarget[0]}</div>
                      <div className="text-center text-gray-500 dark:text-gray-400">On Target</div>
                      <div className="font-medium">{selectedMatch.stats.shotsOnTarget[1]}</div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <div className="text-right font-medium">{selectedMatch.stats.corners[0]}</div>
                      <div className="text-center text-gray-500 dark:text-gray-400">Corners</div>
                      <div className="font-medium">{selectedMatch.stats.corners[1]}</div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                      <div className="text-right font-medium">{selectedMatch.stats.fouls[0]}</div>
                      <div className="text-center text-gray-500 dark:text-gray-400">Fouls</div>
                      <div className="font-medium">{selectedMatch.stats.fouls[1]}</div>
                    </div>
                  </div>
                  
                  {/* AI Match Analysis */}
                  <div className={`mt-4 p-4 rounded-lg border ${
                    isDarkMode
                      ? 'border-gray-700 bg-gray-700/50'
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-indigo-500" />
                      AI Match Analysis
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedMatch.homeTeam.name} is dominating possession with {selectedMatch.stats.possession[0]}%. 
                      Their high pressing strategy is effective, winning the ball high up the pitch. 
                      {selectedMatch.awayTeam.name} is struggling to create quality chances despite having {selectedMatch.stats.shots[1]} shots.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                        <Gauge className="w-4 h-4" />
                        <span>Match Intensity: High</span>
                      </div>
                      <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        Full Analysis <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  Match statistics not available
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-center">
        <button className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 text-sm font-medium">
          View All Matches <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}