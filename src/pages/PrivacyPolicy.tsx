import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mt-4 mb-2">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-400">Last updated: February 21, 2025</p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                ArenaPulse ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our stadium management platform and related services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium mb-2">2.1 Personal Information</h3>
              <ul className="list-disc ml-6 mb-4">
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Professional and employment information</li>
                <li>Payment information</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">2.2 Usage Data</h3>
              <ul className="list-disc ml-6 mb-4">
                <li>Device and browser information</li>
                <li>IP address and location data</li>
                <li>Platform usage statistics</li>
                <li>Analytics and performance data</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">2.3 Stadium Data</h3>
              <ul className="list-disc ml-6">
                <li>Crowd density and flow information</li>
                <li>Event attendance data</li>
                <li>Security and safety metrics</li>
                <li>Facility utilization statistics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc ml-6">
                <li>Provide and maintain our services</li>
                <li>Improve and optimize platform performance</li>
                <li>Analyze usage patterns and trends</li>
                <li>Communicate with users about service updates</li>
                <li>Process payments and transactions</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc ml-6">
                <li>Service providers and business partners</li>
                <li>Legal authorities when required by law</li>
                <li>Professional advisors and consultants</li>
                <li>Other users with your consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your information, including:
              </p>
              <ul className="list-disc ml-6">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
              <p>You have the right to:</p>
              <ul className="list-disc ml-6">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Export your data</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. International Data Transfers</h2>
              <p>
                We may transfer your information to countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data during such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13. We do not knowingly collect or maintain information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our platform and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4">
                <p>Email: privacy@arenapulse.com</p>
                <p>Address: 123 Stadium Way, Riyadh, Saudi Arabia</p>
                <p>Phone: +966 11 234 5678</p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}