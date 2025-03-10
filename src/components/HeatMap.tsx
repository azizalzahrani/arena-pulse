import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useAnalyticsStore } from '../stores/useAnalyticsStore';
import { AlertTriangle, Users, TrendingUp, TrendingDown, Activity, Clock, ChevronDown, ChevronUp, Thermometer, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeatMapProps {
  width: number;
  height: number;
}

interface Zone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  density: number;
  capacity: number;
  currentOccupancy: number;
  flowRate: number;
  trend: 'up' | 'down' | 'stable';
  alerts: Array<{ type: 'warning' | 'critical'; message: string }>;
  lastUpdate: Date;
  temperature: number;
  humidity: number;
  history: Array<{ timestamp: Date; density: number }>;
}

export function HeatMap({ width, height }: HeatMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [zones, setZones] = useState<Record<string, Zone>>(() => {
    // Generate initial zones with historical data
    const generateHistory = () => {
      const now = new Date();
      return Array.from({ length: 24 }, (_, i) => ({
        timestamp: new Date(now.getTime() - (23 - i) * 3600000),
        density: Math.random() * 100
      }));
    };

    return {
      'main-entrance': {
        id: 'main-entrance',
        name: 'Main Entrance',
        x: 10,
        y: 10,
        width: 200,
        height: 100,
        density: 65,
        capacity: 1000,
        currentOccupancy: 650,
        flowRate: 120,
        trend: 'up',
        temperature: 23.5,
        humidity: 45,
        alerts: [],
        lastUpdate: new Date(),
        history: generateHistory()
      },
      'north-stands': {
        id: 'north-stands',
        name: 'North Stands',
        x: 10,
        y: 120,
        width: 300,
        height: 150,
        density: 85,
        capacity: 15000,
        currentOccupancy: 12750,
        flowRate: 50,
        trend: 'stable',
        temperature: 24.2,
        humidity: 48,
        alerts: [
          { type: 'warning', message: 'High density detected' }
        ],
        lastUpdate: new Date(),
        history: generateHistory()
      },
      'vip-section': {
        id: 'vip-section',
        name: 'VIP Section',
        x: 320,
        y: 120,
        width: 150,
        height: 150,
        density: 45,
        capacity: 500,
        currentOccupancy: 225,
        flowRate: 15,
        trend: 'up',
        temperature: 22.8,
        humidity: 42,
        alerts: [],
        lastUpdate: new Date(),
        history: generateHistory()
      },
      'concessions': {
        id: 'concessions',
        name: 'Concessions',
        x: 220,
        y: 10,
        width: 250,
        height: 100,
        density: 92,
        capacity: 800,
        currentOccupancy: 736,
        flowRate: 85,
        trend: 'up',
        temperature: 25.1,
        humidity: 52,
        alerts: [
          { type: 'critical', message: 'Critical density - Consider flow control' }
        ],
        lastUpdate: new Date(),
        history: generateHistory()
      },
      'south-stands': {
        id: 'south-stands',
        name: 'South Stands',
        x: 10,
        y: 280,
        width: 300,
        height: 150,
        density: 78,
        capacity: 15000,
        currentOccupancy: 11700,
        flowRate: 45,
        trend: 'down',
        temperature: 24.5,
        humidity: 47,
        alerts: [],
        lastUpdate: new Date(),
        history: generateHistory()
      }
    };
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const colorScale = d3.scaleSequential()
      .domain([0, 100])
      .interpolator(d3.interpolateReds);

    // Create container for zones
    const zonesGroup = svg.append('g')
      .attr('class', 'zones');

    // Draw zones
    Object.values(zones).forEach(zone => {
      const zoneGroup = zonesGroup.append('g')
        .attr('class', 'zone')
        .attr('transform', `translate(${zone.x},${zone.y})`)
        .style('cursor', 'pointer')
        .on('click', () => {
          setSelectedZone(zone);
          setShowDetails(true);
        })
        .on('mouseover', function() {
          d3.select(this).select('rect')
            .transition()
            .duration(200)
            .attr('filter', 'url(#glow)');
        })
        .on('mouseout', function() {
          d3.select(this).select('rect')
            .transition()
            .duration(200)
            .attr('filter', null);
        });

      // Add glow filter
      const defs = svg.append('defs');
      const filter = defs.append('filter')
        .attr('id', 'glow');
      filter.append('feGaussianBlur')
        .attr('stdDeviation', '2')
        .attr('result', 'coloredBlur');
      const feMerge = filter.append('feMerge');
      feMerge.append('feMergeNode')
        .attr('in', 'coloredBlur');
      feMerge.append('feMergeNode')
        .attr('in', 'SourceGraphic');

      // Zone background
      zoneGroup.append('rect')
        .attr('width', zone.width)
        .attr('height', zone.height)
        .attr('rx', 4)
        .attr('fill', colorScale(zone.density))
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);

      // Zone label
      zoneGroup.append('text')
        .attr('x', zone.width / 2)
        .attr('y', zone.height / 2 - 10)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('font-weight', 'bold')
        .text(zone.name);

      // Density label
      zoneGroup.append('text')
        .attr('x', zone.width / 2)
        .attr('y', zone.height / 2 + 10)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .text(`${Math.round(zone.density)}% Full`);

      // Add alert indicators if any
      if (zone.alerts.length > 0) {
        zoneGroup.append('circle')
          .attr('cx', zone.width - 10)
          .attr('cy', 10)
          .attr('r', 5)
          .attr('fill', zone.alerts.some(a => a.type === 'critical') ? '#ef4444' : '#f59e0b')
          .attr('class', 'animate-pulse');
      }

      // Add trend indicator
      const trendColor = zone.trend === 'up' ? '#10b981' : zone.trend === 'down' ? '#ef4444' : '#6b7280';
      zoneGroup.append('circle')
        .attr('cx', 10)
        .attr('cy', 10)
        .attr('r', 4)
        .attr('fill', trendColor);
    });

  }, [zones, width, height]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prevZones => {
        const newZones = { ...prevZones };
        Object.keys(newZones).forEach(id => {
          const zone = newZones[id];
          // Random fluctuation in density
          const densityChange = Math.random() * 6 - 3;
          zone.density = Math.max(0, Math.min(100, zone.density + densityChange));
          zone.currentOccupancy = Math.round(zone.capacity * (zone.density / 100));
          
          // Update trend
          if (densityChange > 1) zone.trend = 'up';
          else if (densityChange < -1) zone.trend = 'down';
          else zone.trend = 'stable';

          // Update alerts
          zone.alerts = [];
          if (zone.density >= 90) {
            zone.alerts.push({ type: 'critical', message: 'Critical density - Immediate action required' });
          } else if (zone.density >= 75) {
            zone.alerts.push({ type: 'warning', message: 'High density warning' });
          }

          // Update environmental data
          zone.temperature += (Math.random() * 0.4 - 0.2);
          zone.humidity += (Math.random() * 2 - 1);
          zone.humidity = Math.max(30, Math.min(70, zone.humidity));
          
          zone.lastUpdate = new Date();
          
          // Update history
          zone.history.push({
            timestamp: new Date(),
            density: zone.density
          });
          if (zone.history.length > 24) {
            zone.history.shift();
          }
        });
        return newZones;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone Overview Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.values(zones).map((zone) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer transition-all ${
                selectedZone?.id === zone.id ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => {
                setSelectedZone(zone);
                setShowDetails(true);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{zone.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{zone.currentOccupancy.toLocaleString()} / {zone.capacity.toLocaleString()}</span>
                  </div>
                </div>
                {zone.alerts.length > 0 && (
                  <div className="flex -space-x-1">
                    {zone.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          alert.type === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                        } animate-pulse`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Density Gauge */}
                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                      zone.density >= 90 ? 'bg-red-500'
                      : zone.density >= 75 ? 'bg-yellow-500'
                      : 'bg-green-500'
                    }`}
                    style={{ width: `${zone.density}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Density</div>
                    <div className="text-lg font-semibold">{Math.round(zone.density)}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Flow Rate</div>
                    <div className="text-lg font-semibold">{zone.flowRate}/min</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Trend</div>
                    <div className="flex items-center gap-1">
                      {zone.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : zone.trend === 'down' ? (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      ) : (
                        <Activity className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Environmental Data */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    {zone.temperature.toFixed(1)}°C
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    {Math.round(zone.humidity)}%
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    {zone.lastUpdate.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Zone Distribution Map */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Zone Distribution</h3>
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg"
          />
        </div>
      </div>

      {/* Zone Details Panel */}
      <AnimatePresence>
        {selectedZone && showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">{selectedZone.name} Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showDetails ? <ChevronDown className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
              </button>
            </div>

            {/* Historical Density Chart */}
            <div className="h-64">
              {/* D3.js line chart implementation for historical density data */}
              {selectedZone.history.length > 0 && (
                <svg
                  width="100%"
                  height="100%"
                  className="overflow-visible"
                >
                  {/* Chart will be rendered here using D3.js */}
                </svg>
              )}
            </div>

            {/* Additional metrics and insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Peak Occupancy</h4>
                <div className="text-2xl font-bold">
                  {Math.max(...selectedZone.history.map(h => h.density)).toFixed(1)}%
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Average Density</h4>
                <div className="text-2xl font-bold">
                  {(selectedZone.history.reduce((acc, curr) => acc + curr.density, 0) / selectedZone.history.length).toFixed(1)}%
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Trend Analysis</h4>
                <div className="flex items-center gap-2">
                  {selectedZone.trend === 'up' ? (
                    <>
                      <TrendingUp className="w-6 h-6 text-green-500" />
                      <span className="text-green-500">Increasing</span>
                    </>
                  ) : selectedZone.trend === 'down' ? (
                    <>
                      <TrendingDown className="w-6 h-6 text-red-500" />
                      <span className="text-red-500">Decreasing</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-6 h-6 text-gray-500" />
                      <span className="text-gray-500">Stable</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}