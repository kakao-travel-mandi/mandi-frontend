import { GetNearbyCoursesRequest, GetCoursesRequest } from '@/types/request';
import { GetNearbyCoursesResponse, GetCoursesResponse } from '@/types/response';

import { axiosInstance } from './axiosInstance';

export const getCoursesAPI = async (
  request: GetCoursesRequest,
): Promise<GetCoursesResponse> => {
  console.log('request', request);
  const { page, size, rating, keyword, orderByDirection, levels } = request;
  try {
    const response = await axiosInstance.get('/courses', {
      params: {
        page,
        size,
        rating,
        keyword,
        orderByDirection,
        levels,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getNearbyCoursesAPI = async (
  request: GetNearbyCoursesRequest,
): Promise<GetNearbyCoursesResponse> => {
  const { sw, ne } = request;
  try {
    const response = await axiosInstance.post('/courses/nearby', {
      sw,
      ne,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getGPXDataAPI = async (gpxUrl: string): Promise<string> => {
  try {
    const response = await fetch(gpxUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error fetching GPX data:", error);
    throw error;
  }
};