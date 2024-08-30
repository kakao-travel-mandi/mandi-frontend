import { useCallback } from 'react';

import { SNACKBAR_DURATION } from '@/constants/snackbar';
import { useSnackbarStore } from '@/stores/snackbar';
import { Snackbar } from '@/types/snackbar';

export interface SnackbarItemProps {
  content: string;
  type?: 'alert' | 'check';
  full?: boolean;
  position?: 'center' | 'bottom';
  icon?: {
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    fill?: string;
  };
}
export const useSnackbar = () => {
  const { removeSnackbar, upsertSnackbar } = useSnackbarStore(state => state);
  const createSnackbar = useCallback((snackbar: SnackbarItemProps) => {
    const newItem: Snackbar = {
      id: String(Date.now()),
      isOpen: true,
      ...snackbar,
    };
    upsertSnackbar(newItem); // 스낵바 추가
    setTimeout(() => {
      upsertSnackbar({ ...newItem, isOpen: false });
    }, SNACKBAR_DURATION);
  }, [upsertSnackbar]);
  const deleteSnackbar = useCallback((id: string) => {
    removeSnackbar(id);
  }, [removeSnackbar]);

  return { createSnackbar, deleteSnackbar };
};
