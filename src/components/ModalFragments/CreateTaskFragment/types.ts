import { ETaskStatus } from '../../../store/types';

export interface ICreateTaskFragment {
  modalClose: () => void;
  status: ETaskStatus;
}
