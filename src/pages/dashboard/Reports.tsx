import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Filter, Calendar, BarChart2, Users, DollarSign, Search, Plus } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'attendance' | 'revenue' | 'security' | 'maintenance' | 'analytics';
  status: 'draft' | 'pending' | 'published';
  author: string;
  createdAt: Date;
  updatedAt: Date;
  metrics: {
    attendance?: number;
    revenue?: number;
    incidents?: number;
    satisfaction?: number;
  };
  summary: string;
  insights: string[];
}

export function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const generateReports = () => {
      const types = ['attendance', 'revenue', 'security', 'maintenance', 'analytics'];
      const authors = ['John Smith', 'Sarah Johnson', 'Mike Brown', 'Emily Davis'];
      const insights = [
        'Peak attendance hours identified between 18:00-20:00',
        'Revenue increased by 15% compared to last month',
        'Security incidents decreased by 25%',
        'Customer satisfaction improved by 10%',
        'Maintenance efficiency increased by 20%'
      ];

      const newReports: Report[] = Array.from({ length: 10 }, (_, i) => ({
        id: `report-${i + 1}`,
        title: `${types[Math.floor(Math.random() * types.length)].charAt(0).toUpperCase() + 
          types[Math.floor(Math.random() * types.length)].slice(1)} Report ${i + 1}`,
        type: types[Math.floor(Math.random() * types.length)] as Report['type'],
        status: ['draft', 'pending', 'published'][Math.floor(Math.random() * 3)] as Report['status'],
        author: authors[Math.floor(Math.random() * authors.length)],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        metrics: {
          attendance: Math.floor(Math.random() * 50000) + 30000,
          revenue: Math.floor(Math.random() * 500000) + 250000,
          incidents: Math.floor(Math.random() * 50),
          satisfaction: Math.floor(Math.random() * 20) + 80
        },
        summary: 'Comprehensive analysis of stadium performance metrics and key insights.',
        insights: Array.from(
          { length: Math.floor(Math.random() * 3) + 2 },
          () => insights[Math.floor(Math.random() * insights.length)]
        )
      }));

      setReports(newReports);
      setIsLoading(false);
    };

    generateReports();
  }, []);

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'published':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const getTypeIcon = (type: Report['type']) => {
    switch (type) {
      case 'attendance':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'revenue':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'security':
        return <Shield className="w-5 h-5 text-red-500" />;
      case 'maintenance':
        return <Tool className="w-5 h-5 text-yellow-500" />;
      case 'analytics':
        return <BarChart2 className="w-5 h-5 text-purple-500" />;
    }
  };

  const filteredReports = reports
    .filter(report => 
      filter === 'all' || report.type === filter
    )
    .filter(report =>
      searchQuery === '' ||
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Generate and manage stadium reports
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
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
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" />
            New Report
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredReports.map((report) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  {getTypeIcon(report.type)}
                  <h3 className="text-lg font-semibold">{report.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>By {report.author}</span>
                  <span>Created {report.createdAt.toLocaleDateString()}</span>
                  <span>Updated {report.updatedAt.toLocaleDateString()}</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            <div className="mt-4">
              <p className="text-gray-600 dark:text-gray-400">{report.summary}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              {report.metrics.attendance && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <Users className="w-4 h-4" />
                    Attendance
                  </div>
                  <div className="text-lg font-semibold">
                    {report.metrics.attendance.toLocaleString()}
                  </div>
                </div>
              )}

              {report.metrics.revenue && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <DollarSign className="w-4 h-4" />
                    Revenue
                  </div>
                  <div className="text-lg font-semibold">
                    ${report.metrics.revenue.toLocaleString()}
                  </div>
                </div>
              )}

              {report.metrics.incidents !== undefined && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    Incidents
                  </div>
                  <div className="text-lg font-semibold">
                    {report.metrics.incidents}
                  </div>
                </div>
              )}

              {report.metrics.satisfaction && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <BarChart2 className="w-4 h-4" />
                    Satisfaction
                  </div>
                  <div className="text-lg font-semibold">
                    {report.metrics.satisfaction}%
                  </div>
                </div>
              )}
            </div>

            {report.insights.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-2">Key Insights</h4>
                <ul className="space-y-2">
                  {report.insights.map((insight, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}