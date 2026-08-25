import React from 'react';
import { Booking, Invoice } from '../../types';
import { useResort } from '../../context/ResortContext';
import { Printer, X, CheckCircle, Clock } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

interface PrintableInvoiceProps {
  booking?: Booking | null;
  invoice?: Invoice | null;
  onClose: () => void;
}

export default function PrintableInvoice({ booking, invoice, onClose }: PrintableInvoiceProps) {
  const { contact } = useResort();

  if (!booking && !invoice) return null;

  const invoiceNo = invoice ? invoice.invoiceNumber : `INV-${booking?.bookingCode || '001'}`;
  const guestName = invoice ? invoice.customerName : booking?.guestName;
  const guestPhone = invoice ? invoice.customerPhone : booking?.guestPhone;
  const guestEmail = invoice ? invoice.customerEmail : booking?.guestEmail;
  const roomNumber = invoice ? invoice.roomNumber : booking?.roomNumber;
  const roomCategory = invoice ? invoice.roomCategory : booking?.roomCategory;
  const checkIn = invoice ? invoice.checkInDate : booking?.checkInDate;
  const checkOut = invoice ? invoice.checkOutDate : booking?.checkOutDate;
  const nights = invoice ? invoice.nights : booking?.nights || 1;
  const roomRate = booking ? booking.roomRate : (invoice ? invoice.roomCharges / (invoice.nights || 1) : 0);
  const totalRoomCharge = invoice ? invoice.roomCharges : booking?.totalRoomCharge || 0;
  const orders = booking ? booking.orders : [];

  const subtotal = invoice ? invoice.subtotal : booking?.grandTotal || 0;
  const grandTotal = invoice ? invoice.grandTotal : booking?.grandTotal || 0;
  const paidAmount = invoice ? invoice.paidAmount : booking?.advancePayment || 0;
  const balanceDue = invoice ? invoice.balanceDue : booking?.balanceDue || 0;
  const paymentStatus = invoice ? invoice.paymentStatus : booking?.paymentStatus || 'Unpaid';
  const paymentMethod = invoice ? invoice.paymentMethod : booking?.paymentMethod || 'Cash';
  const issuedDate = invoice ? invoice.issuedAt : new Date().toLocaleString();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 md:p-8 my-8 relative printable-area border border-gray-100">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 no-print">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Printer className="w-4 h-4 text-brand-leaf" />
            <span>Print Preview - Package 3 Invoice System</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-brand-forest hover:bg-emerald-900 text-white font-medium rounded-xl text-sm shadow flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Body Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <img
              src={logoImg}
              alt="Dada Ghar Resort"
              className="w-14 h-14 rounded-full object-cover border border-amber-400 p-0.5 bg-white shrink-0"
            />
            <div>
              <h1 className="text-brand-forest font-serif font-bold text-2xl leading-none mb-1">
                Dada Ghar Agro Farm Resort
              </h1>
              <p className="text-xs text-gray-500 max-w-xs">{contact.address}</p>
              <p className="text-xs text-gray-500">Phone: {contact.phone} | WhatsApp: {contact.whatsappNumber}</p>
              <p className="text-xs text-gray-500">Email: {contact.email}</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="inline-block px-3 py-1 bg-brand-leaf/10 text-brand-forest text-xs font-bold uppercase tracking-wider rounded-lg mb-2">
              TAX / CASH INVOICE
            </span>
            <h2 className="text-xl font-bold text-gray-800">{invoiceNo}</h2>
            <p className="text-xs text-gray-500 mt-1">Date: {issuedDate}</p>
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                paymentStatus === 'Partial' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {paymentStatus === 'Paid' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                <span>PAYMENT STATUS: {paymentStatus.toUpperCase()}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Guest & Stay Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 bg-gray-50 p-4 rounded-xl text-sm border border-gray-100">
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Guest Information</h4>
            <p className="font-bold text-gray-900 text-base">{guestName}</p>
            <p className="text-gray-600 text-xs">Phone: {guestPhone}</p>
            <p className="text-gray-600 text-xs">Email: {guestEmail || 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Stay Details</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Room Number:</span>
                <p className="font-bold text-gray-900 text-sm">Room {roomNumber}</p>
              </div>
              <div>
                <span className="text-gray-500">Category:</span>
                <p className="font-semibold text-gray-800">{roomCategory}</p>
              </div>
              <div>
                <span className="text-gray-500">Check-in:</span>
                <p className="font-medium text-gray-800">{checkIn}</p>
              </div>
              <div>
                <span className="text-gray-500">Check-out:</span>
                <p className="font-medium text-gray-800">{checkOut} ({nights} Night)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase border-y">
                <th className="py-2.5 px-3">Item / Service Description</th>
                <th className="py-2.5 px-3 text-center">Category</th>
                <th className="py-2.5 px-3 text-center">Qty / Nights</th>
                <th className="py-2.5 px-3 text-right">Rate (NPR)</th>
                <th className="py-2.5 px-3 text-right">Total (NPR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Room Charge */}
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-3 font-semibold text-gray-800">
                  {roomCategory} - Room {roomNumber} Accommodation
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold">Room</span>
                </td>
                <td className="py-3 px-3 text-center">{nights} Night(s)</td>
                <td className="py-3 px-3 text-right font-mono">{roomRate.toLocaleString()}</td>
                <td className="py-3 px-3 text-right font-bold font-mono text-gray-900">{totalRoomCharge.toLocaleString()}</td>
              </tr>

              {/* Food / Service Orders */}
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 text-gray-700 flex items-center gap-1.5">
                    <span>{order.name}</span>
                    <span className="text-[10px] text-gray-400">({order.timestamp})</span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold">
                      {order.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">{order.quantity}</td>
                  <td className="py-2.5 px-3 text-right font-mono">{order.price.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-bold font-mono text-gray-900">
                    {(order.price * order.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-xl border mb-6">
          <div className="text-xs text-gray-600 space-y-1 mb-3 sm:mb-0">
            <p><span className="font-bold">Payment Method:</span> {paymentMethod}</p>
            <p><span className="font-bold">Issued By:</span> Dada Ghar Billing Engine (Package 3)</p>
          </div>

          <div className="w-full sm:w-64 space-y-1.5 text-xs text-right">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-mono">NPR {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax / Service (0%):</span>
              <span className="font-mono">NPR 0</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-1.5">
              <span>Grand Total:</span>
              <span className="font-mono text-brand-forest">NPR {grandTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Paid Amount:</span>
              <span className="font-mono">NPR {paidAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-rose-700 font-bold border-t pt-1">
              <span>Balance Due:</span>
              <span className="font-mono">NPR {balanceDue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer & Signature */}
        <div className="pt-6 border-t border-dashed flex flex-col sm:flex-row justify-between items-end gap-6 text-xs text-gray-500">
          <div>
            <p className="font-bold text-gray-700">Thank you for visiting Dada Ghar Agro Farm Resort!</p>
            <p className="mt-0.5">Please retain this invoice for your records.</p>
            <p className="text-[10px] mt-1 text-gray-400">System Generated &bull; No physical signature required</p>
          </div>

          <div className="text-center sm:text-right">
            <div className="w-40 border-b border-gray-400 mb-1 mx-auto sm:ml-auto"></div>
            <p className="font-semibold text-gray-700">Authorized Front Desk Signature</p>
          </div>
        </div>

      </div>
    </div>
  );
}
