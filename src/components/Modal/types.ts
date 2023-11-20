import { ETaskStatus } from '../../store/types';

export interface IModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'create' | 'card';
  status?: ETaskStatus;
}
