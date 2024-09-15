'use client';

import IconSearch from '@/assets/icon/icon-search-mono.svg';
import Input from '@/components/common/input';

const SearchInput = () => {
  return (
    <Input
      value=''
      placeholder='Course name, Location or Other.'
      leftIcon={<IconSearch width={20} height={20} />}
      onChange={() => {}}
    />
  );
};

export default SearchInput;
