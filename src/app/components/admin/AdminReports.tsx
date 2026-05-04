import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";
import { useState } from "react";

export default function AdminReports() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("month");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState("5");

  const periods = [
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];

  const summaryStats = [
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: "Rp 125,500,000",
      change: "+12.5%",
      isPositive: true,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: ShoppingCart,
      label: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      isPositive: true,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      label: "New Customers",
      value: "456",
      change: "+15.3%",
      isPositive: true,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Package,
      label: "Products Sold",
      value: "2,891",
      change: "-3.2%",
      isPositive: false,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const revenueByCategory = [
    { category: "NFT Sales", amount: 45600000, percentage: 36.3 },
    { category: "Physical Products", amount: 38200000, percentage: 30.4 },
    { category: "Accessories", amount: 22100000, percentage: 17.6 },
    { category: "Electronics", amount: 15800000, percentage: 12.6 },
    { category: "Others", amount: 3800000, percentage: 3.1 },
  ];

  const topCustomers = [
    { name: "Alice Johnson", orders: 45, spent: 15200000 },
    { name: "Bob Smith", orders: 38, spent: 12800000 },
    { name: "Charlie Brown", orders: 32, spent: 10500000 },
    { name: "Diana Prince", orders: 28, spent: 9200000 },
    { name: "Eve Wilson", orders: 25, spent: 8100000 },
  ];

  const monthlyRevenue = [
    { month: "Jan", revenue: 98500000 },
    { month: "Feb", revenue: 105200000 },
    { month: "Mar", revenue: 112800000 },
    { month: "Apr", revenue: 118600000 },
    { month: "May", revenue: 125500000 },
  ];

  const categoryWidthClasses: Record<number, string> = {
    36.3: "w-[36.3%]",
    30.4: "w-[30.4%]",
    17.6: "w-[17.6%]",
    12.6: "w-[12.6%]",
    3.1: "w-[3.1%]",
  };

  const monthlyWidthClasses: Record<number, string> = {
    78.5: "w-[78.5%]",
    83.8: "w-[83.8%]",
    89.9: "w-[89.9%]",
    94.5: "w-[94.5%]",
    100: "w-[100%]",
  };

  const handleDownloadReport = () => {
    alert(
      `Downloading ${selectedPeriod} report for ${selectedMonth}/${selectedYear}...\n\nReport will be downloaded as PDF.`,
    );
  };

  return (
    <>
      {/* Period Selector */}
      <div className="bg-white rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold">Report Period</h3>
          </div>
          <button
            onClick={handleDownloadReport}
            className="px-4 py-2 bg-[#2d4a2b] text-white rounded-lg text-sm flex items-center gap-2 hover:bg-[#3d5a3b] transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value as any)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedPeriod === period.value
                  ? "bg-[#2d4a2b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="report-year"
              className="block text-xs text-gray-600 mb-1"
            >
              Year
            </label>
            <select
              id="report-year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a2b]"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="report-month"
              className="block text-xs text-gray-600 mb-1"
            >
              Month
            </label>
            <select
              id="report-month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2d4a2b]"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2026, i).toLocaleString("id-ID", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {summaryStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-4">
            <div
              className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center mb-2`}
            >
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
            <p className="text-lg font-bold mb-1">{stat.value}</p>
            <div
              className={`text-xs flex items-center gap-1 ${
                stat.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue by Category */}
      <div className="bg-white rounded-2xl p-4 mb-4">
        <h3 className="font-bold mb-4">Revenue by Category</h3>
        <div className="space-y-3">
          {revenueByCategory.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">{item.category}</span>
                <span className="text-sm font-bold">
                  Rp {item.amount.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`bg-[#2d4a2b] h-2 rounded-full transition-all ${categoryWidthClasses[item.percentage] ?? "w-full"}`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {item.percentage}% of total
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Revenue Trend */}
      <div className="bg-white rounded-2xl p-4 mb-4">
        <h3 className="font-bold mb-4">Monthly Revenue Trend</h3>
        <div className="space-y-2">
          {monthlyRevenue.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-sm font-medium w-12">{item.month}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className={`bg-green-500 h-2 rounded-full transition-all ${monthlyWidthClasses[Number(((item.revenue / 125500000) * 100).toFixed(1))] ?? "w-full"}`}
                  />
                </div>
              </div>
              <span className="text-sm font-bold ml-3">
                Rp {(item.revenue / 1000000).toFixed(1)}M
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-2xl p-4 mb-4">
        <h3 className="font-bold mb-4">Top Customers</h3>
        <div className="space-y-3">
          {topCustomers.map((customer, index) => (
            <div
              key={index}
              className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#2d4a2b] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium">{customer.name}</p>
                  <p className="text-xs text-gray-500">
                    {customer.orders} orders
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#2d4a2b]">
                  Rp {customer.spent.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-2xl p-4">
        <h3 className="font-bold mb-3">Export Options</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => alert("Exporting to PDF...")}
            className="px-4 py-3 bg-red-50 text-red-700 rounded-xl text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={() => alert("Exporting to Excel...")}
            className="px-4 py-3 bg-green-50 text-green-700 rounded-xl text-sm hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>
    </>
  );
}
