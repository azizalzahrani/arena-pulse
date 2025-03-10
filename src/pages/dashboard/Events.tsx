import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Tag, AlertTriangle, Filter, Download, Plus } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  type: 'sports' | 'concert' | 'ceremony';
  date: Date;
  time: string;
  venue: string;
  capacity: number;
  soldTickets: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  price: {
    min: number;
    max: number;
  };
  weather: {
    condition: string;
    temperature: number;
    precipitation: number;
  };
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const generateEvents = () => {
      const types = ['sports', 'concert', 'ceremony'] as const;
      const venues = ['King Fahd Stadium', 'King Abdullah Sports City', 'Prince Sultan Stadium'];
      const statuses = ['scheduled', 'in_progress', 'completed', 'cancelled'] as const;
      const weatherConditions = ['Sunny', 'Partly Cloudy', 'Clear'];

      const newEvents: Event[] = Array.from({ length: 10 }, (_, i) => ({
        id: `event-${i + 1}`,
        name: `Event ${i + 1}`,
        type: types[Math.floor(Math.random() * types.length)],
        date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
        time: `${Math.floor(Math.random() * 12 + 1)}:00 ${Math.random() > 0.5 ? 'PM' : 'AM'}`,
        venue: venues[Math.floor(Math.random() * venues.length)],
        capacity: 50000 + Math.floor(Math.random() * 20000),
        soldTickets: Math.floor(Math.random() * 45000),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        price: {
          min: 50 + Math.floor(Math.random() * 50),
          max: 200 + Math.floor(Math.random() * 300)
        },
        weather: {
          condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
          temperature: 20 + Math.floor(Math.random() * 15),
          precipitation: Math.random() * 30
        }
      }));

      setEvents(newEvents);
      setIsLoading(false);
    };

    generateEvents();

    // Update every 5 minutes
    const interval = setInterval(generateEvents, 300000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in_progress':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'completed':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
      case 'cancelled':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Event Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and monitor all stadium events
          </p>
        </div>
        <div className="flex items-center gap-4">
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
            New Event
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
          All Events
        </button>
        <button
          onClick={() => setFilter('sports')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'sports'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Sports
        </button>
        <button
          onClick={() => setFilter('concert')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'concert'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Concerts
        </button>
        <button
          onClick={() => setFilter('ceremony')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'ceremony'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Ceremonies
        </button>
      </div>

      <div className="grid gap-6">
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.venue}
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(event.status)}`}>
                {event.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Users className="w-4 h-4" />
                  Attendance
                </div>
                <div className="text-lg font-semibold">
                  {event.soldTickets.toLocaleString()} / {event.capacity.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round((event.soldTickets / event.capacity) * 100)}% capacity
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Tag className="w-4 h-4" />
                  Ticket Price
                </div>
                <div className="text-lg font-semibold">
                  ${event.price.min} - ${event.price.max}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Average: ${Math.round((event.price.min + event.price.max) / 2)}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  Weather Forecast
                </div>
                <div className="text-lg font-semibold">
                  {event.weather.condition}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {event.weather.temperature}°C, {event.weather.precipitation}% precipitation
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}