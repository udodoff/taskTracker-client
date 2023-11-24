import styles from './Info.module.css';
import { useState, useEffect } from 'react';
import { ITaskInfoFragment } from './types';
import { observer } from 'mobx-react-lite';
import { ETaskStatus, ITodo } from '../../../../store/types';
import Modal from '../../../../components/Modal/Modal';
import CInput from '../../../../components/CInput/CInput';
import CTextArea from '../../../../components/CTextArea/CTextArea';
import CSelect from '../../../../components/CSelect/CSelect';
import CToggle from '../../../../components/CToggle/CToggle';
import CButton from '../../../../components/CButton/CButton';
import ChildrenTree from '../../../../components/ChildrenTreeModal/ChildrenTree';

const Info: React.FC<ITaskInfoFragment> = observer(
  ({ modalClose, todoStore, active, setActive }) => {
    const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null);
    const [nameError, setNameError] = useState(false);
    const [parentTask, setParentTask] = useState<ITodo | null>();
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [treeOpened, setTreeOpened] = useState(false);
    const statuses = [
      ETaskStatus.Planned,
      ETaskStatus.Progress,
      ETaskStatus.Completed,
    ];

    useEffect(() => {
      setNameError(false);
      setCurrentTodo(todoStore.selectedTodo);
      const parent = todoStore.todos.find(
        t => t.id == todoStore.selectedTodo?.parentTask,
      );
      setParentTask(parent || null);
      setTodos(
        todoStore.todos
          .filter(t => t.id !== todoStore.selectedTodo?.id)
          .filter(t => t.parentTask !== todoStore.selectedTodo?.id),
      );
    }, [todoStore.selectedTodo]);

    useEffect(() => {
      setTodos(
        todoStore.todos
          .filter(t => t.id !== todoStore.selectedTodo?.id)
          .filter(t => t.parentTask !== todoStore.selectedTodo?.id),
      );
    }, [todoStore.todos]);

    useEffect(() => {
      if (parentTask?.id && currentTodo) {
        setCurrentTodo({ ...currentTodo, parentTask: parentTask.id });
      }
    }, [parentTask]);

    const onSubmit = () => {
      if (!currentTodo || isEqual(currentTodo, todoStore.selectedTodo)) {
        todoStore.changeSelectedTodo(null);
        modalClose(null);
        return;
      }
      if (!currentTodo.name) {
        setNameError(true);
        setCurrentTodo({
          ...currentTodo,
          name: todoStore.selectedTodo?.name || '',
        });
        return;
      }
      modalClose({ ...currentTodo, parentTask: parentTask?.id || null });
      setTimeout(() => {
        todoStore.changeSelectedTodo(null);
      }, 350);
    };
    const onCancel = () => {
      setNameError(false);

      modalClose(null);

      return;
    };
    const onDelete = () => {
      if (currentTodo && currentTodo.id) {
        todoStore.deleteTodo(currentTodo.id);
      }
      modalClose(null);
      return;
    };

    const openParent = () => {
      if (!parentTask) {
        return;
      }
      todoStore.changeSelectedTodo(parentTask);
    };
    const isEqual = (obj1: ITodo | null, obj2: ITodo | null) => {
      if (!obj1 || !obj2) {
        return false;
      }
      let keys1: (keyof ITodo)[] = Object.keys(obj1) as (keyof ITodo)[];
      let keys2: (keyof ITodo)[] = Object.keys(obj2) as (keyof ITodo)[];
      if (keys1.length != keys2.length) {
        return false;
      }
      for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
      return true;
    };

    return (
      <Modal active={active} setActive={setActive}>
        <div>
          <div className={styles['name-input']}>
            <p className={styles.title}>Task name:</p>
            <CInput
              type="text"
              placeholder="Task name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNameError(false);
                setCurrentTodo({ ...currentTodo!, name: e.target.value });
              }}
              width="full"
              value={currentTodo?.name || ''}
            />
          </div>

          <div className={styles['flex-wrapper']}>
            <div>
              <p className={styles['desc-title']}>Description:</p>
              <CTextArea
                placeholder="Task description"
                value={currentTodo?.description || ''}
                onChange={e => {
                  setCurrentTodo({
                    ...currentTodo!,
                    description: e.target.value,
                  });
                }}
                cols={25}
                rows={13}
              />
            </div>
            <div className={styles['right-side']}>
              <div className={styles.status}>
                <p className={styles.statusTitle}>Status:</p>
                <CSelect
                  value={currentTodo?.status || ETaskStatus.Planned}
                  onChange={value =>
                    setCurrentTodo({
                      ...currentTodo!,
                      status: value as ETaskStatus,
                    })
                  }
                  options={statuses}
                />
              </div>
              <div>
                <p className={styles['important-title']}>Important:</p>
                <CToggle
                  enabled={currentTodo?.important || false}
                  setEnabled={value =>
                    setCurrentTodo({ ...currentTodo!, important: value })
                  }
                />
              </div>
              <div className={styles.tasks}>
                {currentTodo?.parentTask && (
                  <div>
                    <p className={styles['parent-title']}>Parent task:</p>
                    <div className={styles['parent-select']}>
                      <CSelect
                        onChange={value => {
                          setParentTask(value as ITodo);
                        }}
                        value={parentTask || null}
                        options={todos}
                      />
                      <p
                        className={styles['open-parent']}
                        onClick={() => openParent()}
                      >
                        Open parent
                      </p>
                    </div>
                  </div>
                )}
                {!currentTodo?.parentTask && (
                  <CSelect
                    onChange={value => {
                      setParentTask(value as ITodo);
                    }}
                    value={parentTask || null}
                    options={todos}
                  />
                )}
                {!!todoStore.todos.find(
                  t => t.parentTask === currentTodo?.id,
                ) && (
                  <p
                    className={styles['view-tree']}
                    onClick={() => setTreeOpened(true)}
                  >
                    Open child tree
                  </p>
                )}
              </div>
            </div>
          </div>
          <p className={nameError ? styles.error : styles.transparent}>
            Task name cannot be empty
          </p>
          <div className={styles.buttons}>
            <CButton
              type="button"
              size="smaller"
              cb={onSubmit}
              variant="primary"
            >
              {isEqual(currentTodo, todoStore.selectedTodo) ? 'Ok!' : 'Apply'}
            </CButton>
            <CButton
              type="button"
              size="smaller"
              cb={onDelete}
              variant="tertiary"
            >
              Delete Task
            </CButton>
            <CButton
              type="button"
              size="smaller"
              cb={onCancel}
              variant="secondary"
            >
              Cancel
            </CButton>
          </div>
          {currentTodo?.id && (
            <ChildrenTree
              active={treeOpened}
              setActive={setTreeOpened}
              parentId={currentTodo.id}
              todoStore={todoStore}
            />
          )}
        </div>
      </Modal>
    );
  },
);

export default Info;
