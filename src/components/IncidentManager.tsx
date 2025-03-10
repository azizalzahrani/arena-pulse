import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Clock, Filter, Plus, X, ArrowRight, AlertCircle } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';

interface Incident {
  id: string;
  type: 'security' | 'medical' | 'maintenance' | 'crowd';
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  description: string;
  timestamp: Date;
  assignedTo?: string;
  notes: string[];
}

interface SuggestedAction {
  title: string;
  description: string;
  steps: string[];
  priority: 'immediate' | 'high' | 'normal';
  estimatedTime: string;
}

export function IncidentManager() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: '1',
      type: 'crowd',
      status: 'open',
      priority: 'high',
      location: 'Gate A',
      description: 'Crowd density exceeding 85% threshold',
      timestamp: new Date(),
      notes: ['Security team dispatched', 'Opening additional gates']
    },
    {
      id: '2',
      type: 'maintenance',
      status: 'in-progress',
      priority: 'medium',
      location: 'Section 103',
      description: 'Escalator malfunction',
      timestamp: new Date(Date.now() - 3600000),
      assignedTo: 'Maintenance Team B',
      notes: ['Technician en route']
    }
  ]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getPriorityColor = (priority: Incident['priority']) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'high':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    }
  };

  const getStatusIcon = (status: Incident['status']) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
  };

  const getSuggestedActions = (incident: Incident): SuggestedAction[] => {
    switch (incident.type) {
      case 'crowd':
        return [{
          title: 'Immediate Crowd Control',
          description: 'Implement rapid crowd management procedures',
          steps: [
            'Deploy additional security personnel to affected area',
            'Open alternative entry/exit points',
            'Activate digital signage for crowd redirection',
            'Monitor CCTV for bottlenecks'
          ],
          priority: 'immediate',
          estimatedTime: '5-10 minutes'
        }, {
          title: 'Communication Protocol',
          description: 'Establish clear communication channels',
          steps: [
            'Alert all section supervisors',
            'Update mobile app with wait times',
            'Broadcast announcements in affected areas',
            'Notify emergency services if needed'
          ],
          priority: 'high',
          estimatedTime: '2-5 minutes'
        }];
      
      case 'medical':
        return [{
          title: 'Medical Response Protocol',
          description: 'Activate emergency medical services',
          steps: [
            'Dispatch nearest medical team',
            'Clear path for medical access',
            'Prepare medical equipment',
            'Document incident details'
          ],
          priority: 'immediate',
          estimatedTime: '1-3 minutes'
        }];
      
      case 'maintenance':
        return [{
          title: 'Equipment Assessment',
          description: 'Evaluate and repair facility issues',
          steps: [
            'Isolate affected area',
            'Perform safety checks',
            'Deploy maintenance team',
            'Prepare alternative routes/solutions'
          ],
          priority: 'high',
          estimatedTime: '15-30 minutes'
        }];
      
      default:
        return [{
          title: 'Standard Response Protocol',
          description: 'Follow general incident response procedures',
          steps: [
            'Assess situation severity',
            'Alert relevant personnel',
            'Document incident details',
            'Monitor for escalation'
          ],
          priority: 'normal',
          estimatedTime: '5-15 minutes'
        }];
    }
  };

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } p-6 rounded-lg shadow-md transition-colors duration-200`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Incident Management</h2>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Incident
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {incidents.map((incident) => (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            } cursor-pointer transition-colors`}
            onClick={() => setSelectedIncident(incident)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {getStatusIcon(incident.status)}
                <div>
                  <h3 className="font-semibold">{incident.description}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {incident.location} • {incident.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(incident.priority)}`}>
                {incident.priority}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIncident && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={() => setSelectedIncident(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{selectedIncident.description}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedIncident.location} • {selectedIncident.timestamp.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className={`px-3 py-1 rounded text-sm font-medium ${getPriorityColor(selectedIncident.priority)}`}>
                      {selectedIncident.priority}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {getStatusIcon(selectedIncident.status)}
                      <span>{selectedIncident.status}</span>
                    </div>
                  </div>

                  {selectedIncident.assignedTo && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Assigned To
                      </h3>
                      <p>{selectedIncident.assignedTo}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Notes & Updates
                    </h3>
                    <div className="space-y-2">
                      {selectedIncident.notes.map((note, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                          }`}
                        >
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-indigo-500" />
                      Suggested Actions
                    </h3>
                    <div className="space-y-4">
                      {getSuggestedActions(selectedIncident).map((action, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            isDarkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{action.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded ${
                              action.priority === 'immediate' ? 'bg-red-100 text-red-700 dark:bg-red-900/20' :
                              action.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20' :
                              'bg-blue-100 text-blue-700 dark:bg-blue-900/20'
                            }`}>
                              {action.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {action.description}
                          </p>
                          <div className="space-y-2">
                            {action.steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="flex items-center gap-2 text-sm">
                                <ArrowRight className="w-4 h-4 text-indigo-500" />
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 text-sm text-gray-500">
                            Estimated time: {action.estimatedTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Add Note
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  Update Status
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}