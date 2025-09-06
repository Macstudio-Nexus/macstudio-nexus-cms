"use client";

import { useState } from "react";

export default function ClientProjectModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const [formData, setFormData] = useState({
    User: "",
    ProjectName: "",
    ProjectType: "",
    Description: "",
    StartDate: "",
    EndDate: "",
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
    <div className="z-50 fixed bottom-1 sm:right-[5vh] sm:bottom-[10vh] bg-gradient-to-l from-primary to-secondary bg-opacity-50 border-2 rounded flex items-center justify-center h-[95vh] sm:h-[75vh] w-7/8 shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl sm:pb-4 font-jetbrains font-bold text-dark">
          New Client Project
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 px-6 pt-2 overflow-y-auto max-h-140 sm:max-h-180"
        >
          <input
            type="text"
            name="ProjectName"
            required
            placeholder="Project Name"
            value={formData.ProjectName}
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
            className="inputfield min-h-20 h-20 resize-none"
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
            <option value="">Select Project Type</option>
            <option value="webDevelopment">Web Development</option>
            <option value="Branding">Branding</option>
          </select>

          <span className="text-sm font-medium text-dark">Start Date</span>
          <input
            type="date"
            name="StartDate"
            placeholder="Start Date"
            required
            value={formData.StartDate}
            onChange={handleChange}
            className="inputfield"
          />

          <span className="text-sm font-medium text-dark">Due Date</span>
          <input
            type="date"
            name="EndDate"
            value={formData.EndDate}
            onChange={handleChange}
            className="inputfield"
          />

          <span className="text-sm font-medium text-dark">Attachments</span>
          <input
            type="file"
            name="Attachments"
            multiple
            onChange={handleFileChange}
            className="inputfield"
            accept=".pdf,.doc,.docx,.jpg,.png,.zip"
          />

          <div className="flex items-center justify-around pt-4">
            <button
              type="submit"
              className="formButton"
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
