import { ArrowLeft, Search, MessageCircle, Heart } from "lucide-react";
import { useState } from "react";

interface OrderPageProps {
  onNavigate: (
    page: "home" | "portfolio" | "orders" | "balance" | "nft-detail",
  ) => void;
  onProductClick: (product: any) => void;
}

const recommendedProducts = [
  {
    id: "4",
    name: "ToteBag Skena Exlusive Feast - PestaHora",
    price: 550000,
    badge: "🎨",
    nftIncluded: true,
  },
  {
    id: "5",
    name: "Topi Skena Exlusive Feast - PestaHora",
    price: 400000,
    badge: "⚡",
    nftIncluded: true,
  },
  {
    id: "6",
    name: "Kaos Skena Exlusive Feast - PestaHora",
    price: 450000,
    badge: "🎯",
    nftIncluded: true,
  },
  {
    id: "7",
    name: "Poster Exlusive HIndia - PestaHora",
    price: 350000,
    badge: "🎭",
    nftIncluded: true,
  },
  {
    id: "8",
    name: "Pin Exlusive - PestaHora",
    price: 150000,
    badge: "🔴",
    nftIncluded: true,
  },
  {
    id: "9",
    name: "Sticker Pack - PestaHora",
    price: 75000,
    badge: "🎮",
    nftIncluded: true,
  },
];

export default function OrderPage({
  onNavigate,
  onProductClick,
}: OrderPageProps) {
  const [selectedTab, setSelectedTab] = useState<"sent" | "done">("done");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-full bg-[#f5f5f0]">
      {/* Header */}
      <div className="px-4 py-4 bg-white mb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl">My Order</h1>
          </div>
          <div className="flex gap-3">
            <button type="button" aria-label="Search orders">
              <Search className="w-6 h-6" />
            </button>
            <button type="button" aria-label="Open messages">
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-4 text-sm">
          <button
            onClick={() => setSelectedTab("sent")}
            className={`pb-1 ${selectedTab === "sent" ? "border-b-2 border-black" : "text-gray-400"}`}
          >
            Sent
          </button>
          <button
            onClick={() => setSelectedTab("done")}
            className={`pb-1 ${selectedTab === "done" ? "border-b-2 border-black" : "text-gray-400"}`}
          >
            Done
          </button>
        </div>
      </div>

      <div className="px-4">
        {/* Completed Order */}
        {selectedTab === "done" && (
          <div className="bg-white rounded-2xl p-4 mb-4">
            <div className="flex gap-3 mb-3">
              <div className="text-2xl">🎭</div>
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                👕
              </div>
              <div className="flex-1">
                <h3 className="text-sm mb-1">
                  Hoodie Exlusive Feast - PestaHora
                </h3>
                <p className="text-xs text-gray-600 mb-1">White, XL</p>
                <p className="text-sm">Rp. 1.500.000</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600 mb-1">1x</div>
                <div className="text-sm">Total : Rp. 1.514.000</div>
              </div>
            </div>
            <button className="w-full bg-[#2d4a2b] text-white py-3 rounded-xl hover:bg-[#3d5a3b] transition-colors">
              Order finished
            </button>
          </div>
        )}

        {selectedTab === "sent" && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500">No orders in transit</p>
          </div>
        )}

        {/* Recommended Section */}
        <h2 className="text-xl mb-3">RECOMMENDED</h2>

        <div className="grid grid-cols-2 gap-3 pb-4">
          {recommendedProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => onProductClick(product)}
              className="bg-white rounded-xl p-3 relative text-left"
            >
              <div className="absolute top-3 left-3 text-xl">
                {product.badge}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
                className="absolute top-3 right-3 z-10"
                aria-label={
                  favorites.has(product.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                <Heart
                  className={`w-5 h-5 ${favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
              </button>
              <div className="h-32 flex items-center justify-center text-4xl mb-2">
                {product.badge}
              </div>
              <p className="text-xs mb-1 line-clamp-2 h-8">{product.name}</p>
              <p className="text-sm">
                Rp. {product.price.toLocaleString("id-ID")}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
