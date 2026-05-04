# 📖 Nerch - Dokumentasi Lengkap

## 🎯 Cara Mengganti Gambar & Konten

### 1. Mengganti Banner Carousel

File: `src/app/components/BannerCarousel.tsx`

Cari array `banners` (baris ~5):

```tsx
const banners = [
  {
    id: 1,
    title: 'Merch Konser Hindia Rilis',      // ← Ubah judul
    subtitle: 'Limited Edition NFT Phygital', // ← Ubah subtitle
    image: 'https://images.unsplash.com/...',// ← Ubah URL gambar
    badge: 'EXCLUSIVE'                        // ← Ubah badge text
  },
  // Tambah banner baru di sini
];
```

**Cara Menambah Banner:**
1. Copy-paste salah satu object banner
2. Ubah `id` menjadi nomor berikutnya
3. Ganti `title`, `subtitle`, `image`, dan `badge`
4. Save file

**Cara Mendapatkan Gambar Baru:**
- Gunakan Unsplash: `https://unsplash.com/`
- Cari gambar → Klik kanan → Copy image address
- Paste URL ke field `image`

---

### 2. Mengganti Produk di Shop

File: `src/app/components/ShopPage.tsx`

Cari array `allProducts` (baris ~10):

```tsx
const allProducts = [
  {
    id: '1',
    name: 'Hoodie Exclusive Feast',        // ← Nama produk
    price: 1500000,                        // ← Harga (tanpa koma)
    imageUrl: 'https://images.unsplash...', // ← URL gambar
    badge: '🎭',                            // ← Emoji badge
    category: 'Apparel',                   // ← Kategori
    artist: 'Feast',                       // ← Nama artis
    nftIncluded: true,                     // ← Ada NFT atau tidak
    sizes: ['S', 'M', 'L', 'XL'],         // ← Pilihan size (opsional)
    colors: ['White', 'Black']             // ← Pilihan warna (opsional)
  },
  // Tambah produk baru di sini
];
```

**Menambah Produk Baru:**
1. Copy-paste salah satu produk
2. Ubah `id` menjadi nomor berikutnya
3. Ganti semua field sesuai kebutuhan
4. Save file

**Kategori yang Tersedia:**
- `Apparel` - Pakaian
- `Accessories` - Aksesoris
- `Collectibles` - Koleksi

---

### 3. Mengganti Data NFT

File: `src/app/components/HomePage.tsx`

Cari array `nfts` (baris ~45):

```tsx
const nfts = [
  { 
    id: 'HFeastHora-001',           // ← ID unik
    name: 'HFeastHora-001',         // ← Nama NFT
    price: '1.05',                  // ← Harga ETH
    change: '+50.5%',               // ← Perubahan harga
    icon: '💀',                     // ← Emoji icon
    currentPrice: 78095317,         // ← Harga Rupiah
    trend: 'up' as const            // ← Trend: 'up' atau 'down'
  },
  // Tambah NFT baru
];
```

**Untuk Portfolio:**
File: `src/app/components/PortfolioPage.tsx`
- Sama seperti di atas, cari array `nfts`

---

### 4. Mengganti Gambar Produk Featured

File: `src/app/components/HomePage.tsx`

Cari array `products` (baris ~15):

```tsx
const products = [
  {
    id: '1',
    name: 'Hoodie Exclusive',
    price: 1500000,
    imageUrl: 'https://images.unsplash.com/...',  // ← Ganti URL
    badge: '🎭',
    nftIncluded: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Gray'],
    description: 'Deskripsi produk...'             // ← Ganti deskripsi
  }
];
```

---

## 🎨 Cara Mengubah Warna Tema

File: `src/app/App.tsx` dan semua component files

**Primary Color (Hijau):**
Cari semua instance: `#2d4a2b`
Ganti dengan warna hex baru, contoh: `#3b82f6` (biru)

**Secondary Color:**
Cari: `#4a7a4a`
Ganti dengan warna yang lebih terang dari primary

**Cara Cepat (Find & Replace):**
1. Ctrl+Shift+F (VS Code) atau Cmd+Shift+F (Mac)
2. Cari: `#2d4a2b`
3. Replace All dengan warna baru

---

## 📝 Cara Mengubah Text & Label

### Navbar Labels
File: `src/app/App.tsx`

```tsx
<span className="text-xs font-medium">Home</span>      // ← Ubah label
<span className="text-xs font-medium">Portfolio</span>
<span className="text-xs font-medium">Shop</span>
<span className="text-xs font-medium">Balance</span>
```

### Page Titles
Setiap halaman punya heading:
- **HomePage**: Cari `<h1>Nerch</h1>`
- **ShopPage**: Cari `<h1>Shop</h1>`
- **PortfolioPage**: Cari `<h1>Portfolio</h1>`

---

## 🔧 Cara Menambah Kategori/Filter

### Kategori Produk
File: `src/app/components/ShopPage.tsx`

```tsx
const categories = ['All', 'Apparel', 'Accessories', 'Collectibles'];
// Tambah kategori baru:
const categories = ['All', 'Apparel', 'Accessories', 'Collectibles', 'New Category'];
```

### Artist Filter
```tsx
const artists = ['All', 'Feast', 'Hindia', 'Dewa 19', 'Sal Priadi', 'Various'];
// Tambah artis baru
```

**⚠️ Penting:** Pastikan kategori/artist di produk cocok dengan filter!

---

## 🖼️ Sumber Gambar Gratis

### Recommended:
1. **Unsplash** - https://unsplash.com
   - Gratis, high quality
   - Cara: Klik kanan → Copy image address

2. **Pexels** - https://pexels.com
   - Gratis, banyak pilihan

3. **Pixabay** - https://pixabay.com
   - Gratis, no attribution

### Format URL:
```
https://images.unsplash.com/photo-XXXXXXX?w=800&q=80
                                         ↑       ↑
                                      width  quality
```

**Tips:**
- Gunakan `w=400` untuk thumbnail
- Gunakan `w=800` untuk banner
- `q=80` = kualitas bagus, file kecil

---

## 💰 Cara Mengubah Harga & Nilai

### Format Harga:
```tsx
price: 1500000,  // ← Tulis angka tanpa titik/koma
// Display otomatis jadi: Rp. 1.500.000
```

### Asset Total:
File: `src/app/components/HomePage.tsx`

```tsx
<div className="text-2xl">Rp10.000.000</div>  // ← Ubah angka
<div className="text-sm text-green-600">
  Return + Rp10.000.000 (+100%)               // ← Ubah return
</div>
```

### Portfolio Value:
File: `src/app/components/PortfolioPage.tsx`

```tsx
const totalValue = 10000000;      // ← Ubah total
const totalChange = 4122000;      // ← Ubah perubahan
const totalChangePercent = 70.11; // ← Ubah persen
```

---

## 🎭 Cara Mengubah Icon/Emoji

Semua emoji bisa diganti langsung di code:

```tsx
badge: '🎭',  // ← Ganti emoji
icon: '💀',   // ← Ganti icon NFT
```

**Cara Copy Emoji:**
1. Buka: https://emojipedia.org
2. Cari emoji → Copy → Paste ke code

---

## 🔄 Cara Mengganti Auto-Slide Duration

File: `src/app/components/BannerCarousel.tsx`

```tsx
const interval = setInterval(() => {
  setCurrentIndex((prev) => (prev + 1) % banners.length);
}, 5000);  // ← 5000 = 5 detik, ubah sesuai keinginan
```

---

## 📱 Responsive Breakpoints

Default breakpoints:
```
Mobile:  < 768px
Tablet:  768px - 1024px
Laptop:  1024px - 1280px
Desktop: > 1280px
```

Ubah di Tailwind classes:
- `md:` = tablet (768px)
- `lg:` = laptop (1024px)
- `xl:` = desktop (1280px)

---

## 🐛 Troubleshooting

### Gambar tidak muncul?
1. Cek URL gambar valid
2. Pastikan ada `https://`
3. Test URL di browser

### Produk tidak muncul di filter?
1. Cek `category` dan `artist` sesuai dengan filter
2. Case-sensitive! `Apparel` ≠ `apparel`

### Layout rusak di mobile?
1. Cek ada class responsive: `grid-cols-2 md:grid-cols-3`
2. Test di mode responsive browser (F12)

### Warna tidak berubah?
1. Pastikan replace semua instance (`Ctrl+Shift+F`)
2. Clear browser cache (Ctrl+Shift+R)
3. Restart dev server

---

## 📁 Struktur File Penting

```
src/
├── app/
│   ├── App.tsx                    ← Main app (navbar, routing)
│   └── components/
│       ├── HomePage.tsx           ← Halaman utama
│       ├── ShopPage.tsx           ← Halaman shop
│       ├── PortfolioPage.tsx      ← Portfolio NFT
│       ├── NFTDetailPage.tsx      ← Detail NFT
│       ├── BalancePage.tsx        ← Saldo & wallet
│       ├── ProfilePage.tsx        ← Profil user
│       ├── BannerCarousel.tsx     ← Banner slider
│       ├── MiniChart.tsx          ← Chart kecil
│       ├── ProductDetailModal.tsx ← Detail produk
│       ├── BuyModal.tsx           ← Modal beli NFT
│       ├── SellModal.tsx          ← Modal jual NFT
│       ├── CartModal.tsx          ← Keranjang
│       ├── TopUpModal.tsx         ← Top up saldo
│       └── FilterModal.tsx        ← Filter produk
└── styles/
    └── app.css                    ← Custom CSS
```

---

## 🚀 Quick Reference

### Mengganti 1 Gambar Banner:
1. Buka `BannerCarousel.tsx`
2. Cari `banners` array
3. Ganti `image: 'URL_BARU'`

### Menambah 1 Produk:
1. Buka `ShopPage.tsx`
2. Copy produk terakhir di `allProducts`
3. Ubah semua field, save

### Ubah Warna Hijau ke Biru:
1. Find: `#2d4a2b`
2. Replace all: `#3b82f6`
3. Save all files

### Ubah Harga NFT:
1. Buka `HomePage.tsx` atau `PortfolioPage.tsx`
2. Cari array `nfts`
3. Ubah `currentPrice` dan `price`

---

## 💡 Tips & Best Practices

1. **Backup dulu** sebelum edit banyak file
2. **Test di browser** setelah setiap perubahan
3. **Gunakan emoji** yang relevan dengan produk
4. **Konsisten** dengan naming (huruf besar/kecil)
5. **Optimasi gambar** - gunakan format WebP jika bisa
6. **Jangan hardcode** - gunakan variable/constant
7. **Comment code** jika logic kompleks

---

## 🆘 Need Help?

Jika ada error:
1. Check browser console (F12)
2. Read error message
3. Google error message
4. Check dokumentasi React/TypeScript

Good luck! 🚀
