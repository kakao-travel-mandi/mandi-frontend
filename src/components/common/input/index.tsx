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
  value: string;
  label?: string;
  helper?: string;
  placeholder?: string;
  leftIcon?: string;
  rightIcon?: string;
  style?: React.CSSProperties;
  type?: string;
  error?: string;
  onError?: (value: string) => void;
  onDelete?: () => void;
}

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