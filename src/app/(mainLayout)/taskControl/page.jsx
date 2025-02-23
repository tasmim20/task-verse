"use client";
import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSession } from "next-auth/react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Importing icons

const ItemType = "TASK";

// Task component with icons for update and delete
const Task = ({ task, list, moveTask, deleteTask, showCongratulations }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { ...task, list },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task.task);

  const handleUpdateTask = async () => {
    if (!task._id || !updatedTask.trim()) return;

    try {
      const res = await fetch(`http://localhost:7000/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: updatedTask, email: task.email }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      setIsEditing(false);
      showCongratulations(); // Optionally show a congratulations message
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      ref={drag}
      className={`bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg mb-4 cursor-pointer flex items-center justify-between transition-transform transform ${
        isDragging ? "opacity-50" : "hover:scale-105"
      }`}
    >
      <div>
        {isEditing ? (
          <div className="flex items-center">
            <input
              value={updatedTask}
              onChange={(e) => setUpdatedTask(e.target.value)}
              placeholder="Update task..."
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={handleUpdateTask}
              className="ml-2 p-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition"
            >
              Save
            </button>
          </div>
        ) : (
          <span className="text-xl font-semibold">{task.task}</span>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-white hover:text-yellow-300 transition"
          title="Edit Task"
        >
          <FaEdit size={22} />
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className="text-white hover:text-red-500 transition"
          title="Delete Task"
        >
          <FaTrash size={22} />
        </button>
      </div>
    </div>
  );
};

// Column component
const Column = ({
  title,
  tasks,
  list,
  addTask,
  moveTask,
  deleteTask,
  showCongratulations,
}) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      moveTask(item, item.list, list);
      if (list === "done") showCongratulations(); // Show congratulations if task is moved to "Done"
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
    <div
      ref={drop}
      className="p-6 rounded-xl bg-gradient-to-r from-blue-300 to-indigo-400 flex flex-col gap-4 min-h-[200px] shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          list={list}
          moveTask={moveTask}
          deleteTask={deleteTask}
          showCongratulations={showCongratulations}
        />
      ))}
      {list === "todo" && (
        <div className="mt-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a task..."
            className="w-full p-3 text-gray-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleAddTask}
            className="w-full mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-teal-600 transition"
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
  const [congratulations, setCongratulations] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (email) {
      fetchTasks();
    }
  }, [email]);

  const fetchTasks = async () => {
    if (!email) return;

    try {
      const res = await fetch(`http://localhost:7000/tasks?email=${email}`);
      const data = await res.json();
      console.log("Fetched tasks data:", data); // Log fetched data

      const groupedTasks = { todo: [], doing: [], done: [] };
      data.forEach(({ task, status, _id }) => {
        if (groupedTasks[status]) {
          groupedTasks[status].push({ task, _id, status, email });
        } else {
          console.warn(`Unknown status '${status}' for task:`, task);
        }
      });

      setTasks(groupedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

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

  const moveTask = async (task, fromList, toList) => {
    if (!email || !task._id) return;

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (updatedTasks[fromList]) {
        updatedTasks[fromList] = updatedTasks[fromList].filter(
          (t) => t._id !== task._id
        );
        if (!updatedTasks[toList]) {
          updatedTasks[toList] = []; // Ensure toList exists
        }
        updatedTasks[toList].push({ ...task, status: toList });
      }
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
      if (toList === "done") showCongratulations(); // Trigger congratulations if moved to "done"
    } catch (error) {
      console.error("Error moving task:", error);
      fetchTasks();
    }
  };

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

  const showCongratulations = () => {
    setAnimationActive(true);
    setTimeout(() => {
      setAnimationActive(false);
    }, 3000); // Reset animation after 3 seconds
  };

  const handleInviteFriend = async () => {
    if (!inviteEmail) return;

    try {
      // Logic to send an invitation email
      await fetch("http://localhost:7000/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail }),
      });

      alert("Invitation sent successfully!");
      setInviteEmail(""); // Clear the input after sending the invitation
    } catch (error) {
      console.error("Error inviting friend:", error);
    }
  };

  if (!email) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        Please log in to view and manage tasks.
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto">
          <div className="relative w-full h-[200px] flex items-center justify-center bg-gradient-to-r from-blue-700 to-indigo-900 text-white text-center">
            <h1 className="text-6xl font-extrabold pt-20 pb-10">
              Manage Your Tasks
            </h1>
          </div>

          {/* Board Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-20 mt-16">
            <Column
              title="To Do"
              tasks={tasks.todo}
              list="todo"
              addTask={addTask}
              moveTask={moveTask}
              deleteTask={deleteTask}
              showCongratulations={showCongratulations}
            />
            <Column
              title="Doing"
              tasks={tasks.doing}
              list="doing"
              addTask={addTask}
              moveTask={moveTask}
              deleteTask={deleteTask}
              showCongratulations={showCongratulations}
            />
            <Column
              title="Done"
              tasks={tasks.done}
              list="done"
              addTask={addTask}
              moveTask={moveTask}
              deleteTask={deleteTask}
              showCongratulations={showCongratulations}
            />
          </div>

          {/* Invite Friend Section */}
          <div className="mt-10 mb-10 py-10 ms-[900px] text-center">
            <h2 className="text-2xl font-bold mb-4">Invite a Friend</h2>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter friend's email..."
              className="p-2 rounded border border-gray-600"
            />
            <button
              onClick={handleInviteFriend}
              className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-teal-600 transition"
            >
              Send Invitation
            </button>
          </div>
        </div>

        {animationActive && (
  <div
    className={`fixed bottom-4 left-10 w-80 bg-teal-500 text-white text-lg font-bold p-4 rounded shadow-lg transition-transform transform ${
      animationActive ? "animate-fade-in" : ""
    }`}
  >
    <span>🎉 Congratulations! All tasks completed! 🎉</span>
  </div>
)}

      </div>
    </DndProvider>
  );
};

export default TaskControl;
