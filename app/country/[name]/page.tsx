import { getCountryBordersByName, getCountryByName } from "@/app/api/country";
import dynamic from "next/dynamic";
import Image from "next/image";

const DynamicMap = dynamic(() => import("@/app/components/map"), {
  ssr: false,
});

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(decodeURI(name));
  const borderCountries = await getCountryBordersByName(decodeURI(name));

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <div className="overflow-x-hidden">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col items-center justify-center rounded-lg p-4 shadow">
          <div className="text-5xl font-extrabold">
            {country.translations.por.common}
          </div>
          <div className="opacity-50">{country.translations.por.official}</div>
          <div>
            {country.capital && (
              <div>
                <b>Capital:</b> {country.capital}
              </div>
            )}
          </div>
        </div>
        <div className="rounded-lg p-4 shadow">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            width={500}
            height={100}
          />
        </div>
      </div>
      <div className="mt-4 flex w-full flex-col items-center justify-center rounded-lg p-4 shadow">
        <div>
          <b>População:</b> {formatter.format(country.population)}
        </div>
        <div>
          <b>Continente:</b> {country.region}{" "}
          {country.subregion && `- ${country.subregion}`}
        </div>
        {country.languages && (
          <div className="mt-4 text-center">
            Línguas faladas: <br />
            {Object.values(country.languages).map((language) => (
              <span key={language} className="badge badge-primary">
                {language}
              </span>
            ))}
          </div>
        )}

        {borderCountries && (
          <section>
            <h3 className="mt-12 text-2xl text-center font-semibold text-gray-800">
              Países que fazem fronteira
            </h3>
            <div className="flex items-center justify-center gap-2">
              {borderCountries?.map((border) => (
                <span key={border.name} className="badge badge-primary mt-2">
                  {border.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="my-4 flex w-full flex-col items-center justify-center rounded-lg shadow">
        <DynamicMap
          lan={country.capitalInfo.latlng[0] || 0}
          lon={country.capitalInfo.latlng[1] || 0}
        />
      </div>
    </div>
  );
}
