"use client";
import { Primary } from "@/app/components/Buttons";
import { useState } from "react";
import ClientProjectModal from "@/app/components/Modals/AddProjectModal";
import PortfolioModal from "@/app/components/Modals/AddSiteModal";
import UserModal from "@/app/components/Modals/AddUserModal";

export default function QuickActions() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const QuickButtons = [
    { label: "New User", action: () => openModal("newUser") },
    { label: "New Site", action: () => openModal("newSite") },
    {
      label: "New Project",
      action: () => openModal("newProject"),
    }
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 h-auto max-w-sm dashboard-card-container">
        <h2 className="dashboard-container-header">Quick Actions</h2>
        {QuickButtons.map((button) => (
          <div key={button.label}>
            <Primary label={button.label} handleClick={button.action} />
          </div>
        ))}
      </div>

      {activeModal === "newProject" && (
        <ClientProjectModal onCloseAction={closeModal} />
      )}
      {activeModal === "newUser" && <UserModal onCloseAction={closeModal} />}
      {activeModal === "newSite" && (
        <PortfolioModal onCloseAction={closeModal} />
      )}
    </>
  );
}
