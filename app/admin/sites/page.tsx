"use client";

import { useState, useEffect } from "react";

import AddSiteModal from "@/app/components/Modals/AddSiteModal";
import { Primary } from "@/app/components/Buttons";

interface Site {
  id: number;
  name: string;
  domain: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: {
    name: string;
  };
}

export default function Sites() {
  const [sites, setSites] = useState<Site[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedSiteName, setSelectedSiteName] = useState<string | null>(null);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const QuickButtons = [
    { label: "Add New Site", action: () => openModal("site") },
    { label: "Update Site", action: () => openModal("update") },
    { label: "Delete Site", action: () => openModal("delete") },
  ];

  // Get selected site data
  const selectedSite = sites?.find((site) => site.name === selectedSiteName);

  useEffect(() => {
    fetch("/api/sites")
      .then((res) => res.json())
      .then((data) => setSites(data.sites))
      .catch((error) => console.error("Error fetching sites:", error));
  }, []);

  return (
    <main className="flex flex-col items-center bg-gradient-to-r from-white to-primary min-h-screen">
      <h1 className="page-header">Sites</h1>
      {/* Dropdown */}
      <div className="flex flex-col xl:flex-row items-start justify-center lg:gap-10 mb-6">
        <select
          value={selectedSiteName || ""}
          key={selectedSiteName}
          onChange={(e) => setSelectedSiteName(String(e.target.value) || null)}
          className="rounded-xl px-4 py-2 mb-4 font-source text-black bg-primary ml-4 mt-3 shadow-xl xl:text-4xl"
        >
          <option value="">Select a site</option>
          {sites?.map((site) => (
            <option key={site.name} value={site.name} className="bg-white font-bold">
              {site.name}
            </option>
          ))}
        </select>

        {/* Display selected site data */}
        {selectedSite ? (
          <div className="dashboard-card-container space-y-3 max-w-[95vh] xl:text-4xl lg:min-w-xl">
            <h3 className="font-semibold text-lg xl:text-5xl">
              <span className="text-accent">{selectedSite.name}</span>
            </h3>
            <p>
              <strong>Domain:</strong> <span className="text-accent">{selectedSite.domain}</span>
            </p>
            <p>
              <strong>Description:</strong> <span className="text-sm text-accent">{selectedSite.description}</span>
            </p>
            <p>
              <strong>Owner:</strong> <span className="text-accent">{selectedSite.user?.name || "Unknown"}</span>
            </p>
            <p>
              <strong>Created:</strong>{" "}
              <span className="text-accent">
                {selectedSite?.createdAt
                  ? new Date(selectedSite.createdAt).toLocaleDateString()
                  : "-"}
              </span>
            </p>
            <p>
              <strong>Updated:</strong>{" "}
              <span className="text-accent">
                {selectedSite?.updatedAt
                  ? new Date(selectedSite.updatedAt).toLocaleDateString()
                  : "-"}
              </span>
            </p>
          </div>
        ) : (
          <div className="dashboard-card-container space-y-3 max-w-[95vh] mx-auto lg:min-w-xl xl:text-4xl">
            <h3 className="font-semibold text-lg lg:text-4xl">
              No site selected
            </h3>
            <p>
              <strong>Domain:</strong> -
            </p>
            <p>
              <strong>Description:</strong> -
            </p>
            <p>
              <strong>Owner:</strong> -
            </p>
            <p>
              <strong>Created:</strong> -
            </p>
            <p>
              <strong>Updated:</strong> -
            </p>
          </div>
        )}
        <div className="flex flex-col items-center justify-center gap-3 h-auto max-w-sm dashboard-card-container">
          <h2 className="dashboard-container-header xl:text-4xl">
            Quick Actions
          </h2>
          {QuickButtons.map((button) => (
            <div key={button.label}>
              <Primary label={button.label} handleClick={button.action} />
            </div>
          ))}
        </div>
      </div>

      {activeModal === "site" && <AddSiteModal onCloseAction={closeModal} />}
    </main>
  );
}
