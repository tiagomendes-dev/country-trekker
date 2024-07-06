"use client";

import { getCountries } from "@/app/api/country";
import page from "@/app/page";
import { Country } from "@/app/types/country";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CountryCard() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <div className="grid grid-cols-1 gap-4">
      {countries
        ? countries.map((country) => (
            <Card
              className="inline-flex items-center"
              key={country.name.common}
            >
              <CardHeader className="h-[192px] w-[263px]">
                <div className="bg-primary/20 w-full h-full rounded-lg" />
              </CardHeader>
              <CardContent className="flex p-6 flex-col justify-between items-start h-full">
                <div>
                  <h2 className="font-bold text-xl">{country.name.common}</h2>
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
                        <span key={language}>{language}</span>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        : null}
    </div>
  );
}
