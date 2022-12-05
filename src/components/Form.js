import { useState } from "react";

const Form = ({ addTask }) => {
    const [task, setTask] = useState("");

    //With this we say the browser to stop refresh when submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        addTask({
            name: task,
            checked: false,
            id: Date.now()
        })
        setTask("");
    }

    return (
        <form
            className="todo"
            onSubmit={handleFormSubmit}
        >
            <div className="wrapper">
                <input
                    type="text"
                    id="task"
                    className="input"
                    value={task}
                    onInput={(e) => setTask(e.target.value)}
                    required
                    autoFocus
                    maxLength={60}
                    placeholder="Enter Task"
                />
                <label
                    htmlFor="task"
                    className="label"
                >INGRESE LA TAREA</label>
            </div>
            <button
                className="btn"
                aria-label="Add Task"
                type="submit"
            >
                <span className="material-symbols-rounded">
                    assignment_add
                </span>
            </button>

        </form>
    )
}

export default Form
