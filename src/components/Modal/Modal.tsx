import { IModalProps } from './types';
import styles from './Modal.module.css';
import Create from '../ModalFragments/CreateTaskFragment/Create';
import Info from '../ModalFragments/TaskInfoFragment/Info';
import { ITodo } from '../../store/types';
import todoStore from '../../store/todoStore';

const Modal: React.FC<IModalProps> = props => {
  const handleCardSubmit = (todo: ITodo | null) => {
    if (todo) {
      todoStore.updateExistingTask(todo);
    }
    props.setActive(false);
    setTimeout(() => {
      todoStore.changeSelectedTodo(null);
    }, 350);
  };

  return (
    <div
      className={
        props.active ? styles.modal + ' ' + styles.active : styles.modal
      }
      onClick={() => {
        props.setActive(false);
        setTimeout(() => {
          todoStore.changeSelectedTodo(null);
        }, 350);
      }}
    >
      <div
        className={styles['modal-content']}
        onClick={e => e.stopPropagation()}
      >
        {props.type == 'create' && props.status && (
          <Create
            modalClose={() => props.setActive(false)}
            status={props.status}
          />
        )}
        {props.type == 'card' && todoStore.selectedTodo && (
          <Info modalClose={todo => handleCardSubmit(todo)} />
        )}
      </div>
    </div>
  );
};

export default Modal;
