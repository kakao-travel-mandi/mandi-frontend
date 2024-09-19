// 현재 위치(위도, 경도)를 가져오는 함수
export const getCurrentPosition = async () => {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    console.warn('Geolocation is not supported');
    throw new Error('Geolocation is not supported');
  }

  return new Promise<{ latitude: number; longitude: number }>(
    (resolve, reject) => {
      const success = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      };

      const error = (error: GeolocationPositionError) => {
        console.warn(`ERROR(${error.code}): ${error.message}`);
        reject(error);
      };

      navigator.geolocation.getCurrentPosition(success, error);
    },
  );
};
