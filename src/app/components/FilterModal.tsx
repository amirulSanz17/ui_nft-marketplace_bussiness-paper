import { X } from "lucide-react";
import { useState } from "react";

interface FilterModalProps {
  onClose: () => void;
}

export default function FilterModal({ onClose }: FilterModalProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "newest" | "price-low" | "price-high" | "popular"
  >("newest");

  const categories = [
    "Apparel",
    "Accessories",
    "Poster",
    "Collectibles",
    "NFT Only",
  ];
  const artists = ["Feast", "Hindia", "Dewa 19", "Sal Priadi", "Others"];

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const toggleArtist = (artist: string) => {
    setSelectedArtists((prev) =>
      prev.includes(artist)
        ? prev.filter((a) => a !== artist)
        : [...prev, artist],
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 5000000]);
    setSelectedCategories([]);
    setSelectedArtists([]);
    setSortBy("newest");
  };

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90%] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg">Filter & Sort</h2>
          <button onClick={onClose} aria-label="Close filter modal">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          {/* Sort By */}
          <div className="mb-6">
            <h3 className="text-sm mb-3">Sort By</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "newest", label: "Newest" },
                { value: "popular", label: "Most Popular" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as any)}
                  className={`py-2 px-3 rounded-lg border text-sm ${
                    sortBy === option.value
                      ? "border-[#2d4a2b] bg-[#2d4a2b] text-white"
                      : "border-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm mb-3">Price Range</h3>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="5000000"
                step="50000"
                aria-label="Price range"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Rp. 0</span>
                <span>Rp. {(priceRange[1] / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    selectedCategories.includes(cat)
                      ? "border-[#2d4a2b] bg-[#2d4a2b] text-white"
                      : "border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Artists */}
          <div className="mb-6">
            <h3 className="text-sm mb-3">Artist/Collection</h3>
            <div className="flex flex-wrap gap-2">
              {artists.map((artist) => (
                <button
                  key={artist}
                  onClick={() => toggleArtist(artist)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    selectedArtists.includes(artist)
                      ? "border-[#2d4a2b] bg-[#2d4a2b] text-white"
                      : "border-gray-300"
                  }`}
                >
                  {artist}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={resetFilters}
              className="flex-1 py-3 border-2 border-gray-300 rounded-xl"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-[#2d4a2b] text-white rounded-xl"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
