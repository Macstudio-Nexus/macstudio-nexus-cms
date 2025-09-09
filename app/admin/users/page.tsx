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
  const selectedUser = users.find((user) => user.name === selectedUserName);

  useEffect(() => {
    fetch("/api/users/get")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <main className="bg-gradient-to-r from-white to-primary min-h-screen">
      <h1 className="text-3xl md:text-5xl font-source font-bold pt-4 px-2 text-off-black text-center">
        Users
      </h1>
      <div>
        {/* Dropdown */}
        <select
          value={selectedUserName || ""}
          key={selectedUserName}
          onChange={(e) => setSelectedUserName(String(e.target.value) || null)}
          className="rounded-xl px-4 py-2 mb-4 font-source text-accent bg-off-black ml-4 mt-4 shadow-xl"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.name} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>

        {/* Display selected user data */}
        {selectedUser && (
          <div className="dashboard-card-container space-y-3 max-w-fit mx-auto">
            <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phoneNumber || "-"}
            </p>
            <p>
              <strong>Company:</strong> {selectedUser.companyName || "-"}
            </p>
            <p>
              <strong>Business Type:</strong> {selectedUser.businessType || "-"}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              {selectedUser.roleId === 1
                ? "Admin"
                : selectedUser.roleId === 3
                  ? "Guest"
                  : "User"}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-3 h-auto max-w-sm dashboard-card-container">
        <h2 className="dashboard-container-header">Quick Actions</h2>
        {QuickButtons.map((button) => (
          <div key={button.label}>
            <Primary label={button.label} handleClick={button.action} />
          </div>
        ))}
      </div>

     
      {activeModal === "user" && <UserModal onCloseAction={closeModal} />}
    </main>
  );
}
