import { X, Trash2 } from "lucide-react";
import type { CartItem } from "../App";

interface CartModalProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateCart: (cart: CartItem[]) => void;
  onCheckout: () => void;
}

export default function CartModal({
  cart,
  onClose,
  onUpdateCart,
  onCheckout,
}: CartModalProps) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 14000;
  const total = subtotal + shipping;

  const updateQuantity = (
    id: string,
    variant: string | undefined,
    delta: number,
  ) => {
    onUpdateCart(
      cart
        .map((item) => {
          if (item.id === id && item.variant === variant) {
            const newQty = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string, variant: string | undefined) => {
    onUpdateCart(
      cart.filter((item) => !(item.id === id && item.variant === variant)),
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    onCheckout();
  };

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90%] overflow-auto scrollbar-hide">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold">Shopping Cart ({cart.length})</h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="hover:bg-gray-100 rounded-full p-1 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500 mb-2">Your cart is empty</p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-[#2d4a2b] text-white rounded-lg hover:bg-[#3d5a3b] transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="p-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.variant}-${index}`}
                  className="bg-gray-50 rounded-xl p-3 mb-3 flex gap-3"
                >
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm mb-1 line-clamp-2 font-medium">
                      {item.name}
                    </h3>
                    {item.variant && (
                      <p className="text-xs text-gray-600 mb-1">
                        {item.variant}
                      </p>
                    )}
                    <p className="text-sm font-bold text-[#2d4a2b] mb-2">
                      Rp. {item.price.toLocaleString("id-ID")}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.variant, -1)
                        }
                        className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.variant, 1)}
                        className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <button
                      onClick={() => removeItem(item.id, item.variant)}
                      aria-label="Remove item"
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                    <p className="text-sm font-bold">
                      Rp. {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-gray-200 p-4 bg-white sticky bottom-0">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal (
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span className="font-medium">
                    Rp. {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    Rp. {shipping.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold text-[#2d4a2b]">
                    Rp. {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#2d4a2b] text-white rounded-xl font-bold hover:bg-[#3d5a3b] transition-colors shadow-lg"
              >
                Proceed to Checkout
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                🔗 NFT certificates will be minted after payment
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
