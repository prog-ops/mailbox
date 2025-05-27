import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { CircularProgress, MenuItem, Select, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel } from '@mui/material';
import useTasks from "../../../hooks/useTasks.ts";
import type { TaskItem as TaskItemType } from '../../../types/task.ts';

const TasksView = () => {
    const { data: tasks, isLoading, error } = useTasks();
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [localTasks, setLocalTasks] = useState<TaskItemType[]>([]);
    const [taskListType, setTaskListType] = useState('my');
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newLabel, setNewLabel] = useState('personal');

    useEffect(() => {
        if (tasks) {
            const sorted = [
                ...tasks.filter(t => !t.completed),
                ...tasks.filter(t => t.completed)
            ];
            setLocalTasks(sorted);
        }
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

    const handleCreateTask = () => {
        const newTask: TaskItemType = {
            id: Date.now(),
            userId: 1,
            title: newTitle,
            completed: false,
            dueDate: new Date().toISOString(),
            label: newLabel as 'personal' | 'urgent',
        };
        setLocalTasks(prev => [newTask, ...prev]);
        setOpen(false);
        setNewTitle('');
        setNewLabel('personal');
    };

    if (isLoading) return <div className="flex justify-center p-8"><CircularProgress /></div>;
    if (error) return <div className="p-4 text-red-500">Error loading tasks: {error.message}</div>;

    return (
        <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
                <Select
                    value={taskListType}
                    onChange={e => setTaskListType(e.target.value)}
                    variant="outlined"
                    size="small"
                    className="bg-[#282c34] text-white"
                    sx={{ minWidth: 180, '.MuiOutlinedInput-notchedOutline': { borderColor: '#4A5568' }, color: 'white' }}
                >
                    <MenuItem value="my">My Tasks</MenuItem>
                    <MenuItem value="personal">Personal Errands</MenuItem>
                    <MenuItem value="urgent">Urgent To Do</MenuItem>
                </Select>
                <Button variant="contained" color="primary" className="ml-2" sx={{ textTransform: 'none' }} onClick={() => setOpen(true)}>New Task</Button>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task Title"
                        type="text"
                        fullWidth
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="label-select-label">Label</InputLabel>
                        <Select
                            labelId="label-select-label"
                            value={newLabel}
                            label="Label"
                            onChange={e => setNewLabel(e.target.value)}
                        >
                            <MenuItem value="personal">Personal Errands</MenuItem>
                            <MenuItem value="urgent">Urgent To Do</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateTask} disabled={!newTitle.trim()}>Create</Button>
                </DialogActions>
            </Dialog>
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
