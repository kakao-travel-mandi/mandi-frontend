import classNames from 'classnames/bind';
import styles from './course-list.module.scss';
import Badge from '@/components/common/badge';

import ClockIcon from '@/assets/icon/icon-clock.svg';
import RunningIcon from '@/assets/icon/exercise_running.svg';
import StarIcon from '@/assets/icon/icon-star.svg';
import { useRouter } from 'next/navigation';

const detailData = [
  {
    icon: ClockIcon,
    content: '1:30',
  },
  {
    icon: RunningIcon,
    content: '1.93 km',
  },
  {
    icon: StarIcon,
    content: '4.75',
  },
];

const cx = classNames.bind(styles);

const BLOCK = 'course-item';

const CourseListItem = () => {
  const router = useRouter();
  const handleClick = () => router.push('/course/1');
  return (
    <div className={cx(BLOCK)} onClick={handleClick}>
      <div className={cx(`${BLOCK}__image`)}></div>
      <div className={cx(`${BLOCK}__content`)}>
        <div className={cx(`${BLOCK}__content__info`)}>
          <h2 className={cx(`${BLOCK}__content__info__title`)}>Sinseondae</h2>
          <h2 className={cx(`${BLOCK}__content__info__address`)}>
            Yongdang-dong, Nam-gu, Busan
          </h2>
        </div>
        <div className={cx(`${BLOCK}__content__details`)}>
          {detailData.map((item, index) => (
            <div key={index} className={cx(`${BLOCK}__content__details__item`)}>
              <item.icon
                className={cx(`${BLOCK}__content__details__item__icon`)}
              />
              <div className={cx(`${BLOCK}__content__details__item__text`)}>
                {item.content}
              </div>
            </div>
          ))}
        </div>
        <Badge
          text='Easy'
          color='green'
          rounded='small'
          className={cx(`${BLOCK}__content__difficulty`)}
        />
      </div>
    </div>
  );
};

export default CourseListItem;
