import { TrendingUp, TrendingDown, MessageCircle, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StreamActivity {
  id: string;
  type: 'buy' | 'sell' | 'comment' | 'like';
  user: string;
  userAvatar: string;
  nftName: string;
  price?: number;
  quantity?: number;
  message?: string;
  timestamp: Date;
}

export default function StreamWidget() {
  const [activities, setActivities] = useState<StreamActivity[]>([
    {
      id: '1',
      type: 'buy',
      user: 'Alice Johnson',
      userAvatar: '👩',
      nftName: 'HFeastHora-001',
      price: 78095317,
      quantity: 0.5,
      timestamp: new Date(Date.now() - 2000)
    },
    {
      id: '2',
      type: 'comment',
      user: 'Bob Smith',
      userAvatar: '👨',
      nftName: 'THindiaHora-001',
      message: 'This NFT looks promising! 🚀',
      timestamp: new Date(Date.now() - 5000)
    },
    {
      id: '3',
      type: 'sell',
      user: 'Charlie Brown',
      userAvatar: '🧑',
      nftName: 'TDewaSinkro-111',
      price: 55000000,
      quantity: 0.25,
      timestamp: new Date(Date.now() - 8000)
    },
    {
      id: '4',
      type: 'buy',
      user: 'Diana Prince',
      userAvatar: '👸',
      nftName: 'HFeastHora-001',
      price: 78200000,
      quantity: 1.0,
      timestamp: new Date(Date.now() - 12000)
    },
    {
      id: '5',
      type: 'comment',
      user: 'Eve Wilson',
      userAvatar: '🙋‍♀️',
      nftName: 'TSalPriadiHora-099',
      message: 'Great addition to my collection!',
      timestamp: new Date(Date.now() - 15000)
    }
  ]);

  const [onlineUsers, setOnlineUsers] = useState(127);

  useEffect(() => {
    // Simulate new activities
    const interval = setInterval(() => {
      const randomActivity: StreamActivity = {
        id: Date.now().toString(),
        type: ['buy', 'sell', 'comment'][Math.floor(Math.random() * 3)] as 'buy' | 'sell' | 'comment',
        user: ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan'][Math.floor(Math.random() * 5)],
        userAvatar: ['👤', '🧑', '👨', '👩', '🙋'][Math.floor(Math.random() * 5)],
        nftName: ['HFeastHora-001', 'THindiaHora-001', 'TDewaSinkro-111'][Math.floor(Math.random() * 3)],
        price: Math.floor(Math.random() * 100000000) + 50000000,
        quantity: Math.random() < 0.5 ? 0.5 : 1.0,
        message: ['Bullish! 📈', 'HODL! 💎', 'To the moon! 🚀', 'Great project!'][Math.floor(Math.random() * 4)],
        timestamp: new Date()
      };

      setActivities(prev => [randomActivity, ...prev].slice(0, 10));
      setOnlineUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-semibold text-sm">Live Activity</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Users className="w-4 h-4" />
          <span>{onlineUsers} online</span>
        </div>
      </div>

      {/* Activity Stream */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-hide">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors animate-in fade-in slide-in-from-top-2 duration-300"
          >
            {/* Avatar */}
            <div className="w-8 h-8 bg-gradient-to-br from-[#2d4a2b] to-[#4a7a4a] rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
              {activity.userAvatar}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.user}</p>

                  {/* Activity Details */}
                  {activity.type === 'buy' && (
                    <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Bought {activity.quantity} {activity.nftName}</span>
                    </div>
                  )}

                  {activity.type === 'sell' && (
                    <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>Sold {activity.quantity} {activity.nftName}</span>
                    </div>
                  )}

                  {activity.type === 'comment' && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>Commented on {activity.nftName}</span>
                    </div>
                  )}

                  {/* Price or Message */}
                  {activity.price && (
                    <p className="text-xs text-gray-600 mt-1">
                      @ Rp {(activity.price / 1000000).toFixed(1)}M
                    </p>
                  )}

                  {activity.message && (
                    <p className="text-xs text-gray-700 mt-1 bg-gray-100 rounded px-2 py-1">
                      "{activity.message}"
                    </p>
                  )}
                </div>

                {/* Timestamp */}
                <span className="text-[10px] text-gray-400 flex-shrink-0">
                  {getTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button className="w-full text-xs text-[#2d4a2b] hover:underline font-medium">
          View All Activity →
        </button>
      </div>
    </div>
  );
}
