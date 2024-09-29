import classNames from 'classnames/bind';

import styles from './no-result.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'no-result';

interface NoResultProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

const NoResult = ({ icon: Icon, title, desc }: NoResultProps) => {
  return (
    <div className={cx(BLOCK)}>
      <Icon className={cx(`${BLOCK}__icon`)} />
      <div className={cx(`${BLOCK}__content`)}>
        <p className={cx(`${BLOCK}__content__title`)}>{title}</p>
        <p className={cx(`${BLOCK}__content__desc`)}>{desc}</p>
      </div>
    </div>
  );
};

export default NoResult;
