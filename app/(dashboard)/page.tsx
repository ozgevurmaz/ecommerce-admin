import PageHeader from "@/components/customUI/PageHeader";
import { DashboardCard } from "@/components/dashboard/dashboardCard";
import { SalesOverviewCard } from "@/components/dashboard/salesCardOverview";
import SalesChart from "@/components/dashboard/SalesChart";
import { TopProductsCard } from "@/components/dashboard/topProductsCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomer,
  getTotalSales,
  getTopProducts
} from "@/lib/actions/actions";
import {
  EuroIcon,
  ShoppingBag,
  UserRound,
} from "lucide-react";

export default async function Dashboard() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomers = await getTotalCustomer();
  const graphData = await getSalesPerMonth();
  const topProducts = await getTopProducts();

  const revenueGrowth = 12.5;
  const ordersGrowth = 8.3;
  const customersGrowth = 15.2;

  const getSparkline = (color: string) => {
    return (
      <div className="h-12 w-[80px] bg-card rounded-md flex items-end overflow-hidden">
        <div className={`h-6 w-3 ${color} mx-[1px]`}></div>
        <div className={`h-8 w-3 ${color} mx-[1px]`}></div>
        <div className={`h-4 w-3 ${color} mx-[1px]`}></div>
        <div className={`h-10 w-3 ${color} mx-[1px]`}></div>
        <div className={`h-7 w-3 ${color} mx-[1px]`}></div>
        <div className={`h-11 w-3 ${color} mx-[1px]`}></div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <PageHeader title="Dashboard Overview" subtitle="Welcome to your Stylie admin dashboard" />

        <Select>
          <SelectTrigger className="w-[160px] py-1 text-sm mt-1 border-border bg-input">
            <SelectValue placeholder="Select a range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="this-month">This month</SelectItem>
            <SelectItem value="this-year">This year</SelectItem>
          </SelectContent>
        </Select>

      </div>

      <Separator className="my-6 bg-border" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <DashboardCard
          title="Total Revenue"
          value={totalRevenue}
          growth={revenueGrowth}
          icon={<EuroIcon className="h-5 w-5 text-chart-1" />}
          chartBg="bg-chart-1"
          chart={getSparkline("bg-chart-1")}
        />
        <DashboardCard
          title="Total Orders"
          value={totalOrders}
          growth={ordersGrowth}
          icon={<ShoppingBag className="h-5 w-5 text-chart-3" />}
          chartBg="bg-chart-3"
          chart={getSparkline("bg-chart-3")}
        />
        <DashboardCard
          title="Total Customers"
          value={totalCustomers}
          growth={customersGrowth}
          icon={<UserRound className="h-5 w-5 text-chart-5" />}
          chartBg="bg-chart-5"
          chart={getSparkline("bg-chart-5")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-4 justify-center">
        <SalesOverviewCard chart={<SalesChart data={graphData} />} />
        <TopProductsCard products={topProducts} />
      </div>

    </div>
  );
}