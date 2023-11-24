import { ChangeEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ISubmit } from '../../pages/login/types';

export interface InputProps {
  type: string;
  placeholder: string;
  value?: string | number;
  width: 'standart' | 'full';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<ISubmit>;
  name?: 'login' | 'password';
  validationSchema?: any;
}
