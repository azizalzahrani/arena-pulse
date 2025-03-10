import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Calendar, 
  Users, 
  BarChart2, 
  Clock, 
  Flag, 
  TrendingUp, 
  ArrowRight, 
  Award,
  Star,
  Shield
} from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';

interface LeagueStats {
  matchesPlayed: number;
  totalMatches: number;
  totalAttendance: number;
  averageAttendance: number;
  totalGoals: number;
  yellowCards: number;
  redCards: number;
}

export function SaudiLeagueOverview() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [currentSeason] = useState("2024/2025");
  const [leagueStats, setLeagueStats] = useState<LeagueStats>({
    matchesPlayed: 248,
    totalMatches: 306,
    totalAttendance: 4125600,
    averageAttendance: 16635,
    totalGoals: 612,
    yellowCards: 984,
    redCards: 42
  });
  
  // Dynamically update stats periodically to simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setLeagueStats(prev => ({
        ...prev,
        totalAttendance: prev.totalAttendance + Math.floor(Math.random() * 1000),
        totalGoals: Math.random() > 0.7 ? prev.totalGoals + 1 : prev.totalGoals,
        yellowCards: Math.random() > 0.6 ? prev.yellowCards + 1 : prev.yellowCards,
        redCards: Math.random() > 0.9 ? prev.redCards + 1 : prev.redCards,
      }));
    }, 20000);
    
    return () => clearInterval(interval);
  }, []);

  const calculateAverageAttendance = () => {
    return Math.round(leagueStats.totalAttendance / leagueStats.matchesPlayed);
  };

  const calculateGoalsPerMatch = () => {
    return (leagueStats.totalGoals / leagueStats.matchesPlayed).toFixed(2);
  };

  return (
    <div className={`rounded-xl overflow-hidden border shadow-lg ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="bg-gradient-to-r from-green-600 to-green-800 p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <Trophy className="w-8 h-8 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Saudi Professional League</h2>
              <p className="text-green-100">Roshn Saudi League {currentSeason}</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="text-xs text-white/80">Season Progress</div>
            <div className="text-xl font-bold text-white">{Math.round((leagueStats.matchesPlayed / leagueStats.totalMatches) * 100)}%</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-sm text-gray-500 dark:text-gray-400">Matches</div>
            <div className="text-2xl font-bold mt-1">{leagueStats.matchesPlayed}/{leagueStats.totalMatches}</div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-2">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${(leagueStats.matchesPlayed / leagueStats.totalMatches) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Attendance</div>
            <div className="text-2xl font-bold mt-1">{leagueStats.totalAttendance.toLocaleString()}</div>
            <div className="text-xs text-green-500 mt-1">
              {calculateAverageAttendance().toLocaleString()} per match
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-sm text-gray-500 dark:text-gray-400">Goals</div>
            <div className="text-2xl font-bold mt-1">{leagueStats.totalGoals}</div>
            <div className="text-xs text-green-500 mt-1">
              {calculateGoalsPerMatch()} per match
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-sm text-gray-500 dark:text-gray-400">Cards</div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-4 bg-yellow-400 rounded-sm"></div>
              <span className="text-lg font-bold">{leagueStats.yellowCards}</span>
              <div className="h-3 w-4 bg-red-500 rounded-sm ml-2"></div>
              <span className="text-lg font-bold">{leagueStats.redCards}</span>
            </div>
            <div className="text-xs text-green-500 mt-2">
              {(leagueStats.yellowCards / leagueStats.matchesPlayed).toFixed(1)} yellow cards per match
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Standings Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Current Standings
              </h3>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                Full Table <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className={`overflow-hidden rounded-lg border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <table className="w-full text-sm">
                <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className="py-2 px-3 text-left">Pos</th>
                    <th className="py-2 px-3 text-left">Team</th>
                    <th className="py-2 px-3 text-center">P</th>
                    <th className="py-2 px-3 text-center">GD</th>
                    <th className="py-2 px-3 text-center">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { pos: 1, name: "Al Hilal", played: 24, goalDiff: 49, points: 62 },
                    { pos: 2, name: "Al Nassr", played: 25, goalDiff: 42, points: 56 },
                    { pos: 3, name: "Al Ahli", played: 24, goalDiff: 20, points: 47 },
                    { pos: 4, name: "Al Ittihad", played: 23, goalDiff: 19, points: 44 },
                    { pos: 5, name: "Al Taawoun", played: 24, goalDiff: 9, points: 39 }
                  ].map((team, index) => (
                    <tr key={index} className={`${
                      isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-50'
                    } transition-colors`}>
                      <td className="py-2 px-3 font-medium">
                        {team.pos < 4 ? (
                          <span className="flex items-center">
                            {team.pos}
                            <div className="ml-1 w-2 h-2 rounded-full bg-green-500"></div>
                          </span>
                        ) : team.pos === 4 ? (
                          <span className="flex items-center">
                            {team.pos}
                            <div className="ml-1 w-2 h-2 rounded-full bg-blue-500"></div>
                          </span>
                        ) : (
                          team.pos
                        )}
                      </td>
                      <td className="py-2 px-3 font-medium">{team.name}</td>
                      <td className="py-2 px-3 text-center">{team.played}</td>
                      <td className="py-2 px-3 text-center">{team.goalDiff > 0 ? `+${team.goalDiff}` : team.goalDiff}</td>
                      <td className="py-2 px-3 text-center font-bold">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Scorers Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Top Scorers
              </h3>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                Full Stats <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className={`overflow-hidden rounded-lg border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <table className="w-full text-sm">
                <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className="py-2 px-3 text-left">Pos</th>
                    <th className="py-2 px-3 text-left">Player</th>
                    <th className="py-2 px-3 text-left">Team</th>
                    <th className="py-2 px-3 text-center">Goals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { pos: 1, name: "Cristiano Ronaldo", team: "Al Nassr", goals: 22 },
                    { pos: 2, name: "Aleksandar Mitrović", team: "Al Hilal", goals: 18 },
                    { pos: 3, name: "Moussa Marega", team: "Al Hilal", goals: 12 },
                    { pos: 4, name: "Firas Al-Buraikan", team: "Al Ahli", goals: 10 },
                    { pos: 5, name: "Abderrazak Hamdallah", team: "Al Ittihad", goals: 9 }
                  ].map((player, index) => (
                    <tr key={index} className={`${
                      isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-50'
                    } transition-colors`}>
                      <td className="py-2 px-3">{player.pos}</td>
                      <td className="py-2 px-3 font-medium">{player.name}</td>
                      <td className="py-2 px-3">{player.team}</td>
                      <td className="py-2 px-3 text-center font-bold">{player.goals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}