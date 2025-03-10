import { useState } from 'react';
import { motion } from 'framer-motion';
import { SaudiLeagueOverview } from './SaudiLeagueOverview';
import { LiveMatches } from './LiveMatches';
import { TeamManagement } from './TeamManagement';
import { AIStadiumOptimization } from './AIStadiumOptimization';
import { Trophy, Zap, ArrowRight, ChevronDown, MapPin, Calendar, Users } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';

export function SaudiLeagueSection() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Trophy className="w-8 h-8 text-green-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            Saudi Professional League
          </h1>
        </div>
        <button className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400">
          League Dashboard <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* League Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } shadow-md`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">League Leaders</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/3/3c/Al_Hilal_logo.png"
                alt="Al Hilal"
                className="w-6 h-6"
              />
              <span className="font-medium">Al Hilal</span>
              <span className="ml-auto text-green-600 dark:text-green-400">62 pts</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/e/e9/Al_Nassr_FC.svg"
                alt="Al Nassr"
                className="w-6 h-6"
              />
              <span className="font-medium">Al Nassr</span>
              <span className="ml-auto text-green-600 dark:text-green-400">56 pts</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/3/36/AlAhliFC.png"
                alt="Al Ahli"
                className="w-6 h-6"
              />
              <span className="font-medium">Al Ahli</span>
              <span className="ml-auto text-green-600 dark:text-green-400">47 pts</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              Full Standings <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } shadow-md`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Upcoming Matches</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Friday, Mar 15</span>
                <span className="text-gray-500 dark:text-gray-400">19:00</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/2/2c/Al-Ittihad_Club_logo.png"
                    alt="Al Ittihad"
                    className="w-5 h-5"
                  />
                  <span>Al Ittihad</span>
                </div>
                <span className="text-xs">vs</span>
                <div className="flex items-center gap-2">
                  <span>Al Taawoun</span>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/6/62/AlTaawoun.png"
                    alt="Al Taawoun"
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Saturday, Mar 16</span>
                <span className="text-gray-500 dark:text-gray-400">20:00</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/e/e9/Al_Nassr_FC.svg"
                    alt="Al Nassr"
                    className="w-5 h-5"
                  />
                  <span>Al Nassr</span>
                </div>
                <span className="text-xs">vs</span>
                <div className="flex items-center gap-2">
                  <span>Al Fayha</span>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/b/b2/Al-Fayha_FC.png"
                    alt="Al Fayha"
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              Full Schedule <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } shadow-md`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Stadium Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>King Fahd Stadium</span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">Ready</span>
            </div>
            <div className="flex items-center justify-between">
              <span>King Abdullah Sports City</span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">Ready</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Prince Mohamed bin Fahd</span>
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">Maintenance</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              All Venues <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } shadow-md`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/20">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold">AI Insights</h3>
          </div>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="text-sm font-medium">Attendance Projection</div>
              <div className="text-lg font-bold">48,500</div>
              <div className="text-xs text-green-500">+12% vs last week</div>
            </div>
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <div className="text-sm font-medium">Match Prediction</div>
              <div className="text-xs">
                <span className="font-medium">Al Hilal</span> has 68% win probability vs Al-Taawoun
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              AI Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* League Overview Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <SaudiLeagueOverview />
      </motion.div>

      {/* Live Matches Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <LiveMatches />
      </motion.div>

      {/* Team Management Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <TeamManagement />
      </motion.div>

      {/* AI Stadium Optimization Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        <AIStadiumOptimization />
      </motion.div>
    </div>
  );
}