import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

export default function TaskList({ project, onBack, onCreateTask, onOpenTaskDetail }) {
  const [tasks, setTasks] = useState([]);

  const load = () => {
    axios
      .get(`https://localhost:7059/projects/${project.id}/tasks`)
      .then(res => setTasks(res.data))
      .catch(() => toast.error("Failed to load tasks"));
  };

  useEffect(load, []);

  const columns = [
    { name: "Title", selector: r => r.title },
    { name: "Priority", selector: r => r.priority },
    { name: "Status", selector: r => r.status },
    {
      name: "Progress",
      selector: r => r.progressPercent + "%"
    },
    {
      name: "Actions",
      cell: r => (
        <button className="btn btn-info btn-sm" onClick={() => onOpenTaskDetail(r)}>
          View
        </button>
      )
    }
  ];

  return (
    <>
      <h4>Tasks - {project.name}</h4>

      <button className="btn btn-secondary me-2" onClick={onBack}>
        Back
      </button>
      <button className="btn btn-success" onClick={onCreateTask}>
        + Create Task
      </button>

      <DataTable columns={columns} data={tasks} pagination className="mt-3" />
    </>
  );
}