'use client';

import { useState, useEffect } from "react";

import ProjectModal from "@/app/components/Modals/AddProjectModal";
import { Primary } from "@/app/components/Buttons";
import { Loader } from "lucide-react";

interface Project {
  title: string;
  description: string;
  domain: string;
  type: string;
  userId: number;
  siteId: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    { label: "Add New Project", action: () => openModal("project") },
    { label: "Update Project", action: () => openModal("update") },
    { label: "Delete Project", action: () => openModal("delete") },
  ];

  // Get selected project data
  const selectedProject = projects?.find(
    (project) => project.title === selectedProjectName
  );

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="page-container">
      <h1 className="page-header">Projects</h1>
      <div>
        <div className="flex flex-col xl:flex-row items-start justify-center gap-6 my-6">
          {/* Dropdown */}
          {isLoading ? (
            <div className="flex items-center gap-5 mt-4 xl:mr-8 bg-primary rounded-xl px-6 py-1 self-center 2xl:self-start shadow-xl">
              <Loader size="40" className="animate-[spin_2s_linear_infinite]" />
              <span className="text-black text-center text-xl md:text-3xl xl:text-4xl">
                Loading...
              </span>
            </div>
          ) : (
            <select
              value={selectedProjectName || ""}
              key={selectedProjectName}
              onChange={(e) =>
                setSelectedProjectName(String(e.target.value) || null)
              }
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
            <div className="dashboard-card-container space-y-3 max-w-fit mx-auto min-w-[95vh] xl:text-4xl lg:min-w-xl">
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
                <strong>User ID:</strong>{" "}
                <span className="text-accent">
                  {selectedProject.userId || "-"}
                </span>
              </p>
              <p>
                <strong>Site ID:</strong>{" "}
                <span className="text-accent">
                  {selectedProject.siteId || "-"}
                </span>
              </p>
            </div>
          ) : (
            <div className="dashboard-card-container space-y-3 max-w-[95vh] mx-auto lg:min-w-xl xl:text-4xl">
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

      {activeModal === "project" && <ProjectModal onCloseAction={closeModal} />}
    </main>
  );
}
