import React, { useState } from "react";
import ProjectList from './components/ProjectList';
import CreateProjectForm from './components/CreateProjectForm';
import TaskList from './components/TaskList';
import CreateTaskForm from './components/CreateTaskForm';
import TaskDetail from "./components/TaskDetail";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [page, setPage] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Task Management System</h2>

      {page === "projects" && (
        <ProjectList
          onCreate={() => setPage("createProject")}
          onOpenTasks={(p) => {
            setSelectedProject(p);
            setPage("tasks");
          }}
        />
      )}

      {page === "createProject" && (
        <CreateProjectForm onBack={() => setPage("projects")} />
      )}

      {page === "tasks" && (
        <TaskList
          project={selectedProject}
          onBack={() => setPage("projects")}
          onCreateTask={() => setPage("createTask")}
          onOpenTaskDetail={(t) => {
            setSelectedTask(t);
            setPage("taskDetail");
          }}
        />
      )}

      {page === "createTask" && (
        <CreateTaskForm
          project={selectedProject}
          onBack={() => setPage("tasks")}
        />
      )}

      {page === "taskDetail" && (
        <TaskDetail task={selectedTask} onBack={() => setPage("tasks")} />
      )}

      <ToastContainer />
    </div>
  );
}