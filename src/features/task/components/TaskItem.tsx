import React, { useState } from 'react';
import type {TaskItem as TaskItemType} from '../../../types/task.ts';
import dayjs from 'dayjs';
import { Checkbox, IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface TaskItemProps {
    task: TaskItemType;
    isExpanded: boolean;
    onToggle: () => void;
    onCheck: (checked: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isExpanded, onToggle, onCheck }) => {
    const [description, setDescription] = useState('No Description');
    const [dueDate, setDueDate] = useState(dayjs(task.dueDate));

    const daysLeft = dayjs(dueDate).diff(dayjs(), 'day');

    return (
        <div className="border-b border-gray-600 py-2">
            {/* Bagian yang selalu terlihat (Collapsed View) */}
            <div className="flex items-center gap-x-2 p-2">
                <Checkbox
                    checked={task.completed}
                    onChange={(e) => onCheck(e.target.checked)}
                    sx={{ color: 'white', '&.Mui-checked': { color: '#68D391' } }}
                />
                <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</span>
                <div className="flex items-center gap-x-3 text-sm flex-shrink-0">
                    {daysLeft > 0 && daysLeft < 15 && <span className="text-red-500 font-semibold">{daysLeft} Days Left</span>}
                    <span>{dueDate.format('DD/MM/YYYY')}</span>
                    <IconButton size="small" onClick={onToggle}>
                        <ExpandMoreIcon className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} sx={{color: 'white'}}/>
                    </IconButton>
                    <IconButton size="small"><MoreHorizIcon sx={{color: 'white'}} /></IconButton>
                </div>
            </div>

            {/* Bagian yang bisa diexpand (Expanded View) */}
            {isExpanded && (
                <div className="pl-14 pr-4 pb-4 space-y-4">
                    <div className="flex items-center gap-x-2">
                        <AccessTimeIcon fontSize="small" className="text-gray-400" />
                        <DatePicker
                            value={dueDate}
                            onChange={(newDate) => setDueDate(newDate || dayjs())}
                            sx={{
                                '& .MuiInputBase-root': { color: 'white', height: '40px', borderColor: '#4A5568' },
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#4A5568' },
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <EditIcon fontSize="small" className="text-gray-400" />
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-transparent text-gray-300 focus:outline-none"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
