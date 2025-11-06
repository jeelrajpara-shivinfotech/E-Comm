import BaseTable from "../BASE/BaseTable";
import { getUserReport } from "../../Api/DashboardApi";
import { dashboardHeaders, userReportColumn } from "../../common/constants/DashboardCardConstants";


export default function UserReport() {
  return (
    <BaseTable
      title={dashboardHeaders.userReport}
      columns={userReportColumn}
      fetchDataFn={getUserReport}
      searchPlaceholder="Search by name or email..."
    />
  );
}
