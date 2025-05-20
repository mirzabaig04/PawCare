import React from 'react';
import PetCard from './PetCard';

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  photoUrl?: string;
}

interface PetsGridProps {
  pets: Pet[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PetsGrid: React.FC<PetsGridProps> = ({ pets, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          name={pet.name}
          breed={pet.breed}
          age={pet.age}
          photoUrl={pet.photoUrl}
          onEdit={() => onEdit(pet.id)}
          onDelete={() => onDelete(pet.id)}
        />
      ))}
    </div>
  );
};

export default PetsGrid;
