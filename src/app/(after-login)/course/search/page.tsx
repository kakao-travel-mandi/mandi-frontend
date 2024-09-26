'use client';

import Layout from '@/components/layout';
import IconSearch from '@/assets/icon/icon-search-mono.svg';
import Input from '@/components/common/input';
import { useRef, useState } from 'react';
import SearchHistory from './_components/search-history/search-history';
import { useCourseSearchHistoryStore } from '@/stores/course-search-history';
import { useRouter } from 'next/navigation';

import styles from './page.module.scss';
import classNames from 'classnames/bind';
import { useCourseNamesQuery, useCoursesQuery } from '@/queries/courseQuery';
import CourseListItem from '../_components/course-list/course-list';
import useInfiniteScroll from '@/queries/useInfiniteScroll';
import { Autocomplete } from '@react-google-maps/api';
import AutoCompleteList from './_components/autocomplete-list/autocomplete-list';

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
  console.log(loadMoreRef);
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
        {inputValue.length === 0 && <SearchHistory />}
        {showAutocomplete && inputValue.length !== 0 && (
          <AutoCompleteList
            list={courseNames?.response!}
            keyword={inputValue}
          />
        )}
        {!focused && inputValue.length !== 0 && !showAutocomplete && (
          <div className={cx('result')}>
            {data?.pages.map(page =>
              page.response.courses.map(course => (
                <CourseListItem key={course.id} course={course} />
              )),
            )}
          </div>
        )}
        <div
          ref={loadMoreRef}
          style={{
            height: '20px',
            backgroundColor: 'red',
            flexShrink: 0,
          }}
        />
      </div>
    </Layout>
  );
};

export default CourseSearchPage;
