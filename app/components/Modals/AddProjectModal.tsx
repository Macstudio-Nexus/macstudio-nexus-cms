"use client";

import { useState, useEffect } from "react";
import { Loader, CheckCheck } from "lucide-react";
import { useSites } from "@/app/hooks/useSites";
import { useUsers } from "@/app/hooks/useUsers";
import { set } from "react-hook-form";

interface User {
  name: string;
  id: number;
}

interface Site {
  name: string;
  id: number;
}

interface AddProjectModalProps {
  onCloseAction: () => void;
  onSuccess?: () => void;
}

export default function ClientProjectModal({
  onCloseAction,
  onSuccess,
}: AddProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    user: "",
    title: "",
    type: "",
    description: "",
    domain: "",
    siteId: "",
  });

  // Use the hooks instead of internal state
  const { users, fetchUsers } = useUsers();
  const { sites, fetchSites } = useSites();

  useEffect(() => {
    fetchUsers();
    fetchSites();
  }, [fetchUsers, fetchSites]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);

      const projectData = {
        title: formData.title,
        description: formData.description,
        domain: formData.domain,
        type: formData.type,
        userId: parseInt(formData.user, 10),
        siteId: formData.siteId ? parseInt(formData.siteId, 10) : null,
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Project added:", result);

      // Show success
      setShowSuccess(true);

      // Reset form
      setFormData({
        user: "",
        title: "",
        type: "",
        description: "",
        domain: "",
        siteId: "",
      });

      // Call onSuccess and close modal
      onSuccess?.();
      setTimeout(() => {
        setShowSuccess(false);
        onCloseAction();
      }, 2000);
    } catch (error) {
      console.error("Error adding project:", error);
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
        <div className="bg-green-500 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-1/2 xl:w-3/8 z-51 h-1/2 md:h-3/8 text-black font-source text-3xl flex flex-col items-center justify-center rounded-lg shadow-lg">
          <CheckCheck color="black" size="80" className="" />
          <span className="text-center">Added Project Successfully</span>
        </div>
      )}

      <div className="modal-container">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl sm:pb-4 font-jetbrains font-bold text-dark">
            Create New Project
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center">
              <Loader size="40" className="animate-[spin_2s_linear_infinite]" />
              <span className="text-black text-center text-xl md:text-3xl xl:text-4xl">
                Loading...
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-1 px-6 pt-2 overflow-y-auto max-h-140 sm:max-h-180"
            >
              <input
                type="text"
                name="title"
                required
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                className="inputfield"
              />

              <select
                name="user"
                required
                value={formData.user}
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
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                className="inputfield min-h-20 h-20 resize-none"
                rows={4}
                maxLength={1000}
              />

              <select
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="inputfield"
              >
                <option value="">Select Project Type</option>
                <option value="webDevelopment">Web Development</option>
                <option value="Branding">Branding</option>
              </select>

              <input
                type="text"
                name="domain"
                placeholder="Domain"
                required
                value={formData.domain}
                onChange={handleChange}
                className="inputfield"
              />

              <select
                name="siteId"
                value={formData.siteId}
                onChange={handleChange}
                className="inputfield"
              >
                <option value="">Select Site</option>
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-around pt-4">
                <button type="submit" className="form-button mr-6">
                  Add Project
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
