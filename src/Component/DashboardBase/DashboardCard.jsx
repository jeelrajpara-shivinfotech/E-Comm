import { useState, useEffect } from "react";
import { dashboardCardConstants, dashboardHeaders } from "../../common/constants/dashboardConstants";
import { getDashboardStats } from "../../Api/dashboardApi";
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import BaseTooltip from "../Base/BaseTooltip";

const DashboardCard = () => {
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getDashboardStats();
      const data = res?.data ?? {};
      const formattedData = dashboardCardConstants.map((item) => ({
        label: item.title,
       value: data?.[item.key] ?? 0,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
    }
  };

  console.log("chartData", chartData);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full h-full">
      <p className="text-lg font-bold mb-6">{dashboardHeaders.dashboardOverView}</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} barSize={45} responsive="true" >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
          />

          <YAxis allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<BaseTooltip />}
          />

          <Legend />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="rgb(40, 46, 202)">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="rgb(40, 46, 202)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardCard;
