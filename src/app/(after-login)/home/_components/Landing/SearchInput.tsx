'use client';

import { useRouter } from 'next/navigation';

import IconSearch from '@/assets/icon/icon-search-mono.svg';
import Input from '@/components/common/input';

const SearchInput = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push('/course/search');
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
