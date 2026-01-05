import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function TaskDetail({ task, onBack }) {
  const [status, setStatus] = useState(task.status);
  const [progress, setProgress] = useState(task.progressPercent);
  const [comment, setComment] = useState("");
  const baseURL = process.env.REACT_APP_BASE_URL;

  const updateTask = () => {
  axios
    .put(`${baseURL}/tasks/${task.id}`, {
      status,
      progressPercent: Number(progress), // <— important
      comment
    })
    .then(() => {
        toast.success("Task updated");

        // ✅ Clear values after update
        setStatus("");
        setProgress("");
        setComment("");
      })
    .catch((err) => {
      console.log(err.response?.data);
      toast.error("Error updating task");
    });
};

  return (
    <div>
      <h4>Task Detail</h4>
      <p><b>Title:</b> {task.title}</p>

      <select className="form-control mb-2" value={status}
        onChange={e => setStatus(e.target.value)}>
        <option>Pending</option>
        <option>InProgress</option>
        <option>Completed</option>
      </select>

      <input className="form-control mb-2" type="number" max="100" min="0"
        value={progress} onChange={e => setProgress(e.target.value)} />

      <textarea className="form-control mb-2" placeholder="Add comment"
        onChange={e => setComment(e.target.value)} />

      <button className="btn btn-secondary me-2" onClick={onBack}>Back</button>
      <button className="btn btn-primary" onClick={updateTask}>Update</button>
    </div>
  );
}