import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { Download, Filter } from 'lucide-react';
import { useThemeStore } from '../stores/useThemeStore';

interface AnalyticsData {
  timestamp: Date;
  attendance: number;
  revenue: number;
  satisfaction: number;
}

export function AdvancedAnalytics() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [timeRange, setTimeRange] = useState('7d');
  const [data] = useState<AnalyticsData[]>(() => {
    // Generate sample data
    const now = new Date();
    return Array.from({ length: 30 }, (_, i) => ({
      timestamp: new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000),
      attendance: Math.random() * 30 + 60,
      revenue: Math.random() * 50000 + 25000,
      satisfaction: Math.random() * 20 + 75
    }));
  });

  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 80, bottom: 30, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.timestamp) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    const yRevenue = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.revenue) as number])
      .range([height, 0]);

    const line = d3.line<AnalyticsData>()
      .x(d => x(d.timestamp))
      .y(d => y(d.attendance))
      .curve(d3.curveMonotoneX);

    const revenueLine = d3.line<AnalyticsData>()
      .x(d => x(d.timestamp))
      .y(d => yRevenue(d.revenue))
      .curve(d3.curveMonotoneX);

    const satisfactionLine = d3.line<AnalyticsData>()
      .x(d => x(d.timestamp))
      .y(d => y(d.satisfaction))
      .curve(d3.curveMonotoneX);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));

    g.append('g')
      .attr('transform', `translate(${width},0)`)
      .call(d3.axisRight(yRevenue));

    // Add lines
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#4f46e5')
      .attr('stroke-width', 2)
      .attr('d', line);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2)
      .attr('d', revenueLine);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2)
      .attr('d', satisfactionLine);

    // Add legend
    const legend = g.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'start')
      .selectAll('g')
      .data(['Attendance', 'Revenue', 'Satisfaction'])
      .join('g')
      .attr('transform', (d, i) => `translate(${width + 10},${i * 20})`);

    legend.append('rect')
      .attr('x', -19)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d, i) => ['#4f46e5', '#10b981', '#f59e0b'][i]);

    legend.append('text')
      .attr('x', -24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(d => d);

  }, [data, isDarkMode]);

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } p-6 rounded-lg shadow-md transition-colors duration-200`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Advanced Analytics</h2>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
            } px-4 py-2 rounded-lg`}
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Average Attendance
            </h3>
            <p className="text-2xl font-bold mt-1">78.5%</p>
            <p className="text-sm text-green-600">↑ 2.1% from last period</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold mt-1">$847,293</p>
            <p className="text-sm text-green-600">↑ 5.3% from last period</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fan Satisfaction
            </h3>
            <p className="text-2xl font-bold mt-1">92%</p>
            <p className="text-sm text-green-600">↑ 1.8% from last period</p>
          </motion.div>
        </div>

        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <svg ref={chartRef} className="w-full" />
        </div>
      </div>
    </div>
  );
}