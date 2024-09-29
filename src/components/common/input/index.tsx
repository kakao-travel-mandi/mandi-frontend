'use client';

import {
  ChangeEvent,
  CSSProperties,
  forwardRef,
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
   * 최대 길이
   */
  maxLength?: number;
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
  /**
   * 에러 함수
   */
  onError?: (error: string) => void;
  className?: string;
}

/**
 * 인풋 컴포넌트
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value = '',
      maxLength,
      label = '',
      helper = '',
      placeholder = '',
      leftIcon,
      rightIcon,
      type = 'text',
      style,
      error = '',
      onChange,
      onError,
      className,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (maxLength && value.length > maxLength) return;

      onChange?.(value);
    };

    // console.log(error);

    return (
      <Field style={style}>
        {label && (
          <Label
            className={cn(`${BLOCK}__label`, {
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
            ref={ref}
            value={value}
            maxLength={maxLength}
            type={type}
            placeholder={placeholder}
            className={cn(
              `${BLOCK}__form`,
              {
                [`${BLOCK}__form--leftIcon`]: !!leftIcon,
                [`${BLOCK}__form--rightIcon`]: !!rightIcon,
                [`${BLOCK}__form--focused`]: isFocused,
                [`${BLOCK}__form--value`]: !!value.trim(),
                [`${BLOCK}__form--error`]: !!error,
              },
              className,
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
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
        <div className={cn(`${BLOCK}__bottom-wrapper`)}>
          {helper && !error && (
            <Helper
              className={cn(`${BLOCK}__helper`, {
                [`${BLOCK}__helper--visible`]: !error,
              })}
            >
              {helper}
            </Helper>
          )}
          {error && (
            <Helper
              className={cn(`${BLOCK}__error`, {
                [`${BLOCK}__error--visible`]: !!error,
              })}
            >
              {error}
            </Helper>
          )}
          {maxLength && (
            <div className={cn(`${BLOCK}__length`)}>
              <span>{value.length}/</span>
              <span>{maxLength}</span>
            </div>
          )}
        </div>
      </Field>
    );
  },
);

export default Input;

Input.displayName = 'Input';
