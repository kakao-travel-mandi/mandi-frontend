export type PositionType = {
  latitude: number;
  longitude: number;
};

export type WeatherItem = {
  dt_txt: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
};
