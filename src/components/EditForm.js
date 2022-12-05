import { useEffect, useState } from "react";

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
    const [updatedTask, setUpdatedTask] = useState(editedTask.name);

    // with this if we press the ESC key we close the edit mode
    useEffect(() => {
        const closeModalIfEscaped = (e) => {
            e.key === "Escape" && closeEditMode();
        }

        window.addEventListener("keydown", closeModalIfEscaped)

        return () => {
            window.removeEventListener("keydown", closeModalIfEscaped)
        }
    }, [closeEditMode])

    //With this we say the browser to stop refresh when submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateTask({ ...editedTask, name: updatedTask });
    }

    return (
        <div
            role="dialog"
            aria-labelledby="editTask"
            // With this when we click outside the edit label, it close the edit mode
            onClick={(e) => { e.target === e.currentTarget && closeEditMode() }}
        >
            <form
                className="todo"
                onSubmit={handleFormSubmit}
            >
                <div className="wrapper">
                    <input
                        type="text"
                        id="editTask"
                        className="input"
                        value={updatedTask}
                        onInput={(e) => setUpdatedTask(e.target.value)}
                        required
                        autoFocus
                        maxLength={60}
                        placeholder="Update Task"
                    />
                    <label
                        htmlFor="editTask"
                        className="label"
                    >ACTUALICE LA TAREA</label>
                </div>
                <button
                    className="btn"
                    aria-label={`Confirm edited task to now read ${updatedTask}`}
                    type="submit"
                >
                    <span className="material-symbols-rounded">
                        task
                    </span>
                </button>
            </form>
        </div>
    )
}

export default EditForm
