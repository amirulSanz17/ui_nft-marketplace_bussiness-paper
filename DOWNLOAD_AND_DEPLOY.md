# 📥 Download & Deploy Guide - Nerch NFT Marketplace

Panduan lengkap untuk download, setup, dan deploy aplikasi Nerch dari nol sampai production.

---

## 📋 Prerequisites

Pastikan sistem Anda sudah terinstall:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **pnpm** (package manager)
- **Git** ([Download](https://git-scm.com/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Code Editor** (VS Code recommended)

### Install pnpm

```bash
npm install -g pnpm
```

---

## 📥 Step 1: Download Project

### Option A: Via Git Clone (Recommended)

```bash
# Clone repository
git clone https://github.com/your-username/nerch-marketplace.git

# Masuk ke folder
cd nerch-marketplace
```

### Option B: Download ZIP

1. Download ZIP dari GitHub
2. Extract ke folder yang diinginkan
3. Buka terminal di folder tersebut

---

## 🔧 Step 2: Install Dependencies

```bash
# Install semua dependencies
pnpm install

# Tunggu sampai selesai (2-5 menit)
```

**Dependencies yang akan terinstall:**
- React 18
- TypeScript
- Tailwind CSS v4
- Vite
- Lucide React (icons)
- Dan lainnya...

---

## 🗄️ Step 3: Setup Database

### 3.1 Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Mac (via Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Windows:**
Download installer dari https://www.postgresql.org/download/windows/

---

### 3.2 Create Database

```bash
# Login sebagai postgres user
sudo -u postgres psql

# Di dalam psql prompt:
```

```sql
-- Buat database
CREATE DATABASE nerch_db;

-- Buat user
CREATE USER nerch_admin WITH PASSWORD 'nerch2026secure';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE nerch_db TO nerch_admin;

-- Keluar
\q
```

---

### 3.3 Run Database Migration

Buat file `db_migration.sql` dengan isi dari `DATABASE.md`, lalu run:

```bash
# Run migration
psql -U nerch_admin -d nerch_db -f db_migration.sql

# Jika diminta password, masukkan: nerch2026secure
```

**Atau** copy-paste semua CREATE TABLE dari `DATABASE.md` ke psql prompt.

---

### 3.4 Seed Sample Data (Optional)

```bash
# Run seed data
psql -U nerch_admin -d nerch_db -f db_seed.sql
```

---

## ⚙️ Step 4: Environment Setup

### 4.1 Create `.env` file

```bash
# Di root project folder
touch .env
```

### 4.2 Isi `.env` dengan konfigurasi

```env
# Frontend
VITE_APP_NAME=Nerch
VITE_APP_URL=http://localhost:5173

# Backend API (akan dibuat nanti)
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000

# Database
DATABASE_URL=postgresql://nerch_admin:nerch2026secure@localhost:5432/nerch_db
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=nerch_db
DATABASE_USER=nerch_admin
DATABASE_PASSWORD=nerch2026secure

# Blockchain (Optional - untuk production)
VITE_ALCHEMY_API_KEY=your_alchemy_key_here
VITE_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY

# Payment Gateway (Optional)
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key

# Email (Optional)
SENDGRID_API_KEY=your_sendgrid_key
FROM_EMAIL=noreply@nerch.com

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Node Environment
NODE_ENV=development
```

**⚠️ PENTING:** Jangan commit `.env` ke git!

```bash
echo ".env" >> .gitignore
```

---

## 🚀 Step 5: Run Development Server

```bash
# Start frontend
pnpm dev
```

Aplikasi akan running di: **http://localhost:5173**

**Browser akan otomatis terbuka!** 🎉

---

## 🖥️ Step 6: Setup Backend API (Optional tapi Recommended)

Frontend sudah bisa jalan tanpa backend (using mock data), tapi untuk production perlu backend.

### 6.1 Create Backend Folder

```bash
# Di luar folder nerch-marketplace
mkdir nerch-backend
cd nerch-backend
npm init -y
```

### 6.2 Install Backend Dependencies

```bash
npm install express cors dotenv pg redis ethers socket.io
npm install -D typescript @types/express @types/node @types/cors ts-node nodemon
```

### 6.3 Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 6.4 Create `src/server.ts`

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Test database
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Import routes here
// app.use('/api/products', productRoutes);
// app.use('/api/nfts', nftRoutes);
// app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
```

### 6.5 Add Scripts to `package.json`

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

### 6.6 Run Backend

```bash
npm run dev
```

Backend akan running di: **http://localhost:3000**

---

## 📦 Step 7: Build untuk Production

### Frontend Build

```bash
cd nerch-marketplace
pnpm build
```

Hasil build ada di folder `dist/`.

### Backend Build

```bash
cd nerch-backend
npm run build
```

Hasil build ada di folder `dist/`.

---

## 🌐 Step 8: Deploy ke Production

### Option A: Deploy Frontend ke Vercel (Recommended)

#### 8.1 Install Vercel CLI

```bash
npm i -g vercel
```

#### 8.2 Login

```bash
vercel login
```

#### 8.3 Deploy

```bash
cd nerch-marketplace
vercel --prod
```

#### 8.4 Set Environment Variables

Di Vercel Dashboard → Settings → Environment Variables, tambahkan semua variable dari `.env`.

**URL Production:** `https://nerch-marketplace.vercel.app`

---

### Option B: Deploy ke Netlify

#### 8.1 Install Netlify CLI

```bash
npm i -g netlify-cli
```

#### 8.2 Login & Deploy

```bash
cd nerch-marketplace
pnpm build
netlify deploy --prod --dir=dist
```

---

### Option C: Deploy Backend ke Railway

#### 8.1 Install Railway CLI

```bash
npm i -g @railway/cli
```

#### 8.2 Login

```bash
railway login
```

#### 8.3 Initialize & Deploy

```bash
cd nerch-backend
railway init
railway up
```

#### 8.4 Add PostgreSQL Database

```bash
railway add postgresql
```

Railway akan auto-create database dan set `DATABASE_URL`.

---

### Option D: Deploy ke VPS (Ubuntu)

#### 8.1 Setup Server

```bash
# Connect via SSH
ssh root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PostgreSQL (sudah dijelaskan di Step 3)
```

#### 8.2 Clone & Setup

```bash
# Clone project
git clone https://github.com/your-username/nerch-marketplace.git
cd nerch-marketplace

# Install dependencies
pnpm install

# Build
pnpm build
```

#### 8.3 Setup Nginx

```bash
sudo apt install nginx

# Create config
sudo nano /etc/nginx/sites-available/nerch
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/nerch/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/nerch /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 8.4 Setup PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start backend
cd nerch-backend
pm2 start dist/server.js --name nerch-api

# Auto-start on reboot
pm2 startup
pm2 save
```

#### 8.5 Setup SSL dengan Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔒 Step 9: Security Checklist

- [ ] `.env` tidak di-commit ke git
- [ ] Database password yang kuat
- [ ] HTTPS/SSL enabled
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation & sanitization
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] Regular backups

---

## 🧪 Step 10: Testing

### Run Tests

```bash
# Frontend tests
cd nerch-marketplace
pnpm test

# Backend tests
cd nerch-backend
npm test
```

### Manual Testing Checklist

- [ ] Homepage loads
- [ ] Product list shows
- [ ] NFT list shows
- [ ] Add to cart works
- [ ] Checkout flow works
- [ ] Buy/Sell NFT modal works
- [ ] Social Fund page works
- [ ] Chat page works
- [ ] Profile page works
- [ ] Crypto page works
- [ ] Filters work
- [ ] Responsive di mobile
- [ ] Responsive di desktop

---

## 📊 Monitoring & Maintenance

### Setup Monitoring

```bash
# Install Sentry for error tracking
pnpm add @sentry/react

# Add to main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE
});
```

### Database Backup

```bash
# Backup script (run daily via cron)
pg_dump -U nerch_admin nerch_db > backup_$(date +%Y%m%d).sql

# Restore dari backup
psql -U nerch_admin nerch_db < backup_20260503.sql
```

### Update Dependencies

```bash
# Check for updates
pnpm outdated

# Update all
pnpm update --latest
```

---

## 🆘 Troubleshooting

### Port 5173 sudah dipakai

```bash
# Kill process di port 5173
lsof -ti:5173 | xargs kill -9

# Atau ubah port di vite.config.ts
```

### Database connection failed

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart
sudo systemctl restart postgresql

# Check if database exists
psql -U nerch_admin -d nerch_db -c "SELECT 1"
```

### Build failed

```bash
# Clear cache
rm -rf node_modules pnpm-lock.yaml dist
pnpm install
pnpm build
```

### Out of memory

```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

---

## 📞 Support

- **Documentation:** README.md, DATABASE.md, DEPLOYMENT.md
- **Issues:** GitHub Issues
- **Email:** dev@nerch.com
- **Discord:** https://discord.gg/nerch

---

## ✅ Quick Checklist

```bash
# 1. Clone project
git clone https://github.com/your-username/nerch-marketplace.git
cd nerch-marketplace

# 2. Install dependencies
pnpm install

# 3. Setup database
# Follow Step 3

# 4. Create .env
cp .env.example .env
# Edit .env with your values

# 5. Run dev server
pnpm dev

# 6. Open browser
# http://localhost:5173

# 7. Build for production
pnpm build

# 8. Deploy
vercel --prod
```

---

## 🎉 Congratulations!

Aplikasi Nerch Anda sudah running! 🚀

**Next Steps:**
1. Customize branding & content
2. Setup payment gateway (Midtrans)
3. Deploy smart contracts
4. Connect wallet (MetaMask)
5. Launch to production!

---

**Version:** 1.0.0  
**Last Updated:** May 2026  
**Author:** Nerch Development Team
