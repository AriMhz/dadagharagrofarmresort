import React from 'react';
import { useResort } from '../../context/ResortContext';
import { DollarSign, Bed, CalendarCheck, Utensils, AlertCircle, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

interface DashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
  onOpenInvoice: (bookingId: string) => void;
}

export default function DashboardOverview({ onNavigateTab, onOpenInvoice }: DashboardOverviewProps) {
  const { rooms, bookings, invoices } = useResort();

  // Metrics calculation
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const reservedRooms = rooms.filter(r => r.status === 'Reserved').length;
  const availableRooms = rooms.filter(r => r.status === 'Available').length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const totalRevenue = bookings.reduce((sum, b) => sum + b.grandTotal, 0) + invoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
  const pendingBookings = bookings.filter(b => b.status === 'Pending');
  const activeBookings = bookings.filter(b => b.status === 'Checked-in');

  // Room 203 reference from quotation
  const room203Booking = bookings.find(b => b.roomNumber === '203');

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-forest via-emerald-900 to-teal-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 opacity-10 pointer-events-none">
          <Bed className="w-96 h-96" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-3 border border-white/10">
            Package 3 – Complete Management Suite
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
            Resort Business Overview
          </h1>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Real-time control over Dada Ghar Agro Farm Resort rooms, bookings, restaurant POS room tabs, customer records, and instant billing.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Revenue</span>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">NPR {totalRevenue.toLocaleString()}</p>
          <div className="flex items-center text-xs text-emerald-600 font-medium mt-2">
            <ArrowUpRight className="w-4 h-4 mr-0.5" />
            <span>Room & Restaurant total</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Room Occupancy</span>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Bed className="w-6 h-6" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{occupancyRate}%</p>
          <p className="text-xs text-gray-500 mt-2">
            {occupiedRooms} Occupied / {totalRooms} Total Rooms
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Guests</span>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{activeBookings.length}</p>
          <p className="text-xs text-gray-500 mt-2">Currently checked-in</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pending Bookings</span>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <p className="text-2xl font-bold text-purple-900">{pendingBookings.length}</p>
          <p className="text-xs text-purple-600 font-medium mt-2">Requires admin approval</p>
        </div>
      </div>

      {/* Room Occupancy Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-gray-100 gap-2">
          <div>
            <h2 className="text-lg font-serif font-bold text-gray-900">Room Status Matrix</h2>
            <p className="text-xs text-gray-500">Live room status overview across all resort wings</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-medium"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Available ({availableRooms})</span>
            <span className="flex items-center gap-1.5 font-medium"><span className="w-3 h-3 rounded-full bg-rose-500"></span> Occupied ({occupiedRooms})</span>
            <span className="flex items-center gap-1.5 font-medium"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Reserved ({reservedRooms})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {rooms.map(room => {
            const currentBooking = bookings.find(b => b.roomId === room.id && b.status === 'Checked-in');
            const isOccupied = room.status === 'Occupied';
            const isReserved = room.status === 'Reserved';

            return (
              <div 
                key={room.id}
                className={`p-4 rounded-xl border text-center transition ${
                  isOccupied ? 'bg-rose-50 border-rose-200 text-rose-950' :
                  isReserved ? 'bg-amber-50 border-amber-200 text-amber-950' :
                  'bg-emerald-50 border-emerald-200 text-emerald-950'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base">Room {room.roomNumber}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    isOccupied ? 'bg-rose-200 text-rose-800' :
                    isReserved ? 'bg-amber-200 text-amber-800' :
                    'bg-emerald-200 text-emerald-800'
                  }`}>
                    {room.status}
                  </span>
                </div>
                <p className="text-xs font-semibold truncate">{room.category}</p>
                <p className="text-xs font-mono mt-1 font-bold">NPR {room.pricePerNight.toLocaleString()}/night</p>
                {currentBooking && (
                  <p className="text-[11px] text-rose-700 mt-2 font-medium truncate">
                    Guest: {currentBooking.guestName}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quotation Highlight: Room 203 Example Card */}
      {room203Booking && (
        <div className="bg-gradient-to-br from-amber-500/10 via-brand-leaf/10 to-emerald-50 border-2 border-brand-leaf/30 p-6 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <span className="px-3 py-1 bg-brand-forest text-white text-xs font-bold uppercase rounded-full tracking-wider">
                QUOTATION DEMO EXAMPLE – ROOM 203
              </span>
              <h3 className="text-xl font-serif font-bold text-brand-forest mt-2">
                Room 203 Live Room Tab & Service Billing
              </h3>
              <p className="text-xs text-gray-600">Guest: {room203Booking.guestName} ({room203Booking.guestPhone})</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateTab('orders')}
                className="px-4 py-2 bg-brand-leaf hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
              >
                <Utensils className="w-4 h-4" />
                <span>Manage Food/Services</span>
              </button>
              <button
                onClick={() => onOpenInvoice(room203Booking.id)}
                className="px-4 py-2 bg-brand-forest hover:bg-emerald-950 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Generate Invoice (NPR {room203Booking.grandTotal.toLocaleString()})</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 bg-white p-4 rounded-xl border border-gray-200 text-xs">
            <div className="p-2.5 bg-gray-50 rounded-lg">
              <span className="text-gray-500 block">Room Charge</span>
              <p className="font-bold text-gray-900 mt-1">Deluxe Room – NPR 4,000</p>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-lg">
              <span className="text-gray-500 block">Food Orders</span>
              <p className="font-bold text-gray-900 mt-1">Momo (250) + Fried Rice (300) + Coffee (180)</p>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-lg">
              <span className="text-gray-500 block">Laundry Charge</span>
              <p className="font-bold text-gray-900 mt-1">NPR 150</p>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-lg">
              <span className="text-gray-500 block">Extra Bed Charge</span>
              <p className="font-bold text-gray-900 mt-1">NPR 800</p>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200">
              <span className="text-emerald-700 font-semibold block uppercase text-[10px]">Total Bill (Auto Calculated)</span>
              <p className="font-bold text-lg text-emerald-800 mt-0.5">NPR {room203Booking.grandTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigateTab('bookings')}
          className="p-5 bg-white border border-gray-200 rounded-2xl hover:border-brand-leaf hover:shadow-md transition text-left flex items-center gap-4 group"
        >
          <div className="p-3 bg-brand-forest/10 text-brand-forest rounded-xl group-hover:bg-brand-forest group-hover:text-white transition">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Booking Management</h4>
            <p className="text-xs text-gray-500">Approve, Check-in & Check-out</p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('orders')}
          className="p-5 bg-white border border-gray-200 rounded-2xl hover:border-brand-leaf hover:shadow-md transition text-left flex items-center gap-4 group"
        >
          <div className="p-3 bg-brand-leaf/10 text-brand-leaf rounded-xl group-hover:bg-brand-leaf group-hover:text-white transition">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Restaurant POS</h4>
            <p className="text-xs text-gray-500">Charge food/services to guest room</p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('bills')}
          className="p-5 bg-white border border-gray-200 rounded-2xl hover:border-brand-leaf hover:shadow-md transition text-left flex items-center gap-4 group"
        >
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Printable Invoices</h4>
            <p className="text-xs text-gray-500">Generate & print guest settlement</p>
          </div>
        </button>
      </div>

    </div>
  );
}
