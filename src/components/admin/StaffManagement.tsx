import React, { useState } from 'react';
import { useResort } from '../../context/ResortContext';
import { StaffUser, StaffRole } from '../../types';
import { UserCheck, Plus, Edit2, Trash2, Shield, Utensils, DollarSign, Calendar, Key, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function StaffManagement() {
  const { staffUsers, addStaffUser, updateStaffUser, deleteStaffUser } = useResort();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffUser | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<StaffRole>('waiter');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const openAddModal = () => {
    setEditingStaff(null);
    setName('');
    setUsername('');
    setPassword('');
    setRole('waiter');
    setPhone('');
    setEmail('');
    setIsModalOpen(true);
  };

  const openEditModal = (staff: StaffUser) => {
    setEditingStaff(staff);
    setName(staff.name);
    setUsername(staff.username);
    setPassword(staff.password || '');
    setRole(staff.role);
    setPhone(staff.phone);
    setEmail(staff.email || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaff) {
      updateStaffUser({
        ...editingStaff,
        name,
        username,
        password,
        role,
        phone,
        email
      });
    } else {
      addStaffUser({
        name,
        username,
        password,
        role,
        phone,
        email
      });
    }
    setIsModalOpen(false);
  };

  const handleToggleActive = (staff: StaffUser) => {
    updateStaffUser({
      ...staff,
      active: !staff.active
    });
  };

  const getRoleBadge = (role: StaffRole) => {
    switch (role) {
      case 'admin':
        return <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Manager / Admin</span>;
      case 'cashier':
        return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> Front-Desk Cashier</span>;
      case 'waiter':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold flex items-center gap-1"><Utensils className="w-3.5 h-3.5" /> Restaurant Waiter</span>;
      case 'receptionist':
        return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Receptionist</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-brand-leaf" />
            <span>Resort Team & Staff Roles</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">Manage staff user accounts, assign roles (Manager, Waiter, Cashier, Receptionist), and passcodes.</p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-brand-forest hover:bg-emerald-950 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {staffUsers.map(staff => (
          <div key={staff.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b">
                <div className="w-10 h-10 bg-brand-forest/10 text-brand-forest rounded-full flex items-center justify-center font-bold text-sm">
                  {staff.name.slice(0, 2).toUpperCase()}
                </div>
                {getRoleBadge(staff.role)}
              </div>

              <h3 className="font-bold text-gray-900 text-sm mb-1">{staff.name}</h3>
              <p className="text-xs text-gray-500 font-mono mb-2">Username: <span className="font-bold text-gray-800">{staff.username}</span></p>

              <div className="space-y-1 text-xs text-gray-600 mb-4 bg-gray-50 p-3 rounded-xl">
                <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> {staff.phone}</p>
                {staff.email && <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {staff.email}</p>}
                <p className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-1"><Key className="w-3 h-3" /> Password: •••••••• ({staff.password})</p>
              </div>
            </div>

            <div className="pt-3 border-t flex items-center justify-between">
              <button
                onClick={() => handleToggleActive(staff)}
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  staff.active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {staff.active ? 'Active' : 'Inactive'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(staff)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteStaffUser(staff.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <h3 className="text-lg font-serif font-bold text-brand-forest mb-4">
              {editingStaff ? `Edit Staff (${editingStaff.name})` : 'Add Staff Account'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Sunita Gurung"
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Username *</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="e.g. sunita"
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Password *</label>
                  <input
                    type="text"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Passcode"
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Staff Role *</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value as StaffRole)}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                >
                  <option value="admin">Manager / Admin (Full Access)</option>
                  <option value="waiter">Waiter (Mobile POS Only)</option>
                  <option value="cashier">Cashier (Front-Desk Billing)</option>
                  <option value="receptionist">Receptionist (Bookings & Check-in)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+977 98..."
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="staff@example.com"
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-forest text-white font-bold rounded-xl shadow"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
