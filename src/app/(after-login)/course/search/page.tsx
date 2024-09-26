'use client';

import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import NoResultIcon from '@/assets/colored-icon/empty_course.svg';
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
  const { loadMoreRef, data, status } = useInfiniteScroll(courseQuery);
  const { data: courseNames } = useCourseNamesQuery();

  const handleChange = (value: string) => {
    setInputValue(value);
    setShowAutocomplete(value.length > 0);
  };
  const search = (value: string) => {
    setInputValue(value);
    setSearchKeyword(value);
    setFetch(true);
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

  useEffect(() => {
    if (keyword) {
      setInputValue(keyword);
      setSearchKeyword(keyword);
      setFetch(true);
    }
  }, [keyword]);

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
        {showResult &&
          status === 'success' &&
          (data?.pages.some(page => page.response.courses.length > 0) ? (
            data.pages.map(page =>
              page.response.courses.map(course => (
                <CourseListItem key={course.id} course={course} />
              )),
            )
          ) : (
            <div className={cx('no-results')}>
              <NoResult
                title='No results found'
                desc='Ensure the spelling of your search term is correct.'
                icon={NoResultIcon}
              />
            </div>
          ))}
        <div ref={loadMoreRef} />
      </div>
    </Layout>
  );
};

export default CourseSearchPage;
