import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { getHighestPurchaseOrder } from "../../Api/dashboardApi";
import BaseTooltip from "../Base/BaseTooltip";
import { dashboardHeaders } from "../../common/constants/dashboardConstants";

const DashboardBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHighestPurchaseOrder();
        const formatted =
          res?.data?.map((item) => ({
            name: item?.user?.name || "Unknown",
            total: Number(item?.total_price) || 0,
          })) || [];
        setChartData(formatted);
      } catch (err) {
        console.error("Error fetching purchase order data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 shadow-sm rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">{dashboardHeaders.highestPurchaseOrder}</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
          barSize={60}
          responsive
        >
          <CartesianGrid horizontal={false} vertical={false} />

          <XAxis
            dataKey="name"
            textAnchor="middle"
            style={{ fontSize: "12px", fill: "#555" }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "12px", fill: "#555" }}
          />

          <Tooltip
            formatter={(value) => `₹${value.toLocaleString()}`}
            cursor={{ fill: "transparent" }}
            content={<BaseTooltip />}
          />

          <Bar dataKey="total" radius={[10, 10, 0, 0]} animationDuration={1200}>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill="rgb(40, 46, 202)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardBarChart;
