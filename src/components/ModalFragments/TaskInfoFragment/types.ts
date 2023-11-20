import { ITodo } from '../../../store/types';

export interface ITaskInfoFragment {
  modalClose: (todo: ITodo | null) => void;
}
