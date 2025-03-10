import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  User, 
  Tag, 
  Calendar, 
  Filter, 
  ChevronDown,
  Flag,
  Search,
  Shirt,
  Heart,
  Star,
  Shield,
  AlertTriangle,
  Activity,
  BarChart3,
  ArrowRight,
  X,
  Check
} from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';

interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  nationality: string;
  age: number;
  fitness: number;
  injury?: {
    type: string;
    returnDate: string;
  };
  form: number;
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
  };
}

interface Team {
  id: string;
  name: string;
  logo: string;
  league: string;
  manager: string;
  primaryColor: string;
  secondaryColor: string;
  stadium: string;
  capacity: number;
  founded: number;
  players: Player[];
}

export function TeamManagement() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [selectedTeam, setSelectedTeam] = useState('al-hilal');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRostCard, setShowRostCard] = useState(false);
  
  // Team data
  const teams: Record<string, Team> = {
    'al-hilal': {
      id: 'al-hilal',
      name: 'Al Hilal',
      logo: 'https://upload.wikimedia.org/wikipedia/en/3/3c/Al_Hilal_logo.png',
      league: 'Saudi Professional League',
      manager: 'Jorge Jesus',
      primaryColor: '#0a3dad',
      secondaryColor: '#ffffff',
      stadium: 'Kingdom Arena',
      capacity: 55000,
      founded: 1957,
      players: [
        {
          id: 'p1',
          name: 'Bono',
          number: 1,
          position: 'Goalkeeper',
          nationality: 'Morocco',
          age: 32,
          fitness: 95,
          form: 4,
          stats: {
            appearances: 22,
            goals: 0,
            assists: 0,
            yellowCards: 1,
            redCards: 0
          }
        },
        {
          id: 'p2',
          name: 'Kalidou Koulibaly',
          number: 3,
          position: 'Defender',
          nationality: 'Senegal',
          age: 32,
          fitness: 92,
          form: 4,
          stats: {
            appearances: 20,
            goals: 2,
            assists: 1,
            yellowCards: 3,
            redCards: 0
          }
        },
        {
          id: 'p3',
          name: 'Aleksandar Mitrović',
          number: 9,
          position: 'Forward',
          nationality: 'Serbia',
          age: 29,
          fitness: 88,
          injury: {
            type: 'Hamstring',
            returnDate: 'March 28, 2025'
          },
          form: 5,
          stats: {
            appearances: 18,
            goals: 18,
            assists: 4,
            yellowCards: 3,
            redCards: 0
          }
        },
        {
          id: 'p4',
          name: 'Rúben Neves',
          number: 8,
          position: 'Midfielder',
          nationality: 'Portugal',
          age: 27,
          fitness: 94,
          form: 4,
          stats: {
            appearances: 21,
            goals: 3,
            assists: 6,
            yellowCards: 4,
            redCards: 0
          }
        },
        {
          id: 'p5',
          name: 'Sergej Milinković-Savić',
          number: 20,
          position: 'Midfielder',
          nationality: 'Serbia',
          age: 29,
          fitness: 90,
          form: 3,
          stats: {
            appearances: 19,
            goals: 5,
            assists: 8,
            yellowCards: 2,
            redCards: 0
          }
        }
      ]
    },
    'al-nassr': {
      id: 'al-nassr',
      name: 'Al Nassr',
      logo: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Al_Nassr_FC.svg',
      league: 'Saudi Professional League',
      manager: 'Luis Castro',
      primaryColor: '#fcbb17',
      secondaryColor: '#0255a3',
      stadium: 'Al-Awwal Park',
      capacity: 25000,
      founded: 1955,
      players: [
        {
          id: 'p6',
          name: 'David Ospina',
          number: 1,
          position: 'Goalkeeper',
          nationality: 'Colombia',
          age: 35,
          fitness: 86,
          form: 3,
          stats: {
            appearances: 15,
            goals: 0,
            assists: 0,
            yellowCards: 0,
            redCards: 0
          }
        },
        {
          id: 'p7',
          name: 'Cristiano Ronaldo',
          number: 7,
          position: 'Forward',
          nationality: 'Portugal',
          age: 40,
          fitness: 95,
          form: 5,
          stats: {
            appearances: 24,
            goals: 22,
            assists: 9,
            yellowCards: 2,
            redCards: 0
          }
        },
        {
          id: 'p8',
          name: 'Sadio Mané',
          number: 10,
          position: 'Forward',
          nationality: 'Senegal',
          age: 32,
          fitness: 92,
          form: 4,
          stats: {
            appearances: 22,
            goals: 12,
            assists: 7,
            yellowCards: 2,
            redCards: 0
          }
        }
      ]
    }
  };
  
  const currentTeam = teams[selectedTeam];
  
  // Filter players based on search query
  const filteredPlayers = currentTeam.players.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.nationality.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get player fitness status color
  const getFitnessColor = (fitness: number) => {
    if (fitness >= 90) return 'bg-green-500';
    if (fitness >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Get player form status indicator
  const getFormStars = (form: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${
          i < form 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300 dark:text-gray-600'
        }`} 
      />
    ));
  };

  return (
    <div className={`rounded-xl overflow-hidden border shadow-lg ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="p-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Shirt className="w-5 h-5 text-indigo-500" />
          Team Management
        </h2>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filter</span>
            </button>
          </div>
          
          <div className="relative">
            <select
              value={selectedTeam}
              onChange={(e) => {
                setSelectedTeam(e.target.value);
                setSelectedPlayer(null);
              }}
              className={`appearance-none pl-10 pr-8 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 text-white border-gray-600 focus:border-indigo-500' 
                  : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500'
              } border shadow-sm focus:outline-none`}
            >
              <option value="al-hilal">Al Hilal</option>
              <option value="al-nassr">Al Nassr</option>
            </select>
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-500" />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Team Header */}
        <div className="flex items-center gap-6 mb-8">
          <img 
            src={currentTeam.logo} 
            alt={currentTeam.name}
            className="w-20 h-20 object-contain"
          />
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-1">{currentTeam.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Manager: {currentTeam.manager}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span>{currentTeam.league}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Founded: {currentTeam.founded}</span>
              </div>
            </div>
          </div>
          
          <div>
            <button 
              onClick={() => setShowRostCard(!showRostCard)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              AI Team Analysis
            </button>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search players by name, position, or nationality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 text-white border-gray-600 focus:border-indigo-500' 
                  : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500'
              } border shadow-sm focus:outline-none`}
            />
          </div>
        </div>
        
        {/* Players List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredPlayers.map(player => (
            <motion.div
              key={player.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedPlayer(player.id === selectedPlayer?.id ? null : player)}
              className={`rounded-lg border overflow-hidden cursor-pointer transition-all ${
                player.id === selectedPlayer?.id
                  ? isDarkMode
                    ? 'border-indigo-500 bg-gray-700'
                    : 'border-indigo-500 bg-gray-50'
                  : isDarkMode
                    ? 'border-gray-700 hover:border-gray-600'
                    : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="p-4 flex items-start gap-4">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold"
                    style={{ backgroundColor: currentTeam.primaryColor }}
                  >
                    {player.number}
                  </div>
                  <div className="text-sm text-center mt-1">
                    <div className="flex">{getFormStars(player.form)}</div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{player.name}</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span>{player.position}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Flag className="w-4 h-4 text-gray-500" />
                    <span>{player.nationality}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{player.age} years</span>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getFitnessColor(player.fitness)}`}
                        style={{ width: `${player.fitness}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {player.injury && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-red-500">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{player.injury.type}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {player.id === selectedPlayer?.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-indigo-500" />
                        Season Statistics
                      </h4>
                      
                      <div className="grid grid-cols-5 gap-2 text-center">
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Apps</div>
                          <div className="font-bold">{player.stats.appearances}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Goals</div>
                          <div className="font-bold">{player.stats.goals}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Assists</div>
                          <div className="font-bold">{player.stats.assists}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Yellow</div>
                          <div className="font-bold">{player.stats.yellowCards}</div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Red</div>
                          <div className="font-bold">{player.stats.redCards}</div>
                        </div>
                      </div>
                      
                      {/* AI Player Analysis */}
                      <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 text-sm">
                        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-medium mb-1">
                          <Activity className="w-4 h-4" />
                          AI Player Analysis
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {player.position === 'Forward' 
                            ? `${player.name} has been in excellent form, scoring ${player.stats.goals} goals this season. Demonstrating consistent finishing and positioning.`
                            : player.position === 'Midfielder'
                            ? `${player.name} is a key midfielder with ${player.stats.assists} assists. Excellent passing range and vision.`
                            : player.position === 'Defender'
                            ? `${player.name} provides solid defensive stability. Good in aerial duels and positioning.`
                            : `${player.name} has kept ${player.stats.appearances - player.stats.goals} clean sheets this season.`
                          }
                          {player.injury ? ` Currently injured (${player.injury.type}) with expected return on ${player.injury.returnDate}.` : ''}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* ROST Card Modal */}
      <AnimatePresence>
        {showRostCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowRostCard(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl rounded-xl overflow-hidden ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-2xl`}
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-500" />
                  ROST Card: AI Team Analysis
                </h3>
                <button 
                  onClick={() => setShowRostCard(false)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={currentTeam.logo} 
                    alt={currentTeam.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{currentTeam.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      AI-powered team analysis and recommendations
                    </p>
                  </div>
                </div>
                
                <div className={`p-4 mb-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <h4 className="font-medium mb-2">Team Strengths</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>
                        {selectedTeam === 'al-hilal' 
                          ? 'Strong midfield control with Neves and Milinković-Savić providing excellent passing options'
                          : 'Exceptional attacking prowess with Ronaldo and Mané creating and converting chances'
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>
                        {selectedTeam === 'al-hilal' 
                          ? 'Solid defensive organization under pressure, conceding few goals'
                          : 'Clinical finishing in front of goal, high conversion rate'
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>
                        {selectedTeam === 'al-hilal' 
                          ? 'Excellent offensive firepower with Mitrović as target man'
                          : 'Strong set-piece threat, particularly from Ronaldo free kicks'
                        }
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className={`p-4 mb-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <h4 className="font-medium mb-2">Areas for Improvement</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>
                        {selectedTeam === 'al-hilal' 
                          ? 'Vulnerability to counter-attacks when both full-backs advance'
                          : 'Defensive frailty, particularly from wide areas'
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>
                        {selectedTeam === 'al-hilal' 
                          ? 'Over-reliance on Mitrović for goals - need to develop alternative scoring options'
                          : 'Midfield sometimes loses shape during transitions'
                        }
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className={`p-4 mb-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <h4 className="font-medium mb-2">AI Tactical Recommendations</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span>
                        {selectedTeam === 'al-hilal' 
                          ? 'Implement a 4-3-3 formation to maximize midfield strength and provide width in attack'
                          : 'Consider 4-2-3-1 formation with Ronaldo as a central striker to maximize goal threat'
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span>
                        {selectedTeam === 'al-hilal' 
                          ? 'Focus on quick transitions between defense and attack to capitalize on Mitrović\'s finishing'
                          : 'Prioritize defensive drills to improve structure when out of possession'
                        }
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span>
                        {selectedTeam === 'al-hilal' 
                          ? 'Develop set-piece routines to create more scoring opportunities'
                          : 'Focus on wide defensive support when full-backs advance'
                        }
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Analysis based on last 5 matches and historical data</span>
                  <span className="text-indigo-600 dark:text-indigo-400">Updated: Today, 14:30</span>
                </div>
              </div>
              
              <div className="flex justify-end p-5 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowRostCard(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}