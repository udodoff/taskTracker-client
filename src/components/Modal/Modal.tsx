import { IModalProps } from './types';
import styles from './Modal.module.css';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

const Modal: React.FC<IModalProps> = observer(
  ({ active, setActive, children }) => {
    return (
      <div
        className={
          active ? classNames(styles.modal, styles.active) : styles.modal
        }
        onClick={() => {
          setActive(false);
        }}
      >
        <div
          className={styles['modal-content']}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  },
);

export default Modal;
