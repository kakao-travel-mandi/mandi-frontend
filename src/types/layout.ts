import { ReactNode } from 'react';

import { TabBarProps } from '@/components/common/tabbar';
import { TopNavBarProps } from '@/components/common/top-navbar';

type BaseLayoutProps = {
  children: ReactNode;
};

type BothNavLayoutProps = BaseLayoutProps &
  TopNavBarProps &
  TabBarProps & {
    hasTopNav: true;
    hasTabBar: true;
  };

type NoNavLayoutProps = BaseLayoutProps & {
  hasTopNav: false;
  hasTabBar: false;
};

type TopNavLayoutProps = BaseLayoutProps &
  TopNavBarProps & {
    hasTopNav: true;
    hasTabBar: false;
  };

type TabBarLayoutProps = BaseLayoutProps &
  TabBarProps & {
    hasTopNav: false;
    hasTabBar: true;
  };

export type LayoutProps =
  | TopNavLayoutProps
  | TabBarLayoutProps
  | BothNavLayoutProps
  | NoNavLayoutProps;
