import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { fetchWithAuth } from '../api/client';
import type { TaskItem } from '../types/task.ts';

const fetchTasks = async (): Promise<TaskItem[]> => {
  const data = await fetchWithAuth('/todos?userId=1');

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
