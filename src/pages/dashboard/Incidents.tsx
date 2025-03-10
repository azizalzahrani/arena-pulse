import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Users, MapPin, Clock, Filter, Download, Search, Plus } from 'lucide-react';

interface Incident {
  id: string;
  type: 'security' | 'medical' | 'maintenance' | 'crowd';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved';
  location: string;
  timestamp: Date;
  description: string;
  assignedTo?: string;
  response?: {
    team: string;
    eta: string;
    actions: string[];
  };
  updates: {
    timestamp: Date;
    message: string;
    author: string;
  }[];
}

export function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const generateIncidents = () => {
      const locations = ['Main Gate', 'North Wing', 'South Wing', 'VIP Area', 'Parking Lot'];
      const descriptions = [
        'Medical emergency reported',
        'Crowd control needed',
        'Security breach detected',
        'Maintenance issue reported',
        'Equipment malfunction'
      ];
      const teams = ['Security Team A', 'Medical Team B', 'Maintenance Crew C'];
      const actions = [
        'Dispatched emergency response team',
        'Initiated crowd control measures',
        'Investigating security breach',
        'Performing equipment repairs',
        'Coordinating with local authorities'
      ];

      const newIncidents: Incident[] = Array.from({ length: 10 }, (_, i) => ({
        id: `incident-${i + 1}`,
        type: ['security', 'medical', 'maintenance', 'crowd'][Math.floor(Math.random() * 4)] as Incident['type'],
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as Incident['severity'],
        status: ['open', 'in_progress', 'resolved'][Math.floor(Math.random() * 3)] as Incident['status'],
        location: locations[Math.floor(Math.random() * locations.length)],
        timestamp: new Date(Date.now() - Math.random() * 86400000),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        assignedTo: Math.random() > 0.3 ? teams[Math.floor(Math.random() * teams.length)] : undefined,
        response: Math.random() > 0.3 ? {
          team: teams[Math.floor(Math.random() * teams.length)],
          eta: `${Math.floor(Math.random() * 15) + 1} minutes`,
          actions: Array.from(
            { length: Math.floor(Math.random() * 3) + 1 },
            () => actions[Math.floor(Math.random() * actions.length)]
          )
        } : undefined,
        updates: Array.from(
          { length: Math.floor(Math.random() * 3) },
          () => ({
            timestamp: new Date(Date.now() - Math.random() * 3600000),
            message: `Update: ${actions[Math.floor(Math.random() * actions.length)]}`,
            author: teams[Math.floor(Math.random() * teams.length)]
          })
        )
      }));

      setIncidents(newIncidents);
      setIsLoading(false);
    };

    generateIncidents();

    // Update every 5 minutes
    const interval = setInterval(generateIncidents, 300000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: Incident['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'high':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const getStatusColor = (status: Incident['status']) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const getTypeIcon = (type: Incident['type']) => {
    switch (type) {
      case 'security':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medical':
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      case 'maintenance':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'crowd':
        return <Users className="w-5 h-5 text-purple-500" />;
    }
  };

  const filteredIncidents = incidents
    .filter(incident => 
      filter === 'all' || incident.type === filter
    )
    .filter(incident =>
      searchQuery === '' ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Incident Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track and manage stadium incidents
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" />
            New Incident
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All Incidents
        </button>
        {['security', 'medical', 'maintenance', 'crowd'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === type
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredIncidents.map((incident) => (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  {getTypeIcon(incident.type)}
                  <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(incident.status)}`}>
                    {incident.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{incident.description}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {incident.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {incident.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
              {incident.assignedTo && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Assigned to: {incident.assignedTo}
                </div>
              )}
            </div>

            {incident.response && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Response Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Response Team</span>
                    <span>{incident.response.team}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>ETA</span>
                    <span>{incident.response.eta}</span>
                  </div>
                  <div>
                    <span className="block mb-1">Actions Taken:</span>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {incident.response.actions.map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {incident.updates.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Updates</h4>
                <div className="space-y-2">
                  {incident.updates.map((update, index) => (
                    <div
                      key={index}
                      className="text-sm p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{update.author}</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {update.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{update.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}