import React, { useState } from 'react';
import { useResort } from '../../context/ResortContext';
import { BarChart3, TrendingUp, DollarSign, Calendar, PieChart, ArrowUpRight } from 'lucide-react';

export default function ReportsView() {
  const { bookings, rooms } = useResort();

  const [dateRange, setDateRange] = useState<'All' | 'This Month' | 'Today'>('All');

  // Breakdown metrics
  const totalRoomRevenue = bookings.reduce((sum, b) => sum + b.totalRoomCharge, 0);

  const totalFoodRevenue = bookings.reduce((sum, b) => {
    return sum + b.orders.filter(o => o.category === 'Food' || o.category === 'Beverage').reduce((s, o) => s + (o.price * o.quantity), 0);
  }, 0);

  const totalLaundryRevenue = bookings.reduce((sum, b) => {
    return sum + b.orders.filter(o => o.category === 'Laundry').reduce((s, o) => s + (o.price * o.quantity), 0);
  }, 0);

  const totalExtraBedRevenue = bookings.reduce((sum, b) => {
    return sum + b.orders.filter(o => o.category === 'Extra Bed').reduce((s, o) => s + (o.price * o.quantity), 0);
  }, 0);

  const grandTotalRevenue = totalRoomRevenue + totalFoodRevenue + totalLaundryRevenue + totalExtraBedRevenue;

  // Occupancy metrics
  const totalRooms = rooms.length;
  const occupiedCount = rooms.filter(r => r.status === 'Occupied').length;
  const occupancyPercentage = totalRooms > 0 ? Math.round((occupiedCount / totalRooms) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-brand-leaf" />
            <span>Business Reports & Analytics</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">Booking statistics, revenue breakdown, and occupancy performance insights.</p>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'This Month', 'Today'].map(r => (
            <button
              key={r}
              onClick={() => setDateRange(r as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                dateRange === r ? 'bg-brand-forest text-white shadow' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-brand-leaf" />
          <span>Revenue Summary Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <span className="text-xs text-emerald-700 font-semibold block uppercase">Room Charges</span>
            <p className="text-xl font-bold text-emerald-900 font-mono mt-1">NPR {totalRoomRevenue.toLocaleString()}</p>
            <span className="text-[10px] text-emerald-600 font-medium">Base night tariffs</span>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <span className="text-xs text-blue-700 font-semibold block uppercase">Food & Beverages</span>
            <p className="text-xl font-bold text-blue-900 font-mono mt-1">NPR {totalFoodRevenue.toLocaleString()}</p>
            <span className="text-[10px] text-blue-600 font-medium">Restaurant POS orders</span>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <span className="text-xs text-purple-700 font-semibold block uppercase">Laundry & Cleaning</span>
            <p className="text-xl font-bold text-purple-900 font-mono mt-1">NPR {totalLaundryRevenue.toLocaleString()}</p>
            <span className="text-[10px] text-purple-600 font-medium">Guest laundry services</span>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <span className="text-xs text-amber-700 font-semibold block uppercase">Extra Beds & Services</span>
            <p className="text-xl font-bold text-amber-900 font-mono mt-1">NPR {totalExtraBedRevenue.toLocaleString()}</p>
            <span className="text-[10px] text-amber-600 font-medium">Extra mattresses & amenities</span>
          </div>
        </div>

        <div className="p-5 bg-gray-900 text-white rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-wider block">Total Net Generated Revenue</span>
            <p className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">NPR {grandTotalRevenue.toLocaleString()}</p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
            Package 3 Automated Reporting
          </span>
        </div>
      </div>

      {/* Room Occupancy Analysis */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-brand-leaf" />
          <span>Room Category Occupancy Rates</span>
        </h3>

        <div className="space-y-4 text-xs">
          {['Deluxe Room', 'Super Deluxe Room', 'Family Suite', 'Agro Cottage'].map(cat => {
            const categoryRooms = rooms.filter(r => r.category === cat);
            const occupiedCat = categoryRooms.filter(r => r.status === 'Occupied' || r.status === 'Reserved').length;
            const pct = categoryRooms.length > 0 ? Math.round((occupiedCat / categoryRooms.length) * 100) : 0;

            return (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between font-semibold text-gray-800">
                  <span>{cat} ({occupiedCat} / {categoryRooms.length} Booked)</span>
                  <span>{pct}% Occupancy</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-brand-forest h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
