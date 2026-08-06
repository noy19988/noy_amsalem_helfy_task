import { useState, useEffect } from 'react';
import api from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import '../styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (data) => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      const newTask = await api.createTask(data);
      setTasks((prev) => [...prev, newTask]);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateTask = async (data) => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      const updated = await api.updateTask(editingTask.id, data);
      setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? updated : t)));
      setEditingTask(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleTask = async (id) => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      const updated = await api.toggleTaskStatus(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (isProcessing) return;
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      setIsProcessing(true);
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={fetchTasks} style={{ marginLeft: '10px', padding: '2px 8px', cursor: 'pointer' }}>
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <>
            <TaskForm
              onSubmit={editingTask ? handleUpdateTask : handleAddTask}
              editingTask={editingTask}
              onCancelEdit={() => setEditingTask(null)}
              isProcessing={isProcessing}
            />

            <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={setEditingTask}
              isFiltered={filter !== 'all'}
              isProcessing={isProcessing}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;