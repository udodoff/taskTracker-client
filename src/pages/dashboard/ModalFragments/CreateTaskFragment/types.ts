import { ETaskStatus, Store } from '../../../../store/types';

export interface ICreateTaskFragment {
  status: ETaskStatus;
  todoStore: Store;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
