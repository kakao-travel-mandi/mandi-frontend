import {
  ReactNode,
  SyntheticEvent,
  TouchEventHandler,
  use,
  useEffect,
  useRef,
} from 'react';

import classNames from 'classnames/bind';

import Button from '../button';

import styles from './draggable-bottomsheet.module.scss';

export const MIN_Y = 118;
export const MAX_Y = window.innerHeight - 160;
export const DEFAULT_Y = window.innerHeight - 528;
// export const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y;

const cn = classNames.bind(styles);

const BLOCK = 'bottomsheet';

export interface DraggableBottomSheetProps {
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

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY: number;
    movingDirection: 'none' | 'down' | 'up';
  };
  isContentAreaTouched: boolean;
  base: typeof MIN_Y | typeof MAX_Y | typeof DEFAULT_Y;
}
const initialMetrics: BottomSheetMetrics = {
  touchStart: {
    sheetY: 0,
    touchY: 0,
  },
  touchMove: {
    prevTouchY: 0,
    movingDirection: 'none',
  },
  isContentAreaTouched: false,
  base: DEFAULT_Y,
};

const DraggableBottomSheet = ({
  children,
  isOpen,
  onClose,
}: DraggableBottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metrics = useRef<BottomSheetMetrics>(initialMetrics);

  const canUserMoveBottomSheet = () => {
    const { touchMove, isContentAreaTouched } = metrics.current;

    if (!isContentAreaTouched) {
      return true;
    }

    if (sheetRef.current!.getBoundingClientRect().y !== MIN_Y) {
      return true;
    }

    if (touchMove.movingDirection === 'down') {
      return contentRef.current!.scrollTop <= 0;
    }
    return false;
  };
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = e => {
    const { touchStart } = metrics.current;
    touchStart.sheetY = sheetRef.current!.getBoundingClientRect().y;
    touchStart.touchY = e.touches[0].clientY;
    sheetRef.current!.style.setProperty('transition', 'none');

    // TODO: 바디 스크롤 막기
    document.body.style.setProperty('overflow', 'hidden');
  };
  const handleTouchMove = (e: TouchEvent) => {
    const { touchStart, touchMove } = metrics.current;
    const currentTouch = e.touches[0]; // 드래그 중인 터치 정보

    // 처음 인경우 는 이전 터치 위치를 현재 터치 위치로 설정
    if (touchMove.prevTouchY === 0) {
      touchMove.prevTouchY = touchStart.touchY;
    }
    // 터치 방향 알기
    touchMove.movingDirection =
      touchStart.touchY < e.changedTouches[0].clientY ? 'down' : 'up';

    if (canUserMoveBottomSheet()) {
      console.log('can move');
      // e.preventDefault();
      const touchOffset = currentTouch.clientY - touchStart.touchY;
      let nextSheetY = touchStart.sheetY + touchOffset;

      // 범위 제한
      nextSheetY = Math.max(MIN_Y, Math.min(nextSheetY, MAX_Y));

      sheetRef.current!.style.setProperty(
        'transform',
        `translateY(${nextSheetY - DEFAULT_Y}px)`,
      );
    }
  };
  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = e => {
    sheetRef.current!.style.setProperty('transition', 'transform 0.35s');
    const { touchMove, base } = metrics.current;

    const currentSheetY = sheetRef.current!.getBoundingClientRect().y;

    // 스냅 위치 결정
    let snapPosition = base;
    if (touchMove.movingDirection === 'down') {
      if (currentSheetY < DEFAULT_Y) {
        snapPosition = DEFAULT_Y;
      } else {
        snapPosition = MAX_Y;
      }
    }
    if (touchMove.movingDirection === 'up') {
      if (currentSheetY > DEFAULT_Y) {
        snapPosition = DEFAULT_Y;
      } else {
        snapPosition = MIN_Y;
      }
    }

    // 변환 적용
    const translateY = snapPosition - DEFAULT_Y;
    sheetRef.current!.style.setProperty(
      'transform',
      `translateY(${translateY}px)`,
    );

    // metrics 초기화 및 새로운 기준점 설정
    metrics.current = {
      ...initialMetrics,
      base: snapPosition,
    };
  };
  const minimizeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.style.setProperty('transition', 'transform 0.35s');
      const translateY = MAX_Y - DEFAULT_Y;
      sheetRef.current.style.setProperty(
        'transform',
        `translateY(${translateY}px)`,
      );
      metrics.current = {
        ...initialMetrics,
        base: MAX_Y,
      };
    }
  };

  useEffect(() => {
    sheetRef.current!.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
  }, []);
  return (
    <div
      className={cn(BLOCK, {
        [`${BLOCK}--active`]: isOpen,
      })}
    >
      <div
        ref={sheetRef}
        className={cn(`${BLOCK}__sheet`, {
          [`${BLOCK}__sheet--active`]: isOpen,
        })}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={cn(`${BLOCK}__handle`)}></div>
        <div ref={contentRef} className={cn(`${BLOCK}__content`)}>
          {children}
          {/* <Button color='green' size='full' onClick={minimizeSheet}>
            minimize
          </Button> */}
        </div>
        {/* <div className={cn(`${BLOCK}__bottom`)}></div> */}
      </div>
    </div>
  );
};

export default DraggableBottomSheet;
