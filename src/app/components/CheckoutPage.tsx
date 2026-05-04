import {
  ArrowLeft,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  Building2,
  Smartphone,
  Check,
} from "lucide-react";
import { useState } from "react";
import type { CartItem } from "../App";

interface CheckoutPageProps {
  cart: CartItem[];
  onNavigate: (page: string) => void;
  onCheckoutComplete: () => void;
}

export default function CheckoutPage({
  cart,
  onNavigate,
  onCheckoutComplete,
}: CheckoutPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Info
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
    // Payment
    paymentMethod: "card" as "card" | "bank" | "ewallet" | "cod",
    // Card
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",
    // Bank
    bankName: "",
    // E-wallet
    ewalletProvider: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 25000;
  const serviceFee = 2500;
  const total = subtotal + shipping + serviceFee;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Simulate payment processing
    alert("Processing payment...");
    setTimeout(() => {
      alert(
        "Payment successful! Your NFT will be minted and sent to your wallet.",
      );
      onCheckoutComplete();
      onNavigate("home");
    }, 2000);
  };

  const isStep1Valid =
    formData.fullName &&
    formData.phone &&
    formData.email &&
    formData.address &&
    formData.city &&
    formData.province;
  const isStep2Valid =
    formData.paymentMethod === "cod" ||
    (formData.paymentMethod === "card" &&
      formData.cardNumber &&
      formData.cardName) ||
    (formData.paymentMethod === "bank" && formData.bankName) ||
    (formData.paymentMethod === "ewallet" && formData.ewalletProvider);

  return (
    <div className="min-h-full bg-[#f5f5f0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => (step === 1 ? onNavigate("cart") : setStep(1))}
            aria-label="Back"
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Checkout</h1>
            <p className="text-sm text-gray-600">Step {step} of 2</p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-4">
              {/* Progress Indicator */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`flex items-center gap-2 ${step >= 1 ? "text-[#2d4a2b]" : "text-gray-400"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 1 ? "bg-[#2d4a2b] text-white" : "bg-gray-200"
                    }`}
                  >
                    {step > 1 ? <Check className="w-5 h-5" /> : "1"}
                  </div>
                  <span className="text-sm font-medium hidden md:inline">
                    Shipping
                  </span>
                </div>
                <div className="flex-1 h-px bg-gray-300" />
                <div
                  className={`flex items-center gap-2 ${step >= 2 ? "text-[#2d4a2b]" : "text-gray-400"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 2 ? "bg-[#2d4a2b] text-white" : "bg-gray-200"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-sm font-medium hidden md:inline">
                    Payment
                  </span>
                </div>
              </div>

              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#2d4a2b]" />
                      Shipping Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                            placeholder="08123456789"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          Complete Address *
                        </label>
                        <textarea
                          value={formData.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                          rows={3}
                          placeholder="Jl. Sudirman No. 123, RT 01/RW 02"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                          placeholder="Jakarta"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="province"
                          className="block text-sm font-medium mb-2"
                        >
                          Province *
                        </label>
                        <select
                          id="province"
                          value={formData.province}
                          onChange={(e) =>
                            handleInputChange("province", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                        >
                          <option value="">Select Province</option>
                          <option value="DKI Jakarta">DKI Jakarta</option>
                          <option value="Jawa Barat">Jawa Barat</option>
                          <option value="Jawa Tengah">Jawa Tengah</option>
                          <option value="Jawa Timur">Jawa Timur</option>
                          <option value="Bali">Bali</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) =>
                            handleInputChange("postalCode", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                          placeholder="12345"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">
                          Notes (Optional)
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) =>
                            handleInputChange("notes", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                          rows={2}
                          placeholder="Additional notes for delivery..."
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    className="w-full py-4 bg-[#2d4a2b] text-white rounded-xl font-medium hover:bg-[#3d5a3b] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4">
                      Select Payment Method
                    </h2>

                    <div className="space-y-3">
                      {/* Credit/Debit Card */}
                      <button
                        onClick={() =>
                          handleInputChange("paymentMethod", "card")
                        }
                        className={`w-full p-4 rounded-xl border-2 transition-all ${
                          formData.paymentMethod === "card"
                            ? "border-[#2d4a2b] bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-6 h-6 text-[#2d4a2b]" />
                          <div className="flex-1 text-left">
                            <div className="font-medium">Credit/Debit Card</div>
                            <div className="text-sm text-gray-600">
                              Visa, Mastercard, JCB
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.paymentMethod === "card"
                                ? "border-[#2d4a2b]"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.paymentMethod === "card" && (
                              <div className="w-3 h-3 bg-[#2d4a2b] rounded-full" />
                            )}
                          </div>
                        </div>
                      </button>

                      {formData.paymentMethod === "card" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">
                              Card Number
                            </label>
                            <input
                              type="text"
                              value={formData.cardNumber}
                              onChange={(e) =>
                                handleInputChange("cardNumber", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              value={formData.cardName}
                              onChange={(e) =>
                                handleInputChange("cardName", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                              placeholder="JOHN DOE"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={formData.cardExpiry}
                              onChange={(e) =>
                                handleInputChange("cardExpiry", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              value={formData.cardCVV}
                              onChange={(e) =>
                                handleInputChange("cardCVV", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                              placeholder="123"
                              maxLength={3}
                            />
                          </div>
                        </div>
                      )}

                      {/* Bank Transfer */}
                      <button
                        onClick={() =>
                          handleInputChange("paymentMethod", "bank")
                        }
                        className={`w-full p-4 rounded-xl border-2 transition-all ${
                          formData.paymentMethod === "bank"
                            ? "border-[#2d4a2b] bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Building2 className="w-6 h-6 text-[#2d4a2b]" />
                          <div className="flex-1 text-left">
                            <div className="font-medium">Bank Transfer</div>
                            <div className="text-sm text-gray-600">
                              BCA, Mandiri, BNI, BRI
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.paymentMethod === "bank"
                                ? "border-[#2d4a2b]"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.paymentMethod === "bank" && (
                              <div className="w-3 h-3 bg-[#2d4a2b] rounded-full" />
                            )}
                          </div>
                        </div>
                      </button>

                      {formData.paymentMethod === "bank" && (
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <label
                            htmlFor="checkout-bank"
                            className="block text-sm font-medium mb-2"
                          >
                            Select Bank
                          </label>
                          <select
                            id="checkout-bank"
                            value={formData.bankName}
                            onChange={(e) =>
                              handleInputChange("bankName", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          >
                            <option value="">Choose Bank</option>
                            <option value="BCA">BCA</option>
                            <option value="Mandiri">Mandiri</option>
                            <option value="BNI">BNI</option>
                            <option value="BRI">BRI</option>
                          </select>
                        </div>
                      )}

                      {/* E-Wallet */}
                      <button
                        onClick={() =>
                          handleInputChange("paymentMethod", "ewallet")
                        }
                        className={`w-full p-4 rounded-xl border-2 transition-all ${
                          formData.paymentMethod === "ewallet"
                            ? "border-[#2d4a2b] bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-6 h-6 text-[#2d4a2b]" />
                          <div className="flex-1 text-left">
                            <div className="font-medium">E-Wallet</div>
                            <div className="text-sm text-gray-600">
                              GoPay, OVO, DANA, ShopeePay
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.paymentMethod === "ewallet"
                                ? "border-[#2d4a2b]"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.paymentMethod === "ewallet" && (
                              <div className="w-3 h-3 bg-[#2d4a2b] rounded-full" />
                            )}
                          </div>
                        </div>
                      </button>

                      {formData.paymentMethod === "ewallet" && (
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <label
                            htmlFor="checkout-ewallet"
                            className="block text-sm font-medium mb-2"
                          >
                            Select E-Wallet
                          </label>
                          <select
                            id="checkout-ewallet"
                            value={formData.ewalletProvider}
                            onChange={(e) =>
                              handleInputChange(
                                "ewalletProvider",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          >
                            <option value="">Choose E-Wallet</option>
                            <option value="GoPay">GoPay</option>
                            <option value="OVO">OVO</option>
                            <option value="DANA">DANA</option>
                            <option value="ShopeePay">ShopeePay</option>
                          </select>
                        </div>
                      )}

                      {/* COD */}
                      <button
                        onClick={() =>
                          handleInputChange("paymentMethod", "cod")
                        }
                        className={`w-full p-4 rounded-xl border-2 transition-all ${
                          formData.paymentMethod === "cod"
                            ? "border-[#2d4a2b] bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 text-[#2d4a2b] font-bold">
                            💵
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium">
                              Cash on Delivery (COD)
                            </div>
                            <div className="text-sm text-gray-600">
                              Pay when you receive
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.paymentMethod === "cod"
                                ? "border-[#2d4a2b]"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.paymentMethod === "cod" && (
                              <div className="w-3 h-3 bg-[#2d4a2b] rounded-full" />
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!isStep2Valid}
                    className="w-full py-4 bg-[#2d4a2b] text-white rounded-xl font-medium hover:bg-[#3d5a3b] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Complete Purchase
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {item.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">{item.name}</p>
                        <p className="text-xs text-gray-600">{item.variant}</p>
                        <p className="text-sm font-medium">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium">
                          Rp
                          {(item.price * item.quantity).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rp{subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Rp{shipping.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span>Rp{serviceFee.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#2d4a2b]">
                      Rp{total.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs text-green-800">
                    🔗 <strong>NFT Included!</strong> You'll receive digital NFT
                    certificates for authenticity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
