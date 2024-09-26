'use client';

import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import IconSearch from '@/assets/icon/icon-search-mono.svg';
import Input from '@/components/common/input';
import Layout from '@/components/layout';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useCourseNamesQuery, useCoursesQuery } from '@/queries/courseQuery';
import { useCourseSearchHistoryStore } from '@/stores/course-search-history';

import CourseListItem from '../_components/course-list/course-list';

import AutoCompleteList from './_components/autocomplete-list/autocomplete-list';
import NoResult from './_components/no-result/no-result';
import SearchHistory from './_components/search-history/search-history';
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
  const [searchKeyword, setSearchKeyword] = useState(keyword || '');
  const [fetch, setFetch] = useState(!!keyword);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const { addSearch } = useCourseSearchHistoryStore();
  const router = useRouter();
  const courseQuery = useCoursesQuery({ keyword: searchKeyword }, fetch);
  const { loadMoreRef, data } = useInfiniteScroll(courseQuery);
  const { data: courseNames } = useCourseNamesQuery();

  const handleChange = (value: string) => {
    setInputValue(value);
    setShowAutocomplete(value.length > 0);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (inputValue.length === 0) return;
    setSearchKeyword(inputValue);
    setFetch(true);
    e.preventDefault();
    addSearch(inputValue);
    router.push(`/course/search?keyword=${inputValue}`);
    inputRef.current?.blur();
    setShowAutocomplete(false);
  };
  const handleFocus = () => {
    setFocused(true);
    setShowAutocomplete(inputValue.length > 0);
  };
  const handleBlur = () => setFocused(false);
  const showResult = !focused && inputValue.length !== 0 && !showAutocomplete;

  useEffect(() => {
    if (keyword) {
      setInputValue(keyword);
      setSearchKeyword(keyword);
      setFetch(true);
    }
  }, [keyword]);

  useEffect(() => {
    if (loadMoreRef.current) {
      console.log('loadMoreRef.current', loadMoreRef.current);
    }
  }, [loadMoreRef]);

  return (
    <Layout
      key={searchKeyword}
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
      <div
        className={cx('container', {
          'container--result': showResult,
        })}
      >
        {inputValue.length === 0 && <SearchHistory />}
        {showAutocomplete && inputValue.length !== 0 && (
          <AutoCompleteList
            list={courseNames?.response!}
            keyword={inputValue}
          />
        )}
        {showResult &&
          (data?.pages.some(page => page.response.courses.length > 0) ? (
            data.pages.map(page =>
              page.response.courses.map(course => (
                <CourseListItem key={course.id} course={course} />
              )),
            )
          ) : (
            <div className={cx('no-results')}>
              <NoResult />
            </div>
          ))}
        <div ref={loadMoreRef} />
      </div>
    </Layout>
  );
};

export default CourseSearchPage;
