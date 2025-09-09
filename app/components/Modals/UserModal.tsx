"use client";

import { useState } from "react";

export default function UserModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company_name: "",
    phone_number: "",
    business_type: "",
    password: "",
    role: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function getRoleId(role: string) {
    switch (role.toLowerCase()) {
      case "admin":
        return 1;
      case "user":
        return 2;
      case "guest":
        return 3;
      default:
        return 2; // default to user
    }
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
      phone_number: formDataObj.phone_number || null,
      company_name: formDataObj.company_name || null,
      business_type: formDataObj.business_type || null,
      role_id:
        formDataObj.role === "admin" ? 1 : formDataObj.role === "guest" ? 3 : 2, // default to "user"
    };

    try {
      const res = await fetch("/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("User added:", result);
    } catch (error) {
      console.error("Error adding user:", error);

      // Reset form
      setFormData({
        name: "",
        email: "",
        company_name: "",
        phone_number: "",
        business_type: "",
        password: "",
        role: "",
      });

      onCloseAction(); // close modal after success
    }
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
            name="name"
            placeholder="Main Contact Name"
            value={formData.name}
            onChange={handleChange}
            className="inputfield"
            required
          />

          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
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
            name="company_name"
            placeholder="Business Name"
            value={formData.company_name}
            onChange={handleChange}
            className="inputfield"
          />

          <input
            type="text"
            name="business_type"
            placeholder="Business Service Type"
            value={formData.business_type}
            onChange={handleChange}
            className="inputfield"
            maxLength={1000}
          />

          <span className="text-sm font-medium text-dark">Role</span>
          <select
            name="role"
            required
            value={formData.role}
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
