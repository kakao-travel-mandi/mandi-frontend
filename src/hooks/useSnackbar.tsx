import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { createPortal } from "react-dom";

import { SnackbarItem } from "@/components/SnackbarItem";
import { SNACKBAR_DURATION } from "@/constants/snackbar";

// TODO: 훅에서 쓰이는 타입은?
type SnackbarStatus = "open" | "close" | null;

export type Snackbar = {
  status: SnackbarStatus;
  setStatus: Dispatch<SetStateAction<SnackbarStatus>>;
} & UseSnackbar;

// TODO: 훅도 interface?
export type UseSnackbar = {
  content: string;
  type?: "alert" | "check";
  full?: boolean;
  position?: "center" | "bottom";
};

export const useSnackbar = ({
  content,
  type,
  full = false,
  position = "center",
}: UseSnackbar) => {
  const [status, setStatus] = useState<SnackbarStatus>(null);

  const openSnackbar = useCallback(() => {
    if (status === null) {
      setStatus("open");
      setTimeout(() => {
        setStatus("close");
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
          document.querySelector("#snackbarRoot")!
        )
      : null,
    open: openSnackbar,
  };
};
