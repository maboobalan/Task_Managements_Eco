import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateTaskForm({ project, onBack }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedToUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dueDate: "",
    priority: "Medium",
    createdBy: "admin",
    assignedToUserName: "string"
  });

  const save = () => {
    const payload = {
      ...form,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    };

    const baseURL = process.env.REACT_APP_BASE_URL;

    axios.post(`${baseURL}/projects/${project.id}/tasks`,
      payload,
      {
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(() => {
        toast.success("Task created");
        onBack();
      })
      .catch((err) => {
        console.log("ERROR:", err.response?.data);
        toast.error("Error creating task");
      });
  };

  return (
    <div>
      <h4>Create Task</h4>

      <input className="form-control mb-2" placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })} />

      <textarea className="form-control mb-2" placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })} />

      <input className="form-control mb-2" type="date"
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />

      <select className="form-control mb-2"
        onChange={(e) => setForm({ ...form, priority: e.target.value })}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button className="btn btn-secondary me-2" onClick={onBack}>Back</button>
      <button className="btn btn-primary" onClick={save}>Save</button>
    </div>
  );
}