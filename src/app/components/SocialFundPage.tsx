import { ArrowLeft, TrendingUp, Calendar, Award } from "lucide-react";
import { useState } from "react";

interface SocialFundPageProps {
  onNavigate: (page: string) => void;
}

const donationHistory = [
  {
    id: 1,
    nftName: "HFeastHora-001",
    date: "2026-04-28",
    amount: 50000,
    project: "Penanaman 100 Pohon Mangrove",
    location: "Pantai Indah, Bali",
    status: "completed",
    icon: "🌳",
  },
  {
    id: 2,
    nftName: "THindiaHora-001",
    date: "2026-04-25",
    amount: 35000,
    project: "Rehabilitasi Hutan",
    location: "Gunung Gede Pangrango",
    status: "completed",
    icon: "🌲",
  },
  {
    id: 3,
    nftName: "TDewaSinkro-111",
    date: "2026-04-20",
    amount: 40000,
    project: "Konservasi Terumbu Karang",
    location: "Raja Ampat, Papua",
    status: "in-progress",
    icon: "🪸",
  },
  {
    id: 4,
    nftName: "Hoodie Exclusive Feast",
    date: "2026-04-15",
    amount: 25000,
    project: "Program Air Bersih",
    location: "Desa Sukatani, Jawa Barat",
    status: "completed",
    icon: "💧",
  },
];

export default function SocialFundPage({ onNavigate }: SocialFundPageProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "in-progress">(
    "all",
  );

  const totalDonated = donationHistory.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const completedProjects = donationHistory.filter(
    (d) => d.status === "completed",
  ).length;

  const filteredHistory = donationHistory.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  return (
    <div className="min-h-full bg-[#f5f5f0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 lg:px-16 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              type="button"
              onClick={() => onNavigate("balance")}
              aria-label="Go back"
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Social Fund</h1>
              <p className="text-sm text-gray-600">
                Your contribution to the planet
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-16 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm opacity-90">Total Donated</span>
              </div>
              <div className="text-3xl font-bold">
                Rp{totalDonated.toLocaleString("id-ID")}
              </div>
              <div className="text-sm opacity-90 mt-1">
                From {donationHistory.length} NFT purchases
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5" />
                <span className="text-sm opacity-90">Projects Supported</span>
              </div>
              <div className="text-3xl font-bold">{completedProjects}</div>
              <div className="text-sm opacity-90 mt-1">
                Successfully completed
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm opacity-90">Impact Score</span>
              </div>
              <div className="text-3xl font-bold">87/100</div>
              <div className="text-sm opacity-90 mt-1">
                Environmental impact rating
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-[#2d4a2b] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              All ({donationHistory.length})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "completed"
                  ? "bg-[#2d4a2b] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Completed (
              {donationHistory.filter((d) => d.status === "completed").length})
            </button>
            <button
              onClick={() => setFilter("in-progress")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "in-progress"
                  ? "bg-[#2d4a2b] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              In Progress (
              {donationHistory.filter((d) => d.status === "in-progress").length}
              )
            </button>
          </div>

          {/* Donation History */}
          <div className="space-y-3">
            {filteredHistory.map((donation) => (
              <div
                key={donation.id}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {donation.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {donation.project}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {donation.location}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold text-green-600">
                          Rp{donation.amount.toLocaleString("id-ID")}
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                            donation.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {donation.status === "completed"
                            ? "✓ Completed"
                            : "⏳ In Progress"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(donation.date).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="h-4 w-px bg-gray-300" />
                      <span className="text-gray-500">
                        From: {donation.nftName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Our Social Fund Section */}
          <div className="mt-8 bg-gradient-to-br from-[#2d4a2b] to-[#4a7a4a] rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🌍</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">OUR SOCIAL FUND</h3>
                <p className="text-sm opacity-90 mb-3">
                  Kontribusi bersama komunitas PestaHora
                </p>
                <div className="text-3xl font-bold mb-2">Rp450.000.000</div>
                <div className="text-sm opacity-90 mb-4">
                  Total donasi +{" "}
                  <span className="text-green-300 font-semibold">
                    Rp10.000.000
                  </span>{" "}
                  bulan ini
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm">
                    🌳 <strong>Proyek Berjalan:</strong> Penanaman 10,000 pohon
                    di 5 provinsi Indonesia
                    <br />
                    💧 <strong>Target Berikutnya:</strong> Program air bersih
                    untuk 50 desa
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Info */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">ℹ️</div>
              <div className="text-sm text-blue-900">
                <strong>Bagaimana cara kerjanya?</strong>
                <p className="mt-2">
                  Setiap kali Anda membeli NFT phygital, otomatis 5% dari harga
                  pembelian disumbangkan ke program sosial dan lingkungan. Anda
                  bisa melacak kemana donasi Anda disalurkan dan dampak yang
                  dihasilkan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
