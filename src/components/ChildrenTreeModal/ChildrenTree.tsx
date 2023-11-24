import { useEffect, useState } from 'react';
import styles from './ChildrenTree.module.css';
import { IChildrenTreeProps, IChildRes } from './types';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

const ChildrenTree: React.FC<IChildrenTreeProps> = observer(
  ({ active, setActive, parentId, todoStore }) => {
    const [children, setChildren] = useState<IChildRes[]>([]);
    const [colors, setColors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
      if (!active) return;
      todoStore.getChildrenTree(parentId).then((res: IChildRes[]) => {
        res.forEach(el => {
          if (el.parent_task) {
            if (colors[el.parent_task]) return;
            setColors(prev => ({
              ...prev,
              [el.parent_task!]: getRandomColor(),
            }));
          }
        });
        setChildren(res);
      });
    }, [active]);

    const showChild = (child: IChildRes) => {
      setActive(false);
      todoStore.changeSelectedTodo({
        id: child.id,
        name: child.name.replaceAll('-', ''),
        description: child.description,
        parentTask: child.parent_task,
        status: child.status,
        important: child.important,
        userId: child.user_id,
        createdAt: child.created_at,
      });
    };

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

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
          <h4 className={styles.title}>Children tree</h4>
          {children.map((child: IChildRes) => {
            return (
              <div key={child.id}>
                <div className={styles.task}>
                  <pre
                    onClick={() => showChild(child)}
                    className={styles['task-name']}
                  >
                    {child.name.replaceAll('---', '\t\t')}
                  </pre>
                  <div
                    style={{ backgroundColor: `${colors[child.parent_task!]}` }}
                    className={styles.colored}
                  ></div>
                </div>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

export default ChildrenTree;
