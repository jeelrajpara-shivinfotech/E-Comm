import BaseTable from "../BaseComponents/BaseTable";
import { getUserReport } from "../../Api/dashboardApi";
import { dashboardHeaders, placeHolderConst, userReportColumn } from "../../common/constants/dashboardConstants";

export default function UserReport() {
  return (
    <BaseTable
      title={dashboardHeaders.userReport}
      columns={userReportColumn}
      fetchDataFn={getUserReport}
      searchPlaceholder={placeHolderConst.userPlaceHolder}
    />
  );
}
