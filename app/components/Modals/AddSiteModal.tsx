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
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
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
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Site added:", result);
    } catch (error) {
      console.error("Error adding site:", error);

      // Reset form
      setFormData({
        name: "",
        domain: "",
        userId: "",
        description: "",
      });

      onCloseAction(); // close modal after success
    }
  }

  return (
    <div className="modal-container">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl sm:pb-4 font-jetbrains font-bold text-center text-dark">
          New Macstudio Portfolio Post
        </h2>

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

          <select name="userId" value={formData.userId} onChange={handleChange} className="inputfield">
          <option value="">Select User</option>
          {users.map(user => (
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
            <button type="submit" className="formButton mr-4">
              Add Portfolio
            </button>

            <button className="formButton" onClick={onCloseAction}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
