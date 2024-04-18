export type Country = {
  name: {
    common: string;
  };
  capital: string;
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
