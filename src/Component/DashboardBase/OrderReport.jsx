import React from "react";
import BaseTable from "../BASE/BaseTable";
import { getOrderReport } from "../../Api/DashboardApi";
import { dashboardHeaders, orderReportColumns } from "../../common/constants/DashboardCardConstants";



export default function OrderReport() {
  return (
    <BaseTable
      title={dashboardHeaders.orderReport}
      columns={orderReportColumns}
      fetchDataFn={getOrderReport}
      searchPlaceholder="Search by order or customer..."
    />
  );
}
