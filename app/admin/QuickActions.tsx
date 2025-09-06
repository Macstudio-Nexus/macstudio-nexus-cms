"use client";
import { Primary } from "@/app/components/Buttons";
import { useState } from "react";
import ClientProjectModal from "@/app/components/Modals/ClientProjectModal";

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
      <div className="flex flex-col items-center justify-center p-4 bg-dark-accent text-white gap-3 rounded-lg h-auto max-w-sm my-5 mx-14 shadow-md shadow-black font-jetbrains">
        <h2 className="text-xl pb-3">Quick Actions</h2>
        {QuickButtons.map((button) => (
          <div key={button.label}>
            <Primary label={button.label} handleClick={button.action} />
          </div>
        ))}
      </div>

      {activeModal === "clientProject" && (
        <ClientProjectModal onCloseAction={closeModal} />
      )}
    </>
  );
}
