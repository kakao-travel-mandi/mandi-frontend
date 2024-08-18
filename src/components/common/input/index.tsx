'use client';

import {useState} from 'react';

import {
  Field,
  Input as HeadlessInput,
  Description as Helper,
  Label,
} from '@headlessui/react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import styles from './input.module.scss';

const cn = classNames.bind(styles);

const BLOCK = 'field';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onError'> {
  /**
   * 입력 값
   */
  value: string;
  /**
   * 라벨
   */
  label?: string;
  /**
   * 헬퍼 텍스트
   */
  helper?: string;
  /**
   * 플레이스홀더
   */
  placeholder?: string;
  /**
   * 왼쪽 아이콘
   */
  leftIcon?: string;
  /**
   * 오른쪽 아이콘
   */
  rightIcon?: string;
  /**
   * 스타일
   */
  style?: React.CSSProperties;
  /**
   * 타입
   */
  type?: string;
  /**
   * 에러 메세지
   */
  error?: string;
  /**
   * 에러 처리 함수
   */
  onError?: (value: string) => void;
  /**
   * 삭제 함수
   */
  onDelete?: () => void;
}

/**
 * 인풋 컴포넌트
 */
const Input = ({
  value,
  label = '',
  helper = '',
  placeholder = '',
  leftIcon,
  rightIcon,
  type = 'text',
  style,
  error = '',
  onError,
  onDelete,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Field className={cn(BLOCK)} style={style}>
      {label && (
        <Label
          className={cn(`label4-regular`, `${BLOCK}__label`, {
            [`${BLOCK}__label--error`]: !!error,
          })}
        >
          {label}
        </Label>
      )}
      <div className={cn(`${BLOCK}__wrapper`)}>
        {leftIcon && (
          <Image
            src={leftIcon}
            alt="left icon"
            width={20}
            height={20}
            className={cn(`${BLOCK}__icon`, `${BLOCK}__icon--left`, {
              [`${BLOCK}__icon--error`]: !!error,
            })}
          />
        )}
        <HeadlessInput
          value={value}
          type={type}
          placeholder={placeholder}
          className={cn(`body1-regular`, `${BLOCK}__input`, {
            [`${BLOCK}__input--leftIcon`]: !!leftIcon,
            [`${BLOCK}__input--rightIcon`]: !!rightIcon,
            [`${BLOCK}__input--focused`]: isFocused,
            [`${BLOCK}__input--value`]: !!value.trim(),
            [`${BLOCK}__input--error`]: !!error,
          })}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && onDelete && (
          <Image
            src={rightIcon}
            alt="right icon"
            width={20}
            height={20}
            className={cn(`${BLOCK}__icon`, `${BLOCK}__icon--right`, {
              [`${BLOCK}__icon--error`]: !!error,
            })}
            onClick={onDelete}
          />
        )}
      </div>
      {helper && !error && (
        <Helper
          className={cn(`label4-regular`, `${BLOCK}__helper`, {
            [`${BLOCK}__helper--visible`]: !error,
          })}
        >
          {helper}
        </Helper>
      )}
      {error && (
        <Helper
          className={cn(`label4-regular`, `${BLOCK}__error`, {
            [`${BLOCK}__error--visible`]: !!error,
          })}
        >
          {error}
        </Helper>
      )}
    </Field>
  );
};

export default Input;

Input.displayName = 'Input';