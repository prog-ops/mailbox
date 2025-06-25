import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useTasks from '../../../hooks/useTasks.ts';
import type { TaskItem as TaskItemType } from '../../../types/task.ts';
import TaskItem from './TaskItem';

const TAG_OPTIONS = [
  {
    label: 'Important ASAP',
    value: 'important',
    color: 'bg-[#EAF1FB] text-[#333]',
  },
  {
    label: 'Offline Meeting',
    value: 'offline',
    color: 'bg-[#FDE7D6] text-[#333]',
  },
  {
    label: 'Virtual Meeting',
    value: 'virtual',
    color: 'bg-[#FFF4D6] text-[#333]',
  },
  { label: 'ASAP', value: 'asap', color: 'bg-[#D6F5F2] text-[#333]' },
  {
    label: 'Client Related',
    value: 'client',
    color: 'bg-[#D6F5E6] text-[#333]',
  },
  { label: 'Self Task', value: 'self', color: 'bg-[#E6E6FA] text-[#333]' },
  {
    label: 'Appointments',
    value: 'appointments',
    color: 'bg-[#F6E6FA] text-[#333]',
  },
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
        ...tasks.filter((t) => !t.completed),
        ...tasks.filter((t) => t.completed),
      ];
      setLocalTasks(sorted);
    }
  }, [tasks]);

  const handleToggle = (taskId: number) => {
    setExpandedIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleCheck = (taskId: number, checked: boolean) => {
    setLocalTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === taskId ? { ...task, completed: checked } : task
      );
      return [
        ...updated.filter((t) => !t.completed),
        ...updated.filter((t) => t.completed),
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
    setLocalTasks((prev) => [newTask, ...prev]);
    setOpen(false);
    setNewTitle('');
    setNewLabel('personal');
    setNewDescription('');
    setNewTags([]);
  };

  // Mine: filter tasks by label
  let filteredTasks = localTasks;
  if (taskListType === 'personal') {
    filteredTasks = localTasks.filter((t) => t.label === 'personal');
  } else if (taskListType === 'urgent') {
    filteredTasks = localTasks.filter((t) => t.label === 'urgent');
  }

  if (isLoading)
    return (
      <div className="flex justify-center p-8">
        <CircularProgress />
      </div>
    );
  if (error)
    return (
      <div className="p-4 text-red-500">
        Error loading tasks: {error.message}
      </div>
    );

  return (
    <div className="h-full overflow-y-auto bg-white p-4 text-[#4F4F4F]">
      <div className="mb-4 flex items-center justify-between">
        <Select
          className="bg-white text-[#4F4F4F]"
          onChange={(e) => setTaskListType(e.target.value)}
          size="small"
          sx={{
            minWidth: 180,
            '.MuiOutlinedInput-notchedOutline': { borderColor: '#4A5568' },
            color: '#4F4F4F',
            backgroundColor: 'white',
          }}
          value={taskListType}
          variant="outlined"
        >
          <MenuItem value="my">My Tasks</MenuItem>
          <MenuItem value="personal">Personal Errands</MenuItem>
          <MenuItem value="urgent">Urgent To Do</MenuItem>
        </Select>
        <Button
          className="ml-2"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{ textTransform: 'none' }}
          variant="contained"
        >
          New Task
        </Button>
      </div>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Task Title"
            margin="dense"
            onChange={(e) => setNewTitle(e.target.value)}
            type="text"
            value={newTitle}
          />
          <TextField
            fullWidth
            label="Description"
            margin="dense"
            onChange={(e) => setNewDescription(e.target.value)}
            type="text"
            value={newDescription}
          />
          <div className="my-2 flex flex-wrap gap-2 rounded bg-[#F8F9FB] p-2">
            {TAG_OPTIONS.map((tag) => (
              <button
                className={`rounded border-2 px-3 py-1 font-medium text-sm outline-none ${tag.color} ${newTags.includes(tag.value) ? 'border-[#2F80ED]' : 'border-transparent'} hover:border-[#2F80ED]'}`}
                key={tag.value}
                onClick={() =>
                  setNewTags((tags) =>
                    tags.includes(tag.value)
                      ? tags.filter((t) => t !== tag.value)
                      : [...tags, tag.value]
                  )
                }
                type="button"
              >
                {tag.label}
              </button>
            ))}
          </div>
          <FormControl fullWidth margin="dense">
            <InputLabel id="label-select-label">Label</InputLabel>
            <Select
              label="Label"
              labelId="label-select-label"
              onChange={(e) => setNewLabel(e.target.value)}
              value={newLabel}
            >
              <MenuItem value="personal">Personal Errands</MenuItem>
              <MenuItem value="urgent">Urgent To Do</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button disabled={!newTitle.trim()} onClick={handleCreateTask}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <h1 className="mb-4 font-bold text-xl">Tasks</h1>
      <div>
        {filteredTasks.map((task) => (
          <TaskItem
            isExpanded={expandedIds.includes(task.id)}
            key={task.id}
            onCheck={(checked) => handleCheck(task.id, checked)}
            onDelete={() =>
              setLocalTasks((prev) => prev.filter((t) => t.id !== task.id))
            }
            onEdit={(title, description) =>
              setLocalTasks((prev) =>
                prev.map((t) =>
                  t.id === task.id ? { ...t, title, description } : t
                )
              )
            }
            onToggle={() => handleToggle(task.id)}
            task={task}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksView;
