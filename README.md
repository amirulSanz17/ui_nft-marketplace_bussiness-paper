# Nerch - NFT Phygital Marketplace

Platform marketplace NFT yang menggabungkan merchandise fisik dengan NFT digital (Phygital). Setiap produk fisik dilengkapi dengan NFT sebagai bukti keaslian dan akses eksklusif.

## 💻 Web
**https://nft-marketspace.vercel.app/**

## 🆕 What's New in v1.2.0

### Major Updates
- 🎉 **Admin Panel** - Complete marketplace management system
- 📸 **Multiple Image Upload** - Drag & drop, gallery support
- 🏷️ **NFT Certificate Toggle** - Per-product NFT inclusion control
- 🚪 **Full Authentication** - Login, register, social auth, logout
- 💻 **Desktop Optimization** - Full-width layouts for large screens
- 🐛 **Bug Fixes** - DOM nesting, image display, responsive improvements

See [CHANGELOG.md](./CHANGELOG.md) for complete details.

---

## 🎯 Fitur Utama

### 📱 Halaman Utama
- **Home**: Marketplace dengan produk merchandise + NFT, banner konser, search bar
- **Portfolio**: Grafik interaktif investasi NFT dengan chart seperti Stockbit
- **Orders**: Riwayat pembelian dan rekomendasi produk
- **Balance**: Manajemen saldo (Cash & Crypto), Social Fund untuk donasi
- **Profile**: Informasi user, wallet address, settings

### 💎 Fitur NFT (Mirip Stockbit)
- **Interactive Chart**: Touch/hover untuk melihat detail harga di setiap titik
- **Buy Modal**: Order market/limit dengan preview biaya
- **Sell Modal**: Jual NFT dengan limit/market order
- **Smart Contract Details**: 
  - Contract address dengan copy & external link
  - Token standard (ERC-721)
  - Creator royalty
  - Total supply & minted count
  - Verified contract badge
  - Links ke Etherscan & OpenSea

### 🛍️ Fitur Marketplace
- **Product Detail**: Pilih size, warna, quantity
- **Shopping Cart**: Keranjang belanja dengan counter
- **Top Up Modal**: Isi saldo via Card/Bank/E-wallet
- **Filter Modal**: Sort by harga, category, artist
- **Favorites**: Like/unlike produk dan NFT

### 🔐 Admin Panel (NEW v1.2)
- **Dashboard**: Sales overview, statistics, recent orders
- **Product Management**: 
  - ✅ Add/Edit/Delete products
  - ✅ Multiple image upload (drag & drop)
  - ✅ NFT certificate toggle per product
  - ✅ Stock & pricing management
- **NFT Management**:
  - ✅ Add/Edit/Delete NFTs
  - ✅ Multiple image gallery (up to 3 images)
  - ✅ Dynamic pricing (floor & current price)
  - ✅ Minting & availability tracking
- **Financial Reports**: Revenue analytics, top customers, export PDF/Excel
- **Access**: Admin button in Profile dropdown menu

### 🖼️ Image Upload System (NEW v1.2)
- ✅ **Multiple Images**: Upload 1-5 images per product, 1-3 per NFT
- ✅ **Drag & Drop**: Easy file upload interface
- ✅ **Preview Grid**: Visual preview with remove option
- ✅ **Primary Image**: First image = main thumbnail
- ✅ **Format Support**: PNG, JPG, GIF, WebP (max 10MB)
- ✅ **Responsive**: Works on all devices

### 🚪 Authentication (NEW v1.2)
- ✅ **Login/Register**: Email & password authentication
- ✅ **Social Login**: Google & Facebook OAuth simulation
- ✅ **Logout**: Full session clear & redirect
- ✅ **Persistent Session**: localStorage-based

### 🎨 Design & UX
- ✅ **Responsive Design**: Mobile-first, scales to 4K desktop
- ✅ **Full-Width Desktop**: 1400px max content width on large screens
- ✅ **Smooth Scrolling**: Scrollbar tersembunyi dengan scroll yang smooth
- ✅ **Real Images**: Gambar produk dari Unsplash API
- ✅ **Interactive Elements**: Hover effects, transitions, animations
- ✅ **Professional UI**: Design mirip Stockbit dengan tema hijau (#2d4a2b)

## 🖼️ Gambar Produk

Aplikasi menggunakan gambar real dari Unsplash:
- Hoodie: Fashion streetwear photography
- Kaos: Concert merchandise
- Tote Bag: Lifestyle canvas bags
- Banner: Live concert crowds

## 🔐 Smart Contract Info

Setiap NFT menampilkan informasi blockchain lengkap:
- Network: Ethereum Mainnet
- Token Standard: ERC-721
- Contract Address (dengan copy & external link)
- Creator Royalty: 10%
- Total Supply: 1,000 NFTs
- Metadata: Decentralized (IPFS)
- Contract Type: Upgradeable Proxy (OpenZeppelin)
- Verified Contract ✓

## 📊 Trading Features (Stockbit-style)

### Buy Order
- Market Order: Eksekusi langsung di harga terbaik
- Limit Order: Eksekusi saat harga mencapai target
- Preview biaya & total
- Warning untuk setiap tipe order

### Sell Order
- Market Order: Jual langsung
- Limit Order: Jual di harga tertentu
- Cek saldo NFT yang dimiliki
- Kalkulasi revenue setelah fee

### Interactive Chart
- Touch/hover untuk melihat harga di titik tertentu
- Popup dengan tanggal & harga
- Smooth animations
- Multiple timeframes (1D, 1W, 1M, 3M, YTD, 1Y, 5Y, ALL)

## 🎯 Social Impact

Setiap pembelian berkontribusi pada:
- **Your Social Fund**: Dana pribadi untuk donasi
- **Our Social Fund**: Dana bersama untuk program kehutanan
- Transparansi donasi dengan tracking

## 🚀 Tech Stack

- React + TypeScript
- Tailwind CSS v4
- Vite
- Lucide Icons
- Unsplash API (gambar produk)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Laptop: 1024px - 1280px
- Desktop: > 1280px

## 🎨 Color Scheme

- Primary: #2d4a2b (Dark Green)
- Secondary: #4a7a4a (Medium Green)
- Accent: Green gradients
- Background: #f5f5f0 (Warm Gray)
- Success: Green-600
- Error: Red-600

## ✨ User Experience

1. **Scrolling**: Smooth dengan scrollbar tersembunyi
2. **Navigation**: Bottom navbar yang sticky
3. **Modals**: Slide up dari bawah (mobile-friendly)
4. **Buttons**: Hover effects & transitions
5. **Images**: Real photos dari Unsplash
6. **Charts**: Interactive dengan touch/hover
7. **Forms**: Validation & user feedback

## 🔄 User Flow

1. **Browse** → Lihat produk & NFT di Home
2. **Detail** → Klik produk untuk detail lengkap
3. **Cart** → Tambah ke keranjang
4. **Checkout** → Proses pembayaran
5. **NFT** → Terima NFT digital + produk fisik

Untuk trading NFT:
1. **Portfolio** → Lihat NFT yang dimiliki
2. **Detail** → Analisa chart & smart contract
3. **Buy/Sell** → Trading dengan market/limit order
4. **Track** → Monitor performa di portfolio

---

Made with ❤️ for PestaHora Community
