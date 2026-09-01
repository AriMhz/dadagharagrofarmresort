import React, { useState } from 'react';
import { useResort } from '../../context/ResortContext';
import { Room, RoomCategory, RoomStatus } from '../../types';
import { Plus, Edit2, Trash2, Bed, Check, X, Image as ImageIcon, Users, DollarSign } from 'lucide-react';
import { getAssetUrl } from '../../services/resortStore';

export default function RoomManagement() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useResort();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Form State
  const [roomNumber, setRoomNumber] = useState('');
  const [category, setCategory] = useState<RoomCategory>('Deluxe Room');
  const [pricePerNight, setPricePerNight] = useState(4000);
  const [capacity, setCapacity] = useState(2);
  const [status, setStatus] = useState<RoomStatus>('Available');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [amenitiesInput, setAmenitiesInput] = useState('Free Wi-Fi, AC, Mountain View, Attached Bathroom');

  const openAddModal = () => {
    setEditingRoom(null);
    setRoomNumber('');
    setCategory('Deluxe Room');
    setPricePerNight(4000);
    setCapacity(2);
    setStatus('Available');
    setImage('images/resort/optimized/DSC09130.jpg');
    setDescription('');
    setAmenitiesInput('Free Wi-Fi, AC, Mountain View, Attached Bathroom');
    setIsModalOpen(true);
  };

  const openEditModal = (room: Room) => {
    setEditingRoom(room);
    setRoomNumber(room.roomNumber);
    setCategory(room.category);
    setPricePerNight(room.pricePerNight);
    setCapacity(room.capacity);
    setStatus(room.status);
    setImage(room.image);
    setDescription(room.description);
    setAmenitiesInput(room.amenities.join(', '));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amenities = amenitiesInput.split(',').map(a => a.trim()).filter(Boolean);

    if (editingRoom) {
      updateRoom({
        ...editingRoom,
        roomNumber,
        category,
        pricePerNight: Number(pricePerNight),
        capacity: Number(capacity),
        status,
        image,
        description,
        amenities
      });
    } else {
      addRoom({
        roomNumber,
        category,
        pricePerNight: Number(pricePerNight),
        capacity: Number(capacity),
        status,
        image,
        description,
        amenities
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, number: string) => {
    if (window.confirm(`Are you sure you want to delete Room ${number}?`)) {
      deleteRoom(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <Bed className="w-6 h-6 text-brand-leaf" />
            <span>Room & Inventory Management</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">Configure room categories, pricing per night, amenities, and real-time status.</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-brand-forest hover:bg-emerald-950 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Room</span>
        </button>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div 
            key={room.id} 
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition"
          >
            <div className="relative h-48 bg-gray-100 overflow-hidden group">
              <img 
                src={getAssetUrl(room.image)} 
                alt={room.roomNumber} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold font-mono">
                Room {room.roomNumber}
              </div>
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                room.status === 'Available' ? 'bg-emerald-500 text-white shadow' :
                room.status === 'Occupied' ? 'bg-rose-500 text-white shadow' :
                room.status === 'Reserved' ? 'bg-amber-500 text-white shadow' :
                'bg-gray-500 text-white shadow'
              }`}>
                {room.status}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{room.category}</h3>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">Price / Night</span>
                    <span className="font-bold text-brand-forest text-base font-mono">NPR {room.pricePerNight.toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 mb-3">{room.description}</p>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Users className="w-4 h-4 text-brand-leaf" />
                  <span>Capacity: {room.capacity} Guests</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.amenities.map((am, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px]">
                      {am}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => openEditModal(room)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition text-xs font-medium flex items-center gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(room.id, room.roomNumber)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition text-xs font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4 mb-6">
              <h3 className="text-lg font-serif font-bold text-gray-900">
                {editingRoom ? `Edit Room ${editingRoom.roomNumber}` : 'Add New Resort Room'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Room Number *</label>
                  <input
                    type="text"
                    required
                    value={roomNumber}
                    onChange={e => setRoomNumber(e.target.value)}
                    placeholder="e.g. 101, 201, C-1"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-brand-leaf"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as RoomCategory)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-brand-leaf"
                  >
                    <option value="Deluxe Room">Deluxe Room</option>
                    <option value="Super Deluxe Room">Super Deluxe Room</option>
                    <option value="Family Suite">Family Suite</option>
                    <option value="Agro Cottage">Agro Cottage</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Price (NPR) *</label>
                  <input
                    type="number"
                    required
                    min={500}
                    value={pricePerNight}
                    onChange={e => setPricePerNight(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl font-mono font-medium outline-none focus:ring-2 focus:ring-brand-leaf"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Capacity *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={10}
                    value={capacity}
                    onChange={e => setCapacity(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-brand-leaf"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Status *</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as RoomStatus)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-brand-leaf"
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Image URL / Path *</label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  placeholder="e.g. images/resort/optimized/DSC09130.jpg"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl font-mono outline-none focus:ring-2 focus:ring-brand-leaf"
                />
                {image && (
                  <img 
                    src={getAssetUrl(image)} 
                    alt="Preview" 
                    className="w-full h-28 object-cover rounded-xl mt-2 border"
                  />
                )}
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Amenities (Comma separated)</label>
                <input
                  type="text"
                  value={amenitiesInput}
                  onChange={e => setAmenitiesInput(e.target.value)}
                  placeholder="Free Wi-Fi, AC, Attached Bathroom, Mountain View"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-brand-leaf"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Brief overview of the room and features..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-brand-leaf"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-forest hover:bg-emerald-950 text-white font-bold rounded-xl shadow transition"
                >
                  {editingRoom ? 'Save Changes' : 'Create Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
