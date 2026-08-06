const TaskFilter = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="task-filter">
            <button
                className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
                onClick={() => onFilterChange('all')}
            >
                All
            </button>

            <button
                className={`filter-btn ${currentFilter === 'pending' ? 'active' : ''}`}
                onClick={() => onFilterChange('pending')}
            >
                Pending
            </button>

            <button
                className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
                onClick={() => onFilterChange('completed')}
            >
                Completed
            </button>
        </div>
    );
};

export default TaskFilter;