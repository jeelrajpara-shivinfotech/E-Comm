import DashboardStats from "../../Component/DashboardBase/DashboardStats";
import DashboardTable from "../../Component/DashboardBase/DashboardTable";
import OrderPieChart from "../../Component/DashboardBase/OrderPieChart";
import UserTable from "../../Component/DashboardBase/UserReport";
import OrderReport from "../../Component/DashboardBase/OrderReport";

function Ecommerce() {

  return (
    <div className="md:p-6 p-0 bg-gray-50 overflow-hidden">
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6">
  {/* Area chart */}
  <div className="flex-[1.7] min-w-full lg:min-w-[350px] w-full lg:w-auto">
    <DashboardStats />
  </div>

  {/* Pie chart */}
  <div className="flex-1 min-w-full lg:min-w-[280px] w-full lg:w-auto">
    <OrderPieChart />
  </div>
</div>



      <div className="my-6">
        <DashboardTable />
      </div>
      <div className="my-6">
        <UserTable />
      </div>
      <div className="my-6">
        <OrderReport />
      </div>
    </div>
  );
}

export default Ecommerce;
