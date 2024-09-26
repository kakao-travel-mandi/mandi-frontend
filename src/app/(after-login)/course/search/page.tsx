'use client';

import { useRef, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import IconSearch from '@/assets/icon/icon-search-mono.svg';
import Input from '@/components/common/input';
import Layout from '@/components/layout';
import { useCourseNamesQuery } from '@/queries/courseQuery';
import { useCourseSearchHistoryStore } from '@/stores/course-search-history';

import AutoCompleteList from './_components/autocomplete-list/autocomplete-list';
import SearchHistory from './_components/search-history/search-history';
import SearchedCourses from './_components/searched-courses/searched-courses';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

const CourseSearchPage = ({
  searchParams: { keyword },
}: {
  searchParams: {
    keyword: string;
  };
}) => {
  const [inputValue, setInputValue] = useState(
    keyword === undefined ? '' : keyword,
  );
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const { addSearch } = useCourseSearchHistoryStore();
  const router = useRouter();
  const { data: courseNames } = useCourseNamesQuery();

  const handleChange = (value: string) => {
    setInputValue(value);
    setShowAutocomplete(value.length > 0);
  };
  const search = (value: string) => {
    setInputValue(value);
    addSearch(value);
    router.push(`/course/search?keyword=${value}`);
    inputRef.current?.blur();
    setShowAutocomplete(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length === 0) return;
    search(inputValue);
  };
  const handleFocus = () => {
    setFocused(true);
    setShowAutocomplete(inputValue.length > 0);
  };
  const handleBlur = () => setFocused(false);
  const showResult = !focused && inputValue.length !== 0 && !showAutocomplete;

  return (
    <Layout
      hasTabBar={false}
      hasTopNav={true}
      back={true}
      topNavBarClassName={cx('top-navbar')}
      topNavBarContents={
        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            type='search'
            value={inputValue}
            onChange={handleChange}
            placeholder='Course name, Location or Other.'
            leftIcon={<IconSearch width={20} height={20} />}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cx('input')}
          />
        </form>
      }
    >
      <div className={cx('container')}>
        {inputValue.length === 0 && (
          <SearchHistory handleClickListItem={search} />
        )}
        {showAutocomplete && inputValue.length !== 0 && (
          <AutoCompleteList
            list={courseNames?.response!}
            keyword={inputValue}
            handleClickListItem={search}
          />
        )}
        {showResult && <SearchedCourses keyword={keyword} />}
      </div>
    </Layout>
  );
};

export default CourseSearchPage;
