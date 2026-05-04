import { useState, useEffect } from "react";
import { Home, Wallet, ShoppingBag, User } from "lucide-react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import PortfolioPage from "./components/PortfolioPage";
import NFTDetailPage from "./components/NFTDetailPage";
import BalancePage from "./components/BalancePage";
import ShopPage from "./components/ShopPage";
import ProfilePage from "./components/ProfilePage";
import SocialFundPage from "./components/SocialFundPage";
import CheckoutPage from "./components/CheckoutPage";
import ChatPage from "./components/ChatPage";
import CryptoPage from "./components/CryptoPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProductDetailModal from "./components/ProductDetailModal";
import CartModal from "./components/CartModal";
import TopUpModal from "./components/TopUpModal";
import FilterModal from "./components/FilterModal";
import BuyModal from "./components/BuyModal";
import SellModal from "./components/SellModal";

type Page =
  | "home"
  | "portfolio"
  | "shop"
  | "balance"
  | "profile"
  | "nft-detail"
  | "social-fund"
  | "checkout"
  | "chat"
  | "crypto"
  | "admin";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  image: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showCart, setShowCart] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Check if user is already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleNavigate = (page: Page | string, data?: any) => {
    setCurrentPage(page as Page);
    if (data) setSelectedNFT(data);
    // Close all modals
    setShowCart(false);
    setShowTopUp(false);
    setShowFilter(false);
    setShowBuy(false);
    setShowSell(false);
    setSelectedProduct(null);
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.variant === item.variant,
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.variant === item.variant
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }
      return [...prev, item];
    });
  };

  const handleBuyNow = (item: CartItem) => {
    // Add item to cart
    setCart([item]);
    // Close product modal
    setSelectedProduct(null);
    // Navigate directly to checkout
    setCurrentPage("checkout");
  };

  const handleCheckout = () => {
    setShowCart(false);
    setCurrentPage("checkout");
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setCurrentPage("home");
    alert("Order placed successfully! Check your email for confirmation.");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
  };

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowRegister(false);
    setCurrentPage("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onNavigate={handleNavigate}
            onProductClick={setSelectedProduct}
            onCartClick={() => setShowCart(true)}
            onFilterClick={() => setShowFilter(true)}
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onProfileClick={() => handleNavigate("profile")}
          />
        );
      case "portfolio":
        return (
          <PortfolioPage
            onNavigate={handleNavigate}
            onFilterClick={() => setShowFilter(true)}
            onProfileClick={() => handleNavigate("profile")}
          />
        );
      case "balance":
        return (
          <BalancePage
            onNavigate={handleNavigate}
            onTopUpClick={() => setShowTopUp(true)}
          />
        );
      case "shop":
        return (
          <ShopPage
            onNavigate={handleNavigate}
            onProductClick={setSelectedProduct}
            onCartClick={() => setShowCart(true)}
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          />
        );
      case "profile":
        return (
          <ProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />
        );
      case "social-fund":
        return <SocialFundPage onNavigate={handleNavigate} />;
      case "checkout":
        return (
          <CheckoutPage
            cart={cart}
            onNavigate={handleNavigate}
            onCheckoutComplete={handleCheckoutComplete}
          />
        );
      case "chat":
        return <ChatPage onNavigate={handleNavigate} />;
      case "crypto":
        return <CryptoPage onNavigate={handleNavigate} />;
      case "admin":
        return <AdminDashboard onNavigate={handleNavigate} />;
      case "nft-detail":
        return (
          <NFTDetailPage
            nft={selectedNFT}
            onNavigate={handleNavigate}
            onBuyClick={() => setShowBuy(true)}
            onSellClick={() => setShowSell(true)}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onProductClick={setSelectedProduct}
            onCartClick={() => setShowCart(true)}
            onFilterClick={() => setShowFilter(true)}
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onProfileClick={() => handleNavigate("profile")}
          />
        );
    }
  };

  const showBottomNav = ![
    "nft-detail",
    "checkout",
    "chat",
    "social-fund",
    "crypto",
    "admin",
  ].includes(currentPage);

  // Show Login/Register if not logged in
  if (!isLoggedIn) {
    if (showRegister) {
      return (
        <RegisterPage
          onRegister={handleRegisterSuccess}
          onBackToLogin={handleBackToLogin}
        />
      );
    }
    return <LoginPage onLogin={handleLogin} onRegister={handleShowRegister} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Desktop/Laptop Layout - Full Width */}
      <div className="hidden md:block w-full h-screen bg-white overflow-hidden">
        {/* Content */}
        <div className="h-full pb-16 overflow-auto scrollbar-hide">
          {renderPage()}
        </div>

        {/* Bottom Navigation - Desktop */}
        {showBottomNav && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-center items-center z-50 shadow-lg">
            <div className="flex gap-8 max-w-2xl">
              <button
                onClick={() => handleNavigate("home")}
                className={`flex flex-col items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                  currentPage === "home"
                    ? "text-[#2d4a2b] bg-green-50"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Home
                  className="w-6 h-6"
                  fill={currentPage === "home" ? "#2d4a2b" : "none"}
                />
                <span className="text-xs font-medium">Home</span>
              </button>
              <button
                onClick={() => handleNavigate("portfolio")}
                className={`flex flex-col items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                  currentPage === "portfolio"
                    ? "text-[#2d4a2b] bg-green-50"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Wallet
                  className="w-6 h-6"
                  fill={currentPage === "portfolio" ? "#2d4a2b" : "none"}
                />
                <span className="text-xs font-medium">Portfolio</span>
              </button>
              <button
                onClick={() => handleNavigate("shop")}
                className={`flex flex-col items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                  currentPage === "shop"
                    ? "text-[#2d4a2b] bg-green-50"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <ShoppingBag
                  className="w-6 h-6"
                  fill={currentPage === "shop" ? "#2d4a2b" : "none"}
                />
                <span className="text-xs font-medium">Shop</span>
              </button>
              <button
                onClick={() => handleNavigate("balance")}
                className={`flex flex-col items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                  currentPage === "balance"
                    ? "text-[#2d4a2b] bg-green-50"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <User
                  className="w-6 h-6"
                  fill={currentPage === "balance" ? "#2d4a2b" : "none"}
                />
                <span className="text-xs font-medium">Balance</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Layout - Phone Mockup */}
      <div className="md:hidden flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md h-[844px] bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border-[14px] border-black">
          {/* Status Bar - Mobile Only */}
          <div className="absolute top-0 left-0 right-0 h-11 bg-white z-50">
            <div className="flex items-center justify-between px-8 h-full">
              <span className="text-sm">9:41</span>
              <div className="w-28 h-7 bg-black rounded-full" />
              <div className="flex gap-1 items-center">
                <div className="w-4 h-3 border border-black rounded-sm" />
                <div className="w-4 h-3 border border-black rounded-sm" />
                <div className="w-6 h-3 border border-black rounded-sm" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="h-full pt-11 pb-20 overflow-auto scrollbar-hide">
            {renderPage()}
          </div>

          {/* Bottom Navigation - Mobile */}
          {showBottomNav && (
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center z-50">
              <button
                type="button"
                onClick={() => handleNavigate("home")}
                className={`flex flex-col items-center gap-1 ${currentPage === "home" ? "text-[#2d4a2b]" : "text-gray-400"}`}
                aria-label="Go to home"
              >
                <Home
                  className="w-6 h-6"
                  fill={currentPage === "home" ? "#2d4a2b" : "none"}
                />
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("portfolio")}
                className={`flex flex-col items-center gap-1 ${currentPage === "portfolio" ? "text-[#2d4a2b]" : "text-gray-400"}`}
                aria-label="Go to portfolio"
              >
                <Wallet
                  className="w-6 h-6"
                  fill={currentPage === "portfolio" ? "#2d4a2b" : "none"}
                />
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("shop")}
                className={`flex flex-col items-center gap-1 ${currentPage === "shop" ? "text-[#2d4a2b]" : "text-gray-400"}`}
                aria-label="Go to shop"
              >
                <ShoppingBag
                  className="w-6 h-6"
                  fill={currentPage === "shop" ? "#2d4a2b" : "none"}
                />
              </button>
              <button
                type="button"
                onClick={() => handleNavigate("balance")}
                className={`flex flex-col items-center gap-1 ${currentPage === "balance" ? "text-[#2d4a2b]" : "text-gray-400"}`}
                aria-label="Go to balance"
              >
                <User
                  className="w-6 h-6"
                  fill={currentPage === "balance" ? "#2d4a2b" : "none"}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateCart={setCart}
          onCheckout={handleCheckout}
        />
      )}

      {showTopUp && <TopUpModal onClose={() => setShowTopUp(false)} />}

      {showFilter && <FilterModal onClose={() => setShowFilter(false)} />}

      {showBuy && selectedNFT && (
        <BuyModal nft={selectedNFT} onClose={() => setShowBuy(false)} />
      )}

      {showSell && selectedNFT && (
        <SellModal nft={selectedNFT} onClose={() => setShowSell(false)} />
      )}
    </div>
  );
}
