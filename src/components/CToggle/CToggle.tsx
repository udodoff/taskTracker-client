import { Switch } from '@headlessui/react';
import { ICToggleProps } from './types';
import styles from './CToggle.module.css';
import classNames from 'classnames';

const CToggle: React.FC<ICToggleProps> = ({ enabled, setEnabled }) => {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? styles['bg-enabled'] : styles['bg-disabled'],
        styles.switch,
      )}
    >
      <span className={styles.sr}>Enable notifications</span>
      <span
        className={classNames(
          enabled ? styles['checker-enabled'] : styles['checker-disabled'],
          styles.checker,
        )}
      />
    </Switch>
  );
};

export default CToggle;
