import {
  ArrowLeft,
  Package,
  Image,
  FileText,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
  Lock,
} from "lucide-react";
import { useState } from "react";
import AdminProducts from "./AdminProducts";
import AdminNFTs from "./AdminNFTs";
import AdminReports from "./AdminReports";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "nfts" | "reports"
  >("dashboard");

  const stats = [
    {
      icon: DollarSign,
      title: "Total Revenue",
      value: "Rp 125,500,000",
      change: "+12.5%",
      changeType: "positive" as const,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: ShoppingCart,
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive" as const,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      title: "Total Users",
      value: "5,678",
      change: "+15.3%",
      changeType: "positive" as const,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Image,
      title: "NFTs Minted",
      value: "892",
      change: "+22.1%",
      changeType: "positive" as const,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-1234",
      customer: "Alice Johnson",
      product: "Premium Sneakers NFT",
      amount: "Rp 2,500,000",
      status: "Completed",
      date: "2026-05-03",
    },
    {
      id: "#ORD-1233",
      customer: "Bob Smith",
      product: "Designer Watch",
      amount: "Rp 5,200,000",
      status: "Processing",
      date: "2026-05-03",
    },
    {
      id: "#ORD-1232",
      customer: "Charlie Brown",
      product: "Luxury Bag NFT",
      amount: "Rp 8,900,000",
      status: "Completed",
      date: "2026-05-02",
    },
    {
      id: "#ORD-1231",
      customer: "Diana Prince",
      product: "Limited Jacket",
      amount: "Rp 3,200,000",
      status: "Shipped",
      date: "2026-05-02",
    },
    {
      id: "#ORD-1230",
      customer: "Eve Wilson",
      product: "Exclusive Headphones",
      amount: "Rp 1,800,000",
      status: "Completed",
      date: "2026-05-01",
    },
  ];

  const topProducts = [
    { name: "Premium Sneakers NFT", sales: 156, revenue: "Rp 45,600,000" },
    { name: "Designer Watch Collection", sales: 89, revenue: "Rp 28,400,000" },
    { name: "Luxury Bag Series", sales: 67, revenue: "Rp 22,100,000" },
    { name: "Limited Edition Jacket", sales: 45, revenue: "Rp 15,800,000" },
  ];

  return (
    <div className="min-h-full bg-[#f5f5f0]">
      {/* Header */}
      <div className="px-4 py-4 bg-white mb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("profile")}
              aria-label="Back to profile"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-xs text-gray-600">
                Nerch Marketplace Management
              </p>
            </div>
          </div>
          <div className="w-10 h-10 bg-[#2d4a2b] rounded-full flex items-center justify-center text-white">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "dashboard"
                ? "bg-[#2d4a2b] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Activity className="w-4 h-4 inline mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "products"
                ? "bg-[#2d4a2b] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            Products
          </button>
          <button
            onClick={() => setActiveTab("nfts")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "nfts"
                ? "bg-[#2d4a2b] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Image className="w-4 h-4 inline mr-2" />
            NFTs
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "reports"
                ? "bg-[#2d4a2b] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Reports
          </button>
        </div>
      </div>

      <div className="px-4 pb-20">
        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-4">
                  <div
                    className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center mb-3`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <div className="text-xs text-gray-600 mb-1">{stat.title}</div>
                  <div className="text-xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change} this month
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold">Recent Orders</h2>
                <button className="text-sm text-[#2d4a2b]">View All</button>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="pb-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">{order.id}</div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {order.customer}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      {order.product}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-[#2d4a2b]">
                        {order.amount}
                      </div>
                      <div className="text-xs text-gray-500">{order.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl p-4">
              <h2 className="font-bold mb-4">Top Selling Products</h2>
              <div className="space-y-3">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1">
                      <div className="text-sm mb-1">{product.name}</div>
                      <div className="text-xs text-gray-600">
                        {product.sales} sales
                      </div>
                    </div>
                    <div className="text-sm font-bold text-[#2d4a2b]">
                      {product.revenue}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Products Tab */}
        {activeTab === "products" && <AdminProducts />}

        {/* NFTs Tab */}
        {activeTab === "nfts" && <AdminNFTs />}

        {/* Reports Tab */}
        {activeTab === "reports" && <AdminReports />}
      </div>
    </div>
  );
}
