import {Tab} from '@headlessui/react';
import classNames from 'classnames/bind';
import {useRouter} from 'next/navigation';

import styles from './TabItem.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'tab-item';

interface TabItemProps {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  url: string;
  selected?: boolean;
}


export const TabItem = ({title, icon: Icon, url, selected}: TabItemProps) => {
  // const router = useRouter();
  // const handleClick = () => router.push(url);

  return (
    <Tab className={cx(BLOCK)}>
      <Icon
        className={cx(`${BLOCK}__icon`, selected && `${BLOCK}__icon--selected`)}
      />
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
