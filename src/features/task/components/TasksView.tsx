import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { CircularProgress, MenuItem, Select, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel } from '@mui/material';
import useTasks from "../../../hooks/useTasks.ts";
import type { TaskItem as TaskItemType } from '../../../types/task.ts';

const TAG_OPTIONS = [
    { label: 'Important ASAP', value: 'important', color: 'bg-[#EAF1FB] text-[#333]' },
    { label: 'Offline Meeting', value: 'offline', color: 'bg-[#FDE7D6] text-[#333]' },
    { label: 'Virtual Meeting', value: 'virtual', color: 'bg-[#FFF4D6] text-[#333]' },
    { label: 'ASAP', value: 'asap', color: 'bg-[#D6F5F2] text-[#333]' },
    { label: 'Client Related', value: 'client', color: 'bg-[#D6F5E6] text-[#333]' },
    { label: 'Self Task', value: 'self', color: 'bg-[#E6E6FA] text-[#333]' },
    { label: 'Appointments', value: 'appointments', color: 'bg-[#F6E6FA] text-[#333]' },
    { label: 'Court Related', value: 'court', color: 'bg-[#D6E6F5] text-[#333]' },
];

const TasksView = () => {
    const { data: tasks, isLoading, error } = useTasks();
    const [expandedIds, setExpandedIds] = useState<number[]>([]);
    const [localTasks, setLocalTasks] = useState<TaskItemType[]>([]);
    const [taskListType, setTaskListType] = useState('my');
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newLabel, setNewLabel] = useState('personal');
    const [newDescription, setNewDescription] = useState('');
    const [newTags, setNewTags] = useState<string[]>([]);

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
        setExpandedIds(prev => prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]);
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
            description: newDescription,
            tags: newTags,
        };
        setLocalTasks(prev => [newTask, ...prev]);
        setOpen(false);
        setNewTitle('');
        setNewLabel('personal');
        setNewDescription('');
        setNewTags([]);
    };

    // Mine: filter tasks by label
    let filteredTasks = localTasks;
    if (taskListType === 'personal') {
        filteredTasks = localTasks.filter(t => t.label === 'personal');
    } else if (taskListType === 'urgent') {
        filteredTasks = localTasks.filter(t => t.label === 'urgent');
    }

    if (isLoading) return <div className="flex justify-center p-8"><CircularProgress /></div>;
    if (error) return <div className="p-4 text-red-500">Error loading tasks: {error.message}</div>;

    return (
        <div className="p-4 h-full overflow-y-auto bg-white text-[#4F4F4F]">
            <div className="flex items-center justify-between mb-4">
                <Select
                    value={taskListType}
                    onChange={e => setTaskListType(e.target.value)}
                    variant="outlined"
                    size="small"
                    className="bg-white text-[#4F4F4F]"
                    sx={{ minWidth: 180, '.MuiOutlinedInput-notchedOutline': { borderColor: '#4A5568' }, color: '#4F4F4F', backgroundColor: 'white' }}
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
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={newDescription}
                        onChange={e => setNewDescription(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2 my-2 p-2 rounded bg-[#F8F9FB]">
                        {TAG_OPTIONS.map(tag => (
                            <button
                                key={tag.value}
                                type="button"
                                className={`px-3 py-1 rounded font-medium text-sm border-2 outline-none ${tag.color} ${newTags.includes(tag.value) ? 'border-[#2F80ED]' : 'border-transparent'} hover:border-[#2F80ED]'}`}
                                onClick={() => setNewTags(tags => tags.includes(tag.value) ? tags.filter(t => t !== tag.value) : [...tags, tag.value])}
                            >
                                {tag.label}
                            </button>
                        ))}
                    </div>
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
                {filteredTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        isExpanded={expandedIds.includes(task.id)}
                        onToggle={() => handleToggle(task.id)}
                        onCheck={checked => handleCheck(task.id, checked)}
                        onDelete={() => setLocalTasks(prev => prev.filter(t => t.id !== task.id))}
                        onEdit={(title, description) => setLocalTasks(prev => prev.map(t => t.id === task.id ? { ...t, title, description } : t))}
                    />
                ))}
            </div>
        </div>
    );
};

export default TasksView;
