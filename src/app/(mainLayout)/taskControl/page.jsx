"use client";
import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Link from "next/link";
import { useSession } from "next-auth/react"; // Import the useSession hook

const ItemType = "TASK";

// Task component (each individual task)
const Task = ({ task, index, list, moveTask, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { task, index, list },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-gray-800 text-white p-3 rounded-lg shadow-lg mb-2 cursor-pointer flex items-center justify-between`}
    >
      <span>{task.task}</span>
      <button
        onClick={() => deleteTask(task._id)}  // Task deletion
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
};

// Column component (to-do, doing, done columns)
const Column = ({ title, tasks, list, addTask, moveTask, deleteTask }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => moveTask(item.task, item.list, list),
  });

  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = async () => {
    if (taskInput.trim()) {
      await addTask(list, taskInput);
      setTaskInput(""); // Clear input after adding task
    }
  };

  return (
    <div ref={drop} className="bg-gray-900 p-4 rounded-lg flex flex-col gap-2 min-h-[200px]">
      <h2 className="text-white text-lg font-semibold capitalize mb-4">{title}</h2>

      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          index={index}
          list={list}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
      ))}

      {list === "todo" && (
        <div className="mt-2">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a task..."
            className="w-full p-2 text-white bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="w-full mt-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

// Main TaskControl component
const TaskControl = () => {
  const [tasks, setTasks] = useState({ todo: [], doing: [], done: [] });

  // Get the session data (email and other user info) using NextAuth
  const { data: session } = useSession();
  const email = session?.user?.email; // Get the logged-in user's email

  useEffect(() => {
    if (email) {
      fetchTasks();
    }
  }, [email]);

  const fetchTasks = async () => {
    if (!email) return; // If no email, don't make the request

    const res = await fetch(`/api/tasks?email=${email}`);
    const data = await res.json();
    const groupedTasks = { todo: [], doing: [], done: [] };
    data.forEach(({ task, list, _id }) => {
      groupedTasks[list].push({ task, _id });
    });
    setTasks(groupedTasks);
  };

  const addTask = async (list, taskText) => {
    if (!email || !taskText.trim()) return; // Don't add task if no email or task text

    await fetch("http://localhost:7000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: taskText, list, email }),
    });

    fetchTasks(); // Refresh the task list after adding
  };

  const moveTask = async (task, fromList, toList) => {
    if (!email || !task._id) return; // Don't move task if no email or task ID

    await fetch(`/api/tasks/${task._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, fromList, toList, email }),
    });

    fetchTasks(); // Refresh the task list after moving
  };

  const deleteTask = async (taskId) => {
    if (!email || !taskId) return; // Don't delete task if no email or task ID

    await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    fetchTasks(); // Refresh the task list after deleting
  };

  // Ensure that tasks are only displayed when the email is available (user is logged in)
  if (!email) {
    return <div>Please log in to view and manage tasks.</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen pt-16 p-6 bg-gray-500">
        <div className="max-w-5xl mx-auto">
          {/* Navbar */}
          <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-700 to-indigo-900 p-4 rounded-lg">
            <h1 className="text-white text-2xl font-bold">Task Manager</h1>
            <Link href="/">
              <button className="text-white bg-orange-500 px-4 py-2 rounded-lg">Home</button>
            </Link>
          </div>

          {/* Board Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Column
              title="To Do"
              tasks={tasks.todo}
              list="todo"
              addTask={addTask}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
            <Column
              title="Doing"
              tasks={tasks.doing}
              list="doing"
              addTask={addTask}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
            <Column
              title="Done"
              tasks={tasks.done}
              list="done"
              addTask={addTask}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskControl;
