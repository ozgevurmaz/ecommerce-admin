"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  ReferenceLine
} from "recharts";
import { useState } from "react";

const SalesChart = ({ data }: { data: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Find the highest sales value to set the reference line
  const highestSales = Math.max(...data.map(item => item.sales || 0));
  
  // Find the average sales value
  const averageSales = data.reduce((acc, item) => acc + (item.sales || 0), 0) / data.length;
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
          <p className="text-sm font-medium text-gray-900">{`${label}`}</p>
          <p className="text-sm text-brown">
            <span className="font-medium">Revenue:</span> €{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-1">
          <button 
            className={`px-3 py-1 text-sm rounded-md ${activeIndex === 0 ? 'bg-brown text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setActiveIndex(0)}
          >
            Area
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${activeIndex === 1 ? 'bg-brown text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setActiveIndex(1)}
          >
            Line
          </button>
        </div>
        <div className="flex items-center text-xs text-gray-500 space-x-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-brown rounded-full mr-1 opacity-30"></div>
            <span>Sales</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 border border-dashed border-red-400 mr-1"></div>
            <span>Max Sales</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 border border-dashed border-green-400 mr-1"></div>
            <span>Avg Sales</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {activeIndex === 0 ? (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5A46" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5A46" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `€${value}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#8B5A46" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorSales)" 
              activeDot={{ r: 6, fill: '#8B5A46', stroke: '#fff', strokeWidth: 2 }}
            />
            <ReferenceLine y={highestSales} stroke="#f87171" strokeDasharray="3 3" />
            <ReferenceLine y={averageSales} stroke="#4ade80" strokeDasharray="3 3" />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `€${value}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#8B5A46" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#8B5A46', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#8B5A46', stroke: '#fff', strokeWidth: 2 }}
            />
            <ReferenceLine y={highestSales} stroke="#f87171" strokeDasharray="3 3" />
            <ReferenceLine y={averageSales} stroke="#4ade80" strokeDasharray="3 3" />
          </LineChart>
        )}
      </ResponsiveContainer>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Average Sales</p>
          <p className="text-lg font-semibold text-gray-900">€{averageSales.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Highest Month</p>
          <p className="text-lg font-semibold text-gray-900">
            {data.reduce((max, item) => (item.sales > (max?.sales || 0) ? item : max), { name: '', sales: 0 }).name}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Total Annual Sales</p>
          <p className="text-lg font-semibold text-gray-900">
            €{data.reduce((sum, item) => sum + (item.sales || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;