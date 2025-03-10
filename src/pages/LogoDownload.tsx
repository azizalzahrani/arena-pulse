import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Download, Copy, Check, Zap } from 'lucide-react';

export function LogoDownload() {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/logo/arenapulse-logo.svg`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: string) => {
    const link = document.createElement('a');
    link.href = `/logo/arenapulse-logo.${format}`;
    link.download = `arenapulse-logo.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl shadow-xl p-8 text-center"
        >
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            ArenaPulse Logo
          </h1>
          
          <div className="mb-12 flex justify-center">
            <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center p-4">
              <Zap className="w-full h-full text-indigo-600" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Download Logo</h2>
              <p className="text-gray-300 mb-6">Download the ArenaPulse logo in your preferred format</p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleDownload('svg')}
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download SVG
                </button>
                <button
                  onClick={() => handleDownload('png')}
                  className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-500 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download PNG
                </button>
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Direct Link</h2>
              <p className="text-gray-300 mb-6">Copy the direct link to the logo</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/logo/arenapulse-logo.svg`}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-600"
                />
                <button
                  onClick={handleCopyLink}
                  className={`p-2 rounded-lg ${
                    copied ? 'bg-green-600' : 'bg-gray-600 hover:bg-gray-500'
                  } transition-colors`}
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Usage Guidelines</h2>
            <ul className="text-left text-gray-300 space-y-2">
              <li>• The ArenaPulse logo should always be displayed clearly and legibly</li>
              <li>• Maintain adequate spacing around the logo for maximum visibility</li>
              <li>• Do not alter the colors, proportions, or orientation of the logo</li>
              <li>• Do not add effects such as shadows, outlines, or gradients to the logo</li>
              <li>• The minimum display size should be 24x24 pixels for digital use</li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
}