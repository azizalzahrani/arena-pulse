import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  BarChart2,
  Users,
  Shield,
  AlertTriangle,
  Clock,
  LineChart,
  LayoutDashboard,
  Map,
  DollarSign,
  Cpu,
  BrainCircuit,
  FileBarChart,
  ChevronDown,
  ArrowRight,
  Eye,
  Smartphone,
  ListFilter
} from 'lucide-react';
import { Header } from '../components/Header';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:bg-gray-750 transition-colors"
    >
      <Icon className="w-10 h-10 text-indigo-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}

export function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'analytics' | 'management' | 'security'>('all');

  const features = [
    {
      category: 'analytics',
      icon: BarChart2,
      title: 'Real-time Analytics',
      description: 'Monitor crowd density, flow patterns, and venue metrics in real-time with millisecond precision',
    },
    {
      category: 'analytics',
      icon: Map,
      title: 'Interactive Heatmaps',
      description: 'Visualize occupancy across different zones with dynamic, color-coded heatmaps that update in real-time',
    },
    {
      category: 'analytics',
      icon: Eye,
      title: 'Drill-Down Views',
      description: 'Click on any metric to reveal detailed insights, timelines, and root cause analysis',
    },
    {
      category: 'analytics',
      icon: LineChart,
      title: 'Comparative Analytics',
      description: 'Compare performance across venues or time periods to identify trends and improvement opportunities',
    },
    {
      category: 'analytics',
      icon: FileBarChart,
      title: 'Advanced Reporting',
      description: 'Generate customizable reports with exportable data in multiple formats for stakeholder presentations',
    },
    {
      category: 'analytics',
      icon: BrainCircuit,
      title: 'Predictive Analytics',
      description: 'AI-powered insights to anticipate crowd behavior and prevent bottlenecks before they occur',
    },
    {
      category: 'management',
      icon: LayoutDashboard,
      title: 'Multi-venue Dashboard',
      description: 'Unified control center for monitoring and managing multiple venues from a single interface',
    },
    {
      category: 'management',
      icon: Clock,
      title: 'Event Scheduling',
      description: 'Comprehensive event management with timeline visualization and resource allocation',
    },
    {
      category: 'management',
      icon: Users,
      title: 'Staff Management',
      description: 'Track staff locations, assignments, and performance metrics to optimize personnel deployment',
    },
    {
      category: 'management',
      icon: DollarSign,
      title: 'Revenue Optimization',
      description: 'Use real-time data to optimize concession placement, pricing strategies, and promotional activities',
    },
    {
      category: 'security',
      icon: AlertTriangle,
      title: 'Incident Management',
      description: 'Track and respond to security incidents with automated alerts and response protocol suggestions',
    },
    {
      category: 'security',
      icon: Shield,
      title: 'Security Monitoring',
      description: 'Real-time security camera feeds with AI-powered anomaly detection and threat assessment',
    },
    {
      category: 'security',
      icon: Cpu,
      title: 'Automated Alerts',
      description: 'Customizable alert thresholds for occupancy, security, maintenance, and emergency situations',
    },
    {
      category: 'security',
      icon: Smartphone,
      title: 'Mobile Responsiveness',
      description: 'Access all platform features on the go with a fully responsive interface optimized for mobile devices',
    },
    {
      category: 'management',
      icon: ListFilter,
      title: 'Customizable Dashboards',
      description: 'Tailor your view with drag-and-drop widgets, saved filters, and personalized layouts',
    }
  ];

  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main>
        <section className="pt-20 pb-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1 
                className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Powerful Features for Modern Stadiums
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover how ArenaPulse transforms venue management with cutting-edge technology and real-time insights
              </motion.p>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </section>

        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Feature Categories</h2>
                <p className="text-gray-300 mt-2">Explore our comprehensive suite of stadium management tools</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  All Features
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'analytics'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('management')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'management'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Management
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'security'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Security
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFeatures.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.div
                  initial={{ x: -50 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Interactive Heatmaps and Zone Monitoring
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Visualize crowd distribution in real-time with our advanced heatmap technology. Monitor occupancy levels across different zones and get instant alerts when thresholds are exceeded.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-1 bg-indigo-500/20">
                        <Zap className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Real-time Updates</h3>
                        <p className="text-gray-300">See changes as they happen with near-zero latency</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-1 bg-indigo-500/20">
                        <Zap className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Customizable Thresholds</h3>
                        <p className="text-gray-300">Set different occupancy thresholds for each zone</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-1 bg-indigo-500/20">
                        <Zap className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Historical Playback</h3>
                        <p className="text-gray-300">Review crowd movement patterns from past events</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1494855363380-2a5817ba6e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Heat map visualization" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-gray-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden shadow-2xl order-2 lg:order-1"
              >
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Data dashboard" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ x: 50 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Advanced Analytics and Reporting
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Turn data into actionable insights with our comprehensive analytics suite. Track KPIs, identify trends, and generate detailed reports for stakeholders.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-1 bg-indigo-500/20">
                        <LineChart className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Trend Analysis</h3>
                        <p className="text-gray-300">Identify patterns and forecast future attendance</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-1 bg-indigo-500/20">
                        <FileBarChart className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Custom Reports</h3>
                        <p className="text-gray-300">Generate reports with exactly the metrics you need</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-1 bg-indigo-500/20">
                        <DollarSign className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Revenue Insights</h3>
                        <p className="text-gray-300">Correlate attendance patterns with revenue metrics</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.div
                  initial={{ x: -50 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Incident Management and Security
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Keep your venue safe with our comprehensive security suite. Detect incidents early, coordinate response teams, and maintain a secure environment for all attendees.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-1 bg-indigo-500/20">
                        <AlertTriangle className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Early Warning System</h3>
                        <p className="text-gray-300">Detect potential issues before they escalate</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-1 bg-indigo-500/20">
                        <Shield className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Response Coordination</h3>
                        <p className="text-gray-300">Direct security personnel to exactly where they're needed</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-1 bg-indigo-500/20">
                        <Cpu className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold">AI-Powered Detection</h3>
                        <p className="text-gray-300">Leverage machine learning to identify unusual patterns</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1551972873-b7e8754e8e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Security monitoring" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Venue?</h2>
            <p className="text-xl text-indigo-100 mb-8">Experience the power of ArenaPulse with a personalized demo</p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <a 
                href="/demo"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
              >
                Schedule a Demo <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-300">
                Get answers to common questions about ArenaPulse features
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How does the real-time analytics system work?",
                  answer: "ArenaPulse uses a network of sensors, cameras, and WiFi access points to collect data on crowd movement and density. This data is processed through our proprietary algorithms and displayed on your dashboard with minimal latency."
                },
                {
                  question: "Can I customize the alert thresholds?",
                  answer: "Yes, ArenaPulse allows you to set custom thresholds for occupancy, dwell time, queue length, and other metrics for each zone in your venue. You can also customize the types of alerts and notification methods."
                },
                {
                  question: "How does ArenaPulse improve revenue?",
                  answer: "By optimizing staff deployment, reducing wait times, and providing insights on concession placement and pricing, ArenaPulse helps venues increase per-capita spending and improve the overall fan experience."
                },
                {
                  question: "What kind of venues can use ArenaPulse?",
                  answer: "ArenaPulse is designed for stadiums, arenas, concert venues, convention centers, and other large public spaces where crowd management and experience optimization are critical."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900 rounded-lg p-6 border border-gray-700"
                >
                  <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                  <p className="text-gray-300">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-xl font-semibold mb-4 md:mb-0">
              <Zap className="w-6 h-6 text-indigo-400" />
              ArenaPulse
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="/features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 ArenaPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}