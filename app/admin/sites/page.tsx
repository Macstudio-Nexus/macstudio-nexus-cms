"use client";

import { useState, useEffect } from "react";

import AddSiteModal from "@/app/components/Modals/AddSiteModal";
import DeleteSiteModal from "@/app/components/Modals/DeleteSiteModal";
import { useSites } from "@/app/hooks/useSites";
import { Primary } from "@/app/components/Buttons";
import { Loader } from "lucide-react";

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
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedSiteName, setSelectedSiteName] = useState<string | null>(null);
  const { sites, isLoading, fetchSites, deleteSite } = useSites();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSiteId, setSelectedSiteId] = useState<number | null>(null);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const QuickButtons = [
    { label: "Add New Site", action: () => openModal("site"), disabled: false },
    {
      label: "Update Site",
      action: () => openModal("update"),
      disabled: !selectedSiteId,
    },
    {
      label: "Delete Site",
      action: () => setShowDeleteModal(true),
      disabled: !selectedSiteId,
    },
  ];

  // Get selected site data
  const selectedSite = sites?.find((site) => site.name === selectedSiteName);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  return (
    <main className="page-container">
      <h1 className="page-header">Sites</h1>
      {/* Dropdown */}
      <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center lg:gap-10 my-6">
        <div className="flex flex-col items-center justify-center 2xl:flex-row">
          {isLoading ? (
            <div className="dropdown-loader">
              <Loader size="40" className="animate-[spin_2s_linear_infinite]" />
              <span className="text-black text-center text-xl md:text-3xl xl:text-4xl">
                Loading...
              </span>
            </div>
          ) : (
            <select
              value={selectedSiteName || ""}
              key={selectedSiteName}
              onChange={(e) => {
                const siteName = String(e.target.value) || null;
                setSelectedSiteName(siteName);

                if (siteName) {
                  const site = sites.find((s) => s.name === siteName);
                  setSelectedSiteId(site?.id || null);
                } else {
                  setSelectedSiteId(null);
                }
              }}
              className="select-dropdown"
            >
              <option value="">Select a site</option>
              {sites?.map((site) => (
                <option
                  key={site.name}
                  value={site.name}
                  className="bg-white font-bold"
                >
                  {site.name}
                </option>
              ))}
            </select>
          )}

          {/* Display selected site data */}
          {selectedSite ? (
            <div className="dashboard-card-container space-y-3 w-full max-w-sm sm:max-w-lg xl:max-w-2xl mx-auto xl:text-4xl">
              <h3 className="font-semibold text-lg xl:text-5xl">
                <span className="text-accent">{selectedSite.name}</span>
              </h3>
              <p>
                <strong>Domain:</strong>{" "}
                <span className="text-accent">{selectedSite.domain}</span>
              </p>
              <p>
                <strong>Description:</strong>{" "}
                <span className="text-sm text-accent">
                  {selectedSite.description}
                </span>
              </p>
              <p>
                <strong>Owner:</strong>{" "}
                <span className="text-accent">
                  {selectedSite.user?.name || "Unknown"}
                </span>
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
            <div className="dashboard-card-container space-y-3 w-full max-w-sm sm:max-w-lg xl:max-w-2xl mx-auto xl:text-4xl">
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
        </div>
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

      
      {activeModal === "site" && (
        <AddSiteModal onCloseAction={closeModal} onSuccess={fetchSites} />
      )}{" "}
      {showDeleteModal && selectedSiteId && selectedSite && (
        <DeleteSiteModal
          siteId={selectedSiteId}
          siteName={selectedSite.name}
          onClose={() => setShowDeleteModal(false)}
          onDelete={deleteSite}
        />
      )}
    </main>
  );
}
