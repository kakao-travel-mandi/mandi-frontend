import axios from 'axios';

import { WEATHER_URL } from '@/constants/api';
import { WeatherRequest } from '@/types/request';
import { WeatherResponse } from '@/types/response';

export const getWeatherAPI = async (
  request: WeatherRequest,
): Promise<WeatherResponse> => {
  const { lat, lon, appid } = request;

  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: appid,
    units: 'metric',
    lang: 'kr',
  });

  try {
    const response = await axios.get(`${WEATHER_URL}?${params}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw response.status;
    }
  } catch (error) {
    throw error;
  }
};
