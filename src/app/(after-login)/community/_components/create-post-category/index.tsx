import { useState } from 'react';

import classNames from 'classnames/bind';

import IconArrowDown from '@/assets/icon/icon-arrow-down-small.svg';
import BottomSheet from '@/components/common/bottomsheet';
import Input from '@/components/common/input';

import styles from './createPostCategory.module.scss';

const cx = classNames.bind(styles);

interface CreatePostCategoryProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CreatePostCategory = ({
  selectedCategory,
  onSelect,
}: CreatePostCategoryProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleCategorySelect = (category: string) => {
    onSelect(category);
    setIsBottomSheetOpen(false);
  };

  return (
    <div>
      <Input
        value={selectedCategory}
        type='text'
        label='Category'
        rightIcon={<IconArrowDown />}
        placeholder='Please select a category.'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
        onClick={() => setIsBottomSheetOpen(true)}
      />

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      >
        <div className={cx('container__bottomsheet', 'subtitle1-semibold')}>
          {['TOURISM', 'TREKKING', 'DINING', 'ACCOMMODATION', 'OTHER'].map(
            category => (
              <div
                key={category}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ),
          )}
        </div>
      </BottomSheet>
    </div>
  );
};

export default CreatePostCategory;
