import React, { useState } from 'react';
import { useResort } from '../../context/ResortContext';
import { Utensils, Plus, Trash2, Check, FileText, ShoppingBag, Shirt, BedDouble, AlertCircle, Sparkles } from 'lucide-react';

interface RestaurantOrderManagementProps {
  onOpenInvoice: (bookingId: string) => void;
}

export default function RestaurantOrderManagement({ onOpenInvoice }: RestaurantOrderManagementProps) {
  const { bookings, menuItems, addOrderToBooking, removeOrderFromBooking, addMenuItem } = useResort();

  // Filter occupied / active bookings
  const checkedInBookings = bookings.filter(b => b.status === 'Checked-in');
  const [selectedBookingId, setSelectedBookingId] = useState<string>(checkedInBookings[0]?.id || bookings[0]?.id || '');

  const activeBooking = bookings.find(b => b.id === selectedBookingId);

  // Custom Item state
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState<number>(0);
  const [customCategory, setCustomCategory] = useState<'Food' | 'Beverage' | 'Laundry' | 'Service' | 'Extra Bed' | 'Other'>('Food');

  // Menu editor modal
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState(250);
  const [newMenuCategory, setNewMenuCategory] = useState<'Food' | 'Beverage' | 'Services'>('Food');

  const handleAddPresetItem = (menuItem: typeof menuItems[0]) => {
    if (!activeBooking) return;
    addOrderToBooking(activeBooking.id, {
      name: menuItem.name,
      category: menuItem.category === 'Services' ? 'Service' : menuItem.category as any,
      price: menuItem.price,
      quantity: 1
    });
  };

  const handleAddCustomOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking || !customName || customPrice <= 0) return;
    addOrderToBooking(activeBooking.id, {
      name: customName,
      category: customCategory,
      price: Number(customPrice),
      quantity: 1
    });
    setCustomName('');
    setCustomPrice(0);
  };

  const handleAddMenuItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMenuItem({
      name: newMenuName,
      price: Number(newMenuPrice),
      category: newMenuCategory,
      available: true
    });
    setIsMenuModalOpen(false);
    setNewMenuName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-brand-leaf" />
            <span>Restaurant & Room Order Billing System</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">Staff can add food, beverages, laundry, or extra bed charges directly to guest room tabs.</p>
        </div>

        <button
          onClick={() => setIsMenuModalOpen(true)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl text-xs flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4 text-brand-forest" />
          <span>Manage Menu Items</span>
        </button>
      </div>

      {/* Select Active Guest Room */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Select Occupied Room Tab
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {bookings.map(b => {
            const isSelected = b.id === selectedBookingId;
            return (
              <button
                key={b.id}
                onClick={() => setSelectedBookingId(b.id)}
                className={`p-3 rounded-xl border text-left transition ${
                  isSelected
                    ? 'bg-brand-forest text-white border-brand-forest shadow-md'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Room {b.roomNumber}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {b.status}
                  </span>
                </div>
                <p className="text-xs truncate font-medium mt-1">{b.guestName}</p>
                <p className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-gray-500'}`}>
                  Tab Total: NPR {b.grandTotal.toLocaleString()}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Room Tab Details & Quotation Example Demonstration */}
      {activeBooking ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Quick Menu Items & Add Order */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Menu Selection Grid */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center justify-between">
                <span>Quick Add Menu & Services to Room {activeBooking.roomNumber}</span>
                <span className="text-xs text-gray-400 font-normal">Click item to charge tab</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleAddPresetItem(item)}
                    className="p-3 bg-gray-50 hover:bg-emerald-50 hover:border-brand-leaf border border-gray-200 rounded-xl text-left transition group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-xs group-hover:text-brand-forest">{item.name}</span>
                      <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-leaf" />
                    </div>
                    <span className="text-[11px] text-brand-forest font-mono font-bold mt-1 block">
                      NPR {item.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Order / Laundry / Extra Bed Charge Form */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Add Custom Charge (e.g. Laundry, Extra Bed, Custom Dish)
              </h4>
              <form onSubmit={handleAddCustomOrder} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  placeholder="Charge description (e.g. Laundry, Extra Bed)"
                  className="sm:col-span-2 px-3 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-leaf"
                />
                <input
                  type="number"
                  required
                  min={10}
                  value={customPrice || ''}
                  onChange={e => setCustomPrice(Number(e.target.value))}
                  placeholder="Price (NPR)"
                  className="px-3 py-2 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-leaf font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-forest hover:bg-emerald-950 text-white font-bold rounded-xl shadow transition"
                >
                  Charge Room
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Room Tab Summary (Matching Quotation Example) */}
          <div className="bg-white p-6 rounded-2xl border-2 border-brand-leaf/30 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b">
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase">Room Bill Tab</span>
                  <h3 className="text-xl font-bold text-gray-900">Room {activeBooking.roomNumber}</h3>
                </div>
                <span className="px-2.5 py-1 bg-brand-leaf/20 text-brand-forest rounded-full text-xs font-bold">
                  {activeBooking.roomCategory}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Base Room Charge */}
                <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-bold text-gray-900">{activeBooking.roomCategory}</p>
                    <p className="text-gray-500 text-[10px]">{activeBooking.nights} Night stay rate</p>
                  </div>
                  <span className="font-mono font-bold text-gray-900">NPR {activeBooking.totalRoomCharge.toLocaleString()}</span>
                </div>

                {/* Added Orders & Services List */}
                <div className="border-t pt-2">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                    Room Orders & Extras ({activeBooking.orders.length})
                  </span>

                  {activeBooking.orders.length === 0 ? (
                    <p className="text-gray-400 text-center py-4 italic">No food or service orders charged yet.</p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {activeBooking.orders.map(ord => (
                        <div key={ord.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg group">
                          <div>
                            <p className="font-semibold text-gray-800">{ord.name}</p>
                            <span className="text-[9px] text-gray-500 font-mono">
                              NPR {ord.price} x {ord.quantity} ({ord.timestamp})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-gray-900">
                              NPR {(ord.price * ord.quantity).toLocaleString()}
                            </span>
                            <button
                              onClick={() => removeOrderFromBooking(activeBooking.id, ord.id)}
                              className="text-gray-400 hover:text-rose-600 transition"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Total Calculation & Action */}
            <div className="pt-4 border-t border-gray-200 mt-6">
              <div className="flex justify-between items-center text-sm font-bold text-gray-900 mb-4">
                <span>Total Calculated Bill:</span>
                <span className="text-xl font-mono text-brand-forest">
                  NPR {activeBooking.grandTotal.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => onOpenInvoice(activeBooking.id)}
                className="w-full py-3 bg-brand-forest hover:bg-emerald-950 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>View & Print Bill Invoice</span>
              </button>
            </div>
          </div>

        </div>
      ) : null}

      {/* Menu Item Manager Modal */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <h3 className="text-lg font-serif font-bold text-brand-forest mb-4">Add Menu Item</h3>
            <form onSubmit={handleAddMenuItemSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  value={newMenuName}
                  onChange={e => setNewMenuName(e.target.value)}
                  placeholder="e.g. Chicken Momo, Cold Coffee, Laundry"
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={newMenuCategory}
                    onChange={e => setNewMenuCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                  >
                    <option value="Food">Food</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Services">Services</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price (NPR)</label>
                  <input
                    type="number"
                    required
                    value={newMenuPrice}
                    onChange={e => setNewMenuPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-forest text-white font-bold rounded-xl shadow"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
