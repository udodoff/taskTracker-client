import CButton from '../../components/CButton/CButton';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../../components/TaskCard/TaskCard';
import { useState, useEffect, useCallback } from 'react';
import { ETaskStatus, ITodo, Store } from '../../store/types';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import Info from './ModalFragments/TaskInfoFragment/Info';
import Create from './ModalFragments/CreateTaskFragment/Create';

const DashboardPage: React.FC<{ todoStore: Store }> = observer(
  ({ todoStore }) => {
    const navigate = useNavigate();
    const columns = [
      ETaskStatus.Planned,
      ETaskStatus.Progress,
      ETaskStatus.Completed,
    ];
    const [createModalActive, setCreateModalActive] = useState(false);
    const [cardModalActive, setCardModalActive] = useState(false);
    const [tasks, setTasks] = useState<ITodo[]>([]);
    const [selectedColumn, setSelectedColumn] = useState<ETaskStatus>(
      ETaskStatus.Planned,
    );
    const [droppingCard, setDroppingCard] = useState<ITodo | null>(null);
    const openCreateModal = useCallback(
      (column: ETaskStatus) => {
        setSelectedColumn(column);
        setCreateModalActive(true);
      },
      [selectedColumn],
    );

    const handleCardSubmit = (todo: ITodo | null) => {
      if (todo) {
        todoStore.updateExistingTask(todo);
      }
      setCardModalActive(false);
      setTimeout(() => {
        todoStore.changeSelectedTodo(null);
      }, 350);
    };

    const openCardModalActive = (task: ITodo) => {
      todoStore.changeSelectedTodo(task);
      setCardModalActive(true);
    };

    useEffect(() => {
      if (!todoStore.user) {
        return;
      }
      todoStore.getTodos(todoStore.user.userId).then(() => {
        setTasks(todoStore.todos);
      });
    }, []);

    useEffect(() => {
      setTasks(todoStore.todos);
    }, [todoStore.todos]);
    const handleLogout = () => {
      todoStore.logout().then(() => {
        navigate('/');
      });
    };

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };
    const dragStartHandler = (task: ITodo) => {
      setDroppingCard(task);
    };

    const dropCardHandler = (
      e: React.DragEvent<HTMLDivElement>,
      column: ETaskStatus,
    ) => {
      e.preventDefault();
      if (droppingCard?.status === column) {
        return;
      }
      if (!droppingCard) {
        return;
      }
      todoStore.changeTaskStatus(droppingCard, column);
      setDroppingCard(null);
    };

    return (
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <div className={styles.container}>
            <div className={styles['header-content']}>
              <h2 className={styles.subheader}>TaskTrackee</h2>
              <h2 className={styles.subheader}>Dashboard</h2>
              <div className={styles.person}>
                <h4 className={styles.login}>{todoStore.user?.login}</h4>
                <CButton
                  type="button"
                  size="smaller"
                  cb={() => {
                    handleLogout();
                  }}
                  variant="primary"
                >
                  Logout
                </CButton>
              </div>
            </div>
          </div>
        </header>
        <div className={styles['dashboard-wrapper']}>
          <div className={styles.container}>
            <div className={styles['dashboard-content']}>
              {columns.map(column => (
                <div className={styles.column} key={column}>
                  <div
                    className={classNames(
                      styles['column-title'],
                      styles[column],
                    )}
                  >
                    <p className={styles['column-name']}>{column}</p>
                    <p
                      onClick={() => openCreateModal(column)}
                      className={styles['add-task']}
                    >
                      + Add task
                    </p>
                  </div>
                  <div
                    className={styles.tasks}
                    onDragOver={e => dragOverHandler(e)}
                    onDrop={e => dropCardHandler(e, column)}
                  >
                    {tasks
                      .filter(task => task.status === column)
                      .map(task => (
                        <div
                          onDragOver={e => dragOverHandler(e)}
                          onDragStart={() => dragStartHandler(task)}
                          key={task.id}
                          draggable={true}
                          className={styles.task}
                          onClick={() => openCardModalActive(task)}
                        >
                          <TaskCard task={task} />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Info
          todoStore={todoStore}
          modalClose={todo => handleCardSubmit(todo)}
          active={cardModalActive}
          setActive={setCardModalActive}
        />
        <Create
          status={selectedColumn}
          todoStore={todoStore}
          active={createModalActive}
          setActive={setCreateModalActive}
        />
      </div>
    );
  },
);

export default DashboardPage;
