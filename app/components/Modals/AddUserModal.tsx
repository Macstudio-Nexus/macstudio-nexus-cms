"use client";

import { useState } from "react";

export default function AddUserModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
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
      setIsLoading(true);
      setError(""); // Clear previous errors
      
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("User added:", result);
      
      // Show success popup
      setShowSuccess(true);
      
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        companyName: "",
        phoneNumber: "",
        businessType: "",
        password: "",
        roleId: "",
      });

      // Auto-hide after 3 seconds and close modal
      setTimeout(() => {
        setShowSuccess(false);
        onCloseAction();
      }, 3000);
    } catch (error) {
      console.error("Error adding user:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {showSuccess && (
        <div className="fixed top-1/2 right-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          ✅ Successfully added user!
        </div>
      )}
      
      <div className="modal-container">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl sm:pb-4 font-jetbrains font-bold text-center text-dark">
          Create New User
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
            Loading...
          </div>
        ) : (
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
            <button type="submit" className="form-button">
              Add User
            </button>

            <button
              type="button"
              className="form-button"
              onClick={onCloseAction}
            >
              Close
            </button>
          </div>
          </form>
        )}
      </div>
      </div>
    </>
  );
}
