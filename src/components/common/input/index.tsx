'use client';

import {
  CSSProperties,
  InputHTMLAttributes,
  ReactElement,
  useState,
} from 'react';

import {
  Field,
  Input as HeadlessInput,
  Description as Helper,
  Label,
} from '@headlessui/react';
import classNames from 'classnames/bind';

import styles from './input.module.scss';

const cn = classNames.bind(styles);

const BLOCK = 'input';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onError' | 'onChange'> {
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
  leftIcon?: ReactElement;
  /**
   * 오른쪽 아이콘
   */
  rightIcon?: ReactElement;
  /**
   * 스타일
   */
  style?: CSSProperties;
  /**
   * 타입
   */
  type?: string;
  /**
   * 에러 메세지
   */
  error?: string;
  /**
   * 변경 함수
   */
  onChange?: (value: string) => void;
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
  onChange,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Field>
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
          <div
            className={cn(`${BLOCK}__icon`, `${BLOCK}__icon--left`, {
              [`${BLOCK}__icon--error`]: !!error,
            })}
          >
            {leftIcon}
          </div>
        )}
        <HeadlessInput
          value={value}
          type={type}
          placeholder={placeholder}
          className={cn(`body1-regular`, `${BLOCK}__form`, {
            [`${BLOCK}__form--leftIcon`]: !!leftIcon,
            [`${BLOCK}__form--rightIcon`]: !!rightIcon,
            [`${BLOCK}__form--focused`]: isFocused,
            [`${BLOCK}__form--value`]: !!value.trim(),
            [`${BLOCK}__form--error`]: !!error,
          })}
          style={style}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={e => onChange?.(e.target.value)}
          {...props}
        />
        {rightIcon && onChange && (
          <div
            className={cn(`${BLOCK}__icon`, `${BLOCK}__icon--right`, {
              [`${BLOCK}__icon--error`]: !!error,
              [`${BLOCK}__icon--focused`]: isFocused,
            })}
            onClick={() => onChange?.('')}
          >
            {rightIcon}
          </div>
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