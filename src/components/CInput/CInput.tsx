import { InputProps } from './types';
import styles from './CInput.module.css';
import { FC } from 'react';

const CInput: FC<InputProps> = ({
  type,
  value,
  placeholder,
  onChange,
  width,
}) => {
  return (
    <input
      className={styles['c-input'] + ' ' + styles[width]}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default CInput;
