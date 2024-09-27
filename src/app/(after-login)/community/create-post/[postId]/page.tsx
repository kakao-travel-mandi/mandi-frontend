'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter, useParams } from 'next/navigation';

import CreatePostCategory from '@/app/(after-login)/community/_components/create-post-category/index';
import CreatePostEditor from '@/app/(after-login)/community/_components/create-post-editor/index';
import CreatePostImageUploader from '@/app/(after-login)/community/_components/create-post-image-uploader/index';
import Layout from '@/components/layout';
import { useGetPostId, usePutPostMutation } from '@/queries/postQuery';

import styles from './createPostPut.module.scss';

const cx = classNames.bind(styles);

const CreatePostPut = () => {
  const router = useRouter();
  const params = useParams();
  const postId = params?.postId;

  const [title, setTitle] = useState<string>('');
  const [post, setPost] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { mutate: GetPostMutate, data: getPostData } = useGetPostId();
  const { mutate, isError, error } = usePutPostMutation({
    onSuccess: data => {
      console.log('Post created successfully:', data);
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

  const handleSubmit = () => {
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
      title='Create Post'
      back={true}
      hasTopNav={true}
      hasTabBar={false}
      actions={[
        {
          text: 'Post', // 색깔 입히기
          onClick: handleSubmit,
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
    </Layout>
  );
};

export default CreatePostPut;
