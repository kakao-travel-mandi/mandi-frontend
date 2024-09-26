import classNames from 'classnames/bind';

import PauseIcon from '@/assets/icon/icon-pause-mono.svg';
import PlayIcon from '@/assets/icon/icon-play-mono.svg';
import StopIcon from '@/assets/icon/icon-stop-mono.svg';

import styles from './button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
  type: 'stop' | 'play' | 'pause';
  onClick?: () => void;
}

const buttonConfig = {
  stop: {
    icon: StopIcon,
    className: 'button--red',
    text: 'Complete',
  },
  play: {
    icon: PlayIcon,
    className: 'button--black',
    text: 'Rest',
  },
  pause: {
    icon: PauseIcon,
    className: 'button--black',
    text: 'Rest',
  },
};

const Button = ({ type,onClick}: ButtonProps) => {
  const { icon: Icon, className, text } = buttonConfig[type];

  return (
    <button className={cx('container')} onClick={onClick}>
      <div className={cx('button', className)}>
        <Icon className={cx('button__icon')} />
      </div>
      <span className={cx('description')}>{text}</span>
    </button>
  );
};

export default Button;
