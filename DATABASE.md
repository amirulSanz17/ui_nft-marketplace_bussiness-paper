# 📊 Database Documentation - Nerch NFT Marketplace

## Database Overview

Nerch menggunakan **PostgreSQL** sebagai database utama untuk menyimpan data user, produk, NFT, transaksi, dan social fund.

---

## 🗄️ Database Schema

### 1. **users** - Data Pengguna

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  wallet_address VARCHAR(42) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email_verified BOOLEAN DEFAULT false,
  two_factor_enabled BOOLEAN DEFAULT false
);

-- Indexes untuk performa
CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_users_email ON users(email);
```

**Kolom Penting:**
- `wallet_address`: Alamat wallet Ethereum (unique identifier)
- `email`: Email user untuk notifikasi
- `full_name`, `phone`: Data personal
- `avatar_url`: URL foto profil
- `two_factor_enabled`: Status 2FA security

---

### 2. **products** - Merchandise Fisik

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(15,2) NOT NULL,
  category VARCHAR(50),
  artist VARCHAR(100),
  nft_included BOOLEAN DEFAULT true,
  stock INTEGER DEFAULT 0,
  sizes JSONB,
  colors JSONB,
  weight_grams INTEGER,
  dimensions JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Indexes
CREATE INDEX idx_products_artist ON products(artist);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(is_active);
```

### 2a. **product_images** - Product Image Gallery

```sql
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_data TEXT,  -- Base64 encoded image (untuk development/demo)
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  file_size INTEGER,  -- in bytes
  file_type VARCHAR(50),  -- e.g., 'image/jpeg', 'image/png'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_product_images_primary ON product_images(is_primary);
CREATE INDEX idx_product_images_order ON product_images(product_id, display_order);

-- Constraint: hanya 1 primary image per product
CREATE UNIQUE INDEX idx_product_one_primary 
  ON product_images(product_id) 
  WHERE is_primary = true;
```

**Kolom Penting:**
- `image_url`: URL public image (untuk production dengan CDN/S3)
- `image_data`: Base64 string image (untuk demo tanpa file upload service)
- `is_primary`: Gambar utama yang ditampilkan first
- `display_order`: Urutan tampilan di gallery (0 = first)
- `file_size`, `file_type`: Metadata untuk validation

**Kolom Penting:**
- `nft_included`: Apakah produk ini include NFT certificate
- `sizes`, `colors`: Array varian (JSON format)
- `stock`: Jumlah stok tersedia
- `weight_grams`, `dimensions`: Untuk kalkulasi shipping

**Contoh Data:**
```json
{
  "name": "Hoodie Exclusive Feast - PestaHora",
  "price": 1500000,
  "artist": "Feast",
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "colors": ["White", "Black", "Gray"]
}
```

---

### 3. **nfts** - NFT Digital Assets

```sql
CREATE TABLE nfts (
  id SERIAL PRIMARY KEY,
  token_id INTEGER UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  owner_address VARCHAR(42),
  contract_address VARCHAR(42) NOT NULL,
  metadata_uri VARCHAR(500),
  current_price DECIMAL(15,2),
  floor_price DECIMAL(15,2),
  market_cap BIGINT,
  volume_24h DECIMAL(15,2),
  change_24h DECIMAL(10,2),
  artist VARCHAR(100),
  collection_name VARCHAR(255),
  royalty_percentage DECIMAL(5,2) DEFAULT 5.00,
  minted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_address) REFERENCES users(wallet_address) ON UPDATE CASCADE
);

-- Indexes
CREATE INDEX idx_nfts_owner ON nfts(owner_address);
CREATE INDEX idx_nfts_token ON nfts(token_id);
CREATE INDEX idx_nfts_artist ON nfts(artist);
CREATE INDEX idx_nfts_collection ON nfts(collection_name);
```

### 3a. **nft_images** - NFT Image Gallery

```sql
CREATE TABLE nft_images (
  id SERIAL PRIMARY KEY,
  nft_id INTEGER NOT NULL REFERENCES nfts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_data TEXT,  -- Base64 encoded image (untuk development/demo)
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  file_size INTEGER,  -- in bytes
  file_type VARCHAR(50),  -- e.g., 'image/jpeg', 'image/png'
  ipfs_hash VARCHAR(100),  -- IPFS hash untuk decentralized storage
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_nft_images_nft ON nft_images(nft_id);
CREATE INDEX idx_nft_images_primary ON nft_images(is_primary);
CREATE INDEX idx_nft_images_order ON nft_images(nft_id, display_order);
CREATE INDEX idx_nft_images_ipfs ON nft_images(ipfs_hash);

-- Constraint: hanya 1 primary image per NFT
CREATE UNIQUE INDEX idx_nft_one_primary 
  ON nft_images(nft_id) 
  WHERE is_primary = true;
```

**Kolom Penting:**
- `image_url`: URL public image (CDN/S3/IPFS gateway)
- `image_data`: Base64 string (untuk demo mode)
- `ipfs_hash`: Hash untuk IPFS storage (decentralized)
- `is_primary`: Main image untuk thumbnail
- `display_order`: Sequence dalam gallery

**Kolom Penting:**
- `token_id`: ID unik NFT di blockchain
- `contract_address`: Address smart contract ERC-721
- `metadata_uri`: Link ke metadata JSON (IPFS)
- `current_price`, `floor_price`: Harga market
- `royalty_percentage`: Royalty untuk artist (default 5%)

---

### 4. **orders** - Order Pembelian

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  total_amount DECIMAL(15,2) NOT NULL,
  subtotal DECIMAL(15,2) NOT NULL,
  shipping_fee DECIMAL(15,2) DEFAULT 0,
  service_fee DECIMAL(15,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending',
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) DEFAULT 'unpaid',
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL,
  notes TEXT,
  tracking_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP,
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
```

**Status Order:**
- `pending`: Menunggu payment
- `paid`: Sudah dibayar
- `processing`: Sedang diproses
- `shipped`: Sudah dikirim
- `delivered`: Sudah diterima
- `cancelled`: Dibatalkan

**Contoh shipping_address (JSONB):**
```json
{
  "fullName": "John Doe",
  "phone": "08123456789",
  "email": "john@example.com",
  "address": "Jl. Sudirman No. 123",
  "city": "Jakarta Selatan",
  "province": "DKI Jakarta",
  "postalCode": "12190"
}
```

**Contoh items (JSONB):**
```json
[
  {
    "id": "1",
    "name": "Hoodie Exclusive Feast",
    "price": 1500000,
    "quantity": 2,
    "variant": "Black, XL",
    "nftIncluded": true
  }
]
```

---

### 5. **nft_transactions** - Transaksi NFT (Buy/Sell)

```sql
CREATE TABLE nft_transactions (
  id SERIAL PRIMARY KEY,
  transaction_hash VARCHAR(66) UNIQUE,
  nft_id INTEGER REFERENCES nfts(id),
  from_address VARCHAR(42),
  to_address VARCHAR(42),
  transaction_type VARCHAR(20) NOT NULL,
  quantity DECIMAL(10,4) NOT NULL,
  price_per_unit DECIMAL(15,2),
  total_amount DECIMAL(15,2),
  fee DECIMAL(15,2),
  status VARCHAR(20) DEFAULT 'pending',
  order_type VARCHAR(20),
  limit_price DECIMAL(15,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  executed_at TIMESTAMP,
  FOREIGN KEY (from_address) REFERENCES users(wallet_address) ON UPDATE CASCADE,
  FOREIGN KEY (to_address) REFERENCES users(wallet_address) ON UPDATE CASCADE
);

-- Indexes
CREATE INDEX idx_nft_tx_hash ON nft_transactions(transaction_hash);
CREATE INDEX idx_nft_tx_nft ON nft_transactions(nft_id);
CREATE INDEX idx_nft_tx_from ON nft_transactions(from_address);
CREATE INDEX idx_nft_tx_to ON nft_transactions(to_address);
CREATE INDEX idx_nft_tx_created ON nft_transactions(created_at DESC);
```

**Transaction Types:**
- `buy`: Pembelian NFT
- `sell`: Penjualan NFT
- `transfer`: Transfer antar wallet
- `mint`: Minting NFT baru

**Order Types:**
- `market`: Execute immediately
- `limit`: Execute saat harga mencapai limit

---

### 6. **donations** - Social Fund Donations

```sql
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  order_id INTEGER REFERENCES orders(id),
  nft_id INTEGER REFERENCES nfts(id),
  product_id INTEGER REFERENCES products(id),
  amount DECIMAL(15,2) NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  project_location VARCHAR(255),
  project_description TEXT,
  status VARCHAR(20) DEFAULT 'in_progress',
  impact_trees_planted INTEGER,
  impact_co2_offset DECIMAL(10,2),
  donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_donations_user ON donations(user_id);
CREATE INDEX idx_donations_order ON donations(order_id);
CREATE INDEX idx_donations_status ON donations(status);
```

**Cara Kerja:**
- Setiap pembelian produk → 5% harga masuk social fund
- Donation digunakan untuk program lingkungan (penanaman pohon, etc)

**Status:**
- `in_progress`: Sedang berjalan
- `completed`: Sudah selesai

**Contoh:**
```json
{
  "amount": 75000,
  "project_name": "Penanaman 100 Pohon Mangrove",
  "project_location": "Pantai Indah Kapuk, Jakarta Utara",
  "impact_trees_planted": 10,
  "status": "completed"
}
```

---

### 7. **messages** - Chat Messages

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id),
  receiver_id INTEGER,
  conversation_id VARCHAR(100),
  message TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text',
  attachment_url VARCHAR(500),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
```

**Message Types:**
- `text`: Pesan teks biasa
- `image`: Gambar
- `file`: File attachment

**Conversation ID:**
Format: `user1_id-user2_id` (sorted ascending)
Contoh: `123-456` untuk chat antara user 123 dan 456

---

### 8. **user_settings** - Pengaturan User

```sql
CREATE TABLE user_settings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  price_alerts BOOLEAN DEFAULT true,
  order_updates BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,
  language VARCHAR(10) DEFAULT 'id',
  currency VARCHAR(10) DEFAULT 'IDR',
  theme VARCHAR(20) DEFAULT 'light',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_settings_user ON user_settings(user_id);
```

---

### 9. **activity_logs** - Log Aktivitas

```sql
CREATE TABLE activity_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id INTEGER,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_activity_user ON activity_logs(user_id);
CREATE INDEX idx_activity_created ON activity_logs(created_at DESC);
```

**Contoh Actions:**
- `user.login`
- `user.logout`
- `product.purchase`
- `nft.buy`
- `nft.sell`
- `order.created`
- `order.paid`

---

## 🔗 Entity Relationship Diagram (ERD)

```
┌─────────────┐
│    users    │
└──────┬──────┘
       │
       ├──────────┐
       │          │
       ▼          ▼
┌─────────┐  ┌──────────┐
│  orders │  │   nfts   │
└────┬────┘  └─────┬────┘
     │             │
     │             │
     ▼             ▼
┌──────────┐  ┌──────────────────┐
│donations │  │nft_transactions │
└──────────┘  └──────────────────┘
```

**Relasi Utama:**
1. `users` → `orders` (1:N)
2. `users` → `nfts` (1:N, via owner_address)
3. `users` → `nft_transactions` (1:N)
4. `orders` → `donations` (1:N)
5. `nfts` → `nft_transactions` (1:N)

---

## 🚀 Setup Database

### 1. Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Mac:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Windows:**
Download installer dari: https://www.postgresql.org/download/windows/

---

### 2. Create Database

```bash
# Login sebagai postgres user
sudo -u postgres psql

# Buat database
CREATE DATABASE nerch_db;

# Buat user baru
CREATE USER nerch_admin WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE nerch_db TO nerch_admin;

# Exit
\q
```

---

### 3. Run Migration

Buat file `migration.sql` dengan semua CREATE TABLE statements di atas, lalu:

```bash
psql -U nerch_admin -d nerch_db -f migration.sql
```

Atau menggunakan migration tool seperti **Prisma**, **TypeORM**, atau **Sequelize**.

---

### 4. Environment Variables

Tambahkan di `.env`:

```env
DATABASE_URL=postgresql://nerch_admin:your_secure_password@localhost:5432/nerch_db
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=nerch_db
DATABASE_USER=nerch_admin
DATABASE_PASSWORD=your_secure_password
```

---

## 📊 Sample Data (Seed)

Buat file `seed.sql`:

```sql
-- Sample Users
INSERT INTO users (wallet_address, email, full_name, phone) VALUES
('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1', 'alice@example.com', 'Alice Johnson', '08123456789'),
('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 'bob@example.com', 'Bob Smith', '08198765432');

-- Sample Products
INSERT INTO products (name, description, price, category, artist, nft_included, stock, sizes, colors) VALUES
('Hoodie Exclusive Feast', 'Limited edition hoodie', 1500000, 'Apparel', 'Feast', true, 50, 
 '["S","M","L","XL","XXL"]', '["White","Black","Gray"]'),
('Kaos Hindia Tour', 'Official tour merchandise', 400000, 'Apparel', 'Hindia', true, 100,
 '["S","M","L","XL"]', '["Black","White"]');

-- Sample NFTs
INSERT INTO nfts (token_id, name, owner_address, contract_address, current_price, floor_price, market_cap, artist, collection_name) VALUES
(1, 'HFeastHora-001', '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1', '0x1234567890123456789012345678901234567890', 78095317, 75000000, 78095317000, 'Feast', 'PestaHora Collection'),
(2, 'THindiaHora-001', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', '0x1234567890123456789012345678901234567890', 51000000, 48000000, 51000000000, 'Hindia', 'PestaHora Collection');
```

Run seed:
```bash
psql -U nerch_admin -d nerch_db -f seed.sql
```

---

## 🔒 Security Best Practices

1. **Jangan commit `.env` ke git**
   ```bash
   echo ".env" >> .gitignore
   ```

2. **Gunakan SSL untuk koneksi production**
   ```env
   DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
   ```

3. **Backup database secara berkala**
   ```bash
   pg_dump -U nerch_admin nerch_db > backup_$(date +%Y%m%d).sql
   ```

4. **Limit database user privileges**
   ```sql
   REVOKE ALL ON DATABASE nerch_db FROM PUBLIC;
   GRANT CONNECT ON DATABASE nerch_db TO nerch_admin;
   ```

---

## 📈 Performance Tips

1. **Index frequently queried columns**
   - wallet_address, email, token_id, order_number

2. **Use EXPLAIN ANALYZE**
   ```sql
   EXPLAIN ANALYZE SELECT * FROM nfts WHERE artist = 'Feast';
   ```

3. **Partitioning untuk tabel besar**
   ```sql
   -- Partition orders by created_at
   CREATE TABLE orders_2026 PARTITION OF orders
   FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
   ```

4. **Connection pooling**
   ```javascript
   const pool = new Pool({
     max: 20,
     idleTimeoutMillis: 30000,
     connectionTimeoutMillis: 2000,
   });
   ```

---

## 📸 Image Storage Strategy

### Development/Demo Mode (Current)

**Base64 Storage:**
- Images disimpan sebagai Base64 string di `image_data` column
- Tidak perlu file upload service
- Maximum size: ~10MB per image (recommended: < 2MB)
- Format supported: JPG, PNG, GIF, WebP

**Pros:**
- ✅ Simple implementation
- ✅ No external dependencies
- ✅ Perfect untuk demo/prototype

**Cons:**
- ❌ Database size membesar
- ❌ Slower query performance
- ❌ Not scalable untuk production

### Production Mode (Recommended)

**Option 1: Cloud Storage (AWS S3/Google Cloud Storage)**

```javascript
// Upload flow
const uploadToS3 = async (file) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'nerch-products',
    Key: `products/${Date.now()}_${file.name}`,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read'
  };
  
  const result = await s3.upload(params).promise();
  return result.Location; // URL public
};

// Save to database
await db.query(
  'INSERT INTO product_images (product_id, image_url) VALUES ($1, $2)',
  [productId, result.Location]
);
```

**Option 2: IPFS (Decentralized untuk NFTs)**

```javascript
// Upload to IPFS
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const { cid } = await ipfs.add(file);
const ipfsHash = cid.toString();
const imageUrl = `https://ipfs.io/ipfs/${ipfsHash}`;

// Save to database
await db.query(
  'INSERT INTO nft_images (nft_id, image_url, ipfs_hash) VALUES ($1, $2, $3)',
  [nftId, imageUrl, ipfsHash]
);
```

**Option 3: CDN (Content Delivery Network)**

```javascript
// Upload to CDN
const cdn = new CloudflareCDN();
const cdnUrl = await cdn.upload(file);

// Images served from edge locations (faster global access)
// Example URL: https://cdn.nerch.com/products/abc123.jpg
```

### Image Optimization

**Before Upload:**

```javascript
// Resize & compress image
const sharp = require('sharp');

const optimizeImage = async (file) => {
  const buffer = await sharp(file.buffer)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
  
  return buffer;
};
```

**Recommended Sizes:**

| Type | Size | Format | Quality |
|------|------|--------|---------|
| Product Thumbnail | 400x400 | JPEG | 80% |
| Product Main | 1200x1200 | JPEG | 85% |
| Product Zoom | 2400x2400 | JPEG | 90% |
| NFT Thumbnail | 600x600 | PNG | 90% |
| NFT Full | 2000x2000 | PNG | 95% |

### Query Examples

**Get product with all images:**

```sql
SELECT 
  p.*,
  COALESCE(
    json_agg(
      json_build_object(
        'id', pi.id,
        'url', COALESCE(pi.image_url, pi.image_data),
        'is_primary', pi.is_primary,
        'order', pi.display_order
      ) ORDER BY pi.display_order
    ) FILTER (WHERE pi.id IS NOT NULL),
    '[]'::json
  ) as images
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE p.id = $1
GROUP BY p.id;
```

**Get primary image only:**

```sql
SELECT p.*, pi.image_url
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
WHERE p.id = $1;
```

---

## 🆘 Troubleshooting

**Connection refused:**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart jika perlu
sudo systemctl restart postgresql
```

**Permission denied:**
```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nerch_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO nerch_admin;
```

**Slow queries:**
```sql
-- Enable slow query logging
ALTER DATABASE nerch_db SET log_min_duration_statement = 1000;
```

---

## 📚 Resources

- PostgreSQL Official Docs: https://www.postgresql.org/docs/
- Prisma (ORM): https://www.prisma.io/
- PostGIS (Geospatial): https://postgis.net/
- pgAdmin (GUI): https://www.pgadmin.org/

---

**Database Schema Version:** 1.0.0  
**Last Updated:** May 2026
