import { Bell, MessageSquare, Share2 } from 'lucide-react';

export function FanInterface() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-white">Fan Zone</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Live Updates</h2>
              <Bell className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-700">Next event starting in 15 minutes!</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-700">Food court wait times: 5-10 minutes</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Fan Engagement</h2>
              <MessageSquare className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Join Live Poll
              </button>
              <button className="w-full py-2 px-4 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200">
                Play Trivia
              </button>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Social Feed</h2>
              <Share2 className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <p className="font-semibold">John D.</p>
                    <p className="text-gray-600">Amazing atmosphere tonight! #GameDay</p>
                  </div>
                </div>
              </div>
              <div className="border-b pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <p className="font-semibold">Sarah M.</p>
                    <p className="text-gray-600">Best seats in the house! 🏟️</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}