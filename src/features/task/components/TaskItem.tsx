import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import type React from 'react';
import { useState } from 'react';
import type { TaskItem as TaskItemType } from '../../../types/task.ts';

interface TaskItemProps {
  task: TaskItemType;
  isExpanded: boolean;
  onToggle: () => void;
  onCheck: (checked: boolean) => void;
  onDelete?: () => void;
  onEdit?: (title: string, description: string) => void;
}

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

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isExpanded,
  onToggle,
  onCheck,
  onDelete,
  onEdit,
}) => {
  const [editingField, setEditingField] = useState<
    null | 'title' | 'description'
  >(null);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ''
  );
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
    <div className="border-gray-600 border-b py-2">
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
              autoFocus
              className="mb-1 w-full border-gray-400 border-b bg-transparent font-bold text-white outline-none"
              onBlur={saveEdit}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              value={editTitle}
            />
          ) : (
            <span
              className={`block cursor-pointer font-bold ${task.completed ? 'text-gray-500 line-through' : 'text-[#4F4F4F]'}`}
              onClick={() => setEditingField('title')}
              tabIndex={0}
            >
              {task.title || <span className="text-gray-400">No Title</span>}
            </span>
          )}
          {editingField === 'description' && !isExpanded ? (
            <input
              autoFocus
              className="w-full border-gray-400 border-b bg-transparent text-gray-300 text-sm outline-none"
              onBlur={saveEdit}
              onChange={(e) => setEditDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              value={editDescription}
            />
          ) : null}
        </div>
        <div className="flex flex-shrink-0 items-center gap-x-3 text-sm">
          {!task.completed && daysLeft > 0 && daysLeft < 15 && (
            <span className="font-semibold text-red-500">
              {daysLeft} Days Left
            </span>
          )}
          <span>{dueDate.format('DD/MM/YYYY')}</span>
          <IconButton onClick={onToggle} size="small">
            <ExpandMoreIcon
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              sx={{ color: '#828282' }}
            />
          </IconButton>
          <IconButton onClick={handleMenuClick} size="small">
            <MoreHorizIcon sx={{ color: '#828282' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose={handleMenuClose}
            open={openMenu}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleDelete} sx={{ color: 'red' }}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Bagian yang bisa diexpand (Expanded View) */}
      {isExpanded && (
        <div className="space-y-4 pr-4 pb-4 pl-14">
          <div className="ml-4 flex items-center gap-x-2">
            <AccessTimeIcon fontSize="small" sx={{ color: '#2F80ED' }} />
            <DatePicker
              onChange={(newDate) => setDueDate(newDate || dayjs())}
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                  height: '40px',
                  borderColor: '#4A5568',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4A5568',
                },
              }}
              value={dueDate}
            />
          </div>
          {editingField === 'description' && isExpanded ? (
            <input
              autoFocus
              className="mt-2 ml-4 w-full border-gray-400 border-b bg-transparent text-[#828282] text-sm outline-none"
              onBlur={saveEdit}
              onChange={(e) => setEditDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              value={editDescription}
            />
          ) : (
            <div
              className="mt-2 ml-4 flex cursor-pointer items-center gap-x-1 text-[#828282] text-sm"
              onClick={() => setEditingField('description')}
              tabIndex={0}
            >
              <EditIcon fontSize="small" sx={{ color: '#2F80ED' }} />
              {task.description || 'No Description'}
            </div>
          )}
          {/* Tagging UI - Mine */}
          <div className="mt-2 ml-0 flex items-center gap-x-2 rounded bg-[#F8F9FB] px-3 py-2">
            <button
              className="focus:outline-none"
              onClick={() => setTagDialogOpen(true)}
            >
              <BookmarkIcon
                sx={{
                  color:
                    task.tags && task.tags.length > 0 ? '#2F80ED' : '#BDBDBD',
                }}
              />
            </button>
            <div className="flex flex-wrap gap-x-2">
              {task.tags &&
                task.tags.length > 0 &&
                task.tags.map((tagValue) => {
                  const tag = TAG_OPTIONS.find((t) => t.value === tagValue);
                  if (!tag) return null;
                  return (
                    <button
                      className={`rounded border-none px-3 py-1 font-medium text-sm outline-none ${tag.color}`}
                      key={tag.value}
                      onClick={() => setTagDialogOpen(true)}
                    >
                      {tag.label}
                    </button>
                  );
                })}
            </div>
            <Dialog
              onClose={() => setTagDialogOpen(false)}
              open={tagDialogOpen}
            >
              <div className="min-w-[220px] rounded border border-gray-200 bg-white p-4 shadow-lg">
                <div className="mb-2 font-semibold text-[#2F80ED]">
                  Select Tags
                </div>
                {TAG_OPTIONS.map((tag) => (
                  <button
                    className={`mb-1 block w-full rounded px-3 py-2 text-left font-medium text-sm ${tag.color} ${(task.tags ?? []).includes(tag.value) ? 'border-2 border-[#2F80ED]' : 'border-2 border-transparent'} hover:border-[#2F80ED]'}`}
                    key={tag.value}
                    onClick={() => {
                      if (!task.tags) task.tags = [];
                      if (task.tags.includes(tag.value)) {
                        task.tags = task.tags.filter((t) => t !== tag.value);
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
