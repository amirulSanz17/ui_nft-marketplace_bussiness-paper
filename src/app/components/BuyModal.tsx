import { X, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";

interface BuyModalProps {
  nft: any;
  onClose: () => void;
}

export default function BuyModal({ nft, onClose }: BuyModalProps) {
  const [amount, setAmount] = useState("");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [limitPrice, setLimitPrice] = useState("");

  const currentPrice = 78095317;
  const ethPrice = 1.05;
  const estimatedFee = 25000;
  const quantity = parseFloat(amount) || 0;
  const totalCost =
    orderType === "market"
      ? quantity * currentPrice + estimatedFee
      : quantity * (parseFloat(limitPrice) || currentPrice) + estimatedFee;

  const handleBuy = () => {
    // Simulate buy order
    alert(
      `Buy order placed!\n${quantity} NFT @ Rp. ${(totalCost / quantity).toLocaleString("id-ID")}`,
    );
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90%] overflow-auto scrollbar-hide">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg">Buy {nft?.name || "NFT"}</h2>
            <p className="text-xs text-gray-600">
              Current: Rp. {currentPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close modal">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          {/* Order Type */}
          <div className="mb-4">
            <h3 className="text-sm mb-2">Order Type</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setOrderType("market")}
                className={`flex-1 py-2 rounded-lg border ${
                  orderType === "market"
                    ? "border-[#2d4a2b] bg-[#2d4a2b] text-white"
                    : "border-gray-300"
                }`}
              >
                Market
              </button>
              <button
                onClick={() => setOrderType("limit")}
                className={`flex-1 py-2 rounded-lg border ${
                  orderType === "limit"
                    ? "border-[#2d4a2b] bg-[#2d4a2b] text-white"
                    : "border-gray-300"
                }`}
              >
                Limit
              </button>
            </div>
          </div>

          {/* Limit Price */}
          {orderType === "limit" && (
            <div className="mb-4">
              <label className="text-sm mb-2 block">Limit Price (Rp)</label>
              <input
                type="number"
                placeholder={currentPrice.toString()}
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d4a2b]"
              />
            </div>
          )}

          {/* Quantity */}
          <div className="mb-4">
            <label className="text-sm mb-2 block">Quantity</label>
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d4a2b]"
            />
            <div className="flex gap-2 mt-2">
              {[0.1, 0.25, 0.5, 1].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val.toString())}
                  className="flex-1 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                >
                  {val} NFT
                </button>
              ))}
            </div>
          </div>

          {/* Price Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-start gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Market Price:</strong> Rp.{" "}
              {currentPrice.toLocaleString("id-ID")}
              <br />
              <span className="text-xs">≈ {ethPrice} ETH</span>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">Quantity</span>
              <span>{quantity || 0} NFT</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">Price per NFT</span>
              <span>
                Rp.{" "}
                {(orderType === "limit"
                  ? parseFloat(limitPrice) || currentPrice
                  : currentPrice
                ).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">Transaction Fee</span>
              <span>Rp. {estimatedFee.toLocaleString("id-ID")}</span>
            </div>
            <div className="border-t border-gray-300 pt-2 flex justify-between">
              <span>Total</span>
              <span className="text-lg">
                Rp. {totalCost.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-800">
              {orderType === "market"
                ? "Market orders execute immediately at the best available price."
                : "Limit orders only execute when the price reaches your specified limit."}
            </p>
          </div>

          {/* Available Balance */}
          <div className="mb-4 text-sm text-gray-600">
            Available Balance:{" "}
            <span className="text-black">Rp. 10.000.000</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-4 border-2 border-gray-300 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleBuy}
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex-1 py-4 bg-[#2d4a2b] text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Buy {orderType === "market" ? "Now" : "Limit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
