import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { getOrderStatusCount } from "../../Api/DashboardApi";
import { pieChartTabs , dashboardHeaders , pieChartColor} from "../../common/constants/DashboardCardConstants";

const OrderPieChart = () => {
  const [timeFrame, setTimeFrame] = useState("year");
  const [chartData, setChartData] = useState([]);

  const fetchData = async (selectedTimeFrame = timeFrame) => {
    try {
      const res = await getOrderStatusCount({ timeFrame: selectedTimeFrame });
      const total = res.data.reduce((sum, d) => sum + (d.value || 0), 0) || 1;
      const data = res.data.map((item, index) => ({
        name: item.label,
        value: item.value ?? 0,
        percent: ((item.value ?? 0) / total) * 100,
        color: pieChartColor[index % pieChartColor.length],
      }));
      setChartData(data);
    } catch (error) {
      console.error("Error fetching order status count:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [timeFrame]);

  const calcEndAngle = (percent) => 90 - (percent / 100) * 360;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm  h-full">
      <div className="flex justify-between items-start mb-6 sm:flex-wrap gap-2">
        <p className=" text-lg font-bold">{dashboardHeaders.ordersOverView}</p>
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
         {pieChartTabs.map((tab) => (
            <option key={tab} value={tab}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between flex-wrap md:flex-nowrap lg:flex-nowrap">
        {/* Chart */}
        <div className="w-[300px] h-[300px]">
          <ResponsiveContainer>
            <PieChart responsive>
              {chartData.map((entry, index) => (
                <Pie
                  key={index}
                  data={[entry]}
                  dataKey="value"
                  startAngle={90}
                  endAngle={calcEndAngle(entry.percent)}
                  innerRadius={50 + index * 20}
                  outerRadius={65 + index * 20}
                  stroke="none"
                  className="border rounded-4xl"
                  cornerRadius={20}
                >
                  <Cell fill={entry.color} className="bg-blue-700" />
                </Pie>
              ))}
            </PieChart>
          </ResponsiveContainer>
        </div>


        <div className="space-y-3 text-md">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2 flex-wrap">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="text-gray-500">{item.name}</div>
              <div className="font-semibold text-black ml-1">
                {item.percent.toFixed(2)}+
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPieChart;
