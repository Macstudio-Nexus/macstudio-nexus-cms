"use client";

import { useState, useEffect } from "react";
import {useUsers} from "@/app/hooks/useUsers";

import UserModal from "@/app/components/Modals/AddUserModal";
import DeleteUserModal from "@/app/components/Modals/DeleteUserModal";
import { Primary } from "@/app/components/Buttons";
import { Loader } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  companyName: string | null;
  businessType: string | null;
  roleId: number;
}

export default function Users() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { users, isLoading, fetchUsers, deleteUser } = useUsers();

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const QuickButtons = [
    { label: "Add New User", action: () => openModal("user"), disabled: false },
    {
      label: "Update User",
      action: () => openModal("update"),
      disabled: !selectedUserId,
    },
    {
      label: "Delete User",
      action: () => setShowDeleteModal(true),
      disabled: !selectedUserId,
    },
  ];

  // Get selected user data
  const selectedUser = users?.find((user) => user.name === selectedUserName);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <main className="page-container">
      <h1 className="page-header">Users</h1>
      <div>
        <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-6 my-6">
          <div className="flex flex-col items-center justify-center 2xl:flex-row">
            {/* Dropdown */}
            {isLoading ? (
              <div className="dropdown-loader">
                <Loader
                  size="40"
                  className="animate-[spin_2s_linear_infinite]"
                />
                <span className="text-black text-center text-xl md:text-3xl xl:text-4xl">
                  Loading...
                </span>
              </div>
            ) : (
              <select
                value={selectedUserName || ""}
                key={selectedUserName}
                onChange={(e) => {
                  const userName = String(e.target.value) || null;
                  setSelectedUserName(userName);

                  if (userName) {
                    const user = users.find((u) => u.name === userName);
                    setSelectedUserId(user?.id || null);
                  } else {
                    setSelectedUserId(null);
                  }
                }}
                className="select-dropdown"
              >
                <option value="">Select a user</option>
                {users?.map((user) => (
                  <option
                    key={user.name}
                    value={user.name}
                    className="bg-white font-bold"
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            )}

            {/* Display selected user data */}
            {selectedUser ? (
              <div className="dashboard-card-container space-y-3 w-full max-w-sm sm:max-w-lg xl:max-w-2xl mx-auto xl:text-4xl">
                <h3 className="font-semibold text-lg lg:text-4xl">
                  <span className="text-accent">{selectedUser.name}</span>
                </h3>
                <p>
                  <strong>Email:</strong>{" "}
                  <span className="text-accent">{selectedUser.email}</span>
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <span className="text-accent">
                    {selectedUser.phoneNumber || "-"}
                  </span>
                </p>
                <p>
                  <strong>Company:</strong>{" "}
                  <span className="text-accent">
                    {selectedUser.companyName || "-"}
                  </span>
                </p>
                <p>
                  <strong>Business Type:</strong>{" "}
                  <span className="text-accent">
                    {selectedUser.businessType || "-"}
                  </span>
                </p>
                <p>
                  <strong>Role:</strong>{" "}
                  <span className="text-accent">
                    {selectedUser.roleId === 1
                      ? "Admin"
                      : selectedUser.roleId === 3
                        ? "Guest"
                        : "User"}
                  </span>
                </p>
              </div>
            ) : (
              <div className="dashboard-card-container space-y-3 w-full max-w-sm sm:max-w-lg xl:max-w-2xl mx-auto xl:text-4xl">
                <h3 className="font-semibold text-lg lg:text-4xl">-</h3>
                <p>
                  <strong>Email:</strong> -
                </p>
                <p>
                  <strong>Phone:</strong> -
                </p>
                <p>
                  <strong>Company:</strong> -
                </p>
                <p>
                  <strong>Business Type:</strong> -
                </p>
                <p>
                  <strong>Role:</strong> -
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-3 h-auto max-w-sm dashboard-card-container">
            <h2 className="dashboard-container-header">Quick Actions</h2>
            {QuickButtons.map((button) => (
              <div key={button.label}>
                <Primary
                  label={button.label}
                  handleClick={button.disabled ? () => {} : button.action}
                  disabled={button.disabled}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeModal === "user" && <UserModal onCloseAction={closeModal} onSuccess={fetchUsers} />}
      {showDeleteModal && selectedUserId && selectedUser && (
        <DeleteUserModal
          userId={selectedUserId}
          userName={selectedUser.name}
          onClose={() => setShowDeleteModal(false)}
          onDelete={deleteUser}
        />
      )}
    </main>
  );
}
