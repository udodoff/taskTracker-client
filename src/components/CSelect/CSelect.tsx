import { ICSelectProps } from './types';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import styles from './CSelect.module.css';

const CSelect: React.FC<ICSelectProps> = ({ onChange, value, options }) => {
  return (
    <div className={styles['c-select']}>
      <Listbox value={value} onChange={onChange}>
        <div className={styles.wrapper}>
          <Listbox.Button className={styles['list-box']}>
            <span className={styles.selected}>
              {options.length === 0
                ? 'No Tasks yet'
                : typeof value === 'string'
                ? value
                : value == null
                ? 'Parent task'
                : value.name}
            </span>
            <span className={styles['icon-wrapper']}>
              <ChevronUpDownIcon className={styles.icon} aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className={styles.options}>
            {options.map((option, idx) => (
              <Listbox.Option
                key={idx}
                className={styles.option}
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className={styles['option-text']}>
                      {typeof option === 'string' ? option : option.name}
                    </span>
                    {selected ? (
                      <span className={styles['check-wrapper']}>
                        <CheckIcon
                          className={styles['check-icon']}
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default CSelect;
