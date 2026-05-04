import {
  Search,
  ShoppingCart,
  MessageCircle,
  TrendingUp,
  Heart,
} from "lucide-react";
import { useState } from "react";
import BannerCarousel from "./BannerCarousel";
import MiniChart from "./MiniChart";

interface HomePageProps {
  onNavigate: (
    page:
      | "home"
      | "portfolio"
      | "shop"
      | "balance"
      | "profile"
      | "nft-detail"
      | "chat",
    data?: any,
  ) => void;
  onProductClick: (product: any) => void;
  onCartClick: () => void;
  onFilterClick: () => void;
  onProfileClick: () => void;
  cartCount: number;
}

const categories = ["Recommend", "Hindia", "Dewa 19", "Sal Priadi", "More"];

const products = [
  {
    id: "1",
    name: "Hoodie Exclusive Feast - PestaHora",
    price: 1500000,
    imageUrl:
      "https://images.unsplash.com/photo-1632682582909-2b3a2581eef7?w=400&q=80",
    badge: "🎭",
    nftIncluded: true,
    artist: "Feast",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray"],
    description:
      "Hoodie eksklusif dari konser Feast di PestaHora. Limited edition dengan NFT digital sebagai bukti keaslian.",
  },
  {
    id: "2",
    name: "Kaos Exclusive Feast - PestaHora",
    price: 350000,
    imageUrl:
      "https://images.unsplash.com/photo-1763194197001-573c8955cef2?w=400&q=80",
    badge: "🔥",
    nftIncluded: true,
    artist: "Feast",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    description: "Kaos premium dengan design eksklusif Feast x PestaHora.",
  },
  {
    id: "3",
    name: "ToteBag Skena Exclusive Feast - PestaHora",
    price: 550000,
    imageUrl:
      "https://images.unsplash.com/photo-1557156977-957a3115deb4?w=400&q=80",
    badge: "🎨",
    nftIncluded: true,
    artist: "Feast",
    colors: ["Beige", "Black"],
    description:
      "Tote bag canvas premium dengan design artwork eksklusif dari PestaHora.",
  },
  {
    id: "4",
    name: "Hoodie Hindia Tour Limited",
    price: 1200000,
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80",
    badge: "⚙️",
    nftIncluded: true,
    artist: "Hindia",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy"],
    description:
      "Hoodie limited edition dari tour Hindia dengan NFT certificate.",
  },
  {
    id: "5",
    name: "Vinyl Dewa 19 - Bintang Lima",
    price: 850000,
    imageUrl:
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&q=80",
    badge: "🎵",
    nftIncluded: true,
    artist: "Dewa 19",
    colors: ["Black"],
    description: "Vinyl eksklusif album Bintang Lima dengan NFT authenticity.",
  },
  {
    id: "6",
    name: "Kaos Sal Priadi Concert",
    price: 400000,
    imageUrl:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80",
    badge: "🎸",
    nftIncluded: true,
    artist: "Sal Priadi",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black"],
    description: "Kaos official dari concert Sal Priadi dengan NFT digital.",
  },
];

const nfts = [
  {
    id: "HFeastHora-001",
    name: "HFeastHora-001",
    price: "1.05",
    change: "+50.5%",
    icon: "💀",
    currentPrice: 78095317,
    trend: "up" as const,
    artist: "Feast",
  },
  {
    id: "THindiaHora-001",
    name: "THindiaHora-001",
    price: "0.65",
    change: "+15.5%",
    icon: "⚙️",
    currentPrice: 51000000,
    trend: "up" as const,
    artist: "Hindia",
  },
  {
    id: "TDewaSinkro-111",
    name: "TDewaSinkro-111",
    price: "0.70",
    change: "+5.8%",
    icon: "⚡",
    currentPrice: 55000000,
    trend: "up" as const,
    artist: "Dewa 19",
  },
  {
    id: "TSalPriadiHora-099",
    name: "TSalPriadiHora-099",
    price: "0.85",
    change: "+12.3%",
    icon: "🎸",
    currentPrice: 66000000,
    trend: "up" as const,
    artist: "Sal Priadi",
  },
];

export default function HomePage({
  onNavigate,
  onProductClick,
  onCartClick,
  onFilterClick,
  onProfileClick,
  cartCount,
}: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState("Recommend");

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

  // Filter products and NFTs based on selected category
  const filteredProducts =
    selectedCategory === "Recommend"
      ? products
      : selectedCategory === "More"
        ? products.filter(
            (p) => !["Hindia", "Dewa 19", "Sal Priadi"].includes(p.artist),
          )
        : products.filter((p) => p.artist === selectedCategory);

  const filteredNFTs =
    selectedCategory === "Recommend"
      ? nfts
      : selectedCategory === "More"
        ? nfts.filter(
            (n) => !["Hindia", "Dewa 19", "Sal Priadi"].includes(n.artist),
          )
        : nfts.filter((n) => n.artist === selectedCategory);

  return (
    <div className="min-h-full bg-[#f5f5f0] px-4 md:px-8 lg:px-16 py-4">
      <div className="w-full max-w-full lg:max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2d4a2b] rounded-lg flex items-center justify-center text-white text-sm md:text-base">
              🛒
            </div>
            <h1 className="text-xl md:text-2xl font-bold">Nerch</h1>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={onCartClick}
              aria-label="Open cart"
              className="relative p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {cartCount}
                </div>
              )}
            </button>
            <button
              onClick={() => onNavigate("chat")}
              aria-label="Open chat"
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button
              onClick={onProfileClick}
              aria-label="Open profile"
              className="hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-[#2d4a2b] to-[#4a7a4a] rounded-full flex items-center justify-center text-white shadow-md">
                👤
              </div>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search merchandise or NFT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d4a2b]"
          />
        </div>

        {/* Asset Total */}
        <div
          onClick={() => onNavigate("balance")}
          className="w-full bg-white rounded-2xl p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Asset Total</span>
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("balance");
              }}
              className="px-4 py-1.5 border border-black rounded-full text-sm hover:bg-black hover:text-white transition-colors"
            >
              Top Up
            </button>
          </div>
          <div className="text-2xl md:text-3xl font-bold mb-1">
            Rp10.000.000
          </div>
          <div className="text-sm text-green-600 flex items-center gap-2">
            Return + Rp10.000.000 (+100%)
            <MiniChart trend="up" />
          </div>
        </div>

        {/* Banner Carousel */}
        <BannerCarousel />

        {/* Categories */}
        <div className="flex gap-2 my-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-white border border-gray-300 shadow-sm"
                  : "bg-[#2d4a2b] text-white hover:bg-[#3d5a3b]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid - Updated for Desktop */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">
            Featured Products
            {selectedCategory !== "Recommend" && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({filteredProducts.length} items)
              </span>
            )}
          </h3>
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-gray-500">
                No products found for {selectedCategory}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer relative"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    aria-label={
                      favorites.has(product.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart
                      className={`w-4 h-4 ${favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </button>
                  <div className="h-40 md:h-48 overflow-hidden bg-gray-100 relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs mb-1 line-clamp-2 text-left">
                      {product.name}
                    </p>
                    <p className="text-sm md:text-base font-bold text-[#2d4a2b] text-left">
                      Rp. {product.price.toLocaleString("id-ID")}
                    </p>
                    {product.nftIncluded && (
                      <div className="mt-2 bg-green-50 text-green-700 text-[10px] px-2 py-1 rounded-full inline-block">
                        🔗 NFT Included
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* NFTs List with Mini Charts */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold">NFT Market</h3>
              <p className="text-sm text-gray-600">
                Trending Collections
                {selectedCategory !== "Recommend" && (
                  <span className="ml-2">({filteredNFTs.length} NFTs)</span>
                )}
              </p>
            </div>
            <button
              onClick={onFilterClick}
              className="text-sm border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition-colors"
            >
              See All
            </button>
          </div>
          {filteredNFTs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-gray-500">
                No NFTs found for {selectedCategory}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredNFTs.map((nft) => (
                <button
                  key={nft.id}
                  onClick={() => onNavigate("nft-detail", nft)}
                  className="bg-white rounded-2xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#2d4a2b] rounded-xl flex items-center justify-center text-2xl shadow-sm">
                      {nft.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{nft.name}</div>
                      <div className="text-xs text-gray-600">
                        Floor: {nft.price} ETH
                      </div>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="mb-3 h-16 flex items-end">
                    <MiniChart trend={nft.trend} />
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-sm font-semibold">
                      Rp. {(nft.currentPrice / 1000000).toFixed(1)}M
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        nft.change.startsWith("+")
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {nft.change}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
