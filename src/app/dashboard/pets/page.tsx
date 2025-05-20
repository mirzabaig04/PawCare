'use client';

import React, { useState, useEffect } from 'react';
import PetsGrid from '@/components/PetsGrid';
import AddPetModal from '@/components/AddPetModal';
import EditPetModal from '@/components/EditPetModal';

interface Pet {
  _id: string;
  name: string;
  breed: string;
  age: number;
  photoUrl?: string;
}

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch pets on mount
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch('/api/pets');
        const data = await res.json();
        setPets(data);
      } catch (error) {
        console.error('Failed to fetch pets:', error);
      }
    };

    fetchPets();
  }, []);

  // Add a pet via API
// Add a pet via API
const handleAddPet = async (newPet: Omit<Pet, '_id'>) => {
  try {
    const res = await fetch('/api/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPet),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('API error response:', errorData);
      throw new Error(errorData?.error || 'Failed to add pet');
    }

    const addedPet = await res.json();
    setPets((prev) => [...prev, addedPet]);
    setIsAddModalOpen(false);
  } catch (error) {
    alert(`Error adding pet: ${(error as Error).message}`);
    console.error(error);
  }
};

  // Open edit modal for a pet
  const handleEditPet = (id: string) => {
    const petToEdit = pets.find((pet) => pet._id === id);
    if (petToEdit) {
      setEditingPet(petToEdit);
      setIsEditModalOpen(true);
    }
  };

  // Update a pet via API
  // Accepts pet with `id` prop from EditPetModal, converts to `_id`
  const handleUpdatePet = async (updatedPet: { id: string; name: string; breed: string; age: number }) => {
    try {
      const petToUpdate = {
        _id: updatedPet.id,
        name: updatedPet.name,
        breed: updatedPet.breed,
        age: updatedPet.age,
      };

      const res = await fetch('/api/pets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petToUpdate),
      });

      if (!res.ok) throw new Error('Failed to update pet');
      const data = await res.json();

      setPets((prev) => prev.map((pet) => (pet._id === data._id ? data : pet)));
      setEditingPet(null);
      setIsEditModalOpen(false);
    } catch (error) {
      alert('Error updating pet');
      console.error(error);
    }
  };

  // Delete a pet via API
  const handleDeletePet = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pet?')) return;

    try {
      const res = await fetch(`/api/pets?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete pet');

      setPets((prev) => prev.filter((pet) => pet._id !== id));
    } catch (error) {
      alert('Error deleting pet');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Pets</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Pet
        </button>
      </div>

      {Array.isArray(pets) && pets.length === 0 ? (
        <p className="text-gray-600">You haven't added any pets yet.</p>
      ) : (
        <PetsGrid
          pets={pets.map((pet) => ({
            ...pet,
            id: pet._id, // normalize _id to id for PetsGrid
          }))}
          onEdit={handleEditPet}
          onDelete={handleDeletePet}
        />
      )}

      {/* Add Pet Modal */}
      <AddPetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPet={handleAddPet}
      />

      {/* Edit Pet Modal */}
      {editingPet && (
        <EditPetModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingPet(null);
          }}
          pet={{
            id: editingPet._id,
            name: editingPet.name,
            breed: editingPet.breed,
            age: editingPet.age,
          }}
          onUpdatePet={handleUpdatePet}
        />
      )}
    </div>
  );
}
