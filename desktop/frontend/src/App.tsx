import { useState } from "react";
import "@/index.css";
import { Sidebar } from "@/components/Sidebar";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { SettingsPage } from "@/pages/SettingsPage";

function App() {
  const [activePage, setActivePage] = useState<"projects" | "settings">("projects");

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 p-8 bg-slate-50">
        {activePage === "projects" ? <ProjectsPage /> : <SettingsPage />}
      </main>
    </div>
  );
}

export default App;
