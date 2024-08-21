import {useCallback, useState} from 'react';
import {createPortal} from 'react-dom';

import {SnackbarItem} from '@/components/common/snackbar/SnackbarItem';
import {SNACKBAR_DURATION} from '@/constants/snackbar';
import {SnackbarStatus, useSnackbarProps} from '@/types/snackbar';

export const useSnackbar = ({
  content,
  type,
  full = false,
  position = 'center',
}: useSnackbarProps) => {
  const [status, setStatus] = useState<SnackbarStatus>(null);

  const openSnackbar = useCallback(() => {
    if (status === null) {
      setStatus('open');
      setTimeout(() => {
        setStatus('close');
      }, SNACKBAR_DURATION);
    }
  }, [status]);

  return {
    snackbar: !!status
      ? createPortal(
          <SnackbarItem
            status={status}
            setStatus={setStatus}
            content={content}
            full={full}
            position={position}
            type={type}
          />,
          document.querySelector('#snackbarRoot')!,
        )
      : null,
    open: openSnackbar,
  };
};