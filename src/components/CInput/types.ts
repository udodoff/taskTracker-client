import { ChangeEvent } from 'react';

export interface InputProps {
  type: string;
  placeholder: string;
  value: string | number;
  width: 'standart' | 'full';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
