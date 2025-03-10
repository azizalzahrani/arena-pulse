import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BarChart2, Users, AlertTriangle, ChevronRight, Activity, Layers, Database, ArrowRight, Shield, Check, Cpu, File as Mobile, Globe } from 'lucide-react';
import { Header } from '../components/Header';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  image: string;
}

export function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: Step[] = [
    {
      id: 1,
      title: "Data Collection",
      description: "Our advanced sensor network captures real-time data from across your venue, including crowd density, movement patterns, and environmental conditions.",
      icon: Database,
      color: "blue",
      image: "https://images.unsplash.com/photo-1572815017694-5a659fcac1d1?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Real-time Processing",
      description: "ArenaPulse processes venue data through our proprietary AI algorithms, transforming raw inputs into actionable insights within milliseconds.",
      icon: Cpu,
      color: "purple",
      image: "https://images.unsplash.com/photo-1518136247453-74e7b5265980?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Insight Generation",
      description: "Our platform analyzes patterns and predicts potential issues before they occur, from crowd bottlenecks to security concerns.",
      icon: Activity,
      color: "indigo",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Staff Coordination",
      description: "ArenaPulse enables optimal staff deployment with real-time alerts and instructions sent directly to personnel mobile devices.",
      icon: Users,
      color: "green",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Enhanced Experience",
      description: "Visitors enjoy smoother experiences with reduced wait times, optimized pathways, and personalized engagement throughout their journey.",
      icon: Globe,
      color: "amber",
      image: "https://images.unsplash.com/photo-1495476479092-6ece1898a101?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main>
        <section className="pt-20 pb-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                How ArenaPulse Works
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover the technology behind our real-time stadium management platform
              </p>
            </motion.div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </section>

        <section className="py-16 bg-gray-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Steps Navigation */}
              <div className="md:w-1/3">
                <h2 className="text-2xl font-bold mb-6 text-gray-100">The Process</h2>
                <div className="space-y-4">
                  {steps.map((step) => (
                    <motion.button
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        activeStep === step.id 
                          ? 'bg-gray-700 border-l-4 border-indigo-500' 
                          : 'bg-gray-900/50 hover:bg-gray-700/50'
                      }`}
                      whileHover={{ x: activeStep === step.id ? 0 : 5 }}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${step.color}-500/20`}>
                        <step.icon className={`w-5 h-5 text-${step.color}-400`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">{step.title}</h3>
                        <p className="text-sm text-gray-400">{`Step ${step.id} of ${steps.length}`}</p>
                      </div>
                      {activeStep === step.id && (
                        <ChevronRight className="w-5 h-5 ml-auto text-indigo-400" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Step Details */}
              <div className="md:w-2/3">
                {steps.map((step) => (
                  <AnimatePresence key={step.id} mode="wait">
                    {activeStep === step.id && (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="bg-gray-900 rounded-xl overflow-hidden shadow-xl"
                      >
                        <div className="relative h-64 md:h-80">
                          <div className="absolute inset-0">
                            <img 
                              src={step.image} 
                              alt={step.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${step.color}-500/20 mb-4`}>
                              <step.icon className={`w-6 h-6 text-${step.color}-400`} />
                            </div>
                            <h2 className="text-2xl font-bold">{step.title}</h2>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-lg text-gray-300 mb-6">{step.description}</p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-green-400 mt-0.5" />
                                <div>
                                  <h4 className="font-medium">Realtime Updates</h4>
                                  <p className="text-sm text-gray-400">Updates every 50ms for true real-time monitoring</p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-green-400 mt-0.5" />
                                <div>
                                  <h4 className="font-medium">99.99% Accuracy</h4>
                                  <p className="text-sm text-gray-400">Industry-leading precision in all measurements</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setActiveStep(prev => Math.max(prev - 1, 1))}
                    disabled={activeStep === 1}
                    className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveStep(prev => Math.min(prev + 1, steps.length))}
                    disabled={activeStep === steps.length}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Key Technologies
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-500/20 mb-4">
                  <Layers className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Advanced Sensor Network</h3>
                <p className="text-gray-300 mb-4">
                  Our integrated network combines computer vision, WiFi triangulation, and IoT sensors for comprehensive venue monitoring.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Thermal imaging for accurate occupancy data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">LIDAR for precise movement tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Environmental monitoring for comfort metrics</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-500/20 mb-4">
                  <BarChart2 className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Analytics</h3>
                <p className="text-gray-300 mb-4">
                  Machine learning algorithms process complex data streams to deliver predictive insights and optimization recommendations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Predictive analytics for crowd flow forecasting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Anomaly detection for security incidents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Pattern recognition for optimization opportunities</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-500/20 mb-4">
                  <Mobile className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Unified Command Center</h3>
                <p className="text-gray-300 mb-4">
                  Real-time dashboards with mobile capabilities provide insights and control from anywhere in the venue.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Cross-platform accessible dashboards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Role-based access controls for security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Push notifications for critical alerts</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Success Through Integration
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  ArenaPulse seamlessly integrates with your existing stadium infrastructure and systems to enhance operations without disruption.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500/20 mt-1">
                      <Shield className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Secure Implementation</h3>
                      <p className="text-gray-300">Enterprise-grade security with end-to-end encryption and compliance with international standards.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500/20 mt-1">
                      <Users className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Dedicated Support</h3>
                      <p className="text-gray-300">Our team of experts provides 24/7 support and training for your staff throughout implementation and beyond.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500/20 mt-1">
                      <AlertTriangle className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Minimal Disruption</h3>
                      <p className="text-gray-300">Our implementation process is designed to integrate with your venue's schedule with minimal impact on operations.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
                  alt="Stadium integration"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your venue?</h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join the leading stadiums and arenas already using ArenaPulse
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <a 
                href="/demo"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition-colors text-lg font-semibold"
              >
                Schedule a Demo <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
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