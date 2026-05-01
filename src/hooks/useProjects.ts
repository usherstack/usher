import { useQuery, useQueryClient } from "@tanstack/react-query";
import { projects as localProjects } from "@/lib/data";
import type { Project } from "@/lib/data";

// Re-export Project type from lib/data
export type { Project };

export interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  isFetching: boolean;
  error: string | null;
}

// API fetcher function - can be reused across queries
export async function fetchProjects(): Promise<Project[]> {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8003";
  const response = await fetch(`${apiUrl}/api/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Fetch single project by ID
async function fetchProject(projectId: string): Promise<Project> {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8003";
  const response = await fetch(`${apiUrl}/api/projects/${projectId}`);

  if (!response.ok) {
    throw new Error(`Project not found: ${response.status}`);
  }

  return response.json();
}

// Fetch projects by category
async function fetchProjectsByCategory(
  category: string,
  subcategory?: string,
): Promise<Project[]> {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8003";

  // Build the URL with optional subcategory query parameter
  let url = `${apiUrl}/api/projects/category/${category}`;
  if (subcategory) {
    url += `?subcategory=${encodeURIComponent(subcategory)}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Query keys for consistent caching across the app
export const queryKeys = {
  projects: ["projects"] as const,
  project: (id: string) => ["project", id] as const,
  projectsByCategory: (category: string, subcategory?: string) =>
    ["projectsByCategory", category, subcategory] as const,
};

/**
 * Custom hook to fetch projects from the API using React Query
 * Falls back to local data if API is unavailable
 * Data is cached for 5 minutes (configured in App.tsx QueryClient)
 */
export function useProjects(): UseProjectsReturn {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: queryKeys.projects,
    queryFn: fetchProjects,
    // Retry failed requests, but the error will be handled gracefully
    retry: 1,
    // Don't refetch on window focus for this app
    refetchOnWindowFocus: false,
  });

  // Use local fallback data if API fetch failed or data is undefined
  const projects = data ?? localProjects;
  // Only show error if there's no data available at all (API failed AND no fallback)
  const hasError = !!error && !projects;

  return {
    projects,
    loading: isLoading,
    isFetching,
    // Only show error if we don't have any data to display
    error: hasError ? error.message : null,
  };
}

/**
 * Custom hook to fetch a single project by ID using React Query
 * Data is cached for 5 minutes (configured in App.tsx QueryClient)
 */
export function useProject(projectId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.project(projectId),
    queryFn: () => fetchProject(projectId),
    enabled: !!projectId, // Only run query if projectId exists
  });

  return {
    project: data ?? null,
    loading: isLoading,
    error: error ? error.message : null,
  };
}

/**
 * Custom hook to fetch projects by category using React Query
 * Falls back to local filtered data if API is unavailable
 * Data is cached for 5 minutes (configured in App.tsx QueryClient)
 */
export function useProjectsByCategory(
  category: string,
  subcategory?: string,
): UseProjectsReturn {
  const queryClient = useQueryClient();
  const isAllCategory = category === "All" && !subcategory;

  const { data, isLoading, isFetching, error } = useQuery<Project[]>({
    queryKey: queryKeys.projectsByCategory(category, subcategory),
    queryFn: () =>
      isAllCategory
        ? fetchProjects()
        : fetchProjectsByCategory(category, subcategory),
    retry: 1,
    refetchOnWindowFocus: false,
    initialData: isAllCategory
      ? queryClient.getQueryData<Project[]>(queryKeys.projects)
      : undefined,
  });

  const projects = data
    ? data
    : (() => {
        let filtered = localProjects as Project[];
        if (category && category !== "All") {
          filtered = filtered.filter((p) => p.category === category);
        }
        if (subcategory) {
          filtered = filtered.filter((p) => p.subcategory === subcategory);
        }
        return filtered;
      })();

  // Only show error if there's no data available at all (API failed AND no fallback)
  const hasError = !!error && !projects;

  return {
    projects,
    loading: isLoading,
    isFetching,
    error: hasError ? error.message : null,
  };
}
