import {
  Textarea as HeadlessTextarea,
  Input as HeadlessInput,
} from '@headlessui/react';
import classNames from 'classnames/bind';

import styles from './createPostEditor.module.scss';

const cx = classNames.bind(styles);

interface CreatePostEditorProps {
  title: string;
  post: string;
  onTitleChange: (value: string) => void;
  onPostChange: (value: string) => void;
}

const CreatePostEditor = ({
  title,
  post,
  onTitleChange,
  onPostChange,
}: CreatePostEditorProps) => {
  return (
    <div className={cx('container')}>
      <HeadlessInput
        className={cx('container__title', 'subtitle1-semibold')}
        type='text'
        value={title}
        onChange={e => onTitleChange(e.target.value)}
        placeholder='Please enter a title'
      />
      <HeadlessTextarea
        className={cx('container__post', 'body1-regular')}
        placeholder='Please enter a description'
        value={post}
        onChange={e => onPostChange(e.target.value)}
      />
    </div>
  );
};

export default CreatePostEditor;
