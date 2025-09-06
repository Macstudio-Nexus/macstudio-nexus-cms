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
    <div className="z-50 fixed bottom-1 bg-gradient-to-l from-primary to-secondary bg-opacity-50 border-2 rounded flex items-center justify-center h-[95vh] w-7/8 shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-jetbrains font-bold text-dark">
          Create New Blog Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 px-6 pt-2 overflow-y-auto max-h-140 min-w-80"
        >
          <input
            type="text"
            name="Title"
            placeholder="Blog Post Title"
            value={formData.Title}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
            required
          />

          <input
            type="text"
            name="Author"
            placeholder="Author Name"
            value={formData.Author}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
            required
          />

          <textarea
            name="Content"
            placeholder="Blog post content..."
            value={formData.Content}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source min-h-32 h-32 resize-none"
            rows={8}
            maxLength={5000}
            required
          />

          <span className="text-sm font-medium text-dark">Blog Image</span>
          <input
            type="file"
            name="Image"
            onChange={handleFileChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
            accept=".jpg,.png,.webp,.jpeg"
          />

          <span className="text-sm font-medium text-dark">Published Date</span>
          <input
            type="date"
            name="PublishedDate"
            value={formData.PublishedDate}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
            required
          />

          <span className="text-sm font-medium text-dark">Category</span>
          <select
            name="Category"
            required
            value={formData.Category}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-gray-trans text-black font-source"
          >
            <option value="">Select Category</option>
            <option value="webDevelopment">Web Development</option>
            <option value="branding">Branding</option>
          </select>

          <div className="flex items-center justify-around pt-4">
            <button
              type="submit"
              className="button py-1 px-4 bg-dark text-white hover:bg-dark-accent border-dark"
            >
              Create Blog Post
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
