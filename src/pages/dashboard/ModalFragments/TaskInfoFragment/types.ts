import { ITodo, Store } from '../../../../store/types';

export interface ITaskInfoFragment {
  modalClose: (todo: ITodo | null) => void;
  todoStore: Store;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
