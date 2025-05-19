import { useEffect, useState } from "react";
import AddTask from "./assets/components/AddTask";
import Tasks from "./assets/components/Tasks";
function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasks(newTasks);
  }
  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: tasks.length + 2,
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const fetchTasks = async() => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=8",
        {
          method: "GET",
        }
    );
      const data = await response.json();
      setTasks(data);
    }
    //fetchTasks();
  }, []);
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="space-y-4 w-[500] ">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}
export default App;
