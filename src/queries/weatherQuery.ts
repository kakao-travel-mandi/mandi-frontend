import { useQuery } from '@tanstack/react-query';

import { getWeatherAPI } from '@/apis/weather';
import { WeatherRequest } from '@/types/request';
import { WeatherResponse } from '@/types/response';
import { getWeatherIcon } from '@/utils/weather';

export const useWeatherQuery = ({ request }: { request: WeatherRequest }) => {
  return useQuery<WeatherResponse>({
    queryKey: ['weather', request.lat, request.lon],
    queryFn: () => getWeatherAPI(request),
    select: data => {
      const now = new Date();

      const todayWeather = data.list
        .filter((entry: any) => {
          const entryDate = new Date(entry.dt * 1000);

          return entryDate >= now;
        })
        .slice(0, 6)
        .map((entry: any) => {
          return {
            ...entry,
            Icon: getWeatherIcon(entry.weather[0].icon),
            dt_txt: new Date(entry.dt * 1000).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }),
          };
        });

      return { ...data, list: todayWeather };
    },
  });
};
