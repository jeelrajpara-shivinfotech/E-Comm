import DashboardStats from "../../Component/DashboardBase/DashboardStats";
import DashboardTable from "../../Component/DashboardBase/DashboardTable";
import OrderPieChart from "../../Component/DashboardBase/OrderPieChart";

function Ecommerce() {
  return (
    <div className="md:p-6 p-0 bg-gray-50 overflow-hidden">
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-6">
        <div className="flex-[1.7] min-w-full lg:min-w-[350px] w-full lg:w-auto">
          <DashboardStats />
        </div>
        <div className="flex-1 min-w-full lg:min-w-[280px] w-full lg:w-auto">
          <OrderPieChart />
        </div>
      </div>
      <div className="my-6">
        <DashboardTable />
      </div>
    </div>
  );
}

export default Ecommerce;
