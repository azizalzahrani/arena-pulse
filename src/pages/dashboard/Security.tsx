import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Camera, Users, MapPin, Clock, Filter, Download, Search } from 'lucide-react';

interface SecurityAlert {
  id: string;
  type: 'intrusion' | 'crowd' | 'suspicious' | 'emergency';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  timestamp: Date;
  description: string;
  status: 'active' | 'investigating' | 'resolved';
  assignedTo?: string;
  cameraId?: string;
  crowdDensity?: number;
}

interface SecurityCamera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastUpdate: Date;
  type: 'fixed' | 'ptz' | 'thermal';
  coverage: number;
}

export function Security() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [cameras, setCameras] = useState<SecurityCamera[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const generateData = () => {
      const locations = ['Main Gate', 'North Wing', 'South Wing', 'VIP Area', 'Parking Lot'];
      const descriptions = [
        'Suspicious activity detected',
        'Crowd density exceeding threshold',
        'Unauthorized access attempt',
        'Emergency exit blocked',
        'Suspicious package identified'
      ];

      // Generate alerts
      const newAlerts: SecurityAlert[] = Array.from({ length: 8 }, (_, i) => ({
        id: `alert-${i + 1}`,
        type: ['intrusion', 'crowd', 'suspicious', 'emergency'][Math.floor(Math.random() * 4)] as SecurityAlert['type'],
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as SecurityAlert['severity'],
        location: locations[Math.floor(Math.random() * locations.length)],
        timestamp: new Date(Date.now() - Math.random() * 3600000),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        status: ['active', 'investigating', 'resolved'][Math.floor(Math.random() * 3)] as SecurityAlert['status'],
        assignedTo: Math.random() > 0.3 ? `Security Team ${Math.floor(Math.random() * 5) + 1}` : undefined,
        cameraId: `CAM-${Math.floor(Math.random() * 100)}`,
        crowdDensity: Math.random() > 0.5 ? Math.floor(Math.random() * 100) : undefined
      }));

      // Generate cameras
      const newCameras: SecurityCamera[] = Array.from({ length: 12 }, (_, i) => ({
        id: `cam-${i + 1}`,
        name: `Camera ${i + 1}`,
        location: locations[Math.floor(Math.random() * locations.length)],
        status: ['online', 'offline', 'maintenance'][Math.floor(Math.random() * 3)] as SecurityCamera['status'],
        lastUpdate: new Date(Date.now() - Math.random() * 300000),
        type: ['fixed', 'ptz', 'thermal'][Math.floor(Math.random() * 3)] as SecurityCamera['type'],
        coverage: Math.floor(Math.random() * 50) + 50
      }));

      setAlerts(newAlerts);
      setCameras(newCameras);
      setIsLoading(false);
    };

    generateData();

    // Update every minute
    const interval = setInterval(generateData, 60000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: SecurityAlert['severity']) => {
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

  const getStatusColor = (status: SecurityCamera['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'offline':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
    }
  };

  const filteredAlerts = alerts
    .filter(alert => 
      filter === 'all' || alert.type === filter
    )
    .filter(alert =>
      searchQuery === '' ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Security Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Monitor and manage security systems
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700  Continuing with the Security.tsx file content exactly where we left off:

```tsx
transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Overview */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Active Alerts</h2>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-red-500 bg-gray-50 dark:bg-gray-700 p-4 rounded-r-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {alert.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="font-medium mb-1">{alert.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {alert.location}
                      </div>
                      {alert.crowdDensity && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {alert.crowdDensity}% density
                        </div>
                      )}
                      {alert.cameraId && (
                        <div className="flex items-center gap-1">
                          <Camera className="w-4 h-4" />
                          {alert.cameraId}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alert.status === 'active' ? 'bg-red-100 text-red-700 dark:bg-red-900/20'
                      : alert.status === 'investigating' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20'
                      : 'bg-green-100 text-green-700 dark:bg-green-900/20'
                    }`}>
                      {alert.status}
                    </span>
                    {alert.assignedTo && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {alert.assignedTo}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Camera Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Camera Status</h2>
          <div className="space-y-4">
            {cameras.map((camera) => (
              <motion.div
                key={camera.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{camera.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {camera.location}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(camera.status)}`}>
                    {camera.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center justify-between">
                    <span>Coverage</span>
                    <span>{camera.coverage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Type</span>
                    <span className="capitalize">{camera.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Update</span>
                    <span>{camera.lastUpdate.toLocaleTimeString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg font-semibold">Security Level</h2>
          </div>
          <div className="text-3xl font-bold mb-2">
            {alerts.filter(a => a.severity === 'critical').length > 0 ? 'High Alert' : 'Normal'}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Based on current incidents and threat level
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <h2 className="text-lg font-semibold">Active Alerts</h2>
          </div>
          <div className="text-3xl font-bold mb-2">
            {alerts.filter(a => a.status === 'active').length}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Requiring immediate attention
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-semibold">Camera Status</h2>
          </div>
          <div className="text-3xl font-bold mb-2">
            {cameras.filter(c => c.status === 'online').length}/{cameras.length}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Cameras currently online
          </p>
        </div>
      </div>
    </div>
  );
}