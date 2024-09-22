'use client';

import IconSearch from '@/assets/icon/icon-search-mono.svg';
import Input from '@/components/common/input';

const SearchInput = () => {
  return (
    <button
      onClick={() => {
        //TODO: 검색 페이지로 이동 추가 필요
        alert('검색 페이지로 이동 추가 필요');
      }}
    >
      <Input
        value=''
        placeholder='Course name, Location or Other.'
        leftIcon={<IconSearch width={20} height={20} />}
        style={{
          pointerEvents: 'none',
        }}
      />
    </button>
  );
};

export default SearchInput;
