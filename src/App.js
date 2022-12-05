import { useState } from "react";

import Swal from 'sweetalert2';

//Custom Hooks
import useLocalStorage from "./hooks/useLocalStorage";

// Custom Components
import Form from "./components/Form";
import EditForm from "./components/EditForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useLocalStorage("react-todo.tasks", [])
  const [editedTask, setEditedTask] = useState(null);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    Swal.fire({
      title: 'Estas seguro de eliminar esta tarea?',
      text: "Esta operación no podrá revertirse!",
      icon: 'warning',
      iconColor: "#CF0A0A",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: "Cancelar",
      background: '#3A8891',
      color: "#000000"
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(prevState => prevState.filter(t => t.id !== id));
        Swal.fire({
          background: '#3A8891',
          color: "#000000",
          tile: 'Tarea eliminada!',
          text: 'Esta tarea ha sido eliminada.',
          icon: 'success',
          iconColor: "#285430"
        })
      }
    })
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id ? { ...t, checked: !t.checked } : t
    )))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id ? { ...t, name: task.name } : t
    )))
    closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  return (
    <div className="container">
      <header>
        <h1>MI LISTA DE TAREAS</h1>
      </header>
      {
        isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }


      <Form addTask={addTask} />
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}

    </div>
  )
}

export default App

