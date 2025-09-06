"use client";

import { useState } from "react";

export default function ClientProjectModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const [formData, setFormData] = useState({
    Title: "",
    User: "",
    ProjectType: "",
    Description: "",
    Link: "",
    Project: "",
    Attachments: [] as File[],
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFormData({ ...formData, Attachments: selectedFiles });
  };

  return (
    <div className="z-50 fixed bottom-1 bg-gradient-to-l from-primary to-secondary bg-opacity-50 border-2 rounded flex items-center justify-center h-[95vh] w-7/8 shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-jetbrains font-bold text-center text-dark">
          New Macstudio Portfolio Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 px-6 pt-2 overflow-y-auto max-h-140"
        >
          <input
            type="text"
            name="Title"
            placeholder="Title"
            value={formData.Title}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black"
          />

          <span className="text-sm font-medium text-dark">Choose a user</span>
          <select
            name="User"
            value={formData.User}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black"
          >
            <option value="User1">User 1</option>
            <option value="User2">User 2</option>
            <option value="User3">User 3</option>
          </select>

          <textarea
            name="Description"
            placeholder="Project Description"
            value={formData.Description}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black min-h-20 h-20 resize-none"
            rows={4}
            maxLength={1000}
          />

          <span className="text-sm font-medium text-dark">Project type</span>
          <select
            name="ProjectType"
            value={formData.ProjectType}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black"
          >
            <option value="webDevelopment">Web Development</option>
            <option value="Branding">Branding</option>
          </select>

          <span className="text-sm font-medium text-dark">Choose User Project</span>
          <select
            name="Project"
            value={formData.Project}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black"
          >
            <option value="Project1">Project 1</option>
            <option value="Project2">Project 2</option>
            <option value="Project3">Project 3</option>
          </select>

          <span className="text-sm font-medium text-dark">Website Link</span>
          <input
            type="text"
            name="Link"
            value={formData.Link}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black"
          />

          <span className="text-sm font-medium text-dark">Image</span>
          <input
            type="file"
            name="Image"
            onChange={handleFileChange}
            className="w-full border p-2 rounded bg-gray-trans text-black"
            accept=".pdf,.doc,.docx,.jpg,.png,.zip"
          />

          <div className="flex items-center justify-around pt-4">
            <button
              type="submit"
              className="button py-1 px-4 bg-dark text-white hover:bg-dark-accent border-dark"
            >
              Add Portfolio
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
