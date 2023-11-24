import { IChildRes } from '../components/ChildrenTreeModal/types';

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
export interface Store {
  todos: ITodo[];
  authorized: boolean;
  user: IUser | null;
  createStatus: ETaskStatus;
  selectedTodo: ITodo | null;
  getTodos: (userId: number) => Promise<void>;
  signIn: (authDto: authDto) => Promise<{ error: string } | { status: string }>;
  signUp: (authDto: authDto) => Promise<{ error: string } | { status: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void | IUser>;
  createTask: (todo: ITodo) => Promise<{ error: string } | { status: string }>;
  updateExistingTask: (
    todo: ITodo,
  ) => Promise<{ error: string } | { status: string }>;
  deleteTodo: (id: number) => Promise<{ error: string } | { status: string }>;
  changeSelectedTodo: (todo: ITodo | null) => void;
  changeTaskStatus: (
    todo: ITodo,
    status: ETaskStatus,
  ) => Promise<{ error: string } | { status: string } | void>;
  getChildrenTree: (todoId: number) => Promise<IChildRes[]>;
}
