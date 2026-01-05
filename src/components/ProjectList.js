import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

export default function ProjectList({ onCreate, onOpenTasks }) {
  const [projects, setProjects] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios.get(`${baseURL}/projects`) 
      .then(res => setProjects(res.data))
      .catch(() => toast.error("Failed to load projects"));
  }, []);

  const columns = [
    { name: "Name", selector: row => row.name },
    { name: "Description", selector: row => row.description },
    {
      name: "Actions",
      cell: row => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onOpenTasks(row)}
        >
          Open Tasks
        </button>
      )
    }
  ];

  return (
    <>
      <button className="btn btn-success mb-2" onClick={onCreate}>
        + Create Project
      </button>

      <DataTable columns={columns} data={projects} pagination />
    </>
  );
}