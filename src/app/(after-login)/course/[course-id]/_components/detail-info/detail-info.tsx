import classNames from 'classnames/bind';

import styles from './detail-info.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'detail-info';

interface DetailInfoProps {
  icon: React.ElementType;
  content: React.ReactNode;
}

const DetailInfo = ({ icon: Icon, content }: DetailInfoProps) => (
  <div className={cx(BLOCK)}>
    <Icon className={cx(`${BLOCK}__icon`)} />
    {typeof content === 'string' ? (
      <span className={cx(`${BLOCK}__text`)}>{content}</span>
    ) : (
      content
    )}
  </div>
);

export default DetailInfo;
