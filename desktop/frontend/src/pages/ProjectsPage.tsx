const projects = [
  { id: 1, name: "Project Alpha", status: "Active" },
  { id: 2, name: "Project Beta", status: "Pending" },
  { id: 3, name: "Project Gamma", status: "Completed" },
];

export function ProjectsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{project.name}</h3>
            <p className="text-slate-500">{project.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}