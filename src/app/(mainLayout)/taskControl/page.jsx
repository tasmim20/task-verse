"use client";
import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Link from "next/link";
import { useSession } from "next-auth/react"; // Import NextAuth session

const ItemType = "TASK";

// Task component
const Task = ({ task, list, moveTask, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { ...task, list },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="bg-gray-800 text-white p-3 rounded-lg shadow-lg mb-2 cursor-pointer flex items-center justify-between"
    >
      <span>{task.task}</span>
      <button
        onClick={() => deleteTask(task._id)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
};

// Column component
const Column = ({ title, tasks, list, addTask, moveTask, deleteTask }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      moveTask(item, item.list, list);
    },
  });

  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = async () => {
    if (taskInput.trim()) {
      await addTask(list, taskInput);
      setTaskInput("");
    }
  };

  return (
    <div ref={drop} className="bg-gray-900 p-4 rounded-lg flex flex-col gap-2 min-h-[200px]">
      <h2 className="text-white text-lg font-semibold capitalize mb-4">{title}</h2>

      {tasks.map((task) => (
        <Task key={task._id} task={task} list={list} moveTask={moveTask} deleteTask={deleteTask} />
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
  const email = session?.user?.email; // Get logged-in user's email

  useEffect(() => {
    if (email) {
      fetchTasks();
    }
  }, [email]);

  // Fetch tasks from database
  const fetchTasks = async () => {
    if (!email) return;

    try {
      const res = await fetch(`http://localhost:7000/tasks?email=${email}`);
      const data = await res.json();

      const groupedTasks = { todo: [], doing: [], done: [] };
      data.forEach(({ task, status, _id }) => {
        groupedTasks[status].push({ task, _id, status });
      });

      setTasks(groupedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const addTask = async (list, taskText) => {
    if (!email || !taskText.trim()) return;

    try {
      const res = await fetch("http://localhost:7000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: taskText, status: list, email }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Move task between columns
  const moveTask = async (task, fromList, toList) => {
    if (!email || !task._id) return;

    // Optimistically update UI
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[fromList] = updatedTasks[fromList].filter((t) => t._id !== task._id);
      updatedTasks[toList] = [...updatedTasks[toList], { ...task, status: toList }];
      return updatedTasks;
    });

    try {
      const res = await fetch(`http://localhost:7000/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: toList, email }),
      });

      if (!res.ok) throw new Error("Failed to move task");

      fetchTasks();
    } catch (error) {
      console.error("Error moving task:", error);
      fetchTasks();
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    if (!email || !taskId) return;

    try {
      await fetch(`http://localhost:7000/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

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
            <Column title="To Do" tasks={tasks.todo} list="todo" addTask={addTask} moveTask={moveTask} deleteTask={deleteTask} />
            <Column title="Doing" tasks={tasks.doing} list="doing" addTask={addTask} moveTask={moveTask} deleteTask={deleteTask} />
            <Column title="Done" tasks={tasks.done} list="done" addTask={addTask} moveTask={moveTask} deleteTask={deleteTask} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskControl;
