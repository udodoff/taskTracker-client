import style from './CButton.module.css';
import { FC } from 'react';
import { CButtonProps } from './types';
import classNames from 'classnames';

const CButton: FC<CButtonProps> = ({ type, children, cb, size, variant }) => {
  return (
    <button
      className={classNames(style['c-button'], style[size], style[variant])}
      type={type}
      onClick={() => {
        cb && cb();
      }}
    >
      {children}
    </button>
  );
};

export default CButton;
