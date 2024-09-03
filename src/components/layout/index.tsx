import { ReactNode } from 'react';

import classNames from 'classnames/bind';

import { TabBar } from '../common/tabbar';
import { TopNavBar } from '../common/top-navbar';

import styles from './layout.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'layout';

export const Layout = ({
  back,
  title,
  hasTopNav,
  hasTabBar,
  children,
  onBack,
}: {
  back?: boolean;
  title?: string;
  hasTopNav: boolean;
  hasTabBar: boolean;
  children: ReactNode;
  onBack?: () => void;
}) => {
  return (
    <main
      className={cx(BLOCK, [
        `${BLOCK}__${hasTopNav && !hasTabBar ? 'top-nav' : ''}`,
        `${BLOCK}__${hasTabBar && !hasTopNav ? 'tabbar' : ''}`,
        `${BLOCK}__${hasTopNav && hasTabBar ? 'both-nav' : ''}`,
      ])}
    >
      {hasTopNav && <TopNavBar back={back} title={title} onBack={onBack} />}
      <div
        className={cx(`${BLOCK}__content`, [
          `${BLOCK}__content--${hasTopNav && !hasTabBar ? 'top-nav' : ''}`,
          `${BLOCK}__content--${hasTabBar && !hasTopNav ? 'tabbar' : ''}`,
          `${BLOCK}__content--${hasTopNav && hasTabBar ? 'both-nav' : ''}`,
        ])}
      >
        {children}
      </div>
      {hasTabBar && <TabBar className={cx(`${BLOCK}__tabbar`)} />}
    </main>
  );
};

export default Layout;
