import styles from './CTextArea.module.css';
import { CTextAreaProps } from './types';
const CTextArea: React.FC<CTextAreaProps> = ({
  value,
  onChange,
  placeholder,
  cols,
  rows,
}) => {
  return (
    <textarea
      className={styles['c-text-area']}
      placeholder={placeholder}
      cols={cols}
      rows={rows}
      onChange={onChange}
      value={value}
    />
  );
};

export default CTextArea;
