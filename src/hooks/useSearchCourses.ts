import { useCourseSearchHistoryStore } from '@/stores/course-search-history';
import { useRouter } from 'next/navigation';
import { RefObject, useCallback, useState } from 'react';

export const useSearchCourses = (
  initialKeyword: string = '',
  ref: RefObject<HTMLInputElement>,
) => {
  const [inputValue, setInputValue] = useState(initialKeyword);
  const [isFocused, setIsFocused] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const { addSearch } = useCourseSearchHistoryStore();
  const router = useRouter();

  const performSearch = useCallback(
    (value: string) => {
      setInputValue(value);
      addSearch(value);
      router.push(`/course/search?keyword=${encodeURIComponent(value)}`);
      setShowAutocomplete(false);
      ref.current?.blur();
    },
    [addSearch, router],
  );

  const handleChange = useCallback((value: string) => {
    setInputValue(value);
    setShowAutocomplete(value.length > 0);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setShowAutocomplete(inputValue.length > 0);
  }, [inputValue.length]);

  const handleBlur = useCallback(() => setIsFocused(false), []);

  return {
    inputValue,
    isFocused,
    showAutocomplete,
    performSearch,
    handleChange,
    handleFocus,
    handleBlur,
  };
};
