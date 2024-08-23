import {
  AnimationEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames/bind';

import Check from '@/assets/icon/icon-check-circle.svg';
import Alert from '@/assets/icon/icon-exclamation-circle.svg';
import {SnackbarStatus, useSnackbarProps} from '@/types/snackbar';

import styles from './SnackbarItem.module.scss';

const BLOCK = 'snackbar-item';

const cx = classNames.bind(styles);

interface SnackbarItemProps extends useSnackbarProps {
  status: SnackbarStatus;
  setStatus: Dispatch<SetStateAction<SnackbarStatus>>;
}

export const SnackbarItem = ({
  status,
  setStatus,
  content,
  position,
  type,
  full,
  icon,
}: SnackbarItemProps) => {
  const elemRef = useRef<HTMLDivElement>(null);
  const [animationClassName, setAnimationClassName] = useState<string[]>([]);

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (elemRef.current?.className.includes('enter') && status === 'open') {
      setAnimationClassName([`${BLOCK}--show`]);
    } else {
      setStatus(null);
    }
  };

  useEffect(() => {
    setAnimationClassName(
      status === 'open'
        ? [`${BLOCK}--enter`]
        : [`${BLOCK}--show`, `${BLOCK}--exit`],
    );
  }, [status]);

  return (
    <div
      ref={elemRef}
      className={cx(BLOCK, animationClassName, {
        [`${BLOCK}--full`]: full,
        [`${BLOCK}--center`]: position === 'center',
        [`${BLOCK}--bottom`]: position === 'bottom',
      })}
      onAnimationEnd={handleAnimationEnd}
    >
      {type === 'alert' && (
        <Alert className={cx(`${BLOCK}__icon`, `${BLOCK}__icon--alert`)} />
      )}
      {type === 'check' && (
        <Check className={cx(`${BLOCK}__icon`, `${BLOCK}__icon--check`)} />
      )}
      {icon && <icon.svg className={cx(`${BLOCK}__icon`)} fill={icon.fill} />}
      <span className={cx(`${BLOCK}__message`)}>{content}</span>
    </div>
  );
};
