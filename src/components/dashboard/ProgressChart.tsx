import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressChartProps {
  projects: any[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ projects }) => {
  // Transform data for chart
  const chartData = projects && projects.length > 0 
    ? projects.map(project => ({
        name: project.name || 'Unnamed Project',
        progress: project.progress || 0,
        status: project.status || 'Pending'
      }))
    : [];

  return (
    <div className="progress-chart">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="progress" fill="#005AFF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="no-data">
          <p>No project data available for chart</p>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;
