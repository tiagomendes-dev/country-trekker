export type Country = {
  length: number;
  name: {
    common: string;
  };
  capital: string;
  capitalInfo: {
    latlng: [number, number];
  };
  region: string;
  subregion: string;
  population: number;
  languages: {
    [key: string]: string;
  };
  translations: {
    por: {
      common: string;
      official: string;
    };
  };
  flags: {
    svg: string;
    alt: string;
  };
  borders?: string[];
  cca3: string;
};
