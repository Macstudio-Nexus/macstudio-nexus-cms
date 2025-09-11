"use client";

import { useState } from "react";
import { Loader } from "lucide-react";

interface DeleteUserModalProps {
  userId: number;
  userName: string;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export default function DeleteUserModal({
  userId,
  userName,
  onClose,
  onDelete,
}: DeleteUserModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      onDelete(userId);
      onClose();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-trans flex items-center justify-center z-50 font-source">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h2 className="text-xl font-bold mb-4">Delete User</h2>
          <p className="mb-6">
            Are you sure you want to delete <strong>{userName}</strong>? This
            action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
