'use client';
import { useEffect } from 'react';

import { useSnackbarStore } from '@/stores/snackbar';

import { SnackbarItem } from './snackbar-item';

export const SnackbarRoot = () => {
  const snackbars = useSnackbarStore(state => state.snackbars);

  // TODO: 더 좋은 방법이 있을지 고민해보기
  useEffect(() => {
    document.body.style.position = 'relative';
    return () => {
      document.body.style.position = '';
    };
  }, []);

  return (
    <div id='snackbarRoot'>
      {snackbars.map(snackbar => (
        <SnackbarItem key={snackbar.id} {...snackbar} />
      ))}
    </div>
  );
};
