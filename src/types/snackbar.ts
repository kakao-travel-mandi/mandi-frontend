export type SnackbarStatus = 'open' | 'close' | null;

export interface useSnackbarProps {
  content: string;
  type?: 'alert' | 'check';
  full?: boolean;
  position?: 'center' | 'bottom';
  icon?: {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    fill?: string;
  };
}
