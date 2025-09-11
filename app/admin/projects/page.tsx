"use client";

import { useState, useEffect } from "react";
import { useSites } from "@/app/hooks/useSites";
import { useUsers } from "@/app/hooks/useUsers";
import { useProjects } from "@/app/hooks/useProjects";

import ProjectModal from "@/app/components/Modals/AddProjectModal";
import DeleteProjectModal from "@/app/components/Modals/DeleteProjectModal";
import { Primary } from "@/app/components/Buttons";
import { Loader } from "lucide-react";

interface Project {
  id?: number;
  title: string;
  description: string;
  domain: string;
  type: string;
  userId: number;
  siteId: number;
}

export default function Projects() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { users, fetchUsers } = useUsers();
  const { sites, fetchSites } = useSites();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { projects, isLoading, fetchProjects, deleteProject } = useProjects(); // Add deleteProject here
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [selectedProjectName, setSelectedProjectName] = useState<string | null>(
    null
  );

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const QuickButtons = [
    {
      label: "Add New Project",
      action: () => openModal("project"),
      disabled: false,
    },
    {
      label: "Update Project",
      action: () => openModal("update"),
      disabled: !selectedProjectName,
    },
    {
      label: "Delete Project",
      action: () => setShowDeleteModal(true),
      disabled: !selectedProjectName,
    },
  ];

  // Get selected project data
  const selectedProject = projects?.find(
    (project) => project.title === selectedProjectName
  );

  useEffect(() => {
    fetchProjects();
    fetchUsers();
    fetchSites();
  }, [fetchProjects, fetchUsers, fetchSites]);

  return (
    <main className="page-container">
      <h1 className="page-header">Projects</h1>
      <div>
        <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-6 my-6">
          <div className="flex flex-col items-center justify-center 2xl:flex-row">
            {/* Dropdown */}
            {isLoading ? (
              <div className="dropdown-loader">
                <Loader
                  size="40"
                  className="animate-[spin_2s_linear_infinite]"
                />
                <span className="text-black text-center text-xl md:text-3xl xl:text-4xl">
                  Loading...
                </span>
              </div>
            ) : (
              <select
                value={selectedProjectName || ""}
                key={selectedProjectName}
                onChange={(e) => {
                  const projectTitle = String(e.target.value) || null;
                  setSelectedProjectName(projectTitle);

                  if (projectTitle) {
                    const project = projects.find(
                      (p) => p.title === projectTitle
                    );
                    setSelectedProjectId(project?.id || null);
                  } else {
                    setSelectedProjectId(null);
                  }
                }}
                className="select-dropdown"
              >
                <option value="">Select a project</option>
                {projects?.map((project) => (
                  <option
                    key={project.title}
                    value={project.title}
                    className="bg-white font-bold"
                  >
                    {project.title}
                  </option>
                ))}
              </select>
            )}

            {/* Display selected project data */}
            {selectedProject ? (
              <div className="dashboard-card-container space-y-3 w-full max-w-sm sm:max-w-lg xl:max-w-2xl mx-auto xl:text-4xl">
                <h3 className="font-semibold text-lg lg:text-4xl">
                  <span className="text-accent">{selectedProject.title}</span>
                </h3>
                <p>
                  <strong>Description:</strong>{" "}
                  <span className="text-accent">
                    {selectedProject.description}
                  </span>
                </p>
                <p>
                  <strong>Domain:</strong>{" "}
                  <span className="text-accent">
                    {selectedProject.domain || "-"}
                  </span>
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  <span className="text-accent">
                    {selectedProject.type || "-"}
                  </span>
                </p>
                <p>
                  <strong>User:</strong>{" "}
                  <span className="text-accent">
                    {users.find((user) => user.id === selectedProject.userId)
                      ?.name || "-"}
                  </span>
                </p>
                <p>
                  <strong>Site:</strong>{" "}
                  <span className="text-accent">
                    {sites.find((site) => site.id === selectedProject.siteId)
                      ?.name || "-"}
                  </span>
                </p>
              </div>
            ) : (
              <div className="dashboard-card-container space-y-3 w-full max-w-sm sm:max-w-lg xl:max-w-2xl mx-auto xl:text-4xl">
                <h3 className="font-semibold text-lg lg:text-4xl">-</h3>
                <p>
                  <strong>Description:</strong> -
                </p>
                <p>
                  <strong>Domain:</strong> -
                </p>
                <p>
                  <strong>Type:</strong> -
                </p>
                <p>
                  <strong>User ID:</strong> -
                </p>
                <p>
                  <strong>Site ID:</strong> -
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-3 h-auto max-w-sm dashboard-card-container">
            <h2 className="dashboard-container-header">Quick Actions</h2>
            {QuickButtons.map((button) => (
              <div key={button.label}>
                <Primary label={button.label} handleClick={button.action} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeModal === "project" && (
        <ProjectModal
          onCloseAction={closeModal}
          onSuccess={fetchProjects} // Add this if you have a projects hook
        />
      )}
      {showDeleteModal && selectedProjectId && selectedProject && (
        <DeleteProjectModal
          projectId={selectedProjectId} // Pass the ID number
          projectName={selectedProject.title}
          onClose={() => setShowDeleteModal(false)}
          onDelete={deleteProject} // This should now be available from useProjects hook
        />
      )}
    </main>
  );
}
