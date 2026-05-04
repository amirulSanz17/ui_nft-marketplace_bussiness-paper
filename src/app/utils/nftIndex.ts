// NFT Index Calculator - Menghitung index harga gabungan NFT

export interface NFTData {
  id: string;
  name: string;
  price: string; // ETH
  currentPrice: number; // IDR
  marketCap: number; // IDR
  volume24h: number; // IDR
  change24h: number; // Percentage
}

export const nftMarketData: NFTData[] = [
  {
    id: 'HFeastHora-001',
    name: 'HFeastHora-001',
    price: '1.05',
    currentPrice: 78095317,
    marketCap: 78095317000,
    volume24h: 5600000,
    change24h: 50.5
  },
  {
    id: 'THindiaHora-001',
    name: 'THindiaHora-001',
    price: '0.65',
    currentPrice: 51000000,
    marketCap: 51000000000,
    volume24h: 3200000,
    change24h: 15.5
  },
  {
    id: 'TDewaSinkro-111',
    name: 'TDewaSinkro-111',
    price: '0.70',
    currentPrice: 55000000,
    marketCap: 55000000000,
    volume24h: 2800000,
    change24h: 5.8
  },
  {
    id: 'TDewaHora-099',
    name: 'TDewaHora-099',
    price: '1.69',
    currentPrice: 132000000,
    marketCap: 132000000000,
    volume24h: 8900000,
    change24h: 10.9
  },
  {
    id: 'TSalPriadiSinkro-111',
    name: 'TSalPriadiSinkro-111',
    price: '0.90',
    currentPrice: 70000000,
    marketCap: 70000000000,
    volume24h: 4100000,
    change24h: 8.9
  }
];

/**
 * Calculate Nerch NFT Index (NNI)
 * Weighted by market cap
 */
export function calculateNFTIndex(): number {
  const totalMarketCap = nftMarketData.reduce((sum, nft) => sum + nft.marketCap, 0);

  const weightedPrice = nftMarketData.reduce((sum, nft) => {
    const weight = nft.marketCap / totalMarketCap;
    return sum + (nft.currentPrice * weight);
  }, 0);

  return Math.round(weightedPrice);
}

/**
 * Calculate index change percentage
 */
export function calculateIndexChange(): number {
  const totalMarketCap = nftMarketData.reduce((sum, nft) => sum + nft.marketCap, 0);

  const weightedChange = nftMarketData.reduce((sum, nft) => {
    const weight = nft.marketCap / totalMarketCap;
    return sum + (nft.change24h * weight);
  }, 0);

  return Number(weightedChange.toFixed(2));
}

/**
 * Get total market volume (24h)
 */
export function getTotalVolume24h(): number {
  return nftMarketData.reduce((sum, nft) => sum + nft.volume24h, 0);
}

/**
 * Generate historical index data
 * Simulates price movement over time
 */
export function generateIndexHistory(days: number = 90) {
  const data = [];
  const currentIndex = calculateNFTIndex();
  const startIndex = currentIndex / 1.5; // 50% growth over period

  for (let i = 0; i < days; i++) {
    const progress = i / (days - 1);
    const randomness = (Math.random() - 0.5) * (currentIndex * 0.05); // 5% random variation
    const value = startIndex + (currentIndex - startIndex) * progress + randomness;
    const prevValue = i > 0 ? data[i - 1].value : startIndex;
    const change = value - prevValue;

    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));

    data.push({
      date: date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
      value: Math.round(value),
      change: Math.round(change)
    });
  }

  return data;
}

/**
 * Filter data by timeframe
 */
export function filterByTimeframe(data: any[], timeframe: string) {
  const now = new Date();
  let daysToShow = 90; // default ALL

  switch (timeframe) {
    case '1D':
      daysToShow = 1;
      break;
    case '1W':
      daysToShow = 7;
      break;
    case '1M':
      daysToShow = 30;
      break;
    case '3M':
      daysToShow = 90;
      break;
    case 'YTD':
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      daysToShow = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
      break;
    case '1Y':
      daysToShow = 365;
      break;
    case '5Y':
      daysToShow = 365 * 5;
      break;
    case 'ALL':
      return data; // Return all data
  }

  return data.slice(-daysToShow);
}
