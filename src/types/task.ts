export interface TaskItem {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
    dueDate: string;
    label?: 'personal' | 'urgent';
    description?: string;
    tags?: string[];
}
