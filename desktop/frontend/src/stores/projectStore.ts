import { create } from 'zustand';
import { CreateProject, DeleteProject, ListProjects, ReadProject, UpdateProject } from '../../wailsjs/go/main/App';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectState {
  projects: Project[];
  selectedProject: string;
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  getProject: (id: string) => Promise<Project | null>;
  createProject: (project: Omit<Project, 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setSelectedProject: (id: string) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  selectedProject: '',
  loading: false,
  error: null,

fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const projects = await ListProjects();
      set({ projects: projects ?? [], loading: false });
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },

  getProject: async (id: string) => {
    try {
      return await ReadProject(id);
    } catch {
      return null;
    }
  },

  createProject: async (project) => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...project,
      createdAt: now,
      updatedAt: now,
    };
    set({ loading: true, error: null });
    try {
      await CreateProject(newProject);
      await get().fetchProjects();
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },

  updateProject: async (project) => {
    set({ loading: true, error: null });
    try {
      await UpdateProject(project);
      await get().fetchProjects();
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },

  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      await DeleteProject(id);
      await get().fetchProjects();
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },

  setSelectedProject: (id) => set({ selectedProject: id }),
}));