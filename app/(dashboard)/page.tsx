import SalesChart from "@/components/dashboard/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomer,
  getTotalSales,
} from "@/lib/actions/actions";
import { EuroIcon, ShoppingBag, StoreIcon, UserRound } from "lucide-react";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomers = await getTotalCustomer();
  const graphData = await getSalesPerMonth();

  return (
    <main className="p-10">
      <h2 className="text-heading2-bold">DashBoard</h2>
      <Separator className="my-4 bg-grey mt-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card>
          <CardHeader className="flexBetween flex-row">
            <CardTitle>Total Revenue</CardTitle>
            <EuroIcon className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">€ {totalRevenue}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flexBetween flex-row">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flexBetween flex-row">
            <CardTitle>Total Customers</CardTitle>
            <UserRound />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10">
        <CardHeader className="flexBetween flex-row">
          <CardTitle>Sales Chart (€)</CardTitle>
          <StoreIcon />
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </main>
  );
}
