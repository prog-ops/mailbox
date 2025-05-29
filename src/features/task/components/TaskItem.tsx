import React, { useState } from 'react';
import type {TaskItem as TaskItemType} from '../../../types/task.ts';
import dayjs from 'dayjs';
import { Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Dialog from '@mui/material/Dialog';

interface TaskItemProps {
    task: TaskItemType;
    isExpanded: boolean;
    onToggle: () => void;
    onCheck: (checked: boolean) => void;
    onDelete?: () => void;
    onEdit?: (title: string, description: string) => void;
}

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

    const [tagDialogOpen, setTagDialogOpen] = useState(false);

    return (
        <div className="border-b border-gray-600 py-2">
            {/* Bagian yang selalu terlihat (Collapsed View) */}
            <div className="flex items-center gap-x-2 p-2">
                <Checkbox
                    checked={task.completed}
                    onChange={(e) => onCheck(e.target.checked)}
                    sx={{ color: '#828282', '&.Mui-checked': { color: '#68D391' } }}
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
                        <ExpandMoreIcon className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} sx={{color: '#828282'}}/>
                    </IconButton>
                    <IconButton size="small" onClick={handleMenuClick}>
                        <MoreHorizIcon sx={{color: '#828282'}} />
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
                        <AccessTimeIcon fontSize="small" sx={{ color: '#2F80ED' }} />
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
                            className="text-[#828282] text-sm mt-2 cursor-pointer flex items-center gap-x-1"
                            onClick={() => setEditingField('description')}
                            tabIndex={0}
                        >
                            <EditIcon fontSize="small" sx={{ color: '#2F80ED' }} />
                            {task.description || 'No Description'}
                        </div>
                    )}
                    <div className="flex items-center gap-x-2 bg-[#F8F9FB] rounded px-3 py-2 mt-2">
                        <BookmarkIcon sx={{ color: '#2F80ED' }} />
                        <div className="flex gap-x-2 flex-wrap">
                            {(task.tags ?? []).map(tagValue => {
                                const tag = TAG_OPTIONS.find(t => t.value === tagValue);
                                if (!tag) return null;
                                return (
                                    <button
                                        key={tag.value}
                                        className={`px-3 py-1 rounded font-medium text-sm border-none outline-none ${tag.color}`}
                                        onClick={() => setTagDialogOpen(true)}
                                    >
                                        {tag.label}
                                    </button>
                                );
                            })}
                            {(task.tags ?? []).length === 0 && (
                                <button
                                    className="px-3 py-1 rounded font-medium text-sm border-none outline-none bg-[#EAF1FB] text-[#333]"
                                    onClick={() => setTagDialogOpen(true)}
                                >
                                    + Add Tag
                                </button>
                            )}
                        </div>
                        <Dialog open={tagDialogOpen} onClose={() => setTagDialogOpen(false)}>
                            <div className="bg-white rounded shadow-lg p-4 min-w-[220px] border border-gray-200">
                                <div className="font-semibold mb-2 text-[#2F80ED]">Select Tags</div>
                                {TAG_OPTIONS.map(tag => (
                                    <button
                                        key={tag.value}
                                        className={`block w-full text-left px-3 py-2 rounded font-medium text-sm mb-1 ${tag.color} ${(task.tags ?? []).includes(tag.value) ? 'border-2 border-[#2F80ED]' : 'border-2 border-transparent'} hover:border-[#2F80ED]'}`}
                                        onClick={() => {
                                            if (!task.tags) task.tags = [];
                                            if (task.tags.includes(tag.value)) {
                                                task.tags = task.tags.filter(t => t !== tag.value);
                                            } else {
                                                task.tags = [...task.tags, tag.value];
                                            }
                                            if (onEdit) onEdit(editTitle, editDescription);
                                        }}
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </Dialog>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
