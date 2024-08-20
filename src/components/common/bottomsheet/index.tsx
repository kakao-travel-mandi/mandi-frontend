import {ReactNode} from 'react';

import classNames from 'classnames/bind';

import styles from './bottomsheet.module.scss';

const cn = classNames.bind(styles);

const BLOCK = 'bottomsheet';

export interface BottomSheetProps {
  /**
   * 바텀 시트 내용
   */
  children: ReactNode;
  /**
   * 바텀 시트 열림 여부
   */
  isOpen: boolean;
  /**
   * 바텀 시트 닫힘 함수
   */
  onClose: () => void;
}

/**
 * 바텀 시트 컴포넌트
 */
const BottomSheet = ({children, isOpen, onClose}: BottomSheetProps) => {
  return (
    <div
      className={cn(BLOCK, {
        [`${BLOCK}--active`]: isOpen,
      })}
    >
      <div className={cn(`${BLOCK}__overlay`)} onClick={onClose}></div>
      <div
        className={cn(`${BLOCK}__sheet`, {
          [`${BLOCK}__sheet--active`]: isOpen,
        })}
      >
        <div className={cn(`${BLOCK}__handle`)}></div>
        <div className={cn(`${BLOCK}__content`)}>{children}</div>
        <div className={cn(`${BLOCK}__bottom`)}></div>
      </div>
    </div>
  );
};

export default BottomSheet;