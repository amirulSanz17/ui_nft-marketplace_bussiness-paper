import { Search, ShoppingCart, SlidersHorizontal, Heart } from "lucide-react";
import { useState } from "react";

interface ShopPageProps {
  onNavigate: (
    page: "home" | "portfolio" | "shop" | "balance" | "profile" | "nft-detail",
  ) => void;
  onProductClick: (product: any) => void;
  onCartClick: () => void;
  cartCount: number;
}

const allProducts = [
  {
    id: "1",
    name: "Hoodie Exclusive Feast - PestaHora",
    price: 1500000,
    imageUrl:
      "https://images.unsplash.com/photo-1632682582909-2b3a2581eef7?w=400&q=80",
    badge: "🎭",
    category: "Apparel",
    artist: "Feast",
    nftIncluded: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray"],
  },
  {
    id: "2",
    name: "Kaos Exclusive Feast - PestaHora",
    price: 350000,
    imageUrl:
      "https://images.unsplash.com/photo-1763194197001-573c8955cef2?w=400&q=80",
    badge: "🔥",
    category: "Apparel",
    artist: "Feast",
    nftIncluded: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
  },
  {
    id: "3",
    name: "ToteBag Skena Exclusive - PestaHora",
    price: 550000,
    imageUrl:
      "https://images.unsplash.com/photo-1557156977-957a3115deb4?w=400&q=80",
    badge: "🎨",
    category: "Accessories",
    artist: "Feast",
    nftIncluded: true,
    colors: ["Beige", "Black"],
  },
  {
    id: "4",
    name: "Topi Exclusive Hindia Collection",
    price: 400000,
    imageUrl:
      "https://images.unsplash.com/photo-1560774358-d727658f457c?w=400&q=80",
    badge: "🧢",
    category: "Accessories",
    artist: "Hindia",
    nftIncluded: true,
    colors: ["Black", "Navy", "Cream"],
  },
  {
    id: "5",
    name: "Poster Album Hindia Limited",
    price: 350000,
    imageUrl:
      "https://images.unsplash.com/photo-1760274741733-21a64eed83c7?w=400&q=80",
    badge: "🖼️",
    category: "Collectibles",
    artist: "Hindia",
    nftIncluded: true,
  },
  {
    id: "6",
    name: "Vinyl Record Dewa 19 Special",
    price: 750000,
    imageUrl:
      "https://images.unsplash.com/photo-1592671191988-f4d2461101cb?w=400&q=80",
    badge: "💿",
    category: "Collectibles",
    artist: "Dewa 19",
    nftIncluded: true,
  },
  {
    id: "7",
    name: "Jaket Bomber Sal Priadi Edition",
    price: 1200000,
    imageUrl:
      "https://images.unsplash.com/photo-1770821551237-ac8952657644?w=400&q=80",
    badge: "🧥",
    category: "Apparel",
    artist: "Sal Priadi",
    nftIncluded: true,
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Olive"],
  },
  {
    id: "8",
    name: "Pin Set Koleksi PestaHora",
    price: 150000,
    imageUrl:
      "https://images.unsplash.com/photo-1521425700123-f8610a448ba3?w=400&q=80",
    badge: "📌",
    category: "Accessories",
    artist: "Various",
    nftIncluded: true,
  },
  {
    id: "9",
    name: "Tumbler Stainless PestaHora",
    price: 300000,
    imageUrl:
      "https://images.unsplash.com/photo-1573136810265-a584af43f98f?w=400&q=80",
    badge: "🥤",
    category: "Accessories",
    artist: "Various",
    nftIncluded: true,
    colors: ["Silver", "Black", "Gold"],
  },
];

const categories = ["All", "Apparel", "Accessories", "Collectibles"];
const artists = ["All", "Feast", "Hindia", "Dewa 19", "Sal Priadi", "Various"];

export default function ShopPage({
  onNavigate,
  onProductClick,
  onCartClick,
  cartCount,
}: ShopPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArtist, setSelectedArtist] = useState("All");
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

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesArtist =
      selectedArtist === "All" || product.artist === selectedArtist;
    return matchesSearch && matchesCategory && matchesArtist;
  });

  return (
    <div className="min-h-full bg-[#f5f5f0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 lg:px-16 py-4 sticky top-0 z-10 shadow-sm">
        <div className="w-full max-w-full lg:max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold">Shop</h1>
            <div className="flex-1 max-w-2xl relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search merchandise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:bg-white transition-colors"
              />
            </div>
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {cartCount}
                </div>
              )}
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-[#2d4a2b] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-300" />

            {/* Artist Filter */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {artists.map((artist) => (
                <button
                  key={artist}
                  onClick={() => setSelectedArtist(artist)}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm transition-colors ${
                    selectedArtist === artist
                      ? "bg-[#2d4a2b] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {artist}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 md:px-8 lg:px-16 py-6">
        <div className="w-full max-w-full lg:max-w-[1400px] mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={
                      favorites.has(product.id)
                        ? "Remove product from favorites"
                        : "Add product to favorites"
                    }
                  >
                    <Heart
                      className={`w-4 h-4 ${favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </button>
                  <div className="h-48 md:h-56 overflow-hidden bg-gray-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-xs text-gray-500 mb-1">{product.artist}</p>
                  <p className="text-sm mb-2 line-clamp-2 text-left h-10">
                    {product.name}
                  </p>
                  <p className="text-base md:text-lg font-bold text-[#2d4a2b] text-left mb-2">
                    Rp. {product.price.toLocaleString("id-ID")}
                  </p>
                  {product.nftIncluded && (
                    <div className="bg-green-50 text-green-700 text-[10px] px-2 py-1 rounded-full inline-block">
                      🔗 NFT Included
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg mb-2">No products found</p>
              <p className="text-gray-400 text-sm">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
