import { ETaskStatus, Store } from '../../store/types';

export interface IChildrenTreeProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  parentId: number;
  todoStore: Store;
}
export interface IChildRes {
  id: number;
  name: string;
  description: string;
  parent_task: number | null;
  status: ETaskStatus;
  user_id?: number;
  created_at: string;
  important: boolean;
}
