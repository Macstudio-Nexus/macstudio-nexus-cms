 'use client';
 
 import { useState, useCallback } from 'react';

  interface Project {
    id?: number;
    title: string;
    description: string;
    domain: string;
    type: string;
    userId: number;
    siteId: number | null;
  }

  export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data.projects);
        return data.projects;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        console.error("Error fetching projects:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }, []);

    const deleteProject = useCallback(async (id: number) => {
      try {
        const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete project");
        await fetchProjects(); // Refetch after delete
      } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
      }
    }, [fetchProjects]);

    const createProject = useCallback(async (projectData: any) => {
      try {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create project");
        }
        await fetchProjects(); // Refetch after create
        return response.json();
      } catch (error) {
        console.error("Error creating project:", error);
        throw error;
      }
    }, [fetchProjects]);

    return {
      projects,
      isLoading,
      error,
      fetchProjects,
      deleteProject,
      createProject,
      setProjects, // For optimistic updates
    };
  };