import {useRef} from 'react';

import {Tab} from '@headlessui/react';
import classNames from 'classnames/bind';

import styles from './TabItem.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'tab-item';

interface TabItemProps {
  title: string;
  icon: React.ReactNode;
  url: string;
  selected?: boolean;
}

export const TabItem = ({title, icon, url, selected}: TabItemProps) => {
  // const router = useRouter();
  // const handleClick = () => router.push(url);

  return (
    <Tab
      className={cx(BLOCK, selected && `${BLOCK}--selected`)}
      // onClick={handleClick}
    >
      <div
        className={cx(`${BLOCK}__icon`, selected && `${BLOCK}__icon--selected`)}
      >
        {icon}
      </div>
      <span
        className={cx(
          `${BLOCK}__title`,
          selected && `${BLOCK}__title--selected`,
        )}
      >
        {title}
      </span>
    </Tab>
  );
};