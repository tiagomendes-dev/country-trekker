import { getCountryBordersByName, getCountryByName } from "@/app/api/country";
import {
  ChatBubbleIcon,
  GlobeIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Image from "next/image";

const DynamicMap = dynamic(() => import("@/components/map"), {
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
    <div className="container space-y-10 my-20 overflow-x-hidden">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">
          {country.translations.por.common}
        </h1>
        <h2 className="text-2xl text-black/60">
          {country.translations.por.official}
        </h2>
      </div>

      <div className="grid grid-cols-2 items-center gap-4">
        <div className="max-w-full w-full rounded-lg bg-primary/20">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            className="rounded-lg"
            width={700}
            height={467}
          />
        </div>
        <div className="flex flex-col gap-2">
          <>
            {country.capital && (
              <div>
                <span className="bg-primary inline-flex items-center justify-center p-1.5 rounded-full">
                  <HomeIcon className="text-white size-3.5" />
                </span>{" "}
                {country.capital}
              </div>
            )}
          </>
          <div className="flex items-center gap-1">
            <span className="bg-primary inline-flex items-center justify-center p-1.5 rounded-full">
              <PersonIcon className="text-white size-3.5" />
            </span>
            {formatter.format(country.population)}
          </div>
          <div className="flex items-center gap-1">
            <span className="bg-primary inline-flex items-center justify-center p-1.5 rounded-full">
              <GlobeIcon className="text-white size-3.5" />
            </span>
            {country.region} {country.subregion && `- ${country.subregion}`}
          </div>
          <>
            {country.languages && (
              <div className="flex items-center gap-1">
                <span className="bg-primary inline-flex items-center justify-center p-1.5 rounded-full">
                  <ChatBubbleIcon className="text-white size-3.5" />
                </span>
                {Object.values(country.languages).map((language) => (
                  <p key={language} className="break-words">
                    {language}
                  </p>
                ))}
              </div>
            )}
          </>
        </div>
      </div>

      <div>
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

      <div className="mt-4 flex w-full flex-col items-center justify-center rounded-lg shadow">
        <DynamicMap
          lan={country.capitalInfo.latlng[0] || 0}
          lon={country.capitalInfo.latlng[1] || 0}
        />
      </div>
    </div>
  );
}
