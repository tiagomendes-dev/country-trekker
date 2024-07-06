"use client";

import { getCountries, getCountryByName } from "@/app/api/country";
import { Country } from "@/app/types/country";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CountryCard() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[] | null>(null);
  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {countries
        ? countries.map((country) => (
            <Card
              key={country.name.common}
              className="inline-flex flex-col"
              onClick={() => router.push(`/country/${country.name.common}`)}
            >
              <CardHeader className="">
                <div className="bg-primary/20 w-full rounded-lg h-40">
                  <Image
                    src={country.flags.svg}
                    alt={country.flags.alt}
                    className="object-cover w-full h-full rounded-lg aspect-[2/3]"
                    width={500}
                    height={500}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-start">
                <div>
                  <h2 className="font-bold text-xl">{country.name.common}</h2>
                  <p className="font-light text-sm">
                    {country.capital && country.capital}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        : null}
    </div>
  );
}
