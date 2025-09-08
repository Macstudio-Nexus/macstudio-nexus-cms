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
    <div className="modal-container">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl sm:pb-4 font-jetbrains font-bold text-center text-dark">
          Add New User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 px-6 pt-2 overflow-y-auto max-h-150"
        >
          <input
            type="text"
            name="Name"
            placeholder="Main Contact Name"
            value={formData.Name}
            onChange={handleChange}
            className="inputfield"
            required
          />

          <input
            type="tel"
            name="PhoneNumber"
            placeholder="Phone Number"
            value={formData.PhoneNumber}
            onChange={handleChange}
            className="inputfield"
          />

          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={formData.Email}
            onChange={handleChange}
            className="inputfield "
            required
          />

          <input
            type="password"
            name="Password"
            placeholder="Temporary Password"
            value={formData.Password}
            onChange={handleChange}
            className="inputfield"
            required
          />

          <input
            type="text"
            name="BusinessName"
            placeholder="Business Name"
            value={formData.BusinessName}
            onChange={handleChange}
            className="inputfield"
          />

          <textarea
            name="Service"
            placeholder="Business Service Type"
            value={formData.Service}
            onChange={handleChange}
            className="inputfield min-h-20 h-20 resize-none"
            rows={4}
            maxLength={1000}
          />

          <span className="text-sm font-medium text-dark">Role</span>
          <select
            name="Role"
            required
            value={formData.Role}
            onChange={handleChange}
            className="inputfield"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
          </select>

          <div className="flex items-center justify-around pt-4">
            <button type="submit" className="formButton">
              Add User
            </button>

            <button className="formButton" onClick={onCloseAction}>
              Close
            </button>
          </div>

          {/* for spacing */}
          <input
            type="file"
            required
            name="Image"
            // onChange={handleFileChange}
            className="bg-transparent text-transparent self-start"
            accept=".pdf,.doc,.docx,.jpg,.png,.zip"
          />
        </form>
      </div>
    </div>
  );
}
