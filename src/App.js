import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");


  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (task.id === id) {
        task.name = newName;
      }
      return task;
    });

    setTasks(editedTaskList);
  }

  function toggleTaskCompleted(id) {
    const updatedTask = tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });

    setTasks(updatedTask);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task =>
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />);

  const tasksNoun = taskList.length === 1 ? "task" : "tasks";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const filterList = FILTER_NAMES.map(filterName =>
    <FilterButton
      key={filterName}
      name={filterName}
      isPressed={filterName === filter}
      setFilter={setFilter} />
  );

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;