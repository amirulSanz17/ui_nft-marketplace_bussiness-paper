# 📝 Changelog - Nerch NFT Marketplace

All notable changes to this project will be documented in this file.

---

## [1.2.0] - May 2026

### ✨ New Features

#### 1. **Logout Functionality**
- ✅ Full logout implementation
- ✅ Clears localStorage on logout
- ✅ Redirects to login page
- ✅ Both dropdown menu and bottom button working
- **Files:** `ProfilePage.tsx`, `App.tsx`

#### 2. **Multiple Image Upload System**
- ✅ New `ImageUpload` component
- ✅ Drag & drop support
- ✅ Multiple images (1-5 for products, 1-3 for NFTs)
- ✅ Image preview grid
- ✅ Remove individual images
- ✅ Primary image indicator
- ✅ Support: PNG, JPG, GIF, WebP (max 10MB)
- **Files:** `ImageUpload.tsx`, `AdminProducts.tsx`, `AdminNFTs.tsx`

#### 3. **Product NFT Certificate Toggle**
- ✅ "Include NFT" checkbox in admin product form
- ✅ Visual badge indicator on product cards
- ✅ Database schema updated
- ✅ Admin can toggle NFT certificate per product
- **Files:** `AdminProducts.tsx`, `DATABASE.md`

#### 4. **Continue to Payment Functionality**
- ✅ Payment button enabled/disabled based on form validation
- ✅ Step navigation working (shipping → payment → confirmation)
- ✅ Form validation for all required fields
- **Files:** `CheckoutPage.tsx`

### 🎨 Layout Improvements

#### 1. **Desktop Full-Width Optimization**
- ✅ **HomePage** - Expanded to 1400px max-width
- ✅ **PortfolioPage** - Expanded to 1400px max-width
- ✅ **ShopPage** - Expanded to 1400px max-width
- ✅ **CryptoPage** - Expanded to 7xl container
- ✅ **SocialFundPage** - Expanded to 7xl container
- ✅ Added `lg:px-16` for larger padding on desktop
- ✅ Fully responsive (mobile → tablet → desktop)

#### 2. **Responsive Design Enhancements**
- Mobile: 4px padding, compact layout
- Tablet: 8px padding, 2-3 columns
- Desktop: 16px padding, 4-5 columns, full width
- Large Desktop: Up to 1400px content width

### 🐛 Bug Fixes

#### 1. **DOM Nesting Warning**
- ✅ Fixed invalid HTML in `ChatPage.tsx`
- Changed `<p>` containing `<div>` to valid `<div>` structure
- **Line 303:** Online status indicator

#### 2. **Image Display Issues**
- ✅ Product images now render properly
- ✅ NFT images display correctly
- ✅ Placeholder fallback for missing images
- ✅ Unsplash placeholder images for demo data

### 📊 Database Changes

#### New Tables

**product_images:**
```sql
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  image_url TEXT,
  image_data TEXT,  -- Base64 for demo
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  file_size INTEGER,
  file_type VARCHAR(50)
);
```

**nft_images:**
```sql
CREATE TABLE nft_images (
  id SERIAL PRIMARY KEY,
  nft_id INTEGER REFERENCES nfts(id),
  image_url TEXT,
  image_data TEXT,
  ipfs_hash VARCHAR(100),
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  file_size INTEGER,
  file_type VARCHAR(50)
);
```

#### Updated Columns

**products table:**
- Removed: `image_url` (single image)
- Added: Relationship to `product_images` table
- Added: `nft_included` BOOLEAN (via admin toggle)

**nfts table:**
- Removed: `image_url` (single image)
- Added: Relationship to `nft_images` table

### 📚 Documentation Updates

#### 1. **DATABASE.md**
- ✅ New `product_images` table schema
- ✅ New `nft_images` table schema
- ✅ Image Storage Strategy section
  - Development mode (Base64)
  - Production options (S3, IPFS, CDN)
  - Image optimization guidelines
  - Query examples
- ✅ Best practices for image handling

#### 2. **ADMIN.md**
- ✅ Updated Product Management section
  - Image upload instructions
  - NFT certificate toggle documentation
  - Updated data structures
  - Validation rules
- ✅ Updated NFT Management section
  - Image upload requirements
  - Best practices for NFT images
  - IPFS recommendations

#### 3. **CHANGELOG.md** (New)
- ✅ Complete change log
- ✅ Version tracking
- ✅ Feature documentation

### 🔄 Component Updates

#### AdminProducts.tsx
- ✅ Multiple image support
- ✅ Include NFT toggle checkbox
- ✅ Visual NFT badge (+NFT)
- ✅ Form validation for images
- ✅ Updated Product interface

#### AdminNFTs.tsx
- ✅ Multiple image support
- ✅ Image upload component
- ✅ Updated NFT interface
- ✅ Form validation

#### ProfilePage.tsx
- ✅ Logout functionality both locations
- ✅ localStorage clearing
- ✅ Proper state reset

#### App.tsx
- ✅ handleLogout function
- ✅ Pass onLogout prop to ProfilePage
- ✅ State management for auth

#### ImageUpload.tsx (New)
- ✅ Drag & drop interface
- ✅ File validation
- ✅ Preview grid
- ✅ Remove functionality
- ✅ Primary image indication

---

## [1.1.0] - May 2026

### Initial Admin Panel Release

#### Features Added
- ✅ Admin Dashboard with sales overview
- ✅ Product Management (CRUD)
- ✅ NFT Management (CRUD + pricing)
- ✅ Financial Reports
- ✅ Admin access from profile page
- ✅ Complete ADMIN.md documentation

---

## [1.0.0] - May 2026

### Initial Release

#### Core Features
- ✅ User Authentication (Login/Register)
- ✅ Home Page with products & NFTs
- ✅ Portfolio Page with investments
- ✅ Shop Page with filters
- ✅ Balance Page with wallet
- ✅ Profile Page
- ✅ NFT Detail Page
- ✅ Social Fund tracking
- ✅ Checkout flow
- ✅ Chat system
- ✅ Crypto assets tracking

#### Documentation
- ✅ README.md
- ✅ DATABASE.md
- ✅ DOWNLOAD_AND_DEPLOY.md

---

## 🚀 Upcoming Features (Planned)

### v1.3.0
- [ ] Real backend API integration
- [ ] Actual image upload to S3/IPFS
- [ ] Product/NFT state management (Redux/Zustand)
- [ ] Real-time admin → user data sync
- [ ] WebSocket for live updates
- [ ] Image optimization pipeline
- [ ] CDN integration

### v1.4.0
- [ ] User roles & permissions
- [ ] Advanced admin analytics
- [ ] Bulk product operations
- [ ] Export/Import functionality
- [ ] Audit logs
- [ ] Email notifications

### v2.0.0
- [ ] Blockchain integration (Ethereum/Polygon)
- [ ] Smart contract deployment
- [ ] Real NFT minting
- [ ] Wallet connect (MetaMask)
- [ ] IPFS storage for NFT metadata
- [ ] Decentralized marketplace

---

## 📝 Notes

### Migration Guide (v1.1.0 → v1.2.0)

**Database Migration:**
```sql
-- Add nft_included column to products
ALTER TABLE products ADD COLUMN nft_included BOOLEAN DEFAULT true;

-- Create product_images table
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_data TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  file_size INTEGER,
  file_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create nft_images table
CREATE TABLE nft_images (
  id SERIAL PRIMARY KEY,
  nft_id INTEGER NOT NULL REFERENCES nfts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_data TEXT,
  ipfs_hash VARCHAR(100),
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  file_size INTEGER,
  file_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Code Changes:**
- Update Product interface to include `includeNFT: boolean`
- Update Product interface to use `images: string[]` instead of `image: string`
- Update NFT interface to use `images: string[]` instead of `image: string`
- Import ImageUpload component in admin pages

**No Breaking Changes:**
- All existing data structures remain compatible
- Mock data updated with new fields
- Backward compatible with v1.1.0

---

## 🙏 Contributors

- Nerch Development Team
- Claude Code (AI Assistant)

---

**Last Updated:** May 3, 2026  
**Current Version:** 1.2.0
