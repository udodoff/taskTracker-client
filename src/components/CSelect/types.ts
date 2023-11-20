import { ETaskStatus } from '../../store/types';
import { ITodo } from '../../store/types';

export interface ICSelectProps {
  onChange: (value: ETaskStatus | ITodo | null) => void;
  value: string | ITodo | null;
  options: string[] | ITodo[];
}
