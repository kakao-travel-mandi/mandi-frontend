import { ReactNode } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import IconPencil from '@/assets/icon/icon-pencil.svg';
import Chip from '@/components/common/chip/index';

import { Menubox } from '../common/menubox';

import styles from './communityLayout.module.scss';

interface CommunityLayoutProps {
  children: ReactNode;
  activeChip: string | null;
  setActiveChip: (chip: string | null) => void; // 상태를 업데이트할 함수
  sortOption: string;
  setSortOption: (sortOption: string) => void;
}

const cx = classNames.bind(styles);

const CommunityLayout = ({
  children,
  activeChip,
  setActiveChip,
  sortOption,
  setSortOption,
}: CommunityLayoutProps) => {
  const router = useRouter();
  const handlePencilClick = () => {
    router.push('/community/create-post'); // 페이지 이동
  };
  const handleChipClick = (chip: string) => {
    setActiveChip(activeChip === chip ? null : chip);
  };
  const MenuBoxItems = [
    {
      content: 'Latest',
      onClick: () => setSortOption('Latest'),
    },
    {
      content: 'Popular',
      onClick: () => setSortOption('Popular'),
    },
  ];

  return (
    <div className={cx('container')}>
      <div className={cx('container__nav')}>
        <Chip
          isActive={activeChip === 'All'}
          onClick={() => handleChipClick('All')}
        >
          All
        </Chip>
        <Chip
          isActive={activeChip === 'Tourism'}
          onClick={() => handleChipClick('Tourism')}
        >
          Tourism
        </Chip>
        <Chip
          isActive={activeChip === 'Trekking'}
          onClick={() => handleChipClick('Trekking')}
        >
          Trekking
        </Chip>
        <Chip
          isActive={activeChip === 'Dining'}
          onClick={() => handleChipClick('Dining')}
        >
          Dining
        </Chip>
        <Chip
          isActive={activeChip === 'Accommodation'}
          onClick={() => handleChipClick('Accommodation')}
        >
          Accommodation
        </Chip>
        <Chip
          isActive={activeChip === 'Other'}
          onClick={() => handleChipClick('Other')}
        >
          Other
        </Chip>
      </div>
      <div className={cx('container__chip')}>
        <Menubox
          triggerButton={<Chip action={true}>{sortOption}</Chip>}
          items={MenuBoxItems}
        />
      </div>

      <div className={cx('container__content')}>{children}</div>
      <div onClick={handlePencilClick} className={cx('container__pencil')}>
        <IconPencil />
      </div>
    </div>
  );
};

export default CommunityLayout;
