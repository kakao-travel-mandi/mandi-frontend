import classNames from 'classnames/bind';

import { TrekkerState } from '@/stores/trekker';
import { formatDistance, formatTime } from '@/utils/trekker';

import Button from './button/button';
import styles from './trekker.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'trekker';

interface TrekkingDataProps {
  title: string;
  content: string;
}
export const TrekkingData = ({ title, content }: TrekkingDataProps) => (
  <div className={cx('trekking_data')}>
    <div className={cx('trekking_data__title')}>{title}</div>
    <span className={cx('trekking_data__content')}>{content}</span>
  </div>
);

interface TrekkerProps {
  courseName: string;
  state: TrekkerState;
  time: number;
  distance: number;
  handleClickPlayAndPause: () => void;
  handleClickStop: () => void;
}
const Trekker = ({
  courseName,
  time,
  distance,
  state,
  handleClickPlayAndPause,
  handleClickStop,
}: TrekkerProps) => {
  return (
    <div className={cx(BLOCK)}>
      <h3 className={cx(`${BLOCK}__name`)}>{courseName}</h3>
      <div className={cx(`${BLOCK}__data`)}>
        <TrekkingData title='Time' content={formatTime(time)} />
        <div className={cx('divider')} />
        <TrekkingData title='Distance' content={formatDistance(distance)} />
      </div>
      <div className={cx(`${BLOCK}__buttons`)}>
        <Button
          type={state === 'Running' ? 'pause' : 'play'}
          onClick={handleClickPlayAndPause}
        />
        <Button type='stop' onClick={handleClickStop} />
      </div>
    </div>
  );
};

export default Trekker;
