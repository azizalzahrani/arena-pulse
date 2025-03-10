import { ArrowRight, BarChart2, Users, Zap, Shield, ChevronDown, ChevronRight, Star, Globe, Trophy, Activity, Map, Clock, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { DemoRequestForm } from '../components/DemoRequestForm';

export function LandingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xl">
            <Zap className="w-6 h-6" />
            ArenaPulse
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-gray-300 hover:text-white transition-colors">Login</a>
            <a href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Get Started
            </a>
          </div>
        </nav>
      </header>

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
                Transform Your Stadium Experience with Real-Time Analytics
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Optimize crowd flow, enhance fan engagement, and boost revenue with our advanced stadium management platform.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
                >
                  Request Demo <ArrowRight className="w-5 h-5" />
                </button>
                <a 
                  href="#how-it-works"
                  className="bg-gray-800 text-indigo-400 px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-lg font-semibold border border-gray-700"
                >
                  Learn More <ChevronDown className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
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
              <div>
                <motion.div
                  initial={{ x: -50 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    World Cup 2034: Elevating the Beautiful Game
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Experience the future of stadium technology across Saudi Arabia's world-class venues. ArenaPulse is ready to transform the biggest sporting event in history.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-gray-700">
                      <Activity className="w-8 h-8 text-indigo-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
                      <p className="text-gray-300">Live crowd flow monitoring across all venues with predictive insights</p>
                    </div>
                    <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-gray-700">
                      <Globe className="w-8 h-8 text-purple-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Global Scale</h3>
                      <p className="text-gray-300">Seamless coordination across multiple stadiums and cities</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="relative">
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 mix-blend-overlay" />
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(67,56,202,0.12),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(126,34,206,0.12),transparent_50%)]" />
                  </div>
                  
                  <div className="relative h-[600px] flex items-center">
                    <div className="absolute inset-0">
                      <img 
                        src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=2000&q=80"
                        alt="Modern Stadium Technology" 
                        className="w-full h-full object-cover opacity-40"
                      />
                    </div>
                    
                    <div className="relative px-8 py-12 max-w-2xl mx-auto text-center">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                          <Trophy className="w-5 h-5 text-indigo-400" />
                          <span className="text-sm font-medium">FIFA World Cup 2034™</span>
                        </div>
                        
                        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          Next-Generation Stadium Technology
                        </h2>
                        
                        <p className="text-xl text-gray-300 mb-8">
                          Experience the future of stadium management with our cutting-edge crowd flow optimization and real-time analytics platform.
                        </p>
                        
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                          <span>Learn More</span>
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Beyond the Pitch: Complete Tournament Solutions
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comprehensive event management suite designed for the world's biggest sporting events
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Map,
                  title: "Multi-Venue Coordination",
                  description: "Synchronized operations across all tournament venues with real-time data sharing",
                  stat: "12+",
                  statLabel: "Venues Managed"
                },
                {
                  icon: Users,
                  title: "Crowd Flow Monitoring",
                  description: "AI-powered crowd analytics with 99.9% accuracy and predictive alerts",
                  stat: "2M+",
                  statLabel: "Fans Tracked Daily"
                },
                {
                  icon: Clock,
                  title: "Smart Queuing",
                  description: "Reduce wait times by up to 60% with dynamic queue management",
                  stat: "-60%",
                  statLabel: "Wait Time Reduction"
                },
                {
                  icon: Bell,
                  title: "Emergency Response",
                  description: "Integrated emergency protocols with sub-30 second response time",
                  stat: "30s",
                  statLabel: "Response Time"
                },
                {
                  icon: Activity,
                  title: "Transportation Hub",
                  description: "Seamless integration with public transport and parking systems",
                  stat: "95%",
                  statLabel: "Traffic Optimization"
                },
                {
                  icon: Globe,
                  title: "Fan Engagement",
                  description: "Personalized experiences for millions of fans across multiple languages",
                  stat: "15+",
                  statLabel: "Languages Supported"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:bg-gray-750 transition-colors"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <feature.icon className="w-8 h-8 text-indigo-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 mb-4">{feature.description}</p>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="text-2xl font-bold text-indigo-400">{feature.stat}</div>
                    <div className="text-sm text-gray-400">{feature.statLabel}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <a 
                href="/solutions"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
              >
                Explore Our Solutions <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Trusted by Leading Venues</h2>
              <p className="text-xl text-gray-300">See what our clients have to say about ArenaPulse</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="p-6 rounded-xl bg-gray-900 border border-gray-700"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"ArenaPulse has revolutionized how we manage our stadium. The real-time analytics have helped us improve crowd flow and enhance the fan experience significantly."</p>
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="John Smith" 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">John Smith</p>
                    <p className="text-gray-400">Operations Director, MetLife Stadium</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="p-6 rounded-xl bg-gray-900 border border-gray-700"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"The fan engagement features have transformed how we interact with our audience. Our satisfaction scores have never been higher."</p>
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Sarah Johnson" 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-gray-400">Fan Experience Manager, SoFi Stadium</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-300">Everything you need to know about ArenaPulse</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "How does ArenaPulse handle real-time data?",
                  answer: "ArenaPulse uses advanced sensors and AI algorithms to process crowd data in real-time, providing instant insights through our intuitive dashboard."
                },
                {
                  question: "What kind of support do you offer?",
                  answer: "We provide 24/7 technical support, regular training sessions, and a dedicated customer success manager for enterprise clients."
                },
                {
                  question: "Can ArenaPulse integrate with existing systems?",
                  answer: "Yes, ArenaPulse offers robust API integration capabilities and can work seamlessly with your existing venue management systems."
                },
                {
                  question: "How secure is the platform?",
                  answer: "We implement enterprise-grade security measures, including end-to-end encryption, regular security audits, and compliance with industry standards."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="p-6 rounded-xl bg-gray-800 border border-gray-700 hover:bg-gray-750 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-300">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Venue?</h2>
            <p className="text-xl text-indigo-100 mb-8">Join the leading venues already using ArenaPulse to enhance their operations</p>
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
      </main>

      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Zap className="w-6 h-6 text-indigo-400" />
                ArenaPulse
              </div>
              <p className="text-gray-400">Transforming stadium operations with real-time analytics and fan engagement solutions.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/enterprise" className="text-gray-400 hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/security" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 ArenaPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <DemoRequestForm
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}