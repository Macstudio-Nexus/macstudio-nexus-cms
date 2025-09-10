"use client";

import { useState, useEffect } from "react";

import UserModal from "@/app/components/Modals/AddUserModal";
import { Primary } from "@/app/components/Buttons";

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
  const [users, setUsers] = useState<User[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const QuickButtons = [
    { label: "Add New User", action: () => openModal("user") },
    { label: "Update User", action: () => openModal("update") },
    { label: "Delete User", action: () => openModal("delete") },
  ];

  // Get selected user data
  const selectedUser = users?.find((user) => user.name === selectedUserName);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <main className="flex flex-col items-center bg-gradient-to-r from-white to-primary min-h-screen">
      <h1 className="page-header">Users</h1>
      <div>
        <div className="flex flex-col xl:flex-row items-start justify-center gap-6 mb-6">
          {/* Dropdown */}
          <select
            value={selectedUserName || ""}
            key={selectedUserName}
            onChange={(e) =>
              setSelectedUserName(String(e.target.value) || null)
            }
            className="rounded-xl px-4 py-2 mb-4 font-source text-black bg-primary ml-4 mt-3 shadow-xl xl:text-4xl"
          >
            <option value="">Select a user</option>
            {users?.map((user) => (
              <option key={user.name} value={user.name} className="bg-white font-bold">
                {user.name}
              </option>
            ))}
          </select>

          {/* Display selected user data */}
          {selectedUser ? (
            <div className="dashboard-card-container space-y-3 max-w-fit mx-auto min-w-[95vh] xl:text-4xl lg:min-w-xl">
              <h3 className="font-semibold text-lg lg:text-4xl">
                <span className="text-accent">{selectedUser.name}</span>
              </h3>
              <p>
                <strong>Email:</strong> <span className="text-accent">{selectedUser.email}</span>
              </p>
              <p>
                <strong>Phone:</strong> <span className="text-accent">{selectedUser.phoneNumber || "-"}</span>
              </p>
              <p>
                <strong>Company:</strong> <span className="text-accent">{selectedUser.companyName || "-"}</span>
              </p>
              <p>
                <strong>Business Type:</strong>{" "}
                <span className="text-accent">{selectedUser.businessType || "-"}</span>
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
            <div className="dashboard-card-container space-y-3 max-w-[95vh] mx-auto lg:min-w-xl xl:text-4xl">
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
          <div className="flex flex-col items-center justify-center gap-3 h-auto max-w-sm dashboard-card-container">
            <h2 className="dashboard-container-header">Quick Actions</h2>
            {QuickButtons.map((button) => (
              <div key={button.label}>
                <Primary label={button.label} handleClick={button.action} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeModal === "user" && <UserModal onCloseAction={closeModal} />}
    </main>
  );
}
