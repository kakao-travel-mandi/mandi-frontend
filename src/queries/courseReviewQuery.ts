import { useQuery } from '@tanstack/react-query';

import {
  getCourseCompleteAPI,
  getCourseCompleteReviewAPI,
} from '@/apis/courseReview';
import {
  CourseCompleteReviewResponse,
  CourseCompleteResponse,
} from '@/types/response';

export const useCourseCompleteReviewQuery = () => {
  return useQuery<CourseCompleteReviewResponse>({
    queryKey: ['course-complete-review'],
    queryFn: () => getCourseCompleteReviewAPI(),
  });
};

export const useCourseCompleteQuery = () => {
  return useQuery<CourseCompleteResponse>({
    queryKey: ['course-complete'],
    queryFn: () => getCourseCompleteAPI(),
  });
};
