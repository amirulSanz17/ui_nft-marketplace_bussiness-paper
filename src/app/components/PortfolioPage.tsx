import { Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import InteractiveChart from "./InteractiveChart";
import MiniChart from "./MiniChart";
import {
  calculateNFTIndex,
  calculateIndexChange,
  generateIndexHistory,
  filterByTimeframe,
} from "../utils/nftIndex";

interface PortfolioPageProps {
  onNavigate: (
    page: "home" | "portfolio" | "shop" | "balance" | "profile" | "nft-detail",
    data?: any,
  ) => void;
  onFilterClick: () => void;
  onProfileClick: () => void;
}

const nfts = [
  {
    id: "HFeastHora-001",
    name: "HFeastHora-001",
    price: "1.05",
    change: "+50.5%",
    icon: "💀",
    currentPrice: 78095317,
    trend: "up" as const,
  },
  {
    id: "THindiaHora-001",
    name: "THindiaHora-001",
    price: "0.65",
    change: "+15.5%",
    icon: "⚙️",
    currentPrice: 51000000,
    trend: "up" as const,
  },
  {
    id: "TDewaSinkro-111",
    name: "TDewaSinkro-111",
    price: "0.70",
    change: "+5.8%",
    icon: "⚡",
    currentPrice: 55000000,
    trend: "up" as const,
  },
  {
    id: "TDewaHora-099",
    name: "TDewaHora-099",
    price: "1.69",
    change: "+10.9%",
    icon: "🌸",
    currentPrice: 132000000,
    trend: "up" as const,
  },
  {
    id: "TSalPriadiSinkro-111",
    name: "TSalPriadiSinkro-111",
    price: "0.90",
    change: "+8.9%",
    icon: "🎸",
    currentPrice: 70000000,
    trend: "up" as const,
  },
];

const timeframes = ["1D", "1W", "1M", "3M", "YTD", "1Y", "5Y", "ALL"];

export default function PortfolioPage({
  onNavigate,
  onFilterClick,
  onProfileClick,
}: PortfolioPageProps) {
  const [allChartData] = useState(generateIndexHistory(365)); // Generate 1 year of data
  const [chartData, setChartData] = useState(allChartData);
  const [selectedTimeframe, setSelectedTimeframe] = useState("ALL");

  const nftIndexValue = calculateNFTIndex();
  const indexChange = calculateIndexChange();
  const totalValue = nftIndexValue * 5; // Assuming user owns equivalent of 5 index units
  const totalChange = Math.round(totalValue * (indexChange / 100));
  const totalChangePercent = indexChange;

  useEffect(() => {
    const filtered = filterByTimeframe(allChartData, selectedTimeframe);
    setChartData(filtered);
  }, [selectedTimeframe, allChartData]);

  return (
    <div className="min-h-full bg-[#f5f5f0] px-4 md:px-8 lg:px-16 py-6">
      <div className="w-full max-w-full lg:max-w-[1400px] mx-auto">
        {/* Header with Profile */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Portfolio</h1>
            <p className="text-sm text-gray-600">My NFT Investments</p>
          </div>
          <button
            onClick={onProfileClick}
            className="hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#2d4a2b] to-[#4a7a4a] rounded-full flex items-center justify-center text-white shadow-lg">
              👤
            </div>
          </button>
        </div>

        {/* Total Assets Card */}
        <div className="bg-gradient-to-br from-[#2d4a2b] to-[#4a7a4a] rounded-2xl p-6 mb-4 text-white shadow-xl">
          <div className="text-sm opacity-90 mb-1">Total Portfolio Value</div>
          <div className="text-3xl md:text-4xl font-bold mb-2">
            Rp{(totalValue / 1000000).toFixed(1)}M
          </div>
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <span className="opacity-90">All Time Return:</span>
              <span className="text-green-300 font-semibold">
                +Rp{(totalChange / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              +{totalChangePercent.toFixed(2)}%
            </div>
            <MiniChart trend="up" color="#ffffff" />
          </div>
        </div>

        {/* Portfolio Value with Interactive Chart */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600 font-medium">
              Performance Chart
            </span>
            <span className="text-xs text-gray-500">Updated just now</span>
          </div>
        </div>

        <InteractiveChart
          data={chartData}
          currentValue={totalValue}
          currentChange={totalChange}
          currentChangePercent={totalChangePercent}
          height={200}
        />

        {/* Timeframe Selector */}
        <div className="bg-[#2d4a2b] rounded-full p-1 flex gap-1 mb-6 mt-4 shadow-md">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`flex-1 py-2 rounded-full text-xs font-medium transition-all ${
                selectedTimeframe === tf
                  ? "bg-white text-[#2d4a2b] shadow-sm"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* NFT List */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold">Holdings</h3>
              <p className="text-sm text-gray-600">{nfts.length} NFTs</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Share holdings"
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={onFilterClick}
                className="bg-black text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
              >
                Filter ▼
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nfts.map((nft) => (
              <button
                key={nft.id}
                onClick={() => onNavigate("nft-detail", nft)}
                className="bg-white rounded-2xl p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 bg-[#2d4a2b] rounded-xl flex items-center justify-center text-2xl shadow-md">
                    {nft.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{nft.name}</div>
                    <div className="text-xs text-gray-600">
                      Floor: {nft.price} ETH
                    </div>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="mb-3 h-12 flex items-end">
                  <MiniChart trend={nft.trend} />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="font-bold text-[#2d4a2b]">
                    Rp. {(nft.currentPrice / 1000000).toFixed(1)}M
                  </div>
                  <div
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      nft.change.startsWith("+")
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {nft.change}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
