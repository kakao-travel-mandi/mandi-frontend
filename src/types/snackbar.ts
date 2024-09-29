export type Snackbar = {
  id: string;
  isOpen: boolean;
  content: string;
  type?: 'alert' | 'check';
  full?: boolean;
  position?: 'center' | 'bottom';
  icon?: {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    fill?: string;
  };
};