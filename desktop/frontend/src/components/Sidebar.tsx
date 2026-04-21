import {useEffect, useState} from "react";
import ChevronDoubleLeft from "@/icons/ChevronDoubleLeft";
import ChevronDoubleRight from "@/icons/ChevronDoubleRight";
import {Project, useProjectStore} from "@/stores";

interface SidebarProps {
  activePage: "issues" | "settings";
  onNavigate: (page: "issues" | "settings") => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const {projects, selectedProject, fetchProjects, setSelectedProject} = useProjectStore();
  console.log(projects)

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  useEffect(() => {
    if (!selectedProject && projects.length > 0) {
      setSelectedProject(projects[0].id)
    }
  }, [projects, selectedProject, setSelectedProject])

  return (
    <aside
      className={`bg-slate-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="bg-slate-800 text-white text-sm px-2 py-1 rounded border border-slate-600 w-full mr-2"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-slate-700 rounded"
        >
          {collapsed ? <ChevronDoubleRight /> : <ChevronDoubleLeft />}
        </button>
      </div>
      <nav className="flex-1 p-2">
        <button
          onClick={() => onNavigate("issues")}
          className={`w-full text-left px-4 py-2 rounded overflow-hidden whitespace-nowrap ${
            activePage === "issues" ? "bg-slate-700" : "hover:bg-slate-800"
          }`}
        >
          {!collapsed && "Issues"}
        </button>
      </nav>
      <div className="p-2 border-t border-slate-700">
        <button
          onClick={() => onNavigate("settings")}
          className={`w-full text-left px-4 py-2 rounded overflow-hidden whitespace-nowrap ${
            activePage === "settings" ? "bg-slate-700" : "hover:bg-slate-800"
          }`}
        >
          {!collapsed && "Settings"}
        </button>
      </div>
    </aside>
  );
}