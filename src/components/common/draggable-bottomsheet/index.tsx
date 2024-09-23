import { Sheet } from 'react-modal-sheet';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const snapPoints = [-118, 0.4, 0];
const initialSnap = 1;

interface DraggableBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const cx = classNames.bind(styles);
const BLOCK = 'draggable-bottom-sheet';

const DraggableBottomSheet = ({
  isOpen,
  onClose,
  children,
}: DraggableBottomSheetProps) => {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      detent='full-height'
      className={cx(BLOCK)}
    >
      <Sheet.Container className={cx(`${BLOCK}__container`)}>
        <Sheet.Header />
        <Sheet.Content>
          <Sheet.Scroller draggableAt='both'>{children}</Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default DraggableBottomSheet;
