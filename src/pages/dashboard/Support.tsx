import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Phone, Mail, Globe, Book, HelpCircle, ExternalLink } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  url: string;
}

export function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs: FAQ[] = [
    {
      question: 'How do I reset my security system credentials?',
      answer: 'To reset your security credentials, navigate to Settings > Security > Reset Credentials. Follow the prompts to complete the process.',
      category: 'security'
    },
    {
      question: 'What should I do if I detect unusual crowd behavior?',
      answer: 'If you notice unusual crowd behavior, immediately report it through the Incidents tab. Provide as much detail as possible and mark it as high priority if necessary.',
      category: 'operations'
    },
    {
      question: 'How can I generate custom analytics reports?',
      answer: 'Custom analytics reports can be generated from the Reports section. Click "New Report", select your metrics, date range, and visualization preferences.',
      category: 'analytics'
    },
    {
      question: 'What are the recommended maintenance schedules?',
      answer: 'Maintenance schedules vary by equipment type. Check the Maintenance Guide in the Documentation section for detailed schedules and procedures.',
      category: 'maintenance'
    }
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: 'Best Practices for Stadium Security',
      description: 'Learn about the latest security protocols and best practices for large venues.',
      category: 'security',
      readTime: '5 min',
      url: '#'
    },
    {
      id: '2',
      title: 'Optimizing Crowd Flow Management',
      description: 'Strategies for efficient crowd management during peak hours.',
      category: 'operations',
      readTime: '8 min',
      url: '#'
    },
    {
      id: '3',
      title: 'Understanding Analytics Dashboards',
      description: 'A comprehensive guide to interpreting your analytics data.',
      category: 'analytics',
      readTime: '10 min',
      url: '#'
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredArticles = articles.filter(article =>
    (selectedCategory === 'all' || article.category === selectedCategory) &&
    (searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">How can we help you?</h1>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg font-semibold">Live Chat</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Get instant help from our support team
          </p>
          <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Start Chat
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg font-semibold">Phone Support</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Call us 24/7 for urgent assistance
          </p>
          <a
            href="tel:+966112345678"
            className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            +966 11 234 5678
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg font-semibold">Email Support</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Send us a detailed message
          </p>
          <a
            href="mailto:support@arenapulse.com"
            className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            support@arenapulse.com
          </a>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <option value="all">All Categories</option>
                <option value="security">Security</option>
                <option value="operations">Operations</option>
                <option value="analytics">Analytics</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-2">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Help Articles</h2>
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-500 text-sm flex items-center gap-1"
            >
              View All
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-4">
            {filteredArticles.map((article, index) => (
              <motion.a
                key={article.id}
                href={article.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <Book className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-2">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{article.readTime} read</span>
                      <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Still need help?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Our support team is available 24/7 to assist you with any questions or concerns.
          Don't hesitate to reach out through any of our support channels.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <MessageSquare className="w-5 h-5" />
            Contact Support
          </button>
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Globe className="w-5 h-5" />
            Visit Help Center
          </a>
        </div>
      </div>
    </div>
  );
}