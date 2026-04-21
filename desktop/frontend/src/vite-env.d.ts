/// <reference types="vite/client" />

declare module '../../wailsjs/go/main/App' {
  export interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }

  export function CreateProject(project: Project): Promise<void>;
  export function DeleteProject(id: string): Promise<void>;
  export function Greet(name: string): Promise<string>;
  export function HelloWorld(): Promise<void>;
  export function ListProjects(): Promise<Project[]>;
  export function ProjectExists(id: string): Promise<boolean>;
  export function ReadProject(id: string): Promise<Project>;
  export function UpdateProject(project: Project): Promise<void>;
}
