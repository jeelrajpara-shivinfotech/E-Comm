import { useState, useEffect } from "react";
import { dashboardCardConstants, dashboardHeaders } from "../../common/constants/dashboardConstants";
import { getDashboardStats } from "../../Api/dashboardApis";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BaseTooltip from "../BaseComponents/BaseTooltip";
import BaseLoader from "../BaseComponents/BaseLoader";

const DashboardStats = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchData = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full  bg-white rounded-2xl shadow-md">
        <BaseLoader />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full h-full">
      <p className="text-lg font-bold mb-14">
        {dashboardHeaders.dashboardOverView}
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          responsive
        >
          <defs>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(40, 46, 202)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgb(40, 46, 202)" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "#333" }}
            interval="preserveStartEnd"
            textAnchor="middle"
            height={40}
            // axisLine={{ stroke: "rgb(227, 227, 227)", strokeWidth: 1 }}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#333" }}
            axisLine={{ stroke: "rgb(227, 227, 227)", strokeWidth: 1 }}
            tickLine={false}
          />
          <Tooltip cursor={{ fill: "transparent" }} content={<BaseTooltip />} />
          {/* <Legend /> */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="rgb(40, 46, 202)"
            fillOpacity={1}
            fill="url(#colorBlue)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardStats;
