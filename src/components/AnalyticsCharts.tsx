import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useThemeStore } from '../stores/useThemeStore';

interface AnalyticsChartsProps {
  timeRange: string;
}

export function AnalyticsCharts({ timeRange }: AnalyticsChartsProps) {
  const revenueChartRef = useRef<SVGSVGElement>(null);
  const attendanceChartRef = useRef<SVGSVGElement>(null);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    if (!revenueChartRef.current || !attendanceChartRef.current) return;

    // Generate dummy data based on timeRange
    const dataPoints = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const revenueData = Array.from({ length: dataPoints }, (_, i) => ({
      date: d3.timeDay.offset(new Date(), -i),
      value: Math.random() * 50000 + 25000
    })).reverse();

    const attendanceData = Array.from({ length: dataPoints }, (_, i) => ({
      date: d3.timeDay.offset(new Date(), -i),
      value: Math.random() * 30 + 60
    })).reverse();

    // Chart dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create revenue chart
    const revenueChart = d3.select(revenueChartRef.current);
    revenueChart.selectAll('*').remove();

    const revenueG = revenueChart
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(revenueData, d => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(revenueData, d => d.value) as number])
      .range([height, 0]);

    const line = d3.line<typeof revenueData[0]>()
      .x(d => x(d.date))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    revenueG.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    revenueG.append('g')
      .call(d3.axisLeft(y));

    revenueG.append('path')
      .datum(revenueData)
      .attr('fill', 'none')
      .attr('stroke', '#4f46e5')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Create attendance chart
    const attendanceChart = d3.select(attendanceChartRef.current);
    attendanceChart.selectAll('*').remove();

    const attendanceG = attendanceChart
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const attendanceY = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    const attendanceLine = d3.line<typeof attendanceData[0]>()
      .x(d => x(d.date))
      .y(d => attendanceY(d.value))
      .curve(d3.curveMonotoneX);

    attendanceG.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    attendanceG.append('g')
      .call(d3.axisLeft(attendanceY));

    attendanceG.append('path')
      .datum(attendanceData)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2)
      .attr('d', attendanceLine);

  }, [timeRange, isDarkMode]);

  return (
    <div className={`grid md:grid-cols-2 gap-6 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } p-6 rounded-lg shadow-md transition-colors duration-200`}>
      <div>
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <svg ref={revenueChartRef} className="w-full" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Attendance Rate</h3>
        <svg ref={attendanceChartRef} className="w-full" />
      </div>
    </div>
  );
}