import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function LoginPage({ onLogin, onRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    // Simple validation
    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    // Simulate login success
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', email.split('@')[0]);
    localStorage.setItem('loginMethod', 'email');
    onLogin();
  };

  const handleGoogleLogin = () => {
    // Simulate Google OAuth login
    // In production, this would redirect to Google OAuth
    const confirmed = window.confirm(
      'Google Login:\n\nIn production, this will redirect to Google OAuth.\n\nFor demo purposes, click OK to simulate successful Google login.'
    );

    if (confirmed) {
      const mockGoogleUser = {
        email: 'user@gmail.com',
        name: 'Google User',
        avatar: 'https://ui-avatars.com/api/?name=Google+User'
      };

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', mockGoogleUser.email);
      localStorage.setItem('userName', mockGoogleUser.name);
      localStorage.setItem('userAvatar', mockGoogleUser.avatar);
      localStorage.setItem('loginMethod', 'google');

      alert(`Welcome ${mockGoogleUser.name}! Logged in with Google.`);
      onLogin();
    }
  };

  const handleFacebookLogin = () => {
    // Simulate Facebook OAuth login
    const confirmed = window.confirm(
      'Facebook Login:\n\nIn production, this will redirect to Facebook OAuth.\n\nFor demo purposes, click OK to simulate successful Facebook login.'
    );

    if (confirmed) {
      const mockFacebookUser = {
        email: 'user@facebook.com',
        name: 'Facebook User',
        avatar: 'https://ui-avatars.com/api/?name=Facebook+User'
      };

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', mockFacebookUser.email);
      localStorage.setItem('userName', mockFacebookUser.name);
      localStorage.setItem('userAvatar', mockFacebookUser.avatar);
      localStorage.setItem('loginMethod', 'facebook');

      alert(`Welcome ${mockFacebookUser.name}! Logged in with Facebook.`);
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d4a2b] to-[#4a7a4a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl shadow-xl">
            🛒
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Nerch</h1>
          <p className="text-white/80 text-sm">NFT Phygital Marketplace</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
          <p className="text-gray-600 text-center mb-6 text-sm">Sign in to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d4a2b] focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#2d4a2b] focus:ring-[#2d4a2b]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-[#2d4a2b] hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#2d4a2b] text-white rounded-xl font-semibold hover:bg-[#3d5a3b] transition-colors shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>

            <button
              type="button"
              onClick={handleFacebookLogin}
              className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onRegister}
                className="text-[#2d4a2b] hover:underline font-semibold"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-white/60 text-xs">
          <p>© 2026 Nerch. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:underline">Terms</a>
            {' • '}
            <a href="#" className="hover:underline">Privacy</a>
            {' • '}
            <a href="#" className="hover:underline">Help</a>
          </p>
        </div>
      </div>
    </div>
  );
}
