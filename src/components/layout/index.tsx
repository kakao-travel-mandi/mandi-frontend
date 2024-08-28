import {ReactNode} from 'react';

import classNames from 'classnames/bind';

import {TabBar} from '../common/tabbar';
import {TopNavBar} from '../common/top-navbar';

import styles from './layout.module.scss';

const cx = classNames.bind(styles);

const BLOCK = 'layout';

export const Layout = ({
  back,
  title,
  hasTopNav,
  hasTabBar,
  children,
}: {
  back?: boolean;
  title?: string;
  hasTopNav: boolean;
  hasTabBar: boolean;
  children: ReactNode;
}) => {
  return (
    <main className={cx(BLOCK)}>
      {hasTopNav && <TopNavBar back={back} title={title} />}
      {children}
      {hasTabBar && <TabBar className={cx(`${BLOCK}__tabbar`)} />}
    </main>
  );
};

export default Layout;
