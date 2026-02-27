export interface Task {
  id: number;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Completed";
  dueDate: string;
}

export function changeStatus(tasks: Task[], id: number): Task[] {
return tasks.map((x) => {
if (x.id !== id) return x;
const next: Task = {
...x,
status:
  x.status === "Todo"
    ? "In Progress"
     : x.status === "In Progress"
      ? "Completed"
        : "Todo",
  };
    return next;
  });
}

export function filterTasks(
  tasks: Task[],
  status: string,
  search: string
): Task[] {
  return tasks
    .filter((t) => (status ? t.status === status : true))
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
}

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}
