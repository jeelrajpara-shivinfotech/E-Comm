import React from "react";
import BaseTable from "../BaseComponents/BaseTable";
import { getOrderReport } from "../../Api/dashboardApis";
import { dashboardHeaders, orderReportColumns, placeHolderConst } from "../../common/constants/dashboardConstants";

export default function OrderReport() {
  return (
    <BaseTable
      title={dashboardHeaders.orderReport}
      columns={orderReportColumns}
      fetchDataFn={getOrderReport}
      searchPlaceholder={placeHolderConst.orderPlaceHolder}
    />
  );
}
