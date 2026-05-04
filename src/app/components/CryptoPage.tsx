import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface CryptoPageProps {
  onNavigate: (page: string) => void;
}

interface NFTHolding {
  id: string;
  name: string;
  icon: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

interface Transaction {
  id: string;
  type: "buy" | "sell" | "transfer";
  nftName: string;
  nftIcon: string;
  quantity: number;
  price: number;
  total: number;
  fee: number;
  date: Date;
  status: "completed" | "pending" | "failed";
}

const myNFTs: NFTHolding[] = [
  {
    id: "HFeastHora-001",
    name: "HFeastHora-001",
    icon: "💀",
    quantity: 1.05,
    avgBuyPrice: 51933211,
    currentPrice: 78095317,
    totalValue: 81999983,
    profitLoss: 30066772,
    profitLossPercent: 57.9,
  },
  {
    id: "THindiaHora-001",
    name: "THindiaHora-001",
    icon: "⚙️",
    quantity: 0.75,
    avgBuyPrice: 44217391,
    currentPrice: 51000000,
    totalValue: 38250000,
    profitLoss: 5087043,
    profitLossPercent: 15.35,
  },
  {
    id: "TDewaSinkro-111",
    name: "TDewaSinkro-111",
    icon: "⚡",
    quantity: 0.5,
    avgBuyPrice: 51981132,
    currentPrice: 55000000,
    totalValue: 27500000,
    profitLoss: 1509434,
    profitLossPercent: 5.8,
  },
];

const transactions: Transaction[] = [
  {
    id: "TX001",
    type: "buy",
    nftName: "HFeastHora-001",
    nftIcon: "💀",
    quantity: 0.5,
    price: 52000000,
    total: 26025000,
    fee: 25000,
    date: new Date(2026, 4, 1, 10, 30),
    status: "completed",
  },
  {
    id: "TX002",
    type: "buy",
    nftName: "HFeastHora-001",
    nftIcon: "💀",
    quantity: 0.55,
    price: 51866667,
    total: 28526667,
    fee: 25000,
    date: new Date(2026, 3, 28, 14, 15),
    status: "completed",
  },
  {
    id: "TX003",
    type: "buy",
    nftName: "THindiaHora-001",
    nftIcon: "⚙️",
    quantity: 0.75,
    price: 44217391,
    total: 33188043,
    fee: 25000,
    date: new Date(2026, 3, 25, 9, 20),
    status: "completed",
  },
  {
    id: "TX004",
    type: "buy",
    nftName: "TDewaSinkro-111",
    nftIcon: "⚡",
    quantity: 0.5,
    price: 51981132,
    total: 26015566,
    fee: 25000,
    date: new Date(2026, 3, 20, 16, 45),
    status: "completed",
  },
  {
    id: "TX005",
    type: "sell",
    nftName: "HFeastHora-001",
    nftIcon: "💀",
    quantity: 0.25,
    price: 75000000,
    total: 18725000,
    fee: 25000,
    date: new Date(2026, 4, 2, 11, 0),
    status: "pending",
  },
];

export default function CryptoPage({ onNavigate }: CryptoPageProps) {
  const [selectedTab, setSelectedTab] = useState<"holdings" | "transactions">(
    "holdings",
  );

  const totalPortfolioValue = myNFTs.reduce(
    (sum, nft) => sum + nft.totalValue,
    0,
  );
  const totalProfitLoss = myNFTs.reduce((sum, nft) => sum + nft.profitLoss, 0);
  const totalProfitLossPercent =
    (totalProfitLoss / (totalPortfolioValue - totalProfitLoss)) * 100;

  return (
    <div className="min-h-full bg-[#f5f5f0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => onNavigate("balance")}
            aria-label="Back to balance"
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Crypto Assets</h1>
            <p className="text-sm text-gray-600">
              NFT Portfolio & Transactions
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-16 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Portfolio Summary Card */}
          <div className="bg-gradient-to-br from-[#2d4a2b] to-[#4a7a4a] rounded-2xl p-6 mb-6 text-white shadow-xl">
            <div className="text-sm opacity-90 mb-1">Total Portfolio Value</div>
            <div className="text-3xl md:text-4xl font-bold mb-3">
              Rp {(totalPortfolioValue / 1000000).toFixed(2)}M
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {totalProfitLoss >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-300" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-300" />
                )}
                <span
                  className={`font-semibold ${totalProfitLoss >= 0 ? "text-green-300" : "text-red-300"}`}
                >
                  {totalProfitLoss >= 0 ? "+" : ""}Rp{" "}
                  {(totalProfitLoss / 1000000).toFixed(2)}M
                </span>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  totalProfitLoss >= 0 ? "bg-green-500/20" : "bg-red-500/20"
                }`}
              >
                {totalProfitLoss >= 0 ? "+" : ""}
                {totalProfitLossPercent.toFixed(2)}%
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="opacity-80 text-xs">Total NFTs</div>
                <div className="font-semibold">{myNFTs.length} Types</div>
              </div>
              <div>
                <div className="opacity-80 text-xs">Total Quantity</div>
                <div className="font-semibold">
                  {myNFTs
                    .reduce((sum, nft) => sum + nft.quantity, 0)
                    .toFixed(2)}
                </div>
              </div>
              <div>
                <div className="opacity-80 text-xs">Transactions</div>
                <div className="font-semibold">{transactions.length}</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSelectedTab("holdings")}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                selectedTab === "holdings"
                  ? "bg-[#2d4a2b] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Holdings ({myNFTs.length})
            </button>
            <button
              onClick={() => setSelectedTab("transactions")}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                selectedTab === "transactions"
                  ? "bg-[#2d4a2b] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Transactions ({transactions.length})
            </button>
          </div>

          {/* Holdings Tab */}
          {selectedTab === "holdings" && (
            <div className="space-y-3">
              {myNFTs.map((nft) => (
                <div
                  key={nft.id}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#2d4a2b] rounded-xl flex items-center justify-center text-2xl shadow-sm">
                      {nft.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{nft.name}</div>
                      <div className="text-sm text-gray-600">
                        {nft.quantity} NFT
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        Rp {(nft.totalValue / 1000000).toFixed(2)}M
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          nft.profitLoss >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {nft.profitLoss >= 0 ? "+" : ""}Rp{" "}
                        {(nft.profitLoss / 1000000).toFixed(2)}M
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100 text-sm">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Avg Buy</div>
                      <div className="font-medium">
                        Rp {(nft.avgBuyPrice / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Current</div>
                      <div className="font-medium">
                        Rp {(nft.currentPrice / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">P/L %</div>
                      <div
                        className={`font-semibold ${
                          nft.profitLossPercent >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {nft.profitLossPercent >= 0 ? "+" : ""}
                        {nft.profitLossPercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Transactions Tab */}
          {selectedTab === "transactions" && (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {tx.nftIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            tx.type === "buy"
                              ? "bg-green-100 text-green-700"
                              : tx.type === "sell"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {tx.type.toUpperCase()}
                        </span>
                        <span className="font-semibold text-sm">
                          {tx.nftName}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {tx.quantity} NFT @ Rp {(tx.price / 1000000).toFixed(2)}
                        M
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {tx.date.toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          {tx.status === "completed" ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span className="text-green-600">Completed</span>
                            </>
                          ) : tx.status === "pending" ? (
                            <>
                              <Clock className="w-3 h-3 text-yellow-600" />
                              <span className="text-yellow-600">Pending</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-red-600" />
                              <span className="text-red-600">Failed</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div
                        className={`font-bold ${
                          tx.type === "buy" ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {tx.type === "buy" ? "-" : "+"}Rp{" "}
                        {(tx.total / 1000000).toFixed(2)}M
                      </div>
                      <div className="text-xs text-gray-500">
                        Fee: Rp {(tx.fee / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
