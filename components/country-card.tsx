"use client";

import { getCountries, getCountryByName } from "@/app/api/country";
import { Country } from "@/app/types/country";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

const DynamicMap = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function CountryCard() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <div className="grid grid-cols-2">
      <div className="w-full">
        {countries
          ? countries.map((country) => (
              <div key={country.name.common} className="w-full">
                <Card className="flex items-center">
                  <CardHeader className="h-[192px] w-[263px]">
                    <div className="bg-primary/20 w-full h-full rounded-lg" />
                  </CardHeader>
                  <CardContent className="flex p-6 flex-col justify-between items-start h-full">
                    <div>
                      <h2 className="font-bold text-xl">
                        {country.name.common}
                      </h2>
                      <p className="font-light text-sm">
                        {country.capital && country.capital}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex items-center justify-end gap-1">
                        <div className="bg-primary inline-flex p-1 rounded-full">
                          <PersonIcon className="text-white text-xs" />
                        </div>
                        {formatter.format(country.population)}
                      </div>
                      <div className="flex items-center justify-end gap-1">
                        <div className="bg-primary inline-flex p-1 rounded-full">
                          <ChatBubbleIcon className="text-white text-xs" />
                        </div>
                        {country.languages &&
                          Object.values(country.languages).map((language) => (
                            <span
                              key={language}
                              className="after:content-[','] after:last:content-none"
                            >
                              {language}
                            </span>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          : null}
      </div>
      <div className="flex-1 w-full h-full bg-primary"></div>
    </div>
  );
}
