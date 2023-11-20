export interface CTextAreaProps {
  placeholder: string;
  value: string | number;
  cols: number;
  rows: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
