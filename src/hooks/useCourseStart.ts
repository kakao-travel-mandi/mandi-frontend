import { useState } from 'react';

import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import { useStartTrekkingMutation } from '@/queries/trekkingQuery';
import { useTrekkerStore } from '@/stores/trekker';
import { getCurrentPosition } from '@/utils/geolocation';

import { useSnackbar } from './useSnackbar';

export const useCourseStart = (courseId: number) => {
  const [loading, setLoading] = useState(false);
  const { createSnackbar } = useSnackbar();
  const router = useRouter();
  const { resetTracking } = useTrekkerStore();
  const { mutate } = useStartTrekkingMutation(courseId, {
    onSuccess: data => {
      if (data.response.enabled) {
        setCookie('trekkingId', courseId.toString());
        resetTracking();
        router.push(`/course/${courseId}/trekking`);
        return;
      } else {
        createSnackbar({
          type: 'alert',
          position: 'center',
          content:
            '코스를 시작하려면 시작 지점으로부터 100m 이내에 있어야 합니다. 현재 위치를 확인해주세요.',
          full: true,
        });
      }
      setLoading(false);
    },
    onError: error => {
      console.error(error);
      setLoading(false);
    },
  });

  const handleClickStart = async () => {
    setLoading(true);
    try {
      const position = await getCurrentPosition();
      // test: 테스트 목적으로 코스 11번 시작위치로 설정
      // const position = {
      //   latitude: 35.0739551,
      //   longitude: 129.0154284,
      // };
      mutate({
        userLocation: {
          latitude: position.latitude,
          longitude: position.longitude,
        },
      });
    } catch (error) {
      createSnackbar({
        type: 'alert',
        content: '위치 정보를 가져오는데 실패했습니다.',
      });
    }
  };

  return {
    loading,
    handleClickStart,
  };
};
