const TaskItem = ({ task, onToggle, onDelete, onEdit, isProcessing }) => {
    const formattedDate = new Date(task.createdAt).toLocaleString();

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority}
                </span>
            </div>

            <div className="task-body">
                {task.description && <p className="task-desc">{task.description}</p>}
                <span className="task-date">{formattedDate}</span>
            </div>

            <div className="task-actions">
                <button
                    className={`btn-toggle ${task.completed ? 'btn-completed' : ''}`}
                    onClick={() => onToggle(task.id)}
                    disabled={isProcessing}
                >
                    {task.completed ? 'Undo' : 'Complete'}
                </button>

                <button
                    className="btn-edit"
                    onClick={() => onEdit(task)}
                    disabled={isProcessing}
                >
                    Edit
                </button>

                <button
                    className="btn-delete"
                    onClick={() => onDelete(task.id)}
                    disabled={isProcessing}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;