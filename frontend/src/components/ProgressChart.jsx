import React from 'react';

function ProgressChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 text-center py-8">No data available</div>;
  }

  const maxPoints = Math.max(...data.map(item => item.points_earned));
  
  return (
    <div className="space-y-3">
      {data.slice(0, 10).map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="w-20 text-sm text-gray-600">
            {new Date(item.earned_at).toLocaleDateString()}
          </div>
          <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
            <div 
              className="bg-blue-500 h-4 rounded-full flex items-center justify-end pr-2"
              style={{ width: `${(item.points_earned / maxPoints) * 100}%` }}
            >
              <span className="text-xs text-white font-medium">
                {item.points_earned}
              </span>
            </div>
          </div>
          <div className="w-16 text-sm text-gray-600">
            {item.reason}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgressChart;