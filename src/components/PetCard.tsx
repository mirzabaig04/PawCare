import React from 'react';

interface PetCardProps {
  name: string;
  breed: string;
  age: number;
  photoUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ name, breed, age, photoUrl, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow rounded p-4 max-w-xs">
      <div className="h-40 w-full mb-4 overflow-hidden rounded">
        {photoUrl ? (
          <img src={photoUrl} alt={`${name} photo`} className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center bg-gray-200 text-gray-500 h-full">
            No Photo
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">Breed: {breed}</p>
      <p className="text-gray-600">Age: {age} {age === 1 ? 'year' : 'years'}</p>
      <div className="mt-3 flex space-x-2">
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default PetCard;
