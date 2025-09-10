"use client";

import { useState } from "react";

export default function AddUserModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    phoneNumber: "",
    businessType: "",
    roleId: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formDataObj = Object.fromEntries(
      Array.from(new FormData(e.currentTarget)).map(([k, v]) => [
        k,
        v.toString(),
      ])
    );

    // Map front-end keys to DB columns
    const data = {
      name: formDataObj.name,
      email: formDataObj.email,
      password: formDataObj.password,
      phoneNumber: formDataObj.phoneNumber || null,
      companyName: formDataObj.companyName || null,
      businessType: formDataObj.businessType || null,
      roleId:
        formDataObj.roleId === "Admin" ? 1 : formDataObj.roleId === "Guest" ? 3 : 2, // default to "user"
    };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("User added:", result);
    } catch (error) {
      console.error("Error adding user:", error);

      // Reset form
      setFormData({
        name: "",
        email: "",
        companyName: "",
        phoneNumber: "",
        businessType: "",
        password: "",
        roleId: "",
      });

      onCloseAction(); // close modal after success
    }
  }

  return (
    <div className="modal-container">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl sm:pb-4 font-jetbrains font-bold text-center text-dark">
          Create New User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 px-6 pt-2 overflow-y-auto max-h-150"
        >
          <input
            type="text"
            name="name"
            placeholder="Main Contact Name"
            value={formData.name}
            onChange={handleChange}
            className="inputfield"
            required
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="inputfield"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="inputfield"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Temporary Password"
            value={formData.password}
            onChange={handleChange}
            className="inputfield"
            required
          />

          <input
            type="text"
            name="companyName"
            placeholder="Business Name"
            value={formData.companyName}
            onChange={handleChange}
            className="inputfield"
          />

          <input
            type="text"
            name="businessType"
            placeholder="Business Service Type"
            value={formData.businessType}
            onChange={handleChange}
            className="inputfield"
            maxLength={1000}
          />

          <span className="text-sm font-medium text-dark">Role</span>
          <select
            name="roleId"
            required
            value={formData.roleId}
            onChange={handleChange}
            className="inputfield"
          >
            <option value="">Select Role</option>
            <option value="user">Admin</option>
            <option value="admin">User</option>
            <option value="guest">Guest</option>
          </select>

          <div className="flex items-center justify-around pt-4">
            <button type="submit" className="formButton">
              Add User
            </button>

            <button
              type="button"
              className="formButton"
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
