import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useResort } from '../../context/ResortContext';
import { Lock, User, AlertCircle, Eye, EyeOff, ArrowLeft, Shield, Utensils, DollarSign, Calendar, Sparkles } from 'lucide-react';
import { StaffRole } from '../../types';
import logoImg from '../../assets/logo.jpg';

export default function AdminLogin() {
  const { currentStaffUser, loginStaff } = useResort();
  const navigate = useNavigate();

  const [username, setUsername] = useState(() => {
    return localStorage.getItem('dada_ghar_remembered_user_v1') || '';
  });
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('dada_ghar_remember_me_v1') !== 'false';
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filledRoleInfo, setFilledRoleInfo] = useState<string | null>(null);

  // Auto-route if already logged in
  useEffect(() => {
    if (currentStaffUser) {
      if (currentStaffUser.role === 'waiter') {
        navigate('/waiter', { replace: true });
      } else if (currentStaffUser.role === 'cashier') {
        navigate('/cashier', { replace: true });
      } else {
        navigate('/admin', { replace: true });
      }
    }
  }, [currentStaffUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser) {
      setError('Please enter your staff username.');
      return;
    }

    if (!trimmedPass) {
      setError('Please enter your passcode / password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const user = loginStaff(trimmedUser, trimmedPass, rememberMe);
      setIsLoading(false);

      if (user) {
        if (user.role === 'waiter') navigate('/waiter', { replace: true });
        else if (user.role === 'cashier') navigate('/cashier', { replace: true });
        else navigate('/admin', { replace: true });
      } else {
        setError('Incorrect username or password. Please check your credentials and try again.');
      }
    }, 200);
  };

  // Quick-fill helper: ONLY fills the form fields so the user can verify and submit!
  const handleQuickFill = (u: string, p: string, roleName: string) => {
    setUsername(u);
    setPassword(p);
    setError('');
    setFilledRoleInfo(`Filled credentials for ${roleName}. Click "Sign In" to continue.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-forest via-emerald-950 to-slate-950 flex flex-col items-center justify-center p-4 sm:p-6">
      
      {/* Back to Home header link */}
      <div className="w-full max-w-md flex justify-start mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-emerald-200/80 hover:text-white text-xs font-medium bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full backdrop-blur-sm transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Resort Website</span>
        </Link>
      </div>

      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 w-full max-w-md transition-all">
        
        {/* Portal Header with Official Logo */}
        <div className="text-center mb-6">
          <img
            src={logoImg}
            alt="Dada Ghar Resort Logo"
            className="w-16 h-16 rounded-full object-cover mx-auto mb-3 shadow-lg border-2 border-amber-400/50 bg-white p-0.5"
          />
          <h1 className="text-2xl font-serif font-bold text-brand-forest">Resort Staff Portal</h1>
          <p className="text-xs text-gray-500 mt-1">Sign in with your authorized staff username & passcode</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Filled Info Notice */}
        {filledRoleInfo && !error && (
          <div className="mb-5 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{filledRoleInfo}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Staff Username
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setFilledRoleInfo(null);
                }}
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-leaf focus:border-brand-leaf outline-none transition text-gray-900 text-sm placeholder:text-gray-400 font-medium"
                placeholder="e.g. admin, waiter, cashier"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Passcode / Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFilledRoleInfo(null);
                }}
                required
                className="w-full pl-11 pr-11 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-leaf focus:border-brand-leaf outline-none transition text-gray-900 text-sm placeholder:text-gray-400 font-medium"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-brand-forest rounded border-gray-300 focus:ring-brand-leaf accent-brand-forest cursor-pointer"
              />
              <span className="text-xs text-gray-600 font-medium">Remember me on this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-brand-forest hover:bg-emerald-950 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-98 flex items-center justify-center gap-2 text-sm disabled:opacity-75 cursor-pointer mt-2"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        {/* Quick Autofill Helper Chips (Only fills inputs, does not bypass login) */}
        <div className="mt-6 pt-5 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Autofill Demo Credentials:
            </span>
            <span className="text-[10px] text-gray-400">Click to fill</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickFill('admin', 'admin123', 'Manager (Admin)')}
              className="p-2.5 bg-purple-50 hover:bg-purple-100/80 border border-purple-200 text-purple-900 rounded-xl font-semibold flex items-center justify-start gap-2 transition text-left cursor-pointer"
            >
              <Shield className="w-4 h-4 text-purple-600 shrink-0" />
              <div className="truncate">
                <span className="block font-bold text-[11px]">Manager</span>
                <span className="block text-[10px] text-purple-600 font-mono">admin / admin123</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('waiter', 'waiter123', 'Waiter (Mobile POS)')}
              className="p-2.5 bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-900 rounded-xl font-semibold flex items-center justify-start gap-2 transition text-left cursor-pointer"
            >
              <Utensils className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="truncate">
                <span className="block font-bold text-[11px]">Waiter POS</span>
                <span className="block text-[10px] text-blue-600 font-mono">waiter / waiter123</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('cashier', 'cashier123', 'Cashier Terminal')}
              className="p-2.5 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 rounded-xl font-semibold flex items-center justify-start gap-2 transition text-left cursor-pointer"
            >
              <DollarSign className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="truncate">
                <span className="block font-bold text-[11px]">Cashier</span>
                <span className="block text-[10px] text-amber-600 font-mono">cashier / cashier123</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('reception', 'reception123', 'Receptionist')}
              className="p-2.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 rounded-xl font-semibold flex items-center justify-start gap-2 transition text-left cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="truncate">
                <span className="block font-bold text-[11px]">Reception</span>
                <span className="block text-[10px] text-emerald-600 font-mono">reception / reception123</span>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Footer copyright note */}
      <p className="text-[11px] text-emerald-200/60 mt-6 text-center">
        Dada Ghar Agro Farm Resort &copy; {new Date().getFullYear()} &bull; Staff Management System
      </p>
    </div>
  );
}
