import { TaskStatus } from '../enums/task-status.enum';

export interface Task {
  id: number;
  status: TaskStatus;
  createdAt: number;
  updatedAt: number;
  locateAt: Date | number | null;
  description: string | null;
}
