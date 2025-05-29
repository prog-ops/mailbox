import React, { useState } from 'react';
import type {TaskItem as TaskItemType} from '../../../types/task.ts';
import dayjs from 'dayjs';
import { Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface TaskItemProps {
    task: TaskItemType;
    isExpanded: boolean;
    onToggle: () => void;
    onCheck: (checked: boolean) => void;
    onDelete?: () => void;
    onEdit?: (title: string, description: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isExpanded, onToggle, onCheck, onDelete, onEdit }) => {
    const [editingField, setEditingField] = useState<null | 'title' | 'description'>(null);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || '');
    const [dueDate, setDueDate] = useState(dayjs(task.dueDate));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleDelete = () => {
        handleMenuClose();
        if (onDelete) onDelete();
    };
    const saveEdit = () => {
        setEditingField(null);
        if (onEdit) onEdit(editTitle, editDescription);
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    };

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
                <div className="flex-grow">
                    {editingField === 'title' ? (
                        <input
                            className="bg-transparent border-b border-gray-400 text-white font-bold outline-none w-full mb-1"
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            onBlur={saveEdit}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : (
                        <span
                            className={`font-bold cursor-pointer block ${task.completed ? 'line-through text-gray-500' : 'text-[#4F4F4F]'}`}
                            onClick={() => setEditingField('title')}
                            tabIndex={0}
                        >
                            {task.title || <span className="text-gray-400">No Title</span>}
                        </span>
                    )}
                    {editingField === 'description' && !isExpanded ? (
                        <input
                            className="bg-transparent border-b border-gray-400 text-gray-300 outline-none w-full text-sm"
                            value={editDescription}
                            onChange={e => setEditDescription(e.target.value)}
                            onBlur={saveEdit}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : null}
                </div>
                <div className="flex items-center gap-x-3 text-sm flex-shrink-0">
                    {!task.completed && daysLeft > 0 && daysLeft < 15 && (
                        <span className="text-red-500 font-semibold">{daysLeft} Days Left</span>
                    )}
                    <span>{dueDate.format('DD/MM/YYYY')}</span>
                    <IconButton size="small" onClick={onToggle}>
                        <ExpandMoreIcon className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} sx={{color: 'white'}}/>
                    </IconButton>
                    <IconButton size="small" onClick={handleMenuClick}>
                        <MoreHorizIcon sx={{color: 'white'}} />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose} anchorOrigin={{vertical:'bottom',horizontal:'right'}} transformOrigin={{vertical:'top',horizontal:'right'}}>
                        <MenuItem onClick={handleDelete} sx={{ color: 'red' }}>Delete</MenuItem>
                    </Menu>
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
                    {editingField === 'description' && isExpanded ? (
                        <input
                            className="bg-transparent border-b border-gray-400 text-[#828282] outline-none w-full text-sm mt-2"
                            value={editDescription}
                            onChange={e => setEditDescription(e.target.value)}
                            onBlur={saveEdit}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : (
                        <div
                            className="text-[#828282] text-sm mt-2 cursor-pointer"
                            onClick={() => setEditingField('description')}
                            tabIndex={0}
                        >
                            {task.description || 'No Description'}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskItem;
