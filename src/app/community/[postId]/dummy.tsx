export const mockCommunityFeedDataDetail = {
  postId: 1,
  user: {
    userId: 1,
    nickname: 'lsh',
    imgUrl:
      'https://mandi-image.s3.ap-northeast-2.amazonaws.com/image/38bc7744-6faa-4539-87dd-92f16eb609b7',
  },
  category: 'TOURISM',
  content: 'This is a post about tourism.',
  title: 'Tourism Post',
  imgUrlList: [
    {
      url: '/test/feed-test1.png',
    },
    {
      url: '/test/feed-test1.png',
    },
    {
      url: '/test/feed-test1.png',
    },
    {
      url: '/test/feed-test1.png',
    },
  ],
  uploadDate: '2024-08-13T12:00:00Z',
  likesCount: 140,
  commentCount: 140,
  commentList: [
    {
      commentId: 1,
      parentCommentId: null,
      uploadDate: '2024-08-13T12:00:00Z',
      nickname: '임상민1',
      imgUrl:
        'https://mandi-image.s3.ap-northeast-2.amazonaws.com/image/38bc7744-6faa-4539-87dd-92f16eb609b7',
      childComments: [
        {
          commentId: 6,
          parentCommentId: 1,
          childComments: [],
          uploadDate: '2024-08-13T12:00:00Z',
          imgUrl:
            'https://mandi-image.s3.ap-northeast-2.amazonaws.com/image/38bc7744-6faa-4539-87dd-92f16eb609b7',
          nickname: '임상민2',
          content: 'This is a reply to the first comment on post 1.',
          likeCnt: 2,
        },
      ],
      content: 'This is a comment on the first post.',
      likeCnt: 5,
    },
    {
      commentId: 1,
      parentCommentId: null,
      uploadDate: '2024-08-13T12:00:00Z',
      nickname: '임상민3',
      imgUrl:
        'https://mandi-image.s3.ap-northeast-2.amazonaws.com/image/38bc7744-6faa-4539-87dd-92f16eb609b7',
      childComments: [
        {
          commentId: 6,
          parentCommentId: 1,
          childComments: [],
          uploadDate: '2024-08-13T12:00:00Z',
          imgUrl:
            'https://mandi-image.s3.ap-northeast-2.amazonaws.com/image/38bc7744-6faa-4539-87dd-92f16eb609b7',
          nickname: '임상민4',
          content: 'This is a reply to the first comment on post 1.',
          likeCnt: 2,
        },
        {
          commentId: 6,
          parentCommentId: 1,
          childComments: [],
          uploadDate: '2024-08-13T12:00:00Z',
          imgUrl:
            'https://mandi-image.s3.ap-northeast-2.amazonaws.com/image/38bc7744-6faa-4539-87dd-92f16eb609b7',
          nickname: '임상민5',
          content: 'This is a reply to the first comment on post 1.',
          likeCnt: 2,
        },
      ],
      content: 'This is a comment on the first post.',
      likeCnt: 5,
    },
  ],
};
