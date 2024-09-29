import BrokenCloudsIcon from '@/assets/icon/icon-broken-clouds.svg';
import ClearSkyIcon from '@/assets/icon/icon-clear-sky.svg';
import FewCloudsIcon from '@/assets/icon/icon-few-clouds.svg';
import MistIcon from '@/assets/icon/icon-mist.svg';
import RainIcon from '@/assets/icon/icon-rain.svg';
import ShowerRainIcon from '@/assets/icon/icon-shower-rain.svg';
import SnowIcon from '@/assets/icon/icon-snow.svg';
import ThunderstormIcon from '@/assets/icon/icon-thunderstorm.svg';

const iconMap: { [key: string]: string } = {
  '01d': ClearSkyIcon,
  '01n': ClearSkyIcon,
  '02d': FewCloudsIcon,
  '02n': FewCloudsIcon,
  '03d': BrokenCloudsIcon,
  '03n': BrokenCloudsIcon,
  '04d': BrokenCloudsIcon,
  '04n': BrokenCloudsIcon,
  '09d': ShowerRainIcon,
  '09n': ShowerRainIcon,
  '10d': RainIcon,
  '10n': RainIcon,
  '11d': ThunderstormIcon,
  '11n': ThunderstormIcon,
  '13d': SnowIcon,
  '13n': SnowIcon,
  '50d': MistIcon,
  '50n': MistIcon,
};

export const getWeatherIcon = (icon: string) => {
  return iconMap[icon] || ClearSkyIcon;
};
