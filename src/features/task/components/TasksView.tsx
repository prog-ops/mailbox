import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { CircularProgress } from '@mui/material';
import useTasks from "../../../hooks/useTasks.ts";

const TasksView = () => {
    const { data: tasks, isLoading, error } = useTasks();
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [localTasks, setLocalTasks] = useState([]);

    useEffect(() => {
        if (tasks) setLocalTasks(tasks);
    }, [tasks]);

    const handleToggle = (taskId: number) => {
        setExpandedId(prevId => (prevId === taskId ? null : taskId));
    };

    const handleCheck = (taskId: number, checked: boolean) => {
        setLocalTasks(prev => {
            const updated = prev.map(task =>
                task.id === taskId ? { ...task, completed: checked } : task
            );
            return [
                ...updated.filter(t => !t.completed),
                ...updated.filter(t => t.completed)
            ];
        });
    };

    if (isLoading) return <div className="flex justify-center p-8"><CircularProgress /></div>;
    if (error) return <div className="p-4 text-red-500">Error loading tasks: {error.message}</div>;

    return (
        <div className="p-4 h-full overflow-y-auto">
            <h1 className="text-xl font-bold mb-4">Tasks</h1>
            <div>
                {localTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        isExpanded={expandedId === task.id}
                        onToggle={() => handleToggle(task.id)}
                        onCheck={checked => handleCheck(task.id, checked)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TasksView;
