import DashboardCard from "../../Component/DashboardBase/DashboardCard";
import DashboardTable from "../../Component/DashboardBase/DashboardTable";
import OrderPieChart from "../../Component/DashboardBase/OrderPieChart";
import UserTable from "../../Component/DashboardBase/UserReport";
import OrderReport from "../../Component/DashboardBase/OrderReport";

function Ecommerce() {

  return (
    <div className="md:p-6 p-0 bg-gray-50 ">
      <div className="flex flex-wrap justify-between gap-6">
        <div className="flex-1 min-w-[300px]">
          <DashboardCard />
        </div>
        <div className="flex-1 min-w-[300px]">
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
        <OrderReport/>
      </div>
    </div>
  );
}

export default Ecommerce;
