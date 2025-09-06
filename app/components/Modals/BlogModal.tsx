"use client";

import { useState } from "react";

export default function BlogModal({
  onCloseAction,
}: {
  onCloseAction: () => void;
}) {
  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
    Content: "",
    Image: null as File | null,
    PublishedDate: "",
    Category: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFormData({ ...formData, Image: selectedFile });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you would typically handle form submission, e.g., send data to a server
  }

  return (
    <div className="z-50 fixed bottom-1 sm:right-[5vh] sm:bottom-[15vh] bg-gradient-to-l from-primary to-secondary bg-opacity-50 border-2 rounded flex items-center justify-center h-[95vh] sm:h-[75vh] w-7/8 shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl font-jetbrains font-bold text-dark">
          Create New Blog Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 px-6 pt-2 overflow-y-auto max-h-140 sm:max-h-180"
        >
          <input
            type="text"
            name="Title"
            placeholder="Blog Post Title"
            value={formData.Title}
            onChange={handleChange}
            className="inputfield"
            required
          />

          <input
            type="text"
            name="Author"
            placeholder="Author Name"
            value={formData.Author}
            onChange={handleChange}
            className="inputfield"
            required
          />

          <textarea
            name="Content"
            placeholder="Blog post content..."
            value={formData.Content}
            onChange={handleChange}
            className="inputfield min-h-32 h-32 resize-none"
            rows={8}
            maxLength={5000}
            required
          />

          <span className="text-sm font-medium text-dark">Blog Image</span>
          <input
            type="file"
            name="Image"
            onChange={handleFileChange}
            className="inputfield"
            accept=".jpg,.png,.webp,.jpeg"
          />

          <span className="text-sm font-medium text-dark">Published Date</span>
          <input
            type="date"
            name="PublishedDate"
            value={formData.PublishedDate}
            onChange={handleChange}
            className="inputfield"
            required
          />

          <span className="text-sm font-medium text-dark">Category</span>
          <select
            name="Category"
            required
            value={formData.Category}
            onChange={handleChange}
            className="inputfield"
          >
            <option value="">Select Category</option>
            <option value="webDevelopment">Web Development</option>
            <option value="branding">Branding</option>
          </select>

          <div className="flex items-center justify-around pt-4">
            <button
              type="submit"
              className="formButton"
            >
              Create Blog Post
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
