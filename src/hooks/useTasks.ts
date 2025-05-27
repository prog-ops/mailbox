import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type {TaskItem} from "../types/task.ts";

const fetchTasks = async (): Promise<TaskItem[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1'); // Ambil 20 tugas
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const data = await response.json();

    // Tambahkan dueDate palsu untuk demo
    return data.map((task: any, index: number) => ({
        ...task,
        dueDate: dayjs().add(index, 'day').toISOString(), // Setiap tugas jatuh tempo 1 hari setelah sebelumnya
    }));
};

const useTasks = () => {
    return useQuery<TaskItem[]>({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    });
};

export default useTasks;
