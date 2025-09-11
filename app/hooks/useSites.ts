'use client';

import { useState, useCallback } from 'react';

  interface Site {
    id: number;
    name: string;
    domain: string;
    description: string;
    user?: {
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  }

  export const useSites = () => {
    const [sites, setSites] = useState<Site[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSites = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/sites");
        if (!res.ok) throw new Error('Failed to fetch sites');
        const data = await res.json();
        setSites(data.sites);
        return data.sites;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(errorMessage);
        console.error("Error fetching sites:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }, []);

    const deleteSite = useCallback(async (id: number) => {
      try {
        const response = await fetch(`/api/sites/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete site");
        await fetchSites(); // Refetch after delete
      } catch (error) {
        console.error("Error deleting site:", error);
        throw error;
      }
    }, [fetchSites]);

    const createSite = useCallback(async (siteData: any) => {
      try {
        const response = await fetch("/api/sites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(siteData),
        });
        if (!response.ok) throw new Error("Failed to create site");
        await fetchSites(); // Refetch after create
        return response.json();
      } catch (error) {
        console.error("Error creating site:", error);
        throw error;
      }
    }, [fetchSites]);

    return {
      sites,
      isLoading,
      error,
      fetchSites,
      deleteSite,
      createSite,
      setSites, // For optimistic updates
    };
  };