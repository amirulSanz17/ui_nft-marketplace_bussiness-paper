import { Plus, Edit, Trash2, Search, X } from "lucide-react";
import { useState } from "react";
import ImageUpload from "../ImageUpload";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  includeNFT: boolean;
  status: "active" | "inactive";
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Sneakers",
      category: "Footwear",
      price: 2500000,
      stock: 50,
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      ],
      includeNFT: true,
      status: "active",
    },
    {
      id: "2",
      name: "Designer Watch",
      category: "Accessories",
      price: 5200000,
      stock: 30,
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      ],
      includeNFT: true,
      status: "active",
    },
    {
      id: "3",
      name: "Luxury Bag",
      category: "Bags",
      price: 8900000,
      stock: 20,
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
      ],
      includeNFT: false,
      status: "active",
    },
    {
      id: "4",
      name: "Limited Jacket",
      category: "Clothing",
      price: 3200000,
      stock: 15,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      ],
      includeNFT: true,
      status: "active",
    },
    {
      id: "5",
      name: "Exclusive Headphones",
      category: "Electronics",
      price: 1800000,
      stock: 0,
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      ],
      includeNFT: false,
      status: "inactive",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    images: [] as string[],
    includeNFT: true,
    status: "active" as "active" | "inactive",
  });

  const categories = [
    "Footwear",
    "Accessories",
    "Bags",
    "Clothing",
    "Electronics",
    "Other",
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      images: [],
      includeNFT: true,
      status: "active",
    });
    setEditingProduct(null);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      images: product.images,
      includeNFT: product.includeNFT,
      status: product.status,
    });
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleSaveProduct = () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.images.length === 0) {
      alert("Please upload at least one product image");
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                images: formData.images,
                includeNFT: formData.includeNFT,
                status: formData.status,
              }
            : p,
        ),
      );
      alert("Product updated successfully!");
    } else {
      const newProduct: Product = {
        id: (products.length + 1).toString(),
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: formData.images,
        includeNFT: formData.includeNFT,
        status: formData.status,
      };
      setProducts((prev) => [...prev, newProduct]);
      alert("Product added successfully!");
    }

    setShowAddModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    }
  };

  const handleToggleStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p,
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
            placeholder="Search products..."
            aria-label="Search products"
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

      {/* Products List */}
      <div className="space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-2xl">📦</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold truncate">{product.name}</h3>
                    <button
                      onClick={() => handleToggleStatus(product.id)}
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {product.status}
                    </button>
                    {product.includeNFT && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        +NFT
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#2d4a2b]">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-gray-500">
                        Stock: {product.stock}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(product)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        aria-label="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        aria-label="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="font-bold text-lg">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                aria-label="Close modal"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Product Name */}
              <div>
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Name *
                </label>
                <input
                  id="product-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="product-category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category *
                </label>
                <select
                  id="product-category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="product-price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price (Rp) *
                </label>
                <input
                  id="product-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                />
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="product-stock"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Stock *
                </label>
                <input
                  id="product-stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent"
                />
              </div>

              {/* Product Images */}
              <ImageUpload
                images={formData.images}
                onChange={(images) => setFormData({ ...formData, images })}
                maxImages={5}
                label="Product Images *"
              />

              {/* Include NFT Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NFT Certificate
                </label>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <input
                    type="checkbox"
                    aria-label="Include NFT Certificate"
                    checked={formData.includeNFT}
                    onChange={(e) =>
                      setFormData({ ...formData, includeNFT: e.target.checked })
                    }
                    className="w-5 h-5 text-[#2d4a2b] rounded focus:ring-[#2d4a2b] cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      Include NFT Certificate
                    </div>
                    <div className="text-xs text-gray-600">
                      Buyer will receive digital NFT ownership
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
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

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="flex-1 px-4 py-3 bg-[#2d4a2b] text-white rounded-xl hover:bg-[#3d5a3b] transition-colors"
                >
                  {editingProduct ? "Update" : "Add"} Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
