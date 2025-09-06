"use client";

import { useState } from "react";

export default function UserModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    BusinessName: "",
    PhoneNumber: "",
    Service: "",
    Password: "",
    Role: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you would typically handle form submission, e.g., send data to a server
  }

  return (
    <div className="z-50 fixed bottom-1 bg-gradient-to-l from-primary to-secondary bg-opacity-50 border-2 rounded flex items-center justify-center h-[95vh] w-7/8 shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-jetbrains font-bold text-dark">
          Add New User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 px-6 pt-2 overflow-y-auto max-h-140 min-w-80"
        >
          <input
            type="text"
            name="Name"
            placeholder="Main Contact Name"
            value={formData.Name}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
          />

          <input
            type="tel"
            name="PhoneNumber"
            placeholder="Phone Number"
            value={formData.PhoneNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
          />

          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={formData.Email}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
          />

          <input
            type="password"
            name="Password"
            placeholder="Temporary Password"
            value={formData.Password}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
          />

          <input
            type="text"
            name="BusinessName"
            placeholder="Business Name"
            value={formData.BusinessName}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
          />

          <input
            type="text"
            name="Service"
            placeholder="Business Service Type"
            value={formData.Service}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
          />

          <span className="text-sm font-medium text-dark">Role</span>
          <select
            name="Role"
            required
            value={formData.Role}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
          </select>

          <div className="flex items-center justify-around pt-4">
            <button
              type="submit"
              className="button py-1 px-4 bg-dark text-white hover:bg-dark-accent border-dark"
            >
              Add User
            </button>

            <button
              className="button py-1 px-4 bg-dark text-white hover:bg-dark-accent border-dark"
              onClick={onCloseAction}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
