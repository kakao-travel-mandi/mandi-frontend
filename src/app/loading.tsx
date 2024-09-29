import React from 'react';

import classNames from 'classnames/bind';

import styles from './loading.module.scss';

const BLOCK = 'loading';
const cn = classNames.bind(styles);

const Loading = () => {
  return (
    <div className={cn(BLOCK)}>
      <div className={cn(`${BLOCK}__spinner`)}></div>
    </div>
  );
};

export default Loading;
