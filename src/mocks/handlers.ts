import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/my-info', () => {
    return HttpResponse.json({
      nickname: 'nameeee',
      profileImageUrl: 'https://avatars.githubusercontent.com/u/77449538?v=4',
      bio: 'hello~',
      oauthInfo: {
        provider: 'google',
        email: 'user12@gmail.com',
      },
      totalReviewCount: 40,
      completedCourseCount: 20,
    });
  }),
];
