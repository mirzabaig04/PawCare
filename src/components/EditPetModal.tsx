'use client';

import React, { useState, useEffect } from 'react';

interface EditPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePet: (updatedPet: { id: string; name: string; breed: string; age: number }) => void;
  pet: { id: string; name: string; breed: string; age: number };
}

export default function EditPetModal({ isOpen, onClose, onUpdatePet, pet }: EditPetModalProps) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setBreed(pet.breed);
      setAge(pet.age);
    }
  }, [pet]);

  const handleSubmit = () => {
    onUpdatePet({ id: pet.id, name, breed, age });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Pet</h2>
        <input
          type="text"
          placeholder="Pet Name"
          className="w-full mb-2 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Breed"
          className="w-full mb-2 p-2 border rounded"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          className="w-full mb-4 p-2 border rounded"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
