"use client";

import { useState, useEffect } from "react";

interface User {
  name: string;
  id: number;
}

export default function addSiteModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    userId: "",
    description: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        console.log("Users loaded");
      }
    };

    fetchUsers();
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Use the controlled form state instead of FormData
    const data = {
      name: formData.name,
      domain: formData.domain,
      userId: parseInt(formData.userId, 10),
      description: formData.description,
    };

    try {
      setIsLoading(true);
      setError(""); // Clear previous errors

      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Site added:", result);

      // Show success popup
      setShowSuccess(true);

      // Reset form on success
      setFormData({
        name: "",
        domain: "",
        userId: "",
        description: "",
      });

      // Auto-hide after 3 seconds and close modal
      setTimeout(() => {
        setShowSuccess(false);
        onCloseAction();
      }, 3000);
    } catch (error) {
      console.error("Error adding site:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {showSuccess && (
        <div className="fixed top-1/2 right-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          ✅ Successfully added site!
        </div>
      )}
      
      <div className="modal-container">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl sm:pb-4 font-jetbrains font-bold text-center text-dark">
            Create New Site
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Loading...
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-1 px-6 pt-2 overflow-y-auto max-h-140"
            >
              <input
                type="text"
                required
                name="name"
                placeholder="Site Name"
                value={formData.name}
                onChange={handleChange}
                className="inputfield"
              />

              <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="inputfield"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                placeholder="Site Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-trans text-black min-h-20 h-20 resize-none font-source"
                rows={4}
                maxLength={1000}
              />

              <input
                type="text"
                placeholder="Domain name"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                className="inputfield"
              />

              <div className="flex items-center justify-around pt-4">
                <button type="submit" className="form-button mr-4">
                  Add Site
                </button>

                <button className="form-button" onClick={onCloseAction}>
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
