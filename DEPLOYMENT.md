# 🚀 Deployment Guide - Nerch NFT Marketplace

## 📋 Prerequisites

### Required Tools:
- Node.js v18+ 
- pnpm (Package Manager)
- Git
- PostgreSQL 14+ (for database)
- Redis (for caching/sessions)

### Recommended Services:
- **Frontend Hosting**: Vercel, Netlify, or AWS Amplify
- **Backend API**: Railway, Render, or AWS EC2
- **Database**: Supabase, Neon, or AWS RDS
- **File Storage**: AWS S3, Cloudinary, or Supabase Storage
- **Blockchain**: Alchemy or Infura (Ethereum node)

---

## 🏗️ Architecture Overview

```
┌─────────────────┐
│   React App     │  ← Frontend (This repo)
│   (Vite + TS)   │
└────────┬────────┘
         │
         │ HTTP/WebSocket
         ↓
┌─────────────────┐
│   Backend API   │  ← Node.js/Express + TypeScript
│   (REST + WS)   │
└────────┬────────┘
         │
         ├─→ PostgreSQL (User data, orders, products)
         ├─→ Redis (Sessions, cache)
         ├─→ Ethereum (NFT smart contracts)
         └─→ S3 (Images, NFT metadata)
```

---

## 🎯 Step 1: Frontend Deployment

### Option A: Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Environment Variables** (add di Vercel Dashboard):
```env
VITE_API_URL=https://api.nerch.com
VITE_WEBSOCKET_URL=wss://api.nerch.com
VITE_ALCHEMY_API_KEY=your_alchemy_key
VITE_CONTRACT_ADDRESS=0x...
```

### Option B: Netlify

1. **Build for production:**
```bash
pnpm build
```

2. **Deploy to Netlify:**
```bash
netlify deploy --prod --dir=dist
```

### Option C: Manual (Any Static Host)

1. **Build:**
```bash
pnpm build
```

2. **Upload folder `dist/` to your hosting**

3. **Configure `.htaccess` for SPA routing:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🖥️ Step 2: Backend Setup

### Create Backend Project Structure:

```
backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── nft.controller.ts
│   │   ├── product.controller.ts
│   │   ├── order.controller.ts
│   │   └── chat.controller.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── NFT.ts
│   │   ├── Product.ts
│   │   ├── Order.ts
│   │   └── Message.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── nft.routes.ts
│   │   ├── product.routes.ts
│   │   ├── order.routes.ts
│   │   └── chat.routes.ts
│   ├── services/
│   │   ├── blockchain.service.ts
│   │   ├── payment.service.ts
│   │   ├── email.service.ts
│   │   └── storage.service.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── upload.middleware.ts
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── blockchain.ts
│   └── server.ts
├── package.json
└── tsconfig.json
```

### Basic Backend Code:

**1. Install Dependencies:**
```bash
npm init -y
npm install express cors dotenv pg redis ethers @supabase/supabase-js
npm install -D typescript @types/express @types/node @types/cors ts-node
```

**2. Create `src/server.ts`:**
```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/nfts', require('./routes/nft.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/chat', require('./routes/chat.routes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**3. Environment Variables (.env):**
```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/nerch
REDIS_URL=redis://localhost:6379

# Blockchain
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
CONTRACT_ADDRESS=0x...
PRIVATE_KEY=your_private_key

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=nerch-assets

# Payment
MIDTRANS_SERVER_KEY=...
MIDTRANS_CLIENT_KEY=...

# Email
SENDGRID_API_KEY=...
FROM_EMAIL=noreply@nerch.com

# Auth
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

---

## 💾 Step 3: Database Schema

### PostgreSQL Tables:

**1. Users Table:**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  wallet_address VARCHAR(42) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wallet ON users(wallet_address);
```

**2. Products Table:**
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(15,2) NOT NULL,
  image_url VARCHAR(500),
  category VARCHAR(50),
  artist VARCHAR(100),
  nft_included BOOLEAN DEFAULT true,
  stock INTEGER DEFAULT 0,
  sizes JSONB,
  colors JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**3. NFTs Table:**
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_address) REFERENCES users(wallet_address)
);
```

**4. Orders Table:**
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE,
  total_amount DECIMAL(15,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  payment_method VARCHAR(50),
  shipping_address JSONB,
  items JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**5. Social Fund Donations:**
```sql
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  nft_id INTEGER REFERENCES nfts(id),
  product_id INTEGER REFERENCES products(id),
  amount DECIMAL(15,2) NOT NULL,
  project_name VARCHAR(255),
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**6. Messages Table:**
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id),
  receiver_id INTEGER,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
```

---

## 🔗 Step 4: Smart Contract Deployment

### NFT Smart Contract (Solidity):

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NerchNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    mapping(uint256 => string) private _tokenURIs;
    
    constructor() ERC721("Nerch Phygital", "NERCH") {}
    
    function mint(address to, string memory tokenURI) 
        public 
        onlyOwner 
        returns (uint256) 
    {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);
        _tokenURIs[tokenId] = tokenURI;
        return tokenId;
    }
    
    function tokenURI(uint256 tokenId) 
        public 
        view 
        override 
        returns (string memory) 
    {
        require(_exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }
}
```

### Deploy to Ethereum:

```bash
# Install Hardhat
npm install --save-dev hardhat

# Initialize project
npx hardhat

# Deploy script (scripts/deploy.ts)
npx hardhat run scripts/deploy.ts --network mainnet
```

---

## 💳 Step 5: Payment Gateway Integration

### Midtrans Setup:

**1. Install SDK:**
```bash
npm install midtrans-client
```

**2. Payment Service (`services/payment.service.ts`):**
```typescript
import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export async function createPayment(orderId: string, amount: number) {
  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: amount
    },
    credit_card: {
      secure: true
    }
  };

  const transaction = await snap.createTransaction(parameter);
  return transaction.token;
}
```

---

## 📊 Step 6: Real-time Features (WebSocket)

### Setup Socket.IO:

**Backend:**
```typescript
import { Server } from 'socket.io';

const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('chat_message', (data) => {
    io.emit('new_message', data);
  });

  socket.on('nft_price_update', (data) => {
    io.emit('price_update', data);
  });
});
```

**Frontend (update src/main.tsx):**
```typescript
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_WEBSOCKET_URL);

socket.on('price_update', (data) => {
  // Update NFT prices in real-time
});
```

---

## 🔒 Step 7: Security Best Practices

1. **Enable HTTPS** (use Let's Encrypt)
2. **Rate Limiting:**
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

3. **Input Validation:**
```bash
npm install joi
```

4. **SQL Injection Prevention:**
- Use parameterized queries
- Never concatenate user input

5. **XSS Protection:**
```bash
npm install helmet
```

---

## 📈 Step 8: Monitoring & Analytics

### Setup Sentry:
```bash
npm install @sentry/react
```

### Add to `src/main.tsx`:
```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE
});
```

---

## ✅ Production Checklist

- [ ] Environment variables set
- [ ] Database migrated
- [ ] Smart contracts deployed
- [ ] Payment gateway configured
- [ ] CDN configured for images
- [ ] SSL certificate installed
- [ ] Backup strategy in place
- [ ] Monitoring tools setup
- [ ] Rate limiting enabled
- [ ] Error tracking configured
- [ ] Load testing completed
- [ ] Security audit passed

---

## 🆘 Troubleshooting

### Common Issues:

**1. Build fails:**
```bash
# Clear cache
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**2. Database connection fails:**
- Check DATABASE_URL format
- Verify firewall allows connections
- Check PostgreSQL is running

**3. NFT minting fails:**
- Verify wallet has ETH for gas
- Check contract address is correct
- Ensure Alchemy/Infura API key is valid

---

## 📞 Support

For deployment issues:
- GitHub Issues: https://github.com/nerch/issues
- Discord: https://discord.gg/nerch
- Email: dev@nerch.com

---

Good luck with your deployment! 🚀
