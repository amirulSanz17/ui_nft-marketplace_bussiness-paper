import { X, CreditCard, Building2, Smartphone } from "lucide-react";
import { useState } from "react";

interface TopUpModalProps {
  onClose: () => void;
}

const amounts = [50000, 100000, 250000, 500000, 1000000, 2000000];

export default function TopUpModal({ onClose }: TopUpModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(100000);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "bank" | "ewallet"
  >("card");

  const displayAmount = customAmount
    ? parseInt(customAmount) || 0
    : selectedAmount;

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90%] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg">Top Up Balance</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close top up modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          {/* Amount Selection */}
          <div className="mb-6">
            <h3 className="text-sm mb-3">Select Amount</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  className={`py-3 rounded-lg border ${
                    selectedAmount === amount && !customAmount
                      ? "border-[#2d4a2b] bg-[#2d4a2b] text-white"
                      : "border-gray-300"
                  }`}
                >
                  {amount >= 1000000
                    ? `${amount / 1000000}M`
                    : `${amount / 1000}K`}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-sm mb-3">Payment Method</h3>
            <div className="space-y-2">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`w-full p-4 rounded-lg border flex items-center gap-3 ${
                  paymentMethod === "card"
                    ? "border-[#2d4a2b] bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <div className="flex-1 text-left">
                  <div className="text-sm">Credit/Debit Card</div>
                  <div className="text-xs text-gray-600">
                    Visa, Mastercard, etc
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "card"
                      ? "border-[#2d4a2b]"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "card" && (
                    <div className="w-3 h-3 bg-[#2d4a2b] rounded-full" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("bank")}
                className={`w-full p-4 rounded-lg border flex items-center gap-3 ${
                  paymentMethod === "bank"
                    ? "border-[#2d4a2b] bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <Building2 className="w-5 h-5" />
                <div className="flex-1 text-left">
                  <div className="text-sm">Bank Transfer</div>
                  <div className="text-xs text-gray-600">
                    BCA, Mandiri, BNI, BRI
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "bank"
                      ? "border-[#2d4a2b]"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "bank" && (
                    <div className="w-3 h-3 bg-[#2d4a2b] rounded-full" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("ewallet")}
                className={`w-full p-4 rounded-lg border flex items-center gap-3 ${
                  paymentMethod === "ewallet"
                    ? "border-[#2d4a2b] bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <div className="flex-1 text-left">
                  <div className="text-sm">E-Wallet</div>
                  <div className="text-xs text-gray-600">
                    GoPay, OVO, DANA, ShopeePay
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "ewallet"
                      ? "border-[#2d4a2b]"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "ewallet" && (
                    <div className="w-3 h-3 bg-[#2d4a2b] rounded-full" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-sm">
                Rp. {displayAmount.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Admin Fee</span>
              <span className="text-sm">Rp. 2.500</span>
            </div>
            <div className="border-t border-gray-300 pt-2 flex justify-between">
              <span>Total</span>
              <span className="text-lg">
                Rp. {(displayAmount + 2500).toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full py-4 bg-[#2d4a2b] text-white rounded-xl">
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
