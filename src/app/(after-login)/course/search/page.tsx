'use client';

import { useRef } from 'react';
import classNames from 'classnames/bind';

import IconSearch from '@/assets/icon/icon-search-mono.svg';
import Input from '@/components/common/input';
import Layout from '@/components/layout';
import { useCourseNamesQuery } from '@/queries/courseQuery';

import AutoCompleteList from './_components/autocomplete-list/autocomplete-list';
import SearchHistory from './_components/search-history/search-history';
import SearchedCourses from './_components/searched-courses/searched-courses';
import styles from './page.module.scss';
import { useSearchCourses } from '@/hooks/useSearchCourses';

const cx = classNames.bind(styles);

interface CourseSearchPageProps {
  searchParams: {
    keyword: string;
  };
}

const CourseSearchPage = ({
  searchParams: { keyword },
}: CourseSearchPageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: courseNames } = useCourseNamesQuery();
  const {
    inputValue,
    isFocused,
    showAutocomplete,
    performSearch,
    handleChange,
    handleFocus,
    handleBlur,
  } = useSearchCourses(keyword || '', inputRef);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length === 0) return;
    performSearch(inputValue);
  };

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
        {inputValue.length === 0 ? (
          <SearchHistory handleClickListItem={performSearch} />
        ) : showAutocomplete ? (
          <AutoCompleteList
            list={courseNames?.response!}
            keyword={inputValue}
            handleClickListItem={performSearch}
          />
        ) : !isFocused && keyword ? (
          <SearchedCourses keyword={keyword} />
        ) : null}
      </div>
    </Layout>
  );
};

export default CourseSearchPage;
