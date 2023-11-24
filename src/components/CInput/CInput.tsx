import { InputProps } from './types';
import styles from './CInput.module.css';
import { FC } from 'react';
import classNames from 'classnames';

const CInput: FC<InputProps> = ({
  type,
  value,
  placeholder,
  onChange,
  width,
  validationSchema,
  name,
  register,
}) => {
  return (
    <input
      className={classNames(styles['c-input'], styles[width])}
      type={type}
      placeholder={placeholder}
      value={value}
      {...register?.(name || 'login', validationSchema)}
      onChange={onChange}
    />
  );
};

export default CInput;
