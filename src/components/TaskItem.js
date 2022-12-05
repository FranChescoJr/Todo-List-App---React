import React, { useState } from 'react'

//Styles
import styles from './TaskItem.module.css';

const TaskItem = ({ task, deleteTask, toggleTask, enterEditMode }) => {
    const [isChecked, setIsChecked] = useState(task.checked);

    const handleCheckboxChange = (e) => {
        setIsChecked(!isChecked);
        toggleTask(task.id);
    }

    return (
        <li className={styles.task}>
            <div className={styles["task-group"]}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    name={task.name}
                    id={task.id}
                />
                <label
                    htmlFor={task.id}
                    className={styles.label}
                >
                    {task.name}
                    <p className={styles.checkmark}>
                        <span className="material-symbols-rounded">
                            check
                        </span>
                    </p>
                </label>
            </div>
            <div className={styles["task-group"]}>
                <button
                    className={`btn ${styles.edit}`}
                    aria-label={`Update ${task.name} Task`}
                    onClick={() => enterEditMode(task)}
                >
                    <span className="material-symbols-rounded">
                        edit_square
                    </span>
                </button>
                <button
                    className={`btn ${styles.delete}`}
                    aria-label={`Delete ${task.name} Task`}
                    onClick={() => deleteTask(task.id)}
                >
                    <span className="material-symbols-rounded">
                        delete
                    </span>
                </button>
            </div>
        </li>
    )
}

export default TaskItem