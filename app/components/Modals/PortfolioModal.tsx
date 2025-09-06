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
    <div className="z-50 fixed bottom-1 sm:right-[5vh] sm:bottom-[15vh] bg-gradient-to-l from-primary to-secondary bg-opacity-50 border-2 rounded flex items-center justify-center h-[95vh] sm:h-[75vh] w-7/8 shadow-lg">
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
            name="Title"
            placeholder="Title"
            value={formData.Title}
            onChange={handleChange}
            className="inputfield"
          />

          <select
            name="User"
            required
            value={formData.User}
            onChange={handleChange}
            className="inputfield"
          >
            <option value="">Select User</option>
            <option value="User1">User 1</option>
            <option value="User2">User 2</option>
            <option value="User3">User 3</option>
          </select>

          <textarea
            name="Description"
            placeholder="Project Description"
            value={formData.Description}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black min-h-20 h-20 resize-none font-source"
            rows={4}
            maxLength={1000}
          />

          <select
            name="ProjectType"
            required
            value={formData.ProjectType}
            onChange={handleChange}
            className="inputfield"
          >
            <option value="">Choose a Project Type</option>
            <option value="webDevelopment">Web Development</option>
            <option value="Branding">Branding</option>
          </select>

          <select
            name="Project"
            required
            value={formData.Project}
            onChange={handleChange}
            className="inputfield"
          >
            <option value="">Select a Project</option>
            <option value="Project1">Project 1</option>
            <option value="Project2">Project 2</option>
            <option value="Project3">Project 3</option>
          </select>

          <span className="text-sm font-medium text-dark">Website Link<span className="text-xs text-black"> *if applicable*</span></span>
          <input
            type="text"
            name="Link"
            value={formData.Link}
            onChange={handleChange}
            className="inputfield"
          />

          <span className="text-sm font-medium text-dark">Image</span>
          <input
            type="file"
            required
            name="Image"
            onChange={handleFileChange}
            className="inputfield"
            accept=".pdf,.doc,.docx,.jpg,.png,.zip"
          />

          <div className="flex items-center justify-around pt-4">
            <button
              type="submit"
              className="formButton"
            >
              Add Portfolio
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
