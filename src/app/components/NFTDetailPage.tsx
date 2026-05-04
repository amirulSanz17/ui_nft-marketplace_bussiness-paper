import {
  ArrowLeft,
  Star,
  List,
  ChevronDown,
  Share2,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import InteractiveChart from "./InteractiveChart";
import StreamWidget from "./StreamWidget";

interface NFTDetailPageProps {
  nft: any;
  onNavigate: (
    page:
      | "home"
      | "portfolio"
      | "orders"
      | "balance"
      | "profile"
      | "nft-detail",
  ) => void;
  onBuyClick: () => void;
  onSellClick: () => void;
}

const timeframes = ["1D", "1W", "1M", "3M", "YTD", "1Y", "5Y", "ALL"];

const generateNFTChartData = (days: number = 365) => {
  const data: Array<{ date: string; value: number; change: number }> = [];
  const startValue = 78095317 / 1.505;
  const endValue = 78095317;
  const points = days;

  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1);
    const randomness = (Math.random() - 0.5) * 2000000;
    const value = startValue + (endValue - startValue) * progress + randomness;
    const prevValue = i > 0 ? data[i - 1].value : startValue;
    const change = value - prevValue;

    const date = new Date();
    date.setDate(date.getDate() - (points - i - 1));

    data.push({
      date: date.toLocaleDateString("id-ID", {
        month: "short",
        day: "numeric",
      }),
      value: Math.round(value),
      change: Math.round(change),
    });
  }

  return data;
};

const filterChartByTimeframe = (allData: any[], timeframe: string) => {
  let daysToShow = allData.length;

  switch (timeframe) {
    case "1D":
      daysToShow = 1;
      break;
    case "1W":
      daysToShow = 7;
      break;
    case "1M":
      daysToShow = 30;
      break;
    case "3M":
      daysToShow = 90;
      break;
    case "YTD":
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      daysToShow = Math.floor(
        (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
      );
      break;
    case "1Y":
      daysToShow = 365;
      break;
    case "5Y":
      daysToShow = 365 * 5;
      break;
    case "ALL":
      return allData;
  }

  return allData.slice(-daysToShow);
};

export default function NFTDetailPage({
  nft,
  onNavigate,
  onBuyClick,
  onSellClick,
}: NFTDetailPageProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("ALL");
  const [selectedTab, setSelectedTab] = useState<
    "details" | "orders" | "activity"
  >("details");
  const [expandedSections, setExpandedSections] = useState({
    about: true,
    blockchain: false,
    contract: false,
    collection: false,
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [allChartData] = useState(generateNFTChartData(365));
  const [chartData, setChartData] = useState(allChartData);

  useEffect(() => {
    const filtered = filterChartByTimeframe(allChartData, selectedTimeframe);
    setChartData(filtered);
  }, [selectedTimeframe, allChartData]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const currentPrice = nft?.currentPrice || 78095317;
  const ethPrice = nft?.price || "1.05";
  const nftName = nft?.name || "HFeastHora-#001";
  const nftIcon = nft?.icon || "💀";

  return (
    <div className="min-h-full bg-[#f5f5f0]">
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between bg-white sticky top-0 z-10 shadow-sm">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          aria-label="Back to home"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Star
              className={`w-6 h-6 ${isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`}
            />
          </button>
          <button type="button" aria-label="Share NFT">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* NFT Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-[#2d4a2b] rounded-xl flex items-center justify-center text-3xl shadow-md">
            {nftIcon}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{nftName}</h1>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              Feast Collection <span className="text-blue-500">✓</span>
            </p>
          </div>
        </div>

        {/* Interactive Chart */}
        <InteractiveChart
          data={chartData}
          currentValue={currentPrice}
          currentChange={10000000}
          currentChangePercent={50.5}
          height={160}
        />

        {/* ETH Price */}
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <span>{ethPrice} ETH</span>
          <ChevronDown className="w-4 h-4" />
        </div>

        {/* Timeframe Selector */}
        <div className="grid grid-cols-8 gap-1 mb-6 mt-4">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`py-1.5 rounded text-xs transition-colors ${
                selectedTimeframe === tf
                  ? "bg-[#2d4a2b] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedTab("details")}
            className={`px-6 py-2 rounded-full text-sm transition-colors ${
              selectedTab === "details"
                ? "bg-white shadow-sm"
                : "bg-[#2d4a2b] text-white"
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setSelectedTab("orders")}
            className={`px-6 py-2 rounded-full text-sm transition-colors ${
              selectedTab === "orders"
                ? "bg-white shadow-sm"
                : "bg-[#2d4a2b] text-white"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setSelectedTab("activity")}
            className={`px-6 py-2 rounded-full text-sm transition-colors ${
              selectedTab === "activity"
                ? "bg-white shadow-sm"
                : "bg-[#2d4a2b] text-white"
            }`}
          >
            Activity
          </button>
        </div>

        {/* Live Activity Stream */}
        <div className="mb-4">
          <StreamWidget />
        </div>

        {/* About Section */}
        <button
          onClick={() => toggleSection("about")}
          className="w-full bg-white rounded-2xl p-4 mb-3 text-left shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">About {nftName}</h3>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedSections.about ? "rotate-180" : ""}`}
            />
          </div>
          {expandedSections.about && (
            <p className="text-sm text-gray-700 leading-relaxed">
              NFT Phygital ini menawarkan hoodie upcycled eksklusif dari
              kolaborasi Hoodie Fest di Horta, lengkap dengan sertifikat digital
              NFT sebagai bukti keaslian dan akses konten spesial. Setiap
              pembelian Anda secara otomatis berkontribusi pada program
              kehutanan, menjadikan ini koleksi yang berdampak sosial.
            </p>
          )}
        </button>

        {/* Blockchain Detail */}
        <div className="w-full bg-white rounded-2xl mb-3 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("blockchain")}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="text-lg">📋</div>
              <span className="font-medium">Blockchain Details</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedSections.blockchain ? "rotate-180" : ""}`}
            />
          </button>

          {expandedSections.blockchain && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="space-y-3 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Network</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      Ethereum Mainnet
                    </span>
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Token Standard</span>
                  <span className="text-sm font-medium">ERC-721</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Token ID</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-600">
                      #001
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("1")}
                      aria-label="Copy token ID"
                    >
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600">Metadata</span>
                  <div className="text-right">
                    <span className="text-sm font-medium">Decentralized</span>
                    <p className="text-xs text-gray-500">IPFS</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Smart Contract Info */}
        <div className="w-full bg-white rounded-2xl mb-3 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("contract")}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="text-lg">⚙️</div>
              <span className="font-medium">Smart Contract</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${expandedSections.contract ? "rotate-180" : ""}`}
            />
          </button>

          {expandedSections.contract && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="space-y-3 pt-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">
                      Contract Address
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          "0x5a9d4a1e8f7b2c3d4e5f6a7b8c9d0e1f2a3b4c5d",
                        )
                      }
                      aria-label="Copy contract address"
                    >
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-between">
                    <code className="text-xs font-mono text-gray-700">
                      0x5a9d...4c5d
                    </code>
                    <a
                      href="https://etherscan.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                      aria-label="Open contract on Etherscan"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Creator Royalty</span>
                  <span className="text-sm font-medium">10%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Supply</span>
                  <span className="text-sm font-medium">1,000 NFTs</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Minted</span>
                  <span className="text-sm font-medium">456 / 1,000</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600">Contract Type</span>
                  <div className="text-right">
                    <span className="text-sm font-medium">
                      Upgradeable Proxy
                    </span>
                    <p className="text-xs text-gray-500">OpenZeppelin</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Verified Contract
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      ✓ Verified
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://etherscan.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-blue-50 text-blue-600 rounded-lg text-xs hover:bg-blue-100 transition-colors"
                    >
                      View on Etherscan
                    </a>
                    <a
                      href="https://opensea.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-blue-50 text-blue-600 rounded-lg text-xs hover:bg-blue-100 transition-colors"
                    >
                      View on OpenSea
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* More from Collection */}
        <button
          onClick={() => toggleSection("collection")}
          className="w-full bg-white rounded-2xl p-4 mb-24 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2">
            <div className="text-lg">🖼️</div>
            <span className="font-medium">More from this collection</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedSections.collection ? "rotate-180" : ""}`}
          />
        </button>

        {/* Action Buttons */}
        <div className="fixed bottom-16 md:bottom-20 left-0 right-0 px-4 md:px-8 py-3 bg-white border-t border-gray-200 shadow-xl">
          <div className="max-w-md mx-auto">
            {/* Quick Stats */}
            <div className="flex items-center justify-between mb-3 text-sm">
              <div className="text-gray-600">
                <div className="text-xs">Floor Price</div>
                <div className="font-semibold text-black">{ethPrice} ETH</div>
              </div>
              <div className="text-gray-600 text-right">
                <div className="text-xs">24h Volume</div>
                <div className="font-semibold text-black">152 ETH</div>
              </div>
              <div className="text-gray-600 text-right">
                <div className="text-xs">Your Balance</div>
                <div className="font-semibold text-green-600">1.05 NFT</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onSellClick}
                className="flex-1 py-3.5 bg-white border-2 border-red-500 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
                Sell NFT
              </button>
              <button
                onClick={onBuyClick}
                className="flex-1 py-3.5 bg-[#2d4a2b] text-white rounded-xl hover:bg-[#3d5a3b] transition-colors font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Buy NFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
