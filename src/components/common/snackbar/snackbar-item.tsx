import { AnimationEvent, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';

import Check from '@/assets/icon/icon-check-circle.svg';
import Alert from '@/assets/icon/icon-exclamation-circle.svg';
import { useSnackbarStore } from '@/stores/snackbar';
import { Snackbar } from '@/types/snackbar';

import styles from './snackbar-item.module.scss';

const BLOCK = 'snackbar-item';

const cx = classNames.bind(styles);

export const SnackbarItem = ({
  id,
  isOpen,
  content,
  type,
  position,
  full,
  icon,
}: Snackbar) => {
  const removeSnackbar = useSnackbarStore(state => state.removeSnackbar);
  const elemRef = useRef<HTMLDivElement>(null);
  const [animationClassName, setAnimationClassName] = useState<string[]>([]);

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (elemRef.current?.className.includes(`${BLOCK}--enter`)) {
      setAnimationClassName([`${BLOCK}--show`]);
    } else {
      removeSnackbar(id);
    }
  };

  useEffect(() => {
    setAnimationClassName(
      isOpen ? [`${BLOCK}--enter`] : [`${BLOCK}--show`, `${BLOCK}--exit`],
    );
  }, [isOpen]);

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
