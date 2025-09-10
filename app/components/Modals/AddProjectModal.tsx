"use client";

import { useState } from "react";

interface Users {
  name: string;
}

export default function ClientProjectModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const [formData, setFormData] = useState({
    user: "",
    title: "",
    type: "",
    description: "",
    domain: "",
    siteId:""
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
        <h2 className="text-2xl sm:text-4xl sm:pb-4 font-jetbrains font-bold text-dark">
          Create New Project
        </h2>

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
            <option value="User1">User 1</option>
            <option value="User2">User 2</option>
            <option value="User3">User 3</option>
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
            required
            value={formData.siteId}
            onChange={handleChange}
            className="inputfield"
          >
            <option value="">Select Site</option>
            <option value="User1">Site 1</option>
            <option value="User2">Site 2</option>
            <option value="User3">Site 3</option>
          </select>

          <div className="flex items-center justify-around pt-4">
            <button
              type="submit"
              className="formButton mr-6"
            >
              Add Project
            </button>
            <button
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
