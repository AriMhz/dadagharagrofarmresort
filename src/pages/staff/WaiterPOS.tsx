import React, { useState } from 'react';
import { useResort } from '../../context/ResortContext';
import { Utensils, Plus, Minus, Send, CheckCircle2, Building2, Search, ArrowLeft, Coffee, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MenuItem } from '../../types';

export default function WaiterPOS() {
  const { bookings, menuItems, addOrderToBooking } = useResort();

  // Active checked-in rooms
  const activeBookings = bookings.filter(b => b.status === 'Checked-in' || b.status === 'Confirmed');
  const [selectedBookingId, setSelectedBookingId] = useState<string>(activeBookings[0]?.id || bookings[0]?.id || '');
  
  const activeBooking = bookings.find(b => b.id === selectedBookingId);

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [orderCart, setOrderCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [orderNote, setOrderNote] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const filteredMenuItems = menuItems.filter(m => {
    if (activeCategory === 'ALL') return true;
    return m.category.toUpperCase() === activeCategory.toUpperCase();
  });

  const handleAddToCart = (item: MenuItem) => {
    setOrderCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        return [...prev, { item, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    setOrderCart(prev => {
      return prev.map(i => {
        if (i.item.id === itemId) {
          const newQty = i.quantity + delta;
          return newQty > 0 ? { ...i, quantity: newQty } : null;
        }
        return i;
      }).filter(Boolean) as { item: MenuItem; quantity: number }[];
    });
  };

  const cartTotal = orderCart.reduce((sum, i) => sum + (i.item.price * i.quantity), 0);

  const handleSubmitOrderToRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking || orderCart.length === 0) return;

    orderCart.forEach(cartItem => {
      addOrderToBooking(activeBooking.id, {
        name: cartItem.item.name + (orderNote ? ` (${orderNote})` : ''),
        category: cartItem.item.category === 'Services' ? 'Service' : cartItem.item.category as any,
        price: cartItem.item.price,
        quantity: cartItem.quantity
      });
    });

    setOrderCart([]);
    setOrderNote('');
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans pb-24 md:pb-6">
      {/* Top Header */}
      <header className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700 p-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="p-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-slate-300 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Staff Mobile POS
            </span>
            <h1 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <Utensils className="w-5 h-5 text-emerald-400" />
              <span>Waiter Room Order Terminal</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/cashier"
            className="px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition hover:bg-amber-500/30"
          >
            Cashier Desk
          </Link>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Room Selector & Menu Catalog */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Room Selector */}
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-md">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              1. Select Guest Room to Charge
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {bookings.map(b => {
                const isSelected = b.id === selectedBookingId;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBookingId(b.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">Room {b.roomNumber}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-black/30">
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs truncate font-medium mt-1">{b.guestName}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Menu Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['ALL', 'Food', 'Beverage', 'Services'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {cat === 'ALL' ? '🍽️ All Menu Items' : cat === 'Food' ? '🍲 Food Dishes' : cat === 'Beverage' ? '☕ Beverages' : '🧺 Services'}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredMenuItems.map(menu => (
              <button
                key={menu.id}
                onClick={() => handleAddToCart(menu)}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500 p-3.5 rounded-2xl text-left transition group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">{menu.category}</span>
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition">{menu.name}</h4>
                <p className="font-mono text-emerald-400 font-bold text-xs mt-1">NPR {menu.price.toLocaleString()}</p>
              </button>
            ))}
          </div>

        </div>

        {/* Right Col: Active Order Cart & Direct Send to Room */}
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-xl flex flex-col justify-between h-fit sticky top-24">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Cart</span>
                <h3 className="text-lg font-bold text-white">
                  {activeBooking ? `Room ${activeBooking.roomNumber} Tab` : 'Select a Room'}
                </h3>
              </div>
              {activeBooking && (
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/30">
                  {activeBooking.guestName}
                </span>
              )}
            </div>

            {orderSuccess && (
              <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Order successfully added to Room {activeBooking?.roomNumber} tab!</span>
              </div>
            )}

            {/* Cart Items List */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
              {orderCart.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8 italic">
                  Tap any menu item on the left to add to order cart.
                </p>
              ) : (
                orderCart.map(({ item, quantity }) => (
                  <div key={item.id} className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-xs text-white">{item.name}</h5>
                      <span className="font-mono text-[10px] text-emerald-400">NPR {item.price} x {quantity}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-7 h-7 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-slate-200"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="font-mono font-bold text-xs w-4 text-center">{quantity}</span>

                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-7 h-7 bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center justify-center text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Special Instructions Note */}
            {orderCart.length > 0 && (
              <div className="mb-4">
                <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Kitchen / Bar Note</label>
                <input
                  type="text"
                  value={orderNote}
                  onChange={e => setOrderNote(e.target.value)}
                  placeholder="e.g. Less spicy, extra sauce, serve after 10 mins"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Cart Submit Action */}
          <div className="pt-4 border-t border-slate-700 space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-300">Order Subtotal:</span>
              <span className="font-mono text-emerald-400 text-lg">NPR {cartTotal.toLocaleString()}</span>
            </div>

            <button
              onClick={handleSubmitOrderToRoom}
              disabled={orderCart.length === 0 || !activeBooking}
              className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg transition flex items-center justify-center gap-2 ${
                orderCart.length > 0 && activeBooking
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Charge Order to Room {activeBooking?.roomNumber || ''}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
