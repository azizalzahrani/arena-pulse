import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, MapPin, Shield, Clock, Plus, Filter, Download, Search } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'on_break' | 'off_duty';
  location: string;
  contact: {
    email: string;
    phone: string;
  };
  schedule: {
    start: string;
    end: string;
  };
  certifications: string[];
  performance: {
    rating: number;
    incidents: number;
    commendations: number;
  };
}

export function Staff() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const generateStaff = () => {
      const departments = ['Security', 'Operations', 'Medical', 'Maintenance', 'Guest Services'];
      const locations = ['Main Gate', 'North Wing', 'South Wing', 'VIP Area', 'Concourse'];
      const certifications = [
        'First Aid',
        'Security Level 2',
        'Crowd Management',
        'Emergency Response',
        'Fire Safety'
      ];

      const newStaff: StaffMember[] = Array.from({ length: 20 }, (_, i) => ({
        id: `staff-${i + 1}`,
        name: `Staff Member ${i + 1}`,
        role: departments[Math.floor(Math.random() * departments.length)],
        department: departments[Math.floor(Math.random() * departments.length)],
        status: ['active', 'on_break', 'off_duty'][Math.floor(Math.random() * 3)] as StaffMember['status'],
        location: locations[Math.floor(Math.random() * locations.length)],
        contact: {
          email: `staff${i + 1}@arenapulse.com`,
          phone: `+966 5${Math.floor(Math.random() * 100000000)}`
        },
        schedule: {
          start: '08:00',
          end: '16:00'
        },
        certifications: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 },
          () => certifications[Math.floor(Math.random() * certifications.length)]
        ),
        performance: {
          rating: Math.floor(Math.random() * 2) + 3,
          incidents: Math.floor(Math.random() * 5),
          commendations: Math.floor(Math.random() * 10)
        }
      }));

      setStaff(newStaff);
      setIsLoading(false);
    };

    generateStaff();

    // Update every 5 minutes
    const interval = setInterval(generateStaff, 300000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: StaffMember['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'on_break':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'off_duty':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredStaff = staff
    .filter(member => 
      filter === 'all' || member.department.toLowerCase() === filter
    )
    .filter(member =>
      searchQuery === '' ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and monitor stadium staff
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff..."
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
            Add Staff
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
          All Staff
        </button>
        {['Security', 'Operations', 'Medical', 'Maintenance', 'Guest Services'].map((dept) => (
          <button
            key={dept}
            onClick={() => setFilter(dept.toLowerCase())}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === dept.toLowerCase()
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredStaff.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    {member.role}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {member.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {member.schedule.start} - {member.schedule.end}
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(member.status)}`}>
                {member.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <User className="w-4 h-4" />
                  Contact Information
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{member.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{member.contact.phone}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Shield className="w-4 h-4" />
                  Certifications
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <User className="w-4 h-4" />
                  Performance
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Rating</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < member.performance.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Incidents</span>
                    <span className="text-red-600">{member.performance.incidents}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Commendations</span>
                    <span className="text-green-600">{member.performance.commendations}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}