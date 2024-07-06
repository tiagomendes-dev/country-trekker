"use client";

import { getCountries } from "@/app/api/country";
import page from "@/app/page";
import { Country } from "@/app/types/country";
import CountryCard from "@/components/country-card";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";

export default function CountryList() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  return (
    <div>
      <CountryCard />
    </div>
  );
}
