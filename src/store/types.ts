export interface ITodo {
  id?: number;
  name: string;
  description: string;
  parentTask: number | null;
  status: ETaskStatus;
  userId?: number;
  createdAt: string;
  important: boolean;
}
export interface IUser {
  userId: number;
  login: string;
}
export enum ETaskStatus {
  Planned = 'Planned',
  Progress = 'Progress',
  Completed = 'Completed',
}
export interface authDto {
  login: string;
  password: string;
}
