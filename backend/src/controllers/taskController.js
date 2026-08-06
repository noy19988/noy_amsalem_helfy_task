const Task = require('../models/taskModel');

let tasks = [];
let nextId = 1;

const validPriorities = ['low', 'medium', 'high'];

const getTasks = (req, res) => {
    res.status(200).json(tasks);
};

const createTask = (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and must be a string' });
    }

    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }

    const newTask = new Task(nextId++, title.trim(), description, priority);
    tasks.push(newTask);
    res.status(201).json(newTask);
};

const updateTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, priority } = req.body;

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
        return res.status(400).json({ error: 'Title must be a valid string' });
    }

    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }

    const existingTask = tasks[taskIndex];

    tasks[taskIndex] = {
        ...existingTask,
        title: title !== undefined ? title.trim() : existingTask.title,
        description: description !== undefined ? description : existingTask.description,
        priority: priority || existingTask.priority
    };

    res.status(200).json(tasks[taskIndex]);
};

const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
};

const toggleTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = !task.completed;
    res.status(200).json(task);
};

module.exports = { getTasks, createTask, updateTask, deleteTask, toggleTask };