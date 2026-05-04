# 🔐 Admin Panel - Nerch NFT Marketplace

Comprehensive documentation for Nerch Admin Panel - manage products, NFTs, orders, and financial reports.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Access & Security](#access--security)
3. [Dashboard Overview](#dashboard-overview)
4. [Product Management](#product-management)
5. [NFT Management](#nft-management)
6. [Financial Reports](#financial-reports)
7. [API Integration](#api-integration)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Admin Panel adalah sistem manajemen backend untuk Nerch Marketplace yang memungkinkan administrator untuk:

- **Monitor Sales**: Pantau penjualan real-time
- **Manage Products**: Tambah, edit, hapus produk fisik
- **Manage NFTs**: Kelola NFT dan pricing dinamis
- **View Reports**: Lihat laporan keuangan lengkap
- **Analyze Performance**: Analisis performa marketplace

### Key Features

✅ Real-time sales dashboard  
✅ Product CRUD operations  
✅ NFT price management  
✅ Revenue analytics  
✅ Top customers tracking  
✅ Export reports (PDF/Excel)  
✅ Responsive mobile-first design

---

## 🔒 Access & Security

### Accessing Admin Panel

**From Profile Page:**

1. Login ke aplikasi Nerch
2. Navigate ke **Profile** page
3. Klik menu **hamburger** (3 garis) di kanan atas
4. Pilih **"Admin Panel"** dari dropdown menu
5. Anda akan diarahkan ke Admin Dashboard

**Direct URL:**
```
/admin
```

### Security Features

⚠️ **Important Security Notes:**

- **Current Implementation**: Demo mode dengan mock data
- **Production Requirements**:
  - Implement proper authentication middleware
  - Add role-based access control (RBAC)
  - Use JWT tokens untuk session management
  - Encrypt sensitive data
  - Add audit logs untuk admin actions
  - Rate limiting untuk prevent abuse

**Recommended Security Workflow:**

```typescript
// Example: Protected admin route
const requireAdmin = (req, res, next) => {
  const user = verifyToken(req.headers.authorization);
  
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  next();
};

app.use('/api/admin/*', requireAdmin);
```

---

## 📊 Dashboard Overview

### Location
**File:** `src/app/components/admin/AdminDashboard.tsx`

### Features

#### 1. **Statistics Cards**

Menampilkan 4 metric utama:

| Metric | Description | Icon |
|--------|-------------|------|
| Total Revenue | Total pendapatan (Rp) | 💰 |
| Total Orders | Jumlah pesanan | 🛒 |
| Total Users | Jumlah pengguna terdaftar | 👥 |
| NFTs Minted | Total NFT yang di-mint | 🖼️ |

Setiap card menampilkan:
- Current value
- Percentage change (vs previous period)
- Trend indicator (↗️ naik / ↘️ turun)

#### 2. **Recent Orders**

List 5 pesanan terbaru dengan informasi:
- Order ID
- Customer name
- Product name
- Amount (Rp)
- Status (Completed/Processing/Shipped)
- Date

#### 3. **Top Products**

Top 4 produk terlaris dengan:
- Product name
- Number of sales
- Total revenue generated

### Navigation Tabs

Admin Panel memiliki 4 tabs utama:

1. **Dashboard** - Sales overview & statistics
2. **Products** - Manage physical products
3. **NFTs** - Manage NFT collections & pricing
4. **Reports** - Financial reports & analytics

---

## 📦 Product Management

### Location
**File:** `src/app/components/admin/AdminProducts.tsx`

### Features

#### ✨ Add New Product

**Steps:**
1. Klik tombol **"Add"** (hijau, kanan atas)
2. Isi form:
   - **Product Name** * (required)
   - **Category** * - Pilih dari dropdown
   - **Price (Rp)** * - Harga dalam Rupiah
   - **Stock** * - Jumlah stok tersedia
   - **Product Images** * (required) - Upload 1-5 gambar:
     - Klik area upload atau drag & drop
     - Support: PNG, JPG, GIF (max 10MB per image)
     - Gambar pertama = main/primary image
     - Hover untuk hapus gambar
   - **Status** - Active/Inactive
3. Klik **"Add Product"**

**Categories Available:**
- Footwear
- Accessories
- Bags
- Clothing
- Electronics
- Other

#### ✏️ Edit Product

**Steps:**
1. Klik tombol **Edit** (biru) di product card
2. Update informasi yang diinginkan
3. Klik **"Update Product"**

#### 🗑️ Delete Product

**Steps:**
1. Klik tombol **Delete** (merah) di product card
2. Confirm deletion
3. Product akan dihapus dari database

#### 🔍 Search Products

Gunakan search bar untuk mencari product by:
- Product name
- Category name

#### Toggle Status

Klik badge **Active**/**Inactive** untuk toggle product status:
- **Active**: Produk visible di marketplace
- **Inactive**: Produk hidden dari users

### Data Structure

```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;        // dalam Rupiah
  stock: number;
  images: string[];     // Array of image URLs or Base64
  status: 'active' | 'inactive';
}
```

### Form Validation

- ✅ All required fields must be filled
- ✅ At least 1 product image required
- ✅ Maximum 5 images per product
- ✅ Price must be positive number
- ✅ Stock must be non-negative integer
- ✅ Image size max 10MB
- ✅ Supported formats: PNG, JPG, GIF, WebP
- ⚠️ Shows alert if validation fails

### Image Upload Tips

**Best Practices:**
- Upload high-quality images (1200x1200px minimum)
- First image = main thumbnail di product list
- Use consistent image ratios (square recommended)
- Compress images before upload untuk faster loading
- JPG untuk photos, PNG untuk graphics with transparency

---

## 🖼️ NFT Management

### Location
**File:** `src/app/components/admin/AdminNFTs.tsx`

### Features

#### 💰 Update NFT Price

**Quick Price Update:**
1. Klik tombol **"Update Price"** (hijau) di NFT card
2. Isi:
   - **Floor Price** - Harga minimum
   - **Current Price** - Harga saat ini
3. Klik **"Update Price"**

**Auto-calculated:**
- Price change percentage otomatis dihitung
- Trend indicator (↗️ up / ↘️ down) otomatis update

#### ✨ Add New NFT

**Steps:**
1. Klik tombol **"Add"** (hijau, kanan atas)
2. Isi form:
   - **NFT Name** * - e.g., "Premium Sneakers NFT #001"
   - **Collection** * - Pilih dari dropdown
   - **Floor Price (Rp)** * - Harga dasar
   - **Current Price (Rp)** * - Harga jual saat ini
   - **Total Minted** * - Total NFT yang sudah di-mint
   - **Available** * - NFT yang masih available
   - **NFT Images** * (required) - Upload 1-3 gambar:
     - Klik area upload atau drag & drop
     - Support: PNG, JPG (max 10MB per image)
     - Gambar pertama = main display
     - NFT images disimpan di IPFS untuk decentralization
   - **Status** - Active/Inactive
3. Klik **"Add NFT"**

**NFT Collections:**
- Nerch Phygital Sneakers
- Nerch Designer Watches
- Nerch Luxury Bags
- Nerch Fashion Collection
- Nerch Audio Collection
- Other

#### ✏️ Edit NFT

Full edit termasuk:
- Name
- Collection
- Pricing
- Minted count
- Availability
- Status

#### 🔍 Search NFTs

Search by:
- NFT name
- Collection name

### NFT Metrics Displayed

Each NFT card shows:

| Metric | Description |
|--------|-------------|
| Floor Price | Base/minimum price |
| Current Price | Current selling price |
| Price Change | % change with trend |
| Total Minted | Total NFTs created |
| Available | NFTs still for sale |
| Status | Active/Inactive |

### Data Structure

```typescript
interface NFT {
  id: string;
  name: string;
  collection: string;
  floorPrice: number;      // Harga dasar
  currentPrice: number;    // Harga jual
  priceChange: number;     // % perubahan harga
  totalMinted: number;     // Total di-mint
  available: number;       // Masih tersedia
  images: string[];       // Array of image URLs or Base64
  status: 'active' | 'inactive';
}
```

### Image Requirements for NFTs

**Best Practices:**
- High resolution: 2000x2000px atau lebih
- PNG format (supports transparency)
- Square aspect ratio (1:1)
- Max 3 images per NFT
- For production: Upload to IPFS for decentralized storage
- Include metadata image untuk OpenSea compatibility

### Pricing Strategy

**Best Practices:**

1. **Floor Price** harus lebih rendah atau sama dengan **Current Price**
2. **Price Change** dihitung otomatis: `((currentPrice - floorPrice) / floorPrice) * 100`
3. Update pricing secara berkala berdasarkan demand
4. Monitor availability - auto inactive jika `available === 0`

---

## 📈 Financial Reports

### Location
**File:** `src/app/components/admin/AdminReports.tsx`

### Features

#### 📅 Period Selection

**Time Periods:**
- **This Week** - 7 hari terakhir
- **This Month** - Bulan berjalan
- **This Year** - Tahun berjalan

**Custom Filters:**
- Select specific **Year** (2024-2026)
- Select specific **Month** (January-December)

#### 📊 Summary Statistics

4 key metrics dengan trend:
- **Total Revenue** - Pendapatan total
- **Total Orders** - Jumlah pesanan
- **New Customers** - Customer baru
- **Products Sold** - Produk terjual

Each stat shows:
- Current value
- % change vs previous period
- Trend indicator

#### 💵 Revenue by Category

Breakdown pendapatan per kategori:
- NFT Sales
- Physical Products
- Accessories
- Electronics
- Others

Displayed as:
- Amount (Rp)
- Progress bar
- Percentage of total

#### 📉 Monthly Revenue Trend

Chart menampilkan revenue per bulan (5 bulan terakhir):
- Bar chart format
- Revenue dalam millions (M)
- Easy comparison antar bulan

#### 👥 Top Customers

Top 5 customers berdasarkan total spending:
- Customer name
- Number of orders
- Total amount spent (Rp)
- Ranking (1-5)

#### 💾 Export Options

**Download Report:**

1. Klik **"Download PDF"** di header
2. Report akan di-generate untuk period yang dipilih

**Export Formats:**
- **PDF** - Formatted report (red button)
- **Excel** - Spreadsheet format (green button)

**Report Contents:**
- Summary statistics
- Revenue breakdown
- Top customers
- Monthly trends
- Metadata (period, generated date)

### Analytics Tips

**How to Use:**

1. **Weekly Review**: Check "This Week" untuk quick overview
2. **Monthly Planning**: Analyze "This Month" untuk strategic decisions
3. **Annual Report**: Use "This Year" untuk yearly performance
4. **Category Analysis**: Identify top-performing categories
5. **Customer Retention**: Monitor top customers, create loyalty programs

---

## 🔌 API Integration

### Current Implementation

**Status:** Mock data (client-side only)

All admin components currently use:
- `useState` untuk state management
- Local arrays untuk mock data
- `alert()` untuk user feedback

### Production API Integration

**Recommended Structure:**

#### 1. **Products API**

```typescript
// GET all products
GET /api/admin/products
Response: Product[]

// POST new product
POST /api/admin/products
Body: { name, category, price, stock, image, status }
Response: Product

// PUT update product
PUT /api/admin/products/:id
Body: Partial<Product>
Response: Product

// DELETE product
DELETE /api/admin/products/:id
Response: { success: boolean }
```

#### 2. **NFTs API**

```typescript
// GET all NFTs
GET /api/admin/nfts
Response: NFT[]

// POST new NFT
POST /api/admin/nfts
Body: { name, collection, floorPrice, currentPrice, ... }
Response: NFT

// PUT update NFT price
PUT /api/admin/nfts/:id/price
Body: { floorPrice, currentPrice }
Response: NFT

// PUT update NFT
PUT /api/admin/nfts/:id
Body: Partial<NFT>
Response: NFT

// DELETE NFT
DELETE /api/admin/nfts/:id
Response: { success: boolean }
```

#### 3. **Reports API**

```typescript
// GET dashboard stats
GET /api/admin/reports/stats?period=month
Response: {
  revenue: number,
  orders: number,
  users: number,
  nftsMinted: number
}

// GET revenue by category
GET /api/admin/reports/revenue-by-category?period=month
Response: RevenueByCategory[]

// GET top customers
GET /api/admin/reports/top-customers?limit=5
Response: Customer[]

// GET monthly trend
GET /api/admin/reports/monthly-trend?year=2026
Response: MonthlyRevenue[]

// POST export report
POST /api/admin/reports/export
Body: { format: 'pdf' | 'excel', period, year, month }
Response: { downloadUrl: string }
```

### Integration Example

**Replace mock data with API calls:**

```typescript
// Before (Mock)
const [products, setProducts] = useState<Product[]>([...mockData]);

// After (API)
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('/api/admin/products')
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to load products:', err);
      setLoading(false);
    });
}, []);

// Add product
const handleSaveProduct = async () => {
  const response = await fetch('/api/admin/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const newProduct = await response.json();
  setProducts(prev => [...prev, newProduct]);
};
```

---

## ✅ Best Practices

### Product Management

1. **Always set realistic stock levels**
   - Update stock after each sale
   - Set status to inactive if stock = 0

2. **Use clear, descriptive names**
   - Good: "Nike Air Jordan 1 Retro High"
   - Bad: "Sneakers 1"

3. **Categorize properly**
   - Consistent categorization helps with filtering
   - Use existing categories when possible

4. **Regular price reviews**
   - Monitor competitor pricing
   - Adjust based on demand

### NFT Management

1. **Pricing Strategy**
   - Set floor price conservatively
   - Allow market to drive current price
   - Update pricing based on sales velocity

2. **Limited Supply**
   - Total Minted should reflect actual scarcity
   - Don't over-mint (reduces value)

3. **Collection Consistency**
   - Keep naming conventions consistent within collections
   - Example: "Collection Name #001", "#002", etc.

4. **Monitor Availability**
   - Auto-deactivate when sold out
   - Reactivate if NFTs return to market

### Financial Reports

1. **Regular Review**
   - Weekly: Quick health check
   - Monthly: Detailed analysis
   - Yearly: Strategic planning

2. **Export & Archive**
   - Download reports monthly
   - Store in secure backup
   - Use for tax/accounting purposes

3. **Track Trends**
   - Compare month-over-month
   - Identify seasonal patterns
   - Plan inventory accordingly

4. **Customer Insights**
   - Analyze top customer behavior
   - Create loyalty programs
   - Personalized marketing

### Security

1. **Access Control**
   - Only grant admin access to trusted personnel
   - Use strong passwords
   - Enable 2FA in production

2. **Audit Logging**
   - Log all admin actions
   - Track who changed what and when
   - Monitor for suspicious activity

3. **Data Backup**
   - Regular database backups
   - Test restore procedures
   - Offsite backup storage

---

## 🛠️ Troubleshooting

### Common Issues

#### ❌ "Cannot access admin panel"

**Solution:**
1. Ensure user is logged in
2. Check if user has admin role (production)
3. Clear browser cache and cookies
4. Check browser console for errors

#### ❌ "Changes not saving"

**Solution:**
1. Check form validation (all required fields)
2. Verify network connection
3. Check browser console for API errors
4. In production: verify backend is running

#### ❌ "Search not working"

**Solution:**
1. Clear search input and try again
2. Check spelling (case-insensitive)
3. Refresh the page
4. Try different search terms

#### ❌ "Reports showing wrong data"

**Solution:**
1. Verify selected period/year/month
2. Refresh the page
3. Check if mock data needs update
4. In production: verify API data

#### ❌ "Modal not closing"

**Solution:**
1. Click the X button (top right)
2. Click outside the modal
3. Press ESC key
4. Refresh the page if stuck

### Debug Mode

**Enable debug logging:**

```typescript
// Add to AdminDashboard.tsx
const DEBUG = true;

useEffect(() => {
  if (DEBUG) {
    console.log('Current tab:', activeTab);
    console.log('Stats:', stats);
  }
}, [activeTab, stats]);
```

### Performance Issues

**If admin panel is slow:**

1. **Check data size**
   - Too many products/NFTs loaded at once
   - Implement pagination (production)

2. **Optimize re-renders**
   - Use `React.memo` for list items
   - Implement virtualization for long lists

3. **Browser resources**
   - Close unused tabs
   - Clear browser cache
   - Update to latest browser version

---

## 📞 Support

### Getting Help

**Documentation:**
- `README.md` - Main project documentation
- `DATABASE.md` - Database schema & setup
- `DOWNLOAD_AND_DEPLOY.md` - Deployment guide
- `ADMIN.md` - This file (admin documentation)

**Contact:**
- **GitHub Issues**: Report bugs & feature requests
- **Email**: dev@nerch.com
- **Discord**: https://discord.gg/nerch

### Feature Requests

To request new admin features:

1. Open GitHub issue
2. Tag as "enhancement"
3. Describe use case clearly
4. Include mockups if possible

### Bug Reports

When reporting bugs:

1. Describe the issue clearly
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots/screen recording
5. Browser & OS version
6. Console error logs

---

## 🎉 Conclusion

Admin Panel adalah powerful tool untuk mengelola Nerch Marketplace. Dengan features lengkap untuk product management, NFT pricing, dan financial reporting, admin dapat:

✅ Monitor bisnis real-time  
✅ Make data-driven decisions  
✅ Optimize inventory & pricing  
✅ Track customer behavior  
✅ Export reports untuk analysis

**Next Steps:**

1. ✅ Setup admin access (sudah selesai!)
2. ⏭️ Connect to backend API (production)
3. ⏭️ Implement authentication & authorization
4. ⏭️ Add audit logging
5. ⏭️ Setup automated reports

---

**Version:** 1.0.0  
**Last Updated:** May 2026  
**Author:** Nerch Development Team  
**License:** MIT
