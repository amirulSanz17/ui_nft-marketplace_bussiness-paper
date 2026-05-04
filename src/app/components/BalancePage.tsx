import {
  Star,
  List,
  Plus,
  Minus,
  Share2,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface BalancePageProps {
  onNavigate: (
    page:
      | "home"
      | "portfolio"
      | "orders"
      | "balance"
      | "nft-detail"
      | "crypto"
      | "social-fund",
  ) => void;
  onTopUpClick: () => void;
}

export default function BalancePage({
  onNavigate,
  onTopUpClick,
}: BalancePageProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<"IDR" | "USD">(
    "IDR",
  );
  const [expandedCards, setExpandedCards] = useState({
    idr: false,
    usd: false,
    yourFund: false,
    ourFund: false,
  });

  const toggleCard = (card: keyof typeof expandedCards) => {
    setExpandedCards((prev) => ({ ...prev, [card]: !prev[card] }));
  };

  return (
    <div className="min-h-full bg-[#f5f5f0] px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl">Balance</h1>
        <div className="flex gap-3">
          <button aria-label="View favorites">
            <Star className="w-6 h-6" />
          </button>
          <button aria-label="View history">
            <List className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedCurrency("IDR")}
          className={`flex-1 py-2 rounded-full transition-colors ${
            selectedCurrency === "IDR"
              ? "bg-[#2d4a2b] text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => onNavigate("crypto")}
          className="flex-1 py-2 rounded-full transition-colors bg-white border border-gray-300 hover:bg-gray-50"
        >
          Crypto
        </button>
      </div>

      {/* Total Balance */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-gray-600">Total Balance</span>
          <TrendingUp className="w-4 h-4 text-gray-400" />
          <div className="ml-auto bg-black text-white rounded-full px-3 py-1 text-xs flex items-center gap-1">
            IDR $
          </div>
        </div>
        <div className="text-3xl mb-1 flex items-center gap-2">
          RP.0
          <button
            aria-label="View balance details"
            className="text-gray-400 text-lg"
          >
            ^
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Total Withdrawable</span>
          <button
            aria-label="More information"
            className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center text-xs"
          >
            i
          </button>
        </div>
      </div>

      {/* IDR Cash Card */}
      <div className="bg-[#d4d9d4] rounded-2xl p-4 mb-3 relative">
        <button
          onClick={() => toggleCard("idr")}
          aria-label="Toggle IDR cash details"
          className="absolute top-4 right-4"
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedCards.idr ? "rotate-180" : ""}`}
          />
        </button>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
            🇮🇩
          </div>
          <span>IDR Cash</span>
        </div>
        <div className="text-2xl mb-4">RP.0</div>
        <div className="flex gap-8">
          <button
            onClick={onTopUpClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <span>Top Up</span>
          </button>
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
              <Minus className="w-4 h-4" />
            </div>
            <span>Cash Out</span>
          </button>
        </div>
      </div>

      {/* USD Cash Card */}
      <div className="bg-[#d4d9d4] rounded-2xl p-4 mb-6 relative">
        <button
          onClick={() => toggleCard("usd")}
          aria-label="Toggle USD cash details"
          className="absolute top-4 right-4"
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedCards.usd ? "rotate-180" : ""}`}
          />
        </button>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-blue-600 text-white text-xs">
            🇺🇸
          </div>
          <span>USD Cash</span>
        </div>
        <div className="text-2xl mb-4">RP.0</div>
        <div className="flex gap-8">
          <button
            onClick={onTopUpClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <span>Top Up</span>
          </button>
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
              <Minus className="w-4 h-4" />
            </div>
            <span>Cash Out</span>
          </button>
        </div>
      </div>

      {/* Social Fund Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl">Sosial fund</h2>
          <button
            onClick={() => onNavigate("social-fund")}
            className="px-4 py-1 border border-black rounded-full text-sm hover:bg-black hover:text-white transition-colors"
          >
            See All
          </button>
        </div>

        {/* Your Social Fund */}
        <button
          onClick={() => toggleCard("yourFund")}
          className="w-full bg-[#d4d9d4] rounded-2xl p-4 mb-3 relative text-left"
        >
          <div className="absolute top-4 right-4">
            <Share2 className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-2xl">💰</div>
            <span className="text-sm">Your Social fund</span>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-xl mb-1">Rp450.000</div>
          <div className="text-sm">
            <span className="text-gray-600">dianation</span>
            <span className="text-green-600 ml-2">+ Rp100.000</span>
            <span className="text-xs text-gray-500 ml-1">1M</span>
          </div>
        </button>

        {/* Our Social Fund */}
        <button
          onClick={() => toggleCard("ourFund")}
          className="w-full bg-[#d4d9d4] rounded-2xl p-4 relative text-left"
        >
          <div className="absolute top-4 right-4">
            <Share2 className="w-5 h-5" />
          </div>
          <div className="flex items-start gap-2 mb-2">
            <div className="text-2xl">🌳</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">OUR SOCIAL FUND</span>
                <span className="text-xs text-gray-600">
                  kita tanam bersama
                </span>
              </div>
              <div className="text-xl mb-1">Rp450.000.000</div>
              <div className="text-sm mb-2">
                <span className="text-gray-600">dianation</span>
                <span className="text-green-600 ml-2">+ Rp10.000.000</span>
                <span className="text-xs text-gray-500 ml-1">1M</span>
              </div>
              <p className="text-xs text-gray-700">
                Yiha bisa kita memilih lingkungan yang kamu inginkan lebih sehat
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
