import { TaskStatus } from '../enums/task-status.enum';

export interface Task {
  id: number;
  status: TaskStatus;
  createdAt: number;
  updatedAt: number;
  locateAt: Date | null;
  description: string | null;
}
