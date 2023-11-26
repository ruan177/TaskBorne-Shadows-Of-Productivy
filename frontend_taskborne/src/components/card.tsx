import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';

interface CardProps {
  id: string;
  title: string;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({ id, title, onEdit, onDelete }) => {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEdit(id, newTitle);
    setEditing(false);
  };
  const handleCancel = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="bg-white p-3 mb-2 rounded-md shadow-md" draggable={!isEditing} onDragStart={(e) => e.dataTransfer.setData('text/plain', id.toString())}>
      {isEditing ? (
        <div className="flex items-center">
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <FaSave className="cursor-pointer text-green-500" onClick={handleSave} />
          <FaTimes className="cursor-pointer text-red-500 ml-2" onClick={handleCancel} />
        </div>
      ) : (
        <div>
            <div className="flex items-center">
          <h3 className="font-mountains-of-christmas text-lg font-semibold mb-2">{title}</h3>
          <div className="ml-auto flex items-center">
            <button onClick={handleEdit} className="text-blue-500">
              <FaEdit />
            </button>
            <button onClick={handleDelete} className="text-yellow-500">
              <FaTrashAlt />
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};