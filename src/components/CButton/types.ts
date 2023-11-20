export interface CButtonProps {
  type: 'button' | 'submit';
  children: React.ReactNode;
  size: 'smaller' | 'bigger';
  variant: 'primary' | 'secondary' | 'tertiary';
  cb?: () => void;
}
