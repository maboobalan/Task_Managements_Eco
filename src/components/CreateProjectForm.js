import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateProjectForm({ onBack }) {
  const [form, setForm] = useState({ name: "", description: "", createdBy: "admin" });

  const save = () => {
     const baseURL = process.env.REACT_APP_BASE_URL;
    axios
      .post(`${baseURL}/projects`, form)
      .then(() => {
        toast.success("Project created");
        onBack();
      })
      .catch(() => toast.error("Error creating project"));
  };

  return (
    <div>
      <h4>Create Project</h4>

      <input
        className="form-control mb-2"
        placeholder="Project Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button className="btn btn-secondary me-2" onClick={onBack}>
        Back
      </button>
      <button className="btn btn-primary" onClick={save}>
        Save
      </button>
    </div>
  );
}