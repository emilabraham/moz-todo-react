import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const tasksNoun = tasks.length === 1 ? "task" : "tasks";
  const headingText = `${tasks.length} ${tasksNoun} remaining`;

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

  const taskList = tasks.map(task =>
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
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