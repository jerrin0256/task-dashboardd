"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import DarkModeToggle from "../../components/DarkModeToggle";
import {
  changeStatus as utilChangeStatus,
  filterTasks,
  sortTasks,
  Task,
} from "../../lib/taskUtils";
export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tasks");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("loggedIn")) {
        router.push("/");
      }
    }
  }, [router]);
 useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
 const openForm = (task?: Task) => {
    if (task) setEditing(task);
    else setEditing(null);
    setShowForm(true);
  };
 const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };
 const saveTask = (task: Task) => {
    if (editing) {
      setTasks((t) => t.map((x) => (x.id === task.id ? task : x)));
    } else {
      setTasks((t) => [...t, task]);
    }
    closeForm();
  };
 const deleteTask = (id: number) => {
    if (confirm("Delete this task?")) {
      setTasks((t) => t.filter((x) => x.id !== id));
    }
  };
 const changeStatus = (id: number) => {
    setTasks((t) => utilChangeStatus(t, id));
  };
 const filtered = filterTasks(tasks, filterStatus, search);
 const sorted = sortTasks(filtered);
 return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
    <div className="w-full max-w-4xl p-8 bg-white rounded shadow dark:bg-gray-900">
    <div className="flex items-center justify-between mb-4">
     <Header />
    <div className="flex gap-2 items-center">
     <DarkModeToggle />
    <button
    className="bg-green-600 text-white px-3 py-1 rounded"
    onClick={() => openForm()}
    >
     + New Task
    </button>
    <button
     className="bg-gray-600 text-white px-3 py-1 rounded"
     onClick={() => {
     localStorage.removeItem("loggedIn");
     router.push("/");
     }}
    >
    Logout
        </button>
       </div>
    </div>
    <div className="flex gap-2 mb-4">
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="border p-1 rounded bg-white dark:bg-gray-700 dark:text-white"
        >
    <option value="">All</option>
    <option value="Todo">Todo</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
    </select>
    <input
      type="text"
      placeholder="Search title"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-1 rounded bg-white dark:bg-gray-700 dark:text-white"
    />
    </div>
    <div className="hidden sm:grid grid-cols-5 font-bold text-black dark:text-white px-2 py-1 mb-2">
    <div>Title</div>
    <div>Description</div>
    <div>Status</div>
    <div>Due</div>
    <div>Actions</div>
    </div>
    <div className="grid gap-4 sm:grid-cols-1">
      {sorted.map((t) => (
    <div
        key={t.id}
        className="p-4 bg-white rounded shadow dark:bg-gray-800 dark:text-white grid sm:grid-cols-5 gap-2 items-center"
    >
    <div className="font-bold text-lg">{t.title}</div>
        <div className="text-sm">{t.description}</div>
        <div className="text-xs">
        <strong>{t.status}</strong>{" "}
        <button
          className="text-blue-600 underline"
          onClick={() => changeStatus(t.id)}
        >
          change
          </button>
        </div>
        <div className="text-xs">{t.dueDate}</div>
        <div className="flex gap-2">
        <button
         className="text-blue-600"
         onClick={() => openForm(t)}
        >
        edit
        </button>
        <button
        className="text-red-600"
        onClick={() => deleteTask(t.id)}
        >
        delete
        </button>
        </div>
        </div>
          ))}
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white p-4 rounded w-full max-w-md dark:bg-gray-800 dark:text-white">
        <TaskForm
              existing={editing}
              onSave={saveTask}
              onClose={closeForm}
            />
        </div>
        </div>
      )}

    </div>
  );
}
function TaskForm({
  existing,
  onSave,
  onClose,
}: {
  existing: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(existing?.title || "");
  const [description, setDescription] = useState(existing?.description || "");
  const [status, setStatus] = useState<"Todo" | "In Progress" | "Completed">
    (existing?.status || "Todo");
  const [dueDate, setDueDate] = useState(existing?.dueDate || "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: existing ? existing.id : Date.now(),
      title,
      description,
      status,
      dueDate,
    };
    onSave(task);
  };
  return (
    <form onSubmit={submit} className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">
        {existing ? "Edit Task" : "New Task"}
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-1 rounded bg-white dark:bg-gray-700 dark:text-white"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-1 rounded bg-white dark:bg-gray-700 dark:text-white"
      />
      <select
        value={status}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setStatus(e.target.value as Task['status'])
        }
        className="border p-1 rounded bg-white dark:bg-gray-700 dark:text-white"
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-1 rounded"
        required
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          className="px-3 py-1 border rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
