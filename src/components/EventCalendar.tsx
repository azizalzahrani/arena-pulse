import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { useThemeStore } from '../stores/useThemeStore';

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'game' | 'maintenance' | 'event';
}

export function EventCalendar() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Football Match',
      date: new Date(2025, 2, 15),
      type: 'game'
    },
    {
      id: '2',
      title: 'System Maintenance',
      date: new Date(2025, 2, 20),
      type: 'maintenance'
    },
    {
      id: '3',
      title: 'Concert',
      date: new Date(2025, 2, 25),
      type: 'event'
    }
  ]);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getEventsForDate = (date: Date) => 
    events.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } p-6 rounded-lg shadow-md transition-colors duration-200 h-full`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Event Calendar</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium py-2">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          return (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`
                aspect-square p-1 border border-gray-200 dark:border-gray-700 rounded
                ${!isSameMonth(day, currentDate) ? 'opacity-50' : ''}
                ${isToday(day) ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}
              `}
            >
              <div className="h-full">
                <div className="text-right text-sm p-1">
                  {format(day, 'd')}
                </div>
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded mb-1 truncate ${
                      event.type === 'game'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20'
                        : event.type === 'maintenance'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20'
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}