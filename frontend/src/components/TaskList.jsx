import { useState, useEffect, useRef } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks = [], onToggle, onDelete, onEdit, isFiltered, isProcessing }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    const len = tasks.length;
    const shouldLoop = len >= 3;
    const displayTasks = shouldLoop ? [...tasks, ...tasks, ...tasks] : tasks;

    const handleNext = () => {
        if (isTransitioning || !shouldLoop) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (isTransitioning || !shouldLoop) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    };

    useEffect(() => {
        if (shouldLoop) {
            setCurrentIndex(len);
        } else {
            setCurrentIndex(0);
            setIsTransitioning(false);
        }
    }, [len, shouldLoop]);

    useEffect(() => {
        if (isTransitioning && shouldLoop) {
            timeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
                if (currentIndex >= len * 2) {
                    setCurrentIndex(currentIndex - len);
                } else if (currentIndex < len) {
                    setCurrentIndex(currentIndex + len);
                }
            }, 500);
        }
        return () => clearTimeout(timeoutRef.current);
    }, [currentIndex, isTransitioning, len, shouldLoop]);

    useEffect(() => {
        if (shouldLoop && !isHovered) {
            const interval = setInterval(handleNext, 3000);
            return () => clearInterval(interval);
        }
    }, [shouldLoop, isHovered, isTransitioning]);

    if (len === 0) {
        return (
            <div className="empty-state">
                {isFiltered ? 'No tasks found for this filter.' : 'No tasks to display. Add one to get started!'}
            </div>
        );
    }

    return (
        <div
            className="carousel-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {shouldLoop && (
                <button className="carousel-btn prev" onClick={handlePrev}>
                    &#8249;
                </button>
            )}

            <div className="carousel-viewport">
                <div
                    className="carousel-track"
                    style={{
                        transform: `translateX(-${currentIndex * 33.3333}%)`,
                        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                    }}
                >
                    {displayTasks.map((task, idx) => (
                        <div className="carousel-slide" key={`${task.id}-${idx}`}>
                            <TaskItem
                                task={task}
                                onToggle={onToggle}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                isProcessing={isProcessing}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {shouldLoop && (
                <button className="carousel-btn next" onClick={handleNext}>
                    &#8250;
                </button>
            )}
        </div>
    );
};

export default TaskList;