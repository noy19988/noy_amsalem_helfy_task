import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, editingTask, onCancelEdit, isProcessing }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title || '');
            setDescription(editingTask.description || '');
            setPriority(editingTask.priority || 'low');
        } else {
            setTitle('');
            setDescription('');
            setPriority('low');
        }
    }, [editingTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            await onSubmit({ title, description, priority });
            if (!editingTask) {
                setTitle('');
                setDescription('');
                setPriority('low');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>

            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    required
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details (optional)"
                    rows="3"
                />
            </div>

            <div className="form-group">
                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={isProcessing}>
                    {editingTask ? 'Update Task' : 'Add Task'}
                </button>
                {editingTask && (
                    <button type="button" className="btn-cancel" onClick={onCancelEdit} disabled={isProcessing}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;