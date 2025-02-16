"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Link from "next/link";

const ItemType = "TASK";

const Task = ({ task, index, list, moveTask }) => {
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
      className={`bg-gray-800 text-white p-2 rounded-lg shadow-lg mb-2 cursor-pointer flex items-center justify-between`}
    >
      {task}
    </div>
  );
};

const Column = ({ title, tasks, list, addTask, moveTask }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => moveTask(item.task, item.list, list),
  });

  return (
    <div ref={drop} className="bg-black p-4 rounded-lg flex flex-col gap-2">
      <h2 className="text-white text-lg font-semibold capitalize mb-4">
        {title}
      </h2>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task.task}
          index={index}
          list={list}
          moveTask={moveTask}
        />
      ))}
      <button
        onClick={() => addTask(list)}
        className="text-gray-400 text-sm mt-2 hover:underline"
      >
        + Add a card
      </button>
    </div>
  );
};

const TaskControl = () => {
  const [tasks, setTasks] = useState({ todo: [], doing: [], done: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [currentList, setCurrentList] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    const groupedTasks = { todo: [], doing: [], done: [] };
    data.forEach(({ task, list }) => {
      groupedTasks[list].push({ task });
    });
    setTasks(groupedTasks);
  };

  const addTask = (list) => {
    setCurrentList(list);
    setIsOpen(true);
  };

  const handleAddTask = async () => {
    if (newTask.trim()) {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask, list: currentList }),
      });
      fetchTasks();
    }
    setNewTask("");
    setIsOpen(false);
  };

  const moveTask = async (task, fromList, toList) => {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, fromList, toList }),
    });
    fetchTasks();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen   p-6">
        <div className="max-w-5xl mx-auto">
          {/* Navbar */}
          <div className="flex justify-between items-center mb-4  bg-gradient-to-r from-blue-700 to-indigo-900 p-4 rounded-lg">
            <h1 className="text-white text-2xl font-bold">Task Manager</h1>
            <Link href="/">
              {" "}
              <button className="text-white bg-orange-500 px-4 py-2 rounded-lg">
                Home
              </button>{" "}
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
            />
            <Column
              title="Doing"
              tasks={tasks.doing}
              list="doing"
              addTask={addTask}
              moveTask={moveTask}
            />
            <Column
              title="Done"
              tasks={tasks.done}
              list="done"
              addTask={addTask}
              moveTask={moveTask}
            />
          </div>
        </div>
        {/* Modal */}
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-blue-500 bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Add Task</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter task name"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </DndProvider>
  );
};

export default TaskControl;
