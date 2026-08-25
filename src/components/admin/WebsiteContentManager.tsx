import React, { useState } from 'react';
import { useResort } from '../../context/ResortContext';
import { Globe, Phone, Mail, MapPin, QrCode, RefreshCw, Save, Check } from 'lucide-react';

export default function WebsiteContentManager() {
  const { contact, updateContactInfo, resetToDemoData } = useResort();

  const [phone, setPhone] = useState(contact.phone);
  const [altPhone, setAltPhone] = useState(contact.altPhone);
  const [email, setEmail] = useState(contact.email);
  const [address, setAddress] = useState(contact.address);
  const [whatsappNumber, setWhatsappNumber] = useState(contact.whatsappNumber);
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState(contact.qrCodeImageUrl);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo({
      ...contact,
      phone,
      altPhone,
      email,
      address,
      whatsappNumber,
      qrCodeImageUrl
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all resort system data back to initial demo data (including Room 203 quotation sample)?')) {
      resetToDemoData();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-6 h-6 text-brand-leaf" />
            <span>Website Content & Settings Manager</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">Updates made here automatically reflect across the public website pages and booking forms.</p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 border border-rose-200 transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        {savedSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2 border border-emerald-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Resort contact information & QR payment details saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Primary Phone Number</label>
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Secondary Phone Number</label>
              <input
                type="text"
                value={altPhone}
                onChange={e => setAltPhone(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Contact Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">WhatsApp Integration Number (Country code without +)</label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Resort Physical Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Payment QR Code Image URL (Fonepay / eSewa)</label>
            <input
              type="url"
              required
              value={qrCodeImageUrl}
              onChange={e => setQrCodeImageUrl(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
            />
          </div>

          <div className="pt-4 border-t flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-brand-forest hover:bg-emerald-950 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 text-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Website Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
