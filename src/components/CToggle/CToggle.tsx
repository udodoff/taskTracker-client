import { Switch } from '@headlessui/react';
import { ICToggleProps } from './types';
import styles from './CToggle.module.css';

const CToggle: React.FC<ICToggleProps> = ({ enabled, setEnabled }) => {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={
        (enabled ? styles['bg-enabled'] : styles['bg-disabled']) +
        ' ' +
        styles.switch
      }
    >
      <span className={styles.sr}>Enable notifications</span>
      <span
        className={
          (enabled ? styles['checker-enabled'] : styles['checker-disabled']) +
          ' ' +
          styles.checker
        }
      />
    </Switch>
  );
};

export default CToggle;
