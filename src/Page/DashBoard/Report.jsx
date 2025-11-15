import { getOrderReport, getUserReport } from "../../Api/reportApis"
import { dashboardHeaders, placeHolderConst } from "../../common/constants/dashboardConstants"
import { orderReportColumns, userReportColumn } from "../../common/constants/reportConstants"
import BaseTable from "../../Component/BaseComponents/BaseTable"
function Report() {
    return (
        <div className="md:p-6">
            <div className="">
                <BaseTable
                    title={dashboardHeaders.orderReport}
                    columns={orderReportColumns}
                    fetchDataFn={getOrderReport}
                    searchPlaceholder={placeHolderConst.orderPlaceHolder}
                    pageKey="page"
                    limitKey="limit"
                    noDataFound={dashboardHeaders.noOrderFound}
                />
            </div>
            <div className="my-6">

                <BaseTable
                    title={dashboardHeaders.userReport}
                    columns={userReportColumn}
                    fetchDataFn={getUserReport}
                    searchPlaceholder={placeHolderConst.userPlaceHolder}
                    pageKey="page"
                    limitKey="limit"
                    noDataFound={dashboardHeaders.noUserFound}
                /></div>
        </div>
    )
}

export default Report