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
<<<<<<< HEAD
  ReferenceLine
=======
  ReferenceLine,
>>>>>>> 9029510 (fixed things)
} from "recharts";
import { useState } from "react";

const SalesChart = ({ data }: { data: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
<<<<<<< HEAD
  
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
=======

  const highestSales = Math.max(...data.map(item => item.sales || 0));
  const averageSales =
    data.reduce((acc, item) => acc + (item.sales || 0), 0) / data.length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 shadow-md rounded-md border border-border">
          <p className="text-sm font-medium text-card-foreground">{`${label}`}</p>
          <p className="text-sm text-primary">
>>>>>>> 9029510 (fixed things)
            <span className="font-medium">Revenue:</span> €{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
<<<<<<< HEAD
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-1">
          <button 
            className={`px-3 py-1 text-sm rounded-md ${activeIndex === 0 ? 'bg-brown text-white' : 'bg-gray-100 text-gray-600'}`}
=======
      {/* Toggle Buttons & Legend */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-4">
        <div className="flex space-x-1">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeIndex === 0
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
>>>>>>> 9029510 (fixed things)
            onClick={() => setActiveIndex(0)}
          >
            Area
          </button>
<<<<<<< HEAD
          <button 
            className={`px-3 py-1 text-sm rounded-md ${activeIndex === 1 ? 'bg-brown text-white' : 'bg-gray-100 text-gray-600'}`}
=======
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeIndex === 1
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
>>>>>>> 9029510 (fixed things)
            onClick={() => setActiveIndex(1)}
          >
            Line
          </button>
        </div>
<<<<<<< HEAD
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
=======
        <div className="flex items-center text-xs text-muted-foreground space-x-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary rounded-full mr-1 opacity-30"/>
            <span>Sales</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 border border-dashed border-destructive mr-1"/>
            <span>Max Sales</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 border border-dashed border-success mr-1"/>
>>>>>>> 9029510 (fixed things)
            <span>Avg Sales</span>
          </div>
        </div>
      </div>

<<<<<<< HEAD
=======
      {/* Chart */}
>>>>>>> 9029510 (fixed things)
      <ResponsiveContainer width="100%" height={300}>
        {activeIndex === 0 ? (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
<<<<<<< HEAD
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
=======
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
>>>>>>> 9029510 (fixed things)
              tickFormatter={(value) => `€${value}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
<<<<<<< HEAD
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
=======
            <Area
              type="monotone"
              dataKey="sales"
              stroke="var(--primary)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)"
              activeDot={{
                r: 6,
                fill: "var(--primary)",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />
            <ReferenceLine y={highestSales} stroke="var(--destructive)" strokeDasharray="3 3" />
            <ReferenceLine y={averageSales} stroke="var(--success)" strokeDasharray="3 3" />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
>>>>>>> 9029510 (fixed things)
              tickFormatter={(value) => `€${value}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
<<<<<<< HEAD
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
=======
            <Line
              type="monotone"
              dataKey="sales"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "var(--primary)",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "var(--primary)",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />
            <ReferenceLine y={highestSales} stroke="var(--destructive)" strokeDasharray="3 3" />
            <ReferenceLine y={averageSales} stroke="var(--success)" strokeDasharray="3 3" />
          </LineChart>
        )}
      </ResponsiveContainer>

      {/* Stats Summary */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
          <p className="text-xs text-muted-foreground mb-1">Average Sales</p>
          <p className="text-sm md:text-lg font-semibold text-card-foreground">
            €{averageSales.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
          <p className="text-xs text-muted-foreground mb-1">Highest Month</p>
          <p className="text-sm md:text-lg font-semibold text-card-foreground">
            {
              data.reduce((max, item) =>
                item.sales > (max?.sales || 0) ? item : max,
                { name: "", sales: 0 }
              ).name
            }
          </p>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
          <p className="text-xs text-muted-foreground mb-1">Total Annual Sales</p>
          <p className="text-sm md:text-lg font-semibold text-card-foreground">
>>>>>>> 9029510 (fixed things)
            €{data.reduce((sum, item) => sum + (item.sales || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default SalesChart;
=======
export default SalesChart;
>>>>>>> 9029510 (fixed things)
