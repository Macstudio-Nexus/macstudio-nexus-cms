import { useState, useCallback } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  companyName: string | null;
  businessType: string | null;
  roleId: number;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users);
      return data.users;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);
      console.error("Error fetching users:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteUser = useCallback(
    async (id: number) => {
      try {
        const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete user");
        await fetchUsers(); // Refetch after delete
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    },
    [fetchUsers]
  );

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    deleteUser,
    setUsers, // For optimistic updates
  };
};
