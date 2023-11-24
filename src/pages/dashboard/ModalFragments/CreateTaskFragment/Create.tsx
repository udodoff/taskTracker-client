import { ICreateTaskFragment } from './types';
import { useState, useEffect } from 'react';
import styles from './Create.module.css';
import { observer } from 'mobx-react-lite';
import { ETaskStatus, ITodo } from '../../../../store/types';
import Modal from '../../../../components/Modal/Modal';
import CInput from '../../../../components/CInput/CInput';
import CTextArea from '../../../../components/CTextArea/CTextArea';
import CSelect from '../../../../components/CSelect/CSelect';
import CToggle from '../../../../components/CToggle/CToggle';
import CButton from '../../../../components/CButton/CButton';

const Create: React.FC<ICreateTaskFragment> = observer(
  ({ status, todoStore, active, setActive }) => {
    const [selectedStatus, setSelectedStatus] = useState(ETaskStatus.Planned);
    const [important, setimportant] = useState(false);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [parentTask, setParentTask] = useState<ITodo | null>(null);
    const [tasks, setTasks] = useState<ITodo[]>([]);
    const statuses = [
      ETaskStatus.Planned,
      ETaskStatus.Progress,
      ETaskStatus.Completed,
    ];

    useEffect(() => {
      setTasks(todoStore.todos);
      setSelectedStatus(status);
    }, [status, todoStore.todos]);

    const create = () => {
      if (!name.length) {
        setNameError(true);
        return;
      }
      const newTask: ITodo = {
        name,
        description,
        parentTask: parentTask?.id || null,
        status: selectedStatus,
        important,
        userId: todoStore.user?.userId,
        createdAt: new Date().toISOString(),
      };
      todoStore.createTask(newTask);
      setName('');
      setDescription('');
      setimportant(false);
      setParentTask(null);
      setSelectedStatus(ETaskStatus.Planned);
      setActive(false);
    };

    return (
      <Modal active={active} setActive={setActive}>
        <div>
          <p className={styles.title}>Create new task</p>
          <CInput
            type="text"
            placeholder="Task name"
            onChange={e => {
              setNameError(false);
              setName(e.target.value);
            }}
            width="full"
            value={name}
          />
          <div className={styles['flex-wrapper']}>
            <CTextArea
              placeholder="Task description"
              onChange={e => {
                setDescription(e.target.value);
              }}
              value={description}
              cols={25}
              rows={10}
            />
            <div className={styles.selects}>
              <CSelect
                onChange={value => {
                  setParentTask(value as React.SetStateAction<ITodo | null>);
                }}
                value={parentTask}
                options={tasks}
              />
              <CSelect
                onChange={value => {
                  setSelectedStatus(value as React.SetStateAction<ETaskStatus>);
                }}
                value={selectedStatus}
                options={statuses}
              />
              <div className={styles.toggle}>
                <p>Important</p>
                <CToggle enabled={important} setEnabled={setimportant} />
              </div>
            </div>
          </div>
          <p className={nameError ? styles.error : styles.transparent}>
            Task name cannot be empty
          </p>
          <div className={styles.buttons}>
            <CButton type="button" size="smaller" cb={create} variant="primary">
              Create
            </CButton>
            <CButton
              cb={() => setActive(false)}
              type="button"
              size="smaller"
              variant="secondary"
            >
              Close
            </CButton>
          </div>
        </div>
      </Modal>
    );
  },
);

export default Create;
