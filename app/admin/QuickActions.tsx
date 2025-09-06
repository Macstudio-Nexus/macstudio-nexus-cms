"use client";
import { Primary } from "@/app/components/Buttons";
import { useState } from "react";
import ClientProjectModal from "@/app/components/Modals/ClientProjectModal";
import PortfolioModal from "@/app/components/Modals/PortfolioModal";
import UserModal from "@/app/components/Modals/UserModal";
import BlogPostModal from "@/app/components/Modals/BlogModal";

export default function QuickActions() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const QuickButtons = [
    {
      label: "Add Client Project",
      action: () => openModal("clientProject"),
    },
    { label: "Add New User", action: () => openModal("user") },
    { label: "Add Portfolio", action: () => openModal("portfolio") },
    { label: "Add Blog Post", action: () => openModal("blogPost") },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-black text-white gap-3 rounded-lg h-auto max-w-sm my-5 mx-14 shadow-md shadow-black font-jetbrains">
        <h2 className="text-xl sm:text-3xl pb-3">Quick Actions</h2>
        {QuickButtons.map((button) => (
          <div key={button.label}>
            <Primary label={button.label} handleClick={button.action} />
          </div>
        ))}
      </div>

      {activeModal === "clientProject" && (
        <ClientProjectModal onCloseAction={closeModal} />
      )}
      {activeModal === "portfolio" && (
        <PortfolioModal onCloseAction={closeModal} />
      )}
      {activeModal === "user" && <UserModal onCloseAction={closeModal} />}
      {activeModal === "blogPost" && (
        <BlogPostModal onCloseAction={closeModal} />
      )}
    </>
  );
}
