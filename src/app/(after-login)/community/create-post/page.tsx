'use client';
import { useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import CreatePostCategory from '@/app/(after-login)/community/_components/create-post-category/index';
import CreatePostEditor from '@/app/(after-login)/community/_components/create-post-editor/index';
import CreatePostImageUploader from '@/app/(after-login)/community/_components/create-post-image-uploader/index';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Layout from '@/components/layout';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useCreatePostMutation } from '@/queries/postQuery';

import styles from './createPost.module.scss';

const cx = classNames.bind(styles);

const CreatePost = () => {
  const router = useRouter();
  const { createSnackbar } = useSnackbar();

  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [post, setPost] = useState<string>('');
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { mutate, isError, error } = useCreatePostMutation({
    onSuccess: data => {
      console.log('Post created successfully:', data);
      createSnackbar({ type: 'check', content: 'It has been posted.' });
      router.push(`/community`);
    },
    onError: error => {
      console.error('Error creating post:', error);
    },
  });
  const handleUpload = (files: File[]) => {
    const newImages = files.map(file => {
      const reader = new FileReader();
      return new Promise<string>(resolve => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(newImages).then(results => {
      setImages(prevImages => [...prevImages, ...results]);
    });
  };

  const removeBase64Prefix = (base64Data: string) => {
    return base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
  };

  const handlePostSubmit = () => {
    const base64EncodedImageList = images.map(image =>
      removeBase64Prefix(image),
    );

    const formData = {
      category: selectedCategory,
      content: post,
      title: title,
      Base64EncodedImageList: base64EncodedImageList,
    };
    mutate(formData);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <Layout
      title='Create Post'
      back={true}
      hasTopNav={true}
      hasTabBar={false}
      actions={[
        {
          text: 'Post', // 색깔 입히기
          onClick: () => setDialogOpen(true),
        },
      ]}
    >
      <div className={cx('container')}>
        <CreatePostCategory
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <CreatePostImageUploader
          images={images}
          onUpload={handleUpload}
          onDelete={index => setImages(images.filter((_, i) => i !== index))}
        />
      </div>
      <CreatePostEditor
        title={title}
        post={post}
        onTitleChange={setTitle}
        onPostChange={setPost}
      />
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title='Would you like to post it?'
        description=''
        buttons={
          <div className={cx('container__dialog')}>
            <Button size='full' color='whitegray' onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button size='full' color='green' onClick={handlePostSubmit}>
              post
            </Button>
          </div>
        }
      />
    </Layout>
  );
};

export default CreatePost;
