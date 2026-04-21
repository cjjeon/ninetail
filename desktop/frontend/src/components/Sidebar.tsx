import { useState } from "react";

interface SidebarProps {
  activePage: "projects" | "settings";
  onNavigate: (page: "projects" | "settings") => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-slate-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold">NineTail</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-slate-700 rounded"
        >
          {collapsed ? "▶" : "◀"}
        </button>
      </div>
      <nav className="flex-1 p-2">
        <button
          onClick={() => onNavigate("projects")}
          className={`w-full text-left px-4 py-2 rounded overflow-hidden whitespace-nowrap ${
            activePage === "projects" ? "bg-slate-700" : "hover:bg-slate-800"
          }`}
        >
          {!collapsed && "Projects"}
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