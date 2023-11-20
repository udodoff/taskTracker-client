import styles from './TaskCard.module.css';
import { ITaskCard } from './types';

const TaskCard: React.FC<ITaskCard> = ({ task }) => {
  let date = new Date(task.createdAt).toLocaleDateString();

  return (
    <div className={styles['task-card']}>
      <div className={styles['task-name']}>{task.name}</div>
      {task.important && (
        <div className={styles['task-important']}>Important</div>
      )}
      <div className={styles['task-date-time']}>{date}</div>
    </div>
  );
};

export default TaskCard;
