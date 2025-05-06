import SalesChart from "@/components/dashboard/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  TrendingUpIcon,
  StoreIcon,
  ArrowUpIcon,
  ArrowDownIcon
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
      <div className="h-12 w-[80px] bg-gray-100 rounded-md flex items-end overflow-hidden">

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
    <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-heading2-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Welcome to your Stylie admin dashboard</p>
        </div>
        <div className="bg-white p-2 rounded-md shadow-sm">
          <select className="text-sm text-gray-700 outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      <Separator className="my-6 bg-gray-200" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <EuroIcon className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold text-gray-800">€{totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {revenueGrowth >= 0 ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(revenueGrowth)}% from previous period
                  </span>
                </div>
              </div>
              {
                getSparkline("bg-blue-500")
              }
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold text-gray-800">{totalOrders.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {ordersGrowth >= 0 ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${ordersGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(ordersGrowth)}% from previous period
                  </span>
                </div>
              </div>
              {
                getSparkline("bg-purple-500")
              }
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
            <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
              <UserRound className="h-5 w-5 text-pink-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold text-gray-800">{totalCustomers.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {customersGrowth >= 0 ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${customersGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(customersGrowth)}% from previous period
                  </span>
                </div>
              </div>
              {
                getSparkline("bg-pink-500")
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="border-none shadow-md col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-gray-800">Sales Overview</CardTitle>
              <p className="text-xs text-gray-500 mt-1">Monthly sales performance</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUpIcon className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <SalesChart data={graphData} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-gray-800">Top Products</CardTitle>
              <p className="text-xs text-gray-500 mt-1">Best performing items</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <StoreIcon className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts ? (
                topProducts.slice(0, 5).map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md bg-gray-200 mr-3 overflow-hidden">
                        {product.image && (
                          <img
                            src={product.image[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.title}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <p className="font-medium text-sm">€{product.sales}</p>
                  </div>
                ))
              ) : (
                Array(5).fill(0).map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md bg-gray-200 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium">Product {index + 1}</p>
                        <p className="text-xs text-gray-500">Category</p>
                      </div>
                    </div>
                    <p className="font-medium text-sm">€{(Math.random() * 1000).toFixed(0)}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}