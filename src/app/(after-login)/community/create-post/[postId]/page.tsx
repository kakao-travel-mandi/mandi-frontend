'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter, useParams } from 'next/navigation';

import CreatePostCategory from '@/app/(after-login)/community/_components/create-post-category/index';
import CreatePostEditor from '@/app/(after-login)/community/_components/create-post-editor/index';
import CreatePostImageUploader from '@/app/(after-login)/community/_components/create-post-image-uploader/index';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Layout from '@/components/layout';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useGetPostId, usePutPostMutation } from '@/queries/postQuery';

import styles from './createPostPut.module.scss';

const cx = classNames.bind(styles);

const CreatePostPut = () => {
  const router = useRouter();
  const params = useParams();
  const postId = params?.postId;
  const { createSnackbar } = useSnackbar();

  const [title, setTitle] = useState<string>('');
  const [post, setPost] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { mutate: GetPostMutate, data: getPostData } = useGetPostId();
  const { mutate, isError, error } = usePutPostMutation({
    onSuccess: data => {
      console.log('Post created successfully:', data);
      createSnackbar({ type: 'check', content: 'The post has been updated.' });
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

    mutate({ postId: `${postId}`, request: formData });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    GetPostMutate(`${postId}`);
  }, [postId, GetPostMutate]);

  useEffect(() => {
    setTitle(getPostData?.response?.title ?? '');
    setPost(getPostData?.response?.content ?? '');
    setSelectedCategory(getPostData?.response?.category ?? '');
  }, [getPostData]);

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <Layout
      title='Edit Post'
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

export default CreatePostPut;
