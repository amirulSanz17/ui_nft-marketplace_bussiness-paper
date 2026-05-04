import { X, Heart, Share2, ShoppingCart, Info } from "lucide-react";
import { useState } from "react";
import type { CartItem } from "../App";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  image?: string;
  badge: string;
  description?: string;
  nftIncluded?: boolean;
  sizes?: string[];
  colors?: string[];
}

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onBuyNow?: (item: CartItem) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "XL");
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || "White",
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      variant: `${selectedColor}, ${selectedSize}`,
      image: product.badge,
    });
    onClose();
  };

  const handleBuyNow = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      variant:
        product.sizes && product.colors
          ? `${selectedColor}, ${selectedSize}`
          : selectedColor || selectedSize || "Default",
      image: product.badge,
    };

    if (onBuyNow) {
      onBuyNow(cartItem);
    } else {
      onAddToCart(cartItem);
    }
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90%] overflow-auto scrollbar-hide">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold">Product Detail</h2>
          <button
            type="button"
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-1 transition-colors"
            aria-label="Close product detail"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden mb-4 relative">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="h-64 flex items-center justify-center text-8xl">
                {product.badge}
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              />
            </button>
            <button
              type="button"
              className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
              aria-label="Share product"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Product Info */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <div className="text-2xl font-bold text-[#2d4a2b] mb-2">
              Rp. {product.price.toLocaleString("id-ID")}
            </div>

            {product.nftIncluded && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 mb-3 flex items-start gap-2">
                <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800">
                  <strong>🔗 NFT Phygital Included!</strong>
                  <p className="text-xs mt-1">
                    Setiap pembelian mendapat NFT digital sebagai bukti keaslian
                    dan akses eksklusif ke konten spesial artis
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Size</h4>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedSize === size
                        ? "border-[#2d4a2b] bg-[#2d4a2b] text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Color</h4>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedColor === color
                        ? "border-[#2d4a2b] bg-[#2d4a2b] text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Quantity</h4>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="text-lg w-12 text-center font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description ||
                `${product.name} merupakan merchandise eksklusif limited edition dari konser PestaHora.
                Setiap item dilengkapi dengan NFT digital sebagai bukti keaslian dan memberikan akses
                eksklusif ke konten spesial artis. Produk ini juga berkontribusi pada program sosial kehutanan.`}
            </p>
          </div>

          {/* Total */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total ({quantity} items)</span>
              <span className="text-2xl font-bold text-[#2d4a2b]">
                Rp. {(product.price * quantity).toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-white border-2 border-[#2d4a2b] text-[#2d4a2b] rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors font-medium"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 bg-[#2d4a2b] text-white rounded-xl hover:bg-[#3d5a3b] transition-colors font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
