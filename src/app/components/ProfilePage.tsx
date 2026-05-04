import {
  ArrowLeft,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  User,
  Mail,
  Phone,
  Menu,
  X,
  Lock,
} from "lucide-react";
import { useState } from "react";

interface ProfilePageProps {
  onNavigate: (
    page:
      | "home"
      | "portfolio"
      | "orders"
      | "balance"
      | "profile"
      | "nft-detail"
      | "admin",
  ) => void;
  onLogout: () => void;
}

export default function ProfilePage({
  onNavigate,
  onLogout,
}: ProfilePageProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuItems = [
    {
      icon: User,
      title: "Personal Information",
      description: "Update your personal details",
      action: () => alert("Personal Information"),
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Manage password and 2FA",
      action: () => alert("Security Settings"),
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage notification preferences",
      action: () => alert("Notification Settings"),
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get help and contact support",
      action: () => alert("Help & Support"),
    },
  ];

  return (
    <div className="min-h-full bg-[#f5f5f0]">
      {/* Header */}
      <div className="px-4 py-4 bg-white mb-4 relative">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl">Profile</h1>
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="relative"
            aria-label={showMenu ? "Close profile menu" : "Open profile menu"}
          >
            {showMenu ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-4 top-16 bg-white rounded-xl shadow-xl border border-gray-200 w-64 overflow-hidden z-50">
            <div className="py-2">
              <button
                onClick={() => {
                  alert("Edit Profile");
                  setShowMenu(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
                <div className="text-left flex-1">
                  <div className="text-sm font-medium">Edit Profile</div>
                  <div className="text-xs text-gray-500">
                    Update your information
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  alert("Settings");
                  setShowMenu(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
                <div className="text-left flex-1">
                  <div className="text-sm font-medium">Settings</div>
                  <div className="text-xs text-gray-500">App preferences</div>
                </div>
              </button>

              <button
                onClick={() => {
                  alert("Notifications");
                  setShowMenu(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="text-left flex-1">
                  <div className="text-sm font-medium">Notifications</div>
                  <div className="text-xs text-gray-500">Manage alerts</div>
                </div>
              </button>

              <button
                onClick={() => {
                  alert("Privacy & Security");
                  setShowMenu(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <Shield className="w-5 h-5 text-gray-600" />
                <div className="text-left flex-1">
                  <div className="text-sm font-medium">Privacy & Security</div>
                  <div className="text-xs text-gray-500">Password & 2FA</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onNavigate("admin");
                  setShowMenu(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-green-50 transition-colors"
              >
                <Lock className="w-5 h-5 text-[#2d4a2b]" />
                <div className="text-left flex-1">
                  <div className="text-sm font-medium text-[#2d4a2b]">
                    Admin Panel
                  </div>
                  <div className="text-xs text-gray-500">
                    Manage marketplace
                  </div>
                </div>
              </button>

              <div className="border-t border-gray-200 my-1"></div>

              <button
                onClick={() => {
                  if (confirm("Are you sure you want to logout?")) {
                    localStorage.clear();
                    onLogout();
                  }
                  setShowMenu(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5 text-red-600" />
                <div className="text-left flex-1">
                  <div className="text-sm font-medium text-red-600">Logout</div>
                  <div className="text-xs text-gray-500">
                    Sign out of account
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 mb-4 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#2d4a2b] to-[#4a7a4a] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">
            👤
          </div>
          <h2 className="text-xl mb-1">John Doe</h2>
          <p className="text-sm text-gray-600 mb-1">john.doe@example.com</p>
          <p className="text-xs text-gray-500">Member since Jan 2024</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div>
              <div className="text-2xl mb-1">5</div>
              <div className="text-xs text-gray-600">NFTs Owned</div>
            </div>
            <div>
              <div className="text-2xl mb-1">12</div>
              <div className="text-xs text-gray-600">Orders</div>
            </div>
            <div>
              <div className="text-2xl mb-1">3</div>
              <div className="text-xs text-gray-600">Favorites</div>
            </div>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Wallet Address</p>
              <p className="text-sm font-mono">0x742d...8f9a</p>
            </div>
            <button className="text-[#2d4a2b] text-sm">Copy</button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2 mb-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm mb-0.5">{item.title}</div>
                <div className="text-xs text-gray-600">{item.description}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            if (confirm("Are you sure you want to logout?")) {
              localStorage.clear();
              onLogout();
            }
          }}
          className="w-full bg-red-50 text-red-600 rounded-2xl p-4 flex items-center justify-center gap-2 mb-20 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
