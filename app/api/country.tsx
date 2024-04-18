import { Country } from "@/app/types/country";

export async function getCountries(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json();
}

export async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  return countries.find((country: Country) => country.name.common === name)!;
}

export async function getCountryBordersByName(name: string) {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  const country = countries.find(
    (country: Country) => country.name.common === name,
  )!;

  return country.borders?.map((border) => {
    const borderCountry = countries.find((country) => country.cca3 === border)!;
    return {
      name: borderCountry.name.common,
      ptName: borderCountry.translations.por.common,
      flag: borderCountry.flags.svg,
      flagAlt: borderCountry.flags.alt,
    };
  });
}
