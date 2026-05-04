import {
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";
import ImageUpload from "../ImageUpload";

interface NFT {
  id: string;
  name: string;
  collection: string;
  floorPrice: number;
  currentPrice: number;
  priceChange: number;
  totalMinted: number;
  available: number;
  images: string[];
  status: "active" | "inactive";
}

export default function AdminNFTs() {
  const [nfts, setNfts] = useState<NFT[]>([
    {
      id: "1",
      name: "Premium Sneakers NFT #001",
      collection: "Nerch Phygital Sneakers",
      floorPrice: 2500000,
      currentPrice: 2800000,
      priceChange: 12.5,
      totalMinted: 100,
      available: 45,
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      ],
      status: "active",
    },
    {
      id: "2",
      name: "Luxury Watch NFT #001",
      collection: "Nerch Designer Watches",
      floorPrice: 5200000,
      currentPrice: 5500000,
      priceChange: 5.8,
      totalMinted: 50,
      available: 12,
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      ],
      status: "active",
    },
    {
      id: "3",
      name: "Designer Bag NFT #001",
      collection: "Nerch Luxury Bags",
      floorPrice: 8900000,
      currentPrice: 8200000,
      priceChange: -7.9,
      totalMinted: 30,
      available: 8,
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
      ],
      status: "active",
    },
    {
      id: "4",
      name: "Limited Jacket NFT #001",
      collection: "Nerch Fashion Collection",
      floorPrice: 3200000,
      currentPrice: 3500000,
      priceChange: 9.4,
      totalMinted: 75,
      available: 25,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      ],
      status: "active",
    },
    {
      id: "5",
      name: "Exclusive Headphones NFT #001",
      collection: "Nerch Audio Collection",
      floorPrice: 1800000,
      currentPrice: 1800000,
      priceChange: 0,
      totalMinted: 200,
      available: 0,
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      ],
      status: "inactive",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNFT, setEditingNFT] = useState<NFT | null>(null);
  const [priceFormData, setPriceFormData] = useState({
    floorPrice: "",
    currentPrice: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    collection: "",
    floorPrice: "",
    currentPrice: "",
    totalMinted: "",
    available: "",
    images: [] as string[],
    status: "active" as "active" | "inactive",
  });

  const collections = [
    "Nerch Phygital Sneakers",
    "Nerch Designer Watches",
    "Nerch Luxury Bags",
    "Nerch Fashion Collection",
    "Nerch Audio Collection",
    "Other",
  ];

  const filteredNFTs = nfts.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpenPriceModal = (nft: NFT) => {
    setPriceFormData({
      floorPrice: nft.floorPrice.toString(),
      currentPrice: nft.currentPrice.toString(),
    });
    setEditingNFT(nft);
    setShowPriceModal(true);
  };

  const handleUpdatePrice = () => {
    if (!priceFormData.floorPrice || !priceFormData.currentPrice) {
      alert("Please fill in all price fields");
      return;
    }

    if (editingNFT) {
      const newFloorPrice = parseFloat(priceFormData.floorPrice);
      const newCurrentPrice = parseFloat(priceFormData.currentPrice);
      const oldPrice = editingNFT.floorPrice;
      const priceChange = ((newCurrentPrice - oldPrice) / oldPrice) * 100;

      setNfts((prev) =>
        prev.map((n) =>
          n.id === editingNFT.id
            ? {
                ...n,
                floorPrice: newFloorPrice,
                currentPrice: newCurrentPrice,
                priceChange: parseFloat(priceChange.toFixed(2)),
              }
            : n,
        ),
      );
      alert("NFT price updated successfully!");
      setShowPriceModal(false);
    }
  };

  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      collection: "",
      floorPrice: "",
      currentPrice: "",
      totalMinted: "",
      available: "",
      images: [],
      status: "active",
    });
    setEditingNFT(null);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (nft: NFT) => {
    setFormData({
      name: nft.name,
      collection: nft.collection,
      floorPrice: nft.floorPrice.toString(),
      currentPrice: nft.currentPrice.toString(),
      totalMinted: nft.totalMinted.toString(),
      available: nft.available.toString(),
      images: nft.images,
      status: nft.status,
    });
    setEditingNFT(nft);
    setShowAddModal(true);
  };

  const handleSaveNFT = () => {
    if (
      !formData.name ||
      !formData.collection ||
      !formData.floorPrice ||
      !formData.currentPrice ||
      !formData.totalMinted ||
      !formData.available
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.images.length === 0) {
      alert("Please upload at least one NFT image");
      return;
    }

    const floorPrice = parseFloat(formData.floorPrice);
    const currentPrice = parseFloat(formData.currentPrice);
    const priceChange = ((currentPrice - floorPrice) / floorPrice) * 100;

    if (editingNFT) {
      setNfts((prev) =>
        prev.map((n) =>
          n.id === editingNFT.id
            ? {
                ...n,
                name: formData.name,
                collection: formData.collection,
                floorPrice,
                currentPrice,
                priceChange: parseFloat(priceChange.toFixed(2)),
                totalMinted: parseInt(formData.totalMinted),
                available: parseInt(formData.available),
                images: formData.images,
                status: formData.status,
              }
            : n,
        ),
      );
      alert("NFT updated successfully!");
    } else {
      const newNFT: NFT = {
        id: (nfts.length + 1).toString(),
        name: formData.name,
        collection: formData.collection,
        floorPrice,
        currentPrice,
        priceChange: parseFloat(priceChange.toFixed(2)),
        totalMinted: parseInt(formData.totalMinted),
        available: parseInt(formData.available),
        images: formData.images,
        status: formData.status,
      };
      setNfts((prev) => [...prev, newNFT]);
      alert("NFT added successfully!");
    }

    setShowAddModal(false);
  };

  const handleDeleteNFT = (id: string) => {
    if (confirm("Are you sure you want to delete this NFT?")) {
      setNfts((prev) => prev.filter((n) => n.id !== id));
      alert("NFT deleted successfully!");
    }
  };

  const handleToggleStatus = (id: string) => {
    setNfts((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, status: n.status === "active" ? "inactive" : "active" }
          : n,
      ),
    );
  };

  return (
    <>
      {/* Search & Add Button */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search NFTs..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
          />
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-3 bg-[#2d4a2b] text-white rounded-xl flex items-center gap-2 hover:bg-[#3d5a3b] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {/* NFTs List */}
      <div className="space-y-3">
        {filteredNFTs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-gray-500">No NFTs found</p>
          </div>
        ) : (
          filteredNFTs.map((nft) => (
            <div key={nft.id} className="bg-white rounded-2xl p-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  {nft.images.length > 0 ? (
                    <img
                      src={nft.images[0]}
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-3xl">🖼️</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm truncate">{nft.name}</h3>
                    <button
                      onClick={() => handleToggleStatus(nft.id)}
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        nft.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {nft.status}
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{nft.collection}</p>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Floor Price</p>
                      <p className="text-sm font-bold">
                        Rp {nft.floorPrice.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current Price</p>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-bold">
                          Rp {nft.currentPrice.toLocaleString("id-ID")}
                        </p>
                        {nft.priceChange !== 0 && (
                          <span
                            className={`text-xs flex items-center ${
                              nft.priceChange > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {nft.priceChange > 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {Math.abs(nft.priceChange)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Minted</p>
                      <p className="text-sm font-bold">{nft.totalMinted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Available</p>
                      <p className="text-sm font-bold">{nft.available}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenPriceModal(nft)}
                      className="flex-1 px-3 py-2 bg-green-50 text-green-700 text-xs rounded-lg hover:bg-green-100 transition-colors"
                    >
                      Update Price
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(nft)}
                      aria-label="Edit NFT"
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNFT(nft.id)}
                      aria-label="Delete NFT"
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Price Update Modal */}
      {showPriceModal && editingNFT && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="font-bold text-lg">Update NFT Price</h2>
              <button
                onClick={() => setShowPriceModal(false)}
                aria-label="Close modal"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-sm text-gray-600 mb-1">NFT Name</p>
                <p className="font-bold">{editingNFT.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor Price (Rp) *
                </label>
                <input
                  type="number"
                  value={priceFormData.floorPrice}
                  onChange={(e) =>
                    setPriceFormData({
                      ...priceFormData,
                      floorPrice: e.target.value,
                    })
                  }
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Price (Rp) *
                </label>
                <input
                  type="number"
                  value={priceFormData.currentPrice}
                  onChange={(e) =>
                    setPriceFormData({
                      ...priceFormData,
                      currentPrice: e.target.value,
                    })
                  }
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowPriceModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePrice}
                  className="flex-1 px-4 py-3 bg-[#2d4a2b] text-white rounded-xl hover:bg-[#3d5a3b] transition-colors"
                >
                  Update Price
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="font-bold text-lg">
                {editingNFT ? "Edit NFT" : "Add New NFT"}
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close add NFT modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NFT Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter NFT name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="collection-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Collection *
                </label>
                <select
                  id="collection-select"
                  value={formData.collection}
                  onChange={(e) =>
                    setFormData({ ...formData, collection: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                >
                  <option value="">Select collection</option>
                  {collections.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Floor Price (Rp) *
                  </label>
                  <input
                    type="number"
                    value={formData.floorPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, floorPrice: e.target.value })
                    }
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Price (Rp) *
                  </label>
                  <input
                    type="number"
                    value={formData.currentPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, currentPrice: e.target.value })
                    }
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Minted *
                  </label>
                  <input
                    type="number"
                    value={formData.totalMinted}
                    onChange={(e) =>
                      setFormData({ ...formData, totalMinted: e.target.value })
                    }
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available *
                  </label>
                  <input
                    type="number"
                    value={formData.available}
                    onChange={(e) =>
                      setFormData({ ...formData, available: e.target.value })
                    }
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                  />
                </div>
              </div>

              {/* NFT Images */}
              <ImageUpload
                images={formData.images}
                onChange={(images) => setFormData({ ...formData, images })}
                maxImages={3}
                label="NFT Images *"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      setFormData({ ...formData, status: "active" })
                    }
                    className={`flex-1 px-4 py-3 rounded-xl border-2 transition-colors ${
                      formData.status === "active"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 bg-white text-gray-600"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, status: "inactive" })
                    }
                    className={`flex-1 px-4 py-3 rounded-xl border-2 transition-colors ${
                      formData.status === "inactive"
                        ? "border-gray-500 bg-gray-50 text-gray-700"
                        : "border-gray-300 bg-white text-gray-600"
                    }`}
                  >
                    Inactive
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNFT}
                  className="flex-1 px-4 py-3 bg-[#2d4a2b] text-white rounded-xl hover:bg-[#3d5a3b] transition-colors"
                >
                  {editingNFT ? "Update" : "Add"} NFT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
