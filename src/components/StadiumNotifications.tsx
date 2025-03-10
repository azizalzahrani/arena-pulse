import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Bell, 
  Check, 
  Clock, 
  MapPin, 
  Users, 
  Wrench, 
  Calendar,
  ChevronDown,
  ChevronUp,
  Brain,
  Activity,
  X
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Notification {
  id: string;
  type: 'critical' | 'operations' | 'crowd' | 'event';
  severity: number;
  title: string;
  message: string;
  location: string;
  timestamp: Date;
  ai_risk_score: number;
  resolution_time: string;
  assigned_team?: string;
  action_items: string[];
  acknowledged: boolean;
  ai_suggestions: string[];
}

export function StadiumNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('stadium_notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stadium_notifications'
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('stadium_notifications')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;

      setNotifications(data.map(notification => ({
        ...notification,
        timestamp: new Date(notification.timestamp),
        action_items: Array.isArray(notification.action_items) 
          ? notification.action_items 
          : JSON.parse(notification.action_items || '[]'),
        ai_suggestions: Array.isArray(notification.ai_suggestions)
          ? notification.ai_suggestions
          : JSON.parse(notification.ai_suggestions || '[]')
      })));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleAcknowledge = async (id: string) => {
    try {
      const { error } = await supabase
        .from('stadium_notifications')
        .update({
          acknowledged: true,
          acknowledged_at: new Date().toISOString(),
          acknowledged_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', id);

      if (error) throw error;
      await fetchNotifications();
    } catch (error) {
      console.error('Error acknowledging notification:', error);
    }
  };

  const getTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'operations':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'crowd':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'event':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5" />;
      case 'operations':
        return <Wrench className="w-5 h-5" />;
      case 'crowd':
        return <Users className="w-5 h-5" />;
      case 'event':
        return <Calendar className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-semibold">Real-time Notifications</h2>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400">
            {notifications.filter(n => !n.acknowledged).length} Active
          </span>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          {showHistory ? 'Hide History' : 'Show History'}
          {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {notifications
            .filter(n => !n.acknowledged || showHistory)
            .map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={`border rounded-lg overflow-hidden ${
                  notification.acknowledged ? 'opacity-60' : ''
                } ${getTypeStyles(notification.type)}`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(notification.type)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="px-2 py-0.5 text-xs rounded-full bg-white/50 dark:bg-black/20">
                            Severity {notification.severity}/5
                          </span>
                        </div>
                        <p className="text-sm mt-1">{notification.message}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {notification.timestamp.toLocaleTimeString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {notification.location}
                          </div>
                          {notification.assigned_team && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {notification.assigned_team}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!notification.acknowledged && (
                        <button
                          onClick={() => handleAcknowledge(notification.id)}
                          className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => setExpandedId(
                          expandedId === notification.id ? null : notification.id
                        )}
                        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        {expandedId === notification.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === notification.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-current border-opacity-20"
                      >
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Brain className="w-4 h-4" />
                              <span className="text-sm font-medium">AI Risk Assessment</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-current"
                                  style={{ width: `${notification.ai_risk_score * 10}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{notification.ai_risk_score}/10</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-medium">Est. Resolution Time</span>
                            </div>
                            <p className="text-sm">{notification.resolution_time}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Activity className="w-4 h-4" />
                              Required Actions
                            </h4>
                            <ul className="space-y-1">
                              {notification.action_items.map((item, index) => (
                                <li key={index} className="text-sm flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Brain className="w-4 h-4" />
                              AI Suggestions
                            </h4>
                            <ul className="space-y-1">
                              {notification.ai_suggestions.map((suggestion, index) => (
                                <li key={index} className="text-sm flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}