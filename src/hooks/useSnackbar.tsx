import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { SnackbarItem } from "@/components/SnackbarItem";

// TODO: 시간 2초로 다시 변경하기
const SNACKBAR_DURATION = 2000;

type SnackbarStatus = "open" | "close" | null;

export type Snackbar = {
  status: SnackbarStatus;
  setStatus: Dispatch<SetStateAction<SnackbarStatus>>;
} & UseSnackbar;

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
    setStatus("open");
    setTimeout(() => {
      setStatus("close");
    }, SNACKBAR_DURATION);
  }, []);

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
