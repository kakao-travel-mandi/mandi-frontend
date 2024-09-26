import classNames from 'classnames/bind';

import Icon from '@/assets/colored-icon/empty_course.svg';

import styles from './no-result.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'no-result';

const NoResult = () => {
  return (
    <div className={cx(BLOCK)}>
      <Icon className={cx(`${BLOCK}__icon`)} />
      <div className={cx(`${BLOCK}__content`)}>
        <p className={cx(`${BLOCK}__content__title`)}>No results found</p>
        <p className={cx(`${BLOCK}__content__desc`)}>
          Ensure the spelling of your search term is correct.
        </p>
      </div>
    </div>
  );
};

export default NoResult;
